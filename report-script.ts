function main(workbook: ExcelScript.Workbook) {
  const ws: ExcelScript.Worksheet = workbook.getActiveWorksheet();
  const src: ExcelScript.Range = workbook.getSelectedRange();

  const rowCount: number = src.getRowCount();
  const colCount: number = src.getColumnCount();
  if (rowCount === 0 || colCount === 0) return;

  // 1) 붙여넣기 위치: 선택범위 오른쪽 끝 + 공백 1칸 뒤
  const destRow: number = src.getRowIndex();
  const destCol: number = src.getColumnIndex() + colCount + 1;
  const dest: ExcelScript.Range = ws.getRangeByIndexes(destRow, destCol, rowCount, colCount);

  // 2) 복사(값/서식/병합 포함)
  dest.copyFrom(src, ExcelScript.RangeCopyType.all, false, false);

  // ✅ 최적화: texts/values를 한 번만 읽어 모든 함수에서 공유
  //    (원본은 각 함수마다 getValues/getTexts를 별도 호출)
  const texts = dest.getTexts() as string[][];
  const values = dest.getValues() as (string | number | boolean)[][];

  // 3) 헤더 업데이트
  updateHeader1_Report(dest, values);
  updateHeader2_CollectPeriod(dest, values);

  // 4) Type 아래 라벨 행 처리
  // ✅ values도 함께 전달: 지워진 셀을 in-memory에서도 ""로 반영
  //    → zeroOutNumbersByRows가 지워진 셀에 0을 다시 쓰는 버그 방지
  clearRightValuesAndFillGrayByTypeLabels(dest, "#D9D9D9", texts, values);

  // 5) 0 치환
  zeroOutNumbersByRows(dest, texts, values);
}

/* =========================================================
   [A] 헤더 업데이트
========================================================= */
function updateHeader1_Report(
  dest: ExcelScript.Range,
  values: (string | number | boolean)[][]
): void {
  // ✅ 최적화: 미리 읽어온 values 사용 → getValues() 호출 제거
  //           반환값에 value 포함 → cell.getValue() 호출 제거
  const result = findFirstCellInBlockContains(dest, ["보고자료", "주간 보고"], values);
  if (result === null) return;

  const s: string = result.value;
  if (s === "") return;

  let s2: string = s;
  s2 = incWeekNumberSafe(s2);
  s2 = shiftParenDatePlus7Safe(s2);

  if (s2 !== s) result.cell.setValue(s2);
}

function updateHeader2_CollectPeriod(
  dest: ExcelScript.Range,
  values: (string | number | boolean)[][]
): void {
  const result = findFirstCellInBlockContains(dest, ["집계기간"], values);
  if (result === null) return;

  const s: string = result.value;
  if (s === "") return;

  let s2: string = s;
  s2 = incWeekNumberSafe(s2);
  s2 = shiftFirstTwoMDWithinGyeGyePeriodPlus7Safe(s2);

  if (s2 !== s) result.cell.setValue(s2);
}

// ✅ 최적화: 미리 읽어온 values 파라미터 추가 (getValues() 호출 제거)
//           반환 타입을 {cell, value}로 변경 → cell.getValue() 호출 제거
function findFirstCellInBlockContains(
  dest: ExcelScript.Range,
  keywords: string[],
  values: (string | number | boolean)[][]
): { cell: ExcelScript.Range; value: string } | null {
  const ws: ExcelScript.Worksheet = dest.getWorksheet();
  const r0: number = dest.getRowIndex();
  const c0: number = dest.getColumnIndex();
  const rows: number = dest.getRowCount();
  const cols: number = dest.getColumnCount();

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const text: string = String(values[r][c] ?? "");
      if (text === "") continue;
      for (let k = 0; k < keywords.length; k++) {
        if (text.indexOf(keywords[k]) !== -1) {
          return { cell: ws.getRangeByIndexes(r0 + r, c0 + c, 1, 1), value: text };
        }
      }
    }
  }
  return null;
}

/* =========================================================
   [B] Type 아래 라벨행 처리
========================================================= */
// ✅ 최적화: 미리 읽어온 texts 파라미터 추가 (getTexts() 호출 제거)
//           isExactInList 선형 탐색 → Set.has() O(1)
// ✅ 버그 수정: values도 함께 받아 지워진 셀을 in-memory에서도 갱신
//             (원본: zeroOutNumbersByRows가 행마다 Excel에서 직접 읽어 항상 최신 상태 참조
//              최적화본: values를 미리 읽어두므로, 지워진 셀이 반영되지 않으면
//                       zeroOutNumbersByRows가 stale values를 0으로 다시 씀)
function clearRightValuesAndFillGrayByTypeLabels(
  dest: ExcelScript.Range,
  hexColor: string,
  texts: string[][],
  values: (string | number | boolean)[][]
): void {
  const ws: ExcelScript.Worksheet = dest.getWorksheet();
  const baseRow: number = dest.getRowIndex();
  const baseCol: number = dest.getColumnIndex();
  const rows: number = dest.getRowCount();
  const cols: number = dest.getColumnCount();
  if (rows === 0 || cols === 0) return;

  const labelSet: Set<string> = new Set([
    "접수 누락",
    "답변 누락",
    "DevOps 등록 누락",
    "DevOps 작성 수정",
    "운영 관리",
  ]);

  // 1) "Type" 셀 위치 수집
  const typePositions: { r: number; c: number }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (normalizeText(texts[r][c]) === "Type") {
        typePositions.push({ r, c });
      }
    }
  }
  if (typePositions.length === 0) return;

  // 2) 각 Type 셀 아래에서 라벨을 찾고 처리
  for (let t = 0; t < typePositions.length; t++) {
    const typeR: number = typePositions[t].r;
    const typeC: number = typePositions[t].c;

    for (let r = typeR + 1; r < rows; r++) {
      const labelText: string = normalizeText(texts[r][typeC]);
      if (!labelSet.has(labelText)) continue;  // ✅ O(1) 탐색

      const absRow: number = baseRow + r;

      // (1) 라벨 셀 오른쪽 값 모두 삭제
      const startC: number = typeC + 1;
      const deleteWidth: number = cols - startC;
      if (deleteWidth > 0) {
        const delRange: ExcelScript.Range = ws.getRangeByIndexes(absRow, baseCol + startC, 1, deleteWidth);
        clearRangeContentsSafely(delRange);
        // ✅ 버그 수정: in-memory values도 ""로 갱신
        //    (zeroOutNumbersByRows가 stale values로 0을 다시 쓰는 것 방지)
        for (let dc = startC; dc < cols; dc++) {
          values[r][dc] = "";
        }
      }

      // (2) 해당 행 회색 채우기: 첫 열(0)과 마지막 열(cols-1) 제외
      if (cols >= 3) {
        const fillRange: ExcelScript.Range = ws.getRangeByIndexes(absRow, baseCol + 1, 1, cols - 2);
        fillRange.getFormat().getFill().setColor(hexColor);
      }
    }
  }
}

function clearRangeContentsSafely(rng: ExcelScript.Range): void {
  try {
    rng.clear(ExcelScript.ClearApplyTo.contents);
  } catch (e) {
    const h: number = rng.getRowCount();
    const w: number = rng.getColumnCount();
    // ✅ 최적화: 중첩 루프 대신 Array.from 사용
    const blanks: string[][] = Array.from({ length: h }, () => Array(w).fill(""));
    rng.setValues(blanks);
  }
}

/* =========================================================
   [C] 0 치환(행 기준)
========================================================= */
// ✅ 최적화 (핵심):
//   - 미리 읽어온 values 사용 → 행마다 getRangeByIndexes + getValues 호출 제거
//   - addUnique + 배열 → Set으로 교체
//   - 변경된 행만 setValues 호출
function zeroOutNumbersByRows(
  dest: ExcelScript.Range,
  texts: string[][],
  values: (string | number | boolean)[][]
): void {
  const ws: ExcelScript.Worksheet = dest.getWorksheet();
  const baseRow: number = dest.getRowIndex();
  const baseCol: number = dest.getColumnIndex();
  const rowCount: number = dest.getRowCount();
  const colCount: number = dest.getColumnCount();

  // ✅ Set으로 중복 없이 대상 행 관리
  const targetSet: Set<number> = new Set<number>();
  for (let r = 3; r <= 10; r++) targetSet.add(r);

  // ✅ 미리 읽어온 texts 전달 → getColumn().getTexts() 2번 호출 제거
  const dyn = findDynamicSectionForZero(texts, rowCount);
  if (dyn !== null) {
    const s: number = Math.min(dyn.startRel, dyn.endRel);
    const e: number = Math.max(dyn.startRel, dyn.endRel);
    for (let r = s; r <= e; r++) targetSet.add(r);
  }

  targetSet.forEach((rel: number) => {
    if (rel >= 16 && rel <= 29) return;  // 제외
    if (rel < 1 || rel > rowCount) return;

    const ri: number = rel - 1;  // 0-based
    const row = values[ri];

    // 변경 필요 여부 먼저 확인
    let rowChanged = false;
    for (let c = 0; c < colCount; c++) {
      const v = row[c];
      if (typeof v === "number" || (typeof v === "string" && /[0-9]/.test(v))) {
        rowChanged = true;
        break;
      }
    }
    if (!rowChanged) return;

    // 행 복사 후 수정
    const newRow: (string | number | boolean)[] = row.slice();
    for (let c = 0; c < colCount; c++) {
      const v = newRow[c];
      if (typeof v === "number") {
        newRow[c] = 0;
      } else if (typeof v === "string" && /[0-9]/.test(v)) {
        newRow[c] = (rel === 3 || rel === 4)
          ? v.replace(/[0-9]+/g, "0")
          : v.replace(/[0-9]/g, "0");
      }
    }
    ws.getRangeByIndexes(baseRow + ri, baseCol, 1, colCount).setValues([newRow]);
  });
}

// ✅ 최적화: dest 대신 미리 읽어온 texts 배열 수신
//           getColumn(0).getTexts(), getColumn(1).getTexts() 2번 호출 제거
function findDynamicSectionForZero(
  texts: string[][],
  rowCount: number
): { startRel: number; endRel: number } | null {
  if ((texts[0]?.length ?? 0) < 2) return null;

  let startRel = 0;
  for (let r = 0; r < rowCount; r++) {
    if (normalizeText(texts[r][1]) === "[DevOps 운영 통계 작성 이슈]") {
      startRel = r + 1;
      break;
    }
  }
  if (startRel === 0) return null;

  let endRel = 0;
  const reEnd: RegExp = /•\s*총\s*\d+\s*건\s*운영\s*반영/;
  for (let r = startRel - 1; r < rowCount; r++) {
    if (reEnd.test(normalizeText(texts[r][0]))) {
      endRel = r + 1;
      break;
    }
  }
  if (endRel === 0) return null;

  return { startRel, endRel };
}

/* =========================================================
   [D] 주차/날짜 유틸
========================================================= */
function incWeekNumberSafe(s: string): string {
  const re: RegExp = /(\d+)\s*주차/;
  const m: RegExpMatchArray | null = s.match(re);
  if (!m) return s;
  const n: number = Number(m[1]);
  if (!Number.isFinite(n)) return s;
  return s.replace(re, String(n + 1) + "주차");
}

function shiftParenDatePlus7Safe(s: string): string {
  const re: RegExp = /\((\d{1,2})\/(\d{1,2})\)/;
  const m: RegExpMatchArray | null = s.match(re);
  if (!m) return s;
  const shifted: string | null = tryAdd7Days_2026(Number(m[1]), Number(m[2]));
  if (shifted === null) return s;
  return s.replace(re, "(" + shifted + ")");
}

function shiftFirstTwoMDWithinGyeGyePeriodPlus7Safe(s: string): string {
  const idx: number = s.indexOf("집계기간");
  if (idx === -1) return s;

  const prefix: string = s.substring(0, idx);
  const tail: string = s.substring(idx);

  const re: RegExp = /(\d{1,2})\/(\d{1,2})/g;
  const matches: { mm: number; dd: number; pos: number; len: number }[] = [];

  let m: RegExpExecArray | null;
  while ((m = re.exec(tail)) !== null) {
    matches.push({ mm: Number(m[1]), dd: Number(m[2]), pos: m.index, len: m[0].length });
    if (matches.length === 2) break;
  }
  if (matches.length !== 2) return s;

  const first: string | null = tryAdd7Days_2026(matches[0].mm, matches[0].dd);
  const second: string | null = tryAdd7Days_2026(matches[1].mm, matches[1].dd);
  if (first === null || second === null) return s;

  let out: string = tail;
  out = replaceAt(out, matches[1].pos, matches[1].len, second);
  out = replaceAt(out, matches[0].pos, matches[0].len, first);

  return prefix + out;
}

function replaceAt(s: string, pos: number, len: number, repl: string): string {
  return s.substring(0, pos) + repl + s.substring(pos + len);
}

function tryAdd7Days_2026(mm: number, dd: number): string | null {
  if (!Number.isFinite(mm) || !Number.isFinite(dd)) return null;
  const dt: Date = new Date(2026, mm - 1, dd);
  if (dt.getFullYear() !== 2026) return null;
  if (dt.getMonth() !== (mm - 1)) return null;
  if (dt.getDate() !== dd) return null;
  dt.setDate(dt.getDate() + 7);
  const mm2: string = String(dt.getMonth() + 1).padStart(2, "0");
  const dd2: string = String(dt.getDate()).padStart(2, "0");
  return mm2 + "/" + dd2;
}

function normalizeText(s: string): string {
  return String(s ?? "").replace(/\r/g, " ").replace(/\n/g, " ").trim();
}
