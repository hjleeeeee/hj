<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Notion Style Workspace</title>
  <style>
    :root {
      --bg: #ffffff;
      --bg-soft: #f7f7f5;
      --panel: rgba(255,255,255,.9);
      --text: #2f3437;
      --text-soft: #6b7280;
      --border: #e5e7eb;
      --hover: #f3f4f6;
      --primary: #2563eb;
      --primary-soft: #e8f0ff;
      --danger: #dc2626;
      --success: #16a34a;
      --shadow: 0 12px 32px rgba(15,23,42,.08);
      --radius: 16px;
      --content-width: 980px;
      --font-size: 17px;
      --line-height: 1.8;
    }

    body.dark-mode {
      --bg: #191919;
      --bg-soft: #222222;
      --panel: rgba(30,30,30,.94);
      --text: #e7e7e5;
      --text-soft: #a1a1aa;
      --border: #323232;
      --hover: #2a2a2a;
      --primary: #60a5fa;
      --primary-soft: #14263d;
      --shadow: 0 14px 36px rgba(0,0,0,.28);
    }

    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      background:
        radial-gradient(circle at top left, rgba(37,99,235,.06), transparent 30%),
        radial-gradient(circle at top right, rgba(168,85,247,.06), transparent 26%),
        var(--bg);
      color: var(--text);
      font-family: Inter, Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      transition: background-color .2s ease, color .2s ease;
    }

    body.readonly .editable-only,
    body.readonly #floating-toolbar,
    body.readonly #slash-menu,
    body.readonly #emoji-picker,
    body.readonly #link-dialog,
    body.readonly #toast-area,
    body.readonly #table-menu,
    body.readonly .table-filter-row,
    body.readonly .table-actions,
    body.readonly .block-hover-tools,
    body.readonly .image-controls,
    body.readonly .add-row-btn,
    body.readonly .file-inputs,
    body.readonly .page-actions,
    body.readonly .cover-controls,
    body.readonly .toolbar-note {
      display: none !important;
    }

    body.readonly [contenteditable="true"] {
      pointer-events: none !important;
      outline: none !important;
    }

    a { color: var(--primary); }

    .shell {
      min-height: 100vh;
      padding: 24px 16px 70px;
    }

    .container {
      max-width: calc(var(--content-width) + 90px);
      margin: 0 auto;
      position: relative;
    }

    .topbar {
      position: sticky;
      top: 10px;
      z-index: 3000;
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 12px 14px;
      margin-bottom: 18px;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 18px;
      box-shadow: var(--shadow);
      backdrop-filter: blur(14px);
    }

    .toolbar-group {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }

    .btn-ui,
    .toolbar-select,
    .toolbar-input,
    .toolbar-color {
      height: 36px;
      border: 1px solid var(--border);
      background: var(--bg);
      color: var(--text);
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
    }

    .toolbar-select,
    .toolbar-input {
      padding: 0 10px;
      outline: none;
    }

    .toolbar-color {
      width: 42px;
      padding: 4px;
      cursor: pointer;
      background: var(--bg);
    }

    .btn-ui {
      cursor: pointer;
      padding: 0 12px;
      transition: .15s ease;
    }

    .btn-ui:hover,
    .toolbar-select:hover,
    .toolbar-input:hover {
      background: var(--hover);
    }

    .btn-ui.primary {
      background: var(--primary);
      color: white;
      border-color: var(--primary);
    }

    .btn-ui.soft {
      background: var(--primary-soft);
      color: var(--primary);
      border-color: transparent;
    }

    .toolbar-note {
      font-size: 12px;
      color: var(--text-soft);
      margin-left: 6px;
      font-weight: 600;
    }

    .page {
      max-width: var(--content-width);
      margin: 0 auto;
      padding: 16px 8px 30px;
    }

    .cover {
      min-height: 200px;
      border-radius: 28px;
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
      position: relative;
      overflow: hidden;
      margin-bottom: 22px;
      background: linear-gradient(135deg, rgba(37,99,235,.13), rgba(168,85,247,.12), rgba(251,191,36,.12));
    }

    .cover::after {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, transparent, rgba(255,255,255,.04));
      pointer-events: none;
    }

    .cover-controls {
      position: absolute;
      right: 14px;
      bottom: 14px;
      display: flex;
      gap: 8px;
      z-index: 2;
    }

    .header-block {
      position: relative;
      z-index: 2;
      margin-top: -34px;
      padding: 0 10px;
    }

    #page-icon {
      width: 72px;
      height: 72px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 36px;
      border-radius: 20px;
      background: var(--bg);
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
      margin-bottom: 14px;
      outline: none;
    }

    #file-name-input {
      width: 100%;
      border: none;
      background: transparent;
      color: var(--text);
      font-size: 46px;
      font-weight: 800;
      line-height: 1.14;
      letter-spacing: -.03em;
      outline: none;
      padding: 0;
      margin: 0 0 8px;
    }

    .page-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      margin-bottom: 18px;
      color: var(--text-soft);
      font-size: 13px;
    }

    .meta-chip {
      padding: 8px 11px;
      border: 1px solid var(--border);
      background: var(--bg-soft);
      border-radius: 999px;
      font-weight: 600;
    }

    .editor {
      min-height: 640px;
      padding: 10px 8px 40px;
      outline: none;
      font-size: var(--font-size);
      line-height: var(--line-height);
      word-break: break-word;
    }

    .editor > *:first-child { margin-top: 0; }
    .editor p { margin: 8px 0; }
    .editor h1, .editor h2, .editor h3 {
      line-height: 1.25;
      letter-spacing: -.02em;
      margin: 20px 0 8px;
    }
    .editor h1 { font-size: 2rem; }
    .editor h2 { font-size: 1.5rem; }
    .editor h3 { font-size: 1.2rem; }

    .bullet-list, .number-list {
      margin: 10px 0;
      padding-left: 26px;
    }

    blockquote {
      margin: 14px 0;
      padding: 12px 16px;
      border-left: 4px solid var(--primary);
      background: var(--bg-soft);
      border-radius: 0 12px 12px 0;
      color: var(--text-soft);
    }

    .inline-code {
      background: var(--bg-soft);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: .12em .45em;
      font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
      font-size: .92em;
    }

    pre.code-block {
      margin: 16px 0;
      padding: 16px 18px;
      border-radius: 18px;
      background: #111827;
      color: #f3f4f6;
      font-size: 14px;
      line-height: 1.65;
      overflow: auto;
    }

    .callout {
      display: flex;
      gap: 12px;
      align-items: flex-start;
      margin: 14px 0;
      padding: 14px 16px;
      border: 1px solid var(--border);
      border-radius: 16px;
      background: var(--bg-soft);
    }

    .callout .emoji {
      font-size: 22px;
      line-height: 1;
      flex: 0 0 auto;
    }

    .block-wrap {
      position: relative;
      margin: 12px 0;
    }

    .block-hover-tools {
      position: absolute;
      right: 10px;
      top: 8px;
      display: flex;
      gap: 6px;
      opacity: 0;
      transition: opacity .15s ease;
      z-index: 5;
    }

    .block-wrap:hover .block-hover-tools,
    .db-wrapper:hover .block-hover-tools,
    .img-block:hover .block-hover-tools,
    .attachment-card:hover .block-hover-tools,
    .link-card-wrap:hover .block-hover-tools {
      opacity: 1;
    }

    .icon-btn {
      width: 28px;
      height: 28px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border);
      background: var(--bg);
      color: var(--text-soft);
      border-radius: 8px;
      cursor: pointer;
      font-size: 13px;
    }

    .icon-btn:hover {
      background: var(--hover);
      color: var(--danger);
    }

    .toggle-block {
      border: 1px solid var(--border);
      background: var(--bg-soft);
      border-radius: 14px;
      overflow: hidden;
    }

    .toggle-block summary {
      list-style: none;
      cursor: pointer;
      padding: 12px 14px;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .toggle-block summary::-webkit-details-marker { display: none; }
    .toggle-block summary::before {
      content: '▸';
      color: var(--text-soft);
      transition: transform .15s ease;
      margin-right: 2px;
    }
    .toggle-block[open] summary::before { transform: rotate(90deg); }

    .toggle-summary-text {
      flex: 1;
      min-width: 0;
      outline: none;
    }

    .toggle-content {
      padding: 0 14px 14px 34px;
      min-height: 32px;
      outline: none;
    }

    .todo-item {
      display: flex;
      gap: 10px;
      align-items: flex-start;
      margin: 8px 0;
    }

    .todo-item input[type="checkbox"] {
      margin-top: 6px;
      width: 18px;
      height: 18px;
      accent-color: var(--primary);
      cursor: pointer;
      flex: 0 0 auto;
    }

    .todo-text {
      flex: 1;
      min-width: 0;
      outline: none;
    }

    .todo-item input[type="checkbox"]:checked + .todo-text {
      text-decoration: line-through;
      color: var(--text-soft);
    }

    .link-card-wrap,
    .attachment-card,
    .img-block,
    .db-wrapper {
      position: relative;
      margin: 16px 0;
    }

    .link-card {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
      align-items: center;
      border: 1px solid var(--border);
      background: var(--bg);
      border-radius: 16px;
      padding: 14px 16px;
      text-decoration: none;
      color: inherit;
      box-shadow: 0 3px 10px rgba(0,0,0,.02);
      transition: .15s ease;
    }

    .link-card:hover {
      background: var(--bg-soft);
      transform: translateY(-1px);
    }

    .link-card strong { display: block; margin-bottom: 4px; }
    .link-card small { color: var(--text-soft); }

    .link-actions {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .attachment-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      padding: 12px 14px;
      border: 1px solid var(--border);
      border-radius: 16px;
      background: var(--bg-soft);
    }

    .attachment-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: 0;
    }

    .attachment-icon {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      background: var(--primary-soft);
      color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      flex: 0 0 auto;
    }

    .attachment-name {
      font-weight: 800;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: 420px;
    }

    .attachment-size {
      color: var(--text-soft);
      font-size: 12px;
      margin-top: 2px;
    }

    .attachment-actions {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      align-items: center;
    }

    .img-block figure, .img-block { margin: 0; }

    .img-frame {
      position: relative;
      display: inline-block;
      max-width: 100%;
    }

    .img-block img {
      display: block;
      width: min(100%, var(--img-width, 100%));
      max-width: 100%;
      border-radius: 18px;
      border: 1px solid var(--border);
      box-shadow: var(--shadow);
      user-select: none;
    }

    .image-caption {
      margin-top: 8px;
      color: var(--text-soft);
      font-size: 12px;
    }

    .image-controls {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
      margin-top: 10px;
      color: var(--text-soft);
      font-size: 12px;
    }

    .image-width-range {
      width: 220px;
    }

    .divider {
      margin: 24px 0;
      border: 0;
      border-top: 1px solid var(--border);
    }

    .db-wrapper {
      border: 1px solid var(--border);
      border-radius: 18px;
      background: var(--bg);
      overflow: hidden;
      box-shadow: 0 4px 14px rgba(0,0,0,.03);
    }

    .db-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      padding: 12px 14px;
      border-bottom: 1px solid var(--border);
      background: var(--bg-soft);
    }

    .db-head-main {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }

    .db-title {
      font-weight: 800;
      font-size: 14px;
      outline: none;
    }

    .table-actions {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }

    .table-shell {
      width: 100%;
      overflow: auto;
    }

    .data-table {
      width: 100%;
      min-width: 580px;
      border-collapse: collapse;
      table-layout: fixed;
    }

    .data-table th,
    .data-table td {
      border-right: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      padding: 12px;
      vertical-align: top;
      font-size: 14px;
      word-break: break-word;
      min-width: 120px;
    }

    .data-table th:last-child,
    .data-table td:last-child { border-right: none; }

    .data-table th {
      background: var(--bg-soft);
      font-weight: 800;
      cursor: pointer;
      position: relative;
      user-select: none;
    }

    .th-label {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .sort-indicator {
      color: var(--text-soft);
      font-size: 11px;
      min-width: 14px;
      text-align: center;
    }

    .data-table tbody tr:hover td {
      background: rgba(127,127,127,.035);
    }

    .table-filter-row {
      display: none;
      grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
      gap: 8px;
      padding: 10px 12px;
      border-bottom: 1px solid var(--border);
      background: var(--bg);
    }

    .table-filter-row input {
      width: 100%;
      height: 34px;
      border-radius: 10px;
      border: 1px solid var(--border);
      padding: 0 10px;
      background: var(--bg);
      color: var(--text);
      outline: none;
    }

    .add-row-btn {
      padding: 12px 14px;
      font-size: 13px;
      font-weight: 800;
      color: var(--text-soft);
      cursor: pointer;
    }

    .add-row-btn:hover {
      background: var(--hover);
      color: var(--primary);
    }

    .table-empty {
      display: none;
      padding: 12px 14px;
      font-size: 13px;
      color: var(--text-soft);
    }

    #floating-toolbar,
    #slash-menu,
    #table-menu,
    #emoji-picker,
    #link-dialog {
      position: absolute;
      display: none;
      z-index: 5000;
      border: 1px solid var(--border);
      border-radius: 16px;
      background: var(--panel);
      box-shadow: var(--shadow);
      backdrop-filter: blur(16px);
    }

    #floating-toolbar {
      padding: 8px;
      gap: 6px;
      align-items: center;
      flex-wrap: wrap;
      max-width: min(95vw, 780px);
    }

    #slash-menu,
    #table-menu,
    #link-dialog {
      width: 280px;
      padding: 8px;
      flex-direction: column;
      max-height: 420px;
      overflow: auto;
    }

    #emoji-picker {
      padding: 12px;
      width: 320px;
    }

    .menu-title {
      color: var(--text-soft);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: .06em;
      text-transform: uppercase;
      padding: 6px 10px 4px;
    }

    .menu-btn {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      border: none;
      background: transparent;
      color: var(--text);
      text-align: left;
      border-radius: 12px;
      padding: 10px 12px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 700;
    }

    .menu-btn:hover { background: var(--hover); }
    .menu-btn small {
      display: block;
      color: var(--text-soft);
      font-weight: 500;
      font-size: 12px;
    }

    .dialog-grid {
      display: grid;
      gap: 10px;
      padding: 10px;
    }

    .dialog-grid label {
      display: grid;
      gap: 6px;
      font-size: 12px;
      color: var(--text-soft);
      font-weight: 700;
    }

    .dialog-actions {
      display: flex;
      gap: 8px;
      padding: 10px;
      justify-content: flex-end;
    }

    #toast-area {
      position: fixed;
      right: 16px;
      bottom: 16px;
      display: grid;
      gap: 8px;
      z-index: 7000;
    }

    .toast {
      background: var(--panel);
      border: 1px solid var(--border);
      color: var(--text);
      padding: 10px 12px;
      border-radius: 12px;
      box-shadow: var(--shadow);
      font-size: 13px;
      font-weight: 700;
      min-width: 220px;
    }

    .footer-note {
      margin-top: 24px;
      color: var(--text-soft);
      font-size: 12px;
      text-align: center;
    }

    @media (max-width: 900px) {
      .shell { padding: 12px 10px 56px; }
      .topbar { top: 6px; padding: 10px; border-radius: 16px; }
      .page { padding: 12px 2px 28px; }
      .cover { min-height: 150px; border-radius: 22px; }
      #page-icon { width: 62px; height: 62px; font-size: 30px; }
      #file-name-input { font-size: 34px; }
      .editor { min-height: 500px; font-size: 16px; }
      .image-width-range { width: 160px; }
      .data-table { min-width: 640px; }
      #floating-toolbar { max-width: 96vw; }
    }
  </style>
</head>
<body>
  <div id="floating-toolbar" class="editable-only">
    <select class="toolbar-select" onchange="applyBlock(this.value); this.value=''">
      <option value="">블록</option>
      <option value="P">본문</option>
      <option value="H1">제목 1</option>
      <option value="H2">제목 2</option>
      <option value="H3">제목 3</option>
      <option value="BLOCKQUOTE">인용</option>
    </select>
    <select id="floating-font-size" class="toolbar-select" onchange="applyFontSize(this.value)">
      <option value="">글자 크기</option>
      <option value="14px">14px</option>
      <option value="16px">16px</option>
      <option value="18px">18px</option>
      <option value="22px">22px</option>
      <option value="28px">28px</option>
      <option value="36px">36px</option>
    </select>
    <button class="btn-ui" onclick="execCmd('bold')"><b>B</b></button>
    <button class="btn-ui" onclick="execCmd('italic')"><i>I</i></button>
    <button class="btn-ui" onclick="execCmd('underline')"><u>U</u></button>
    <button class="btn-ui" onclick="toggleInlineCode()">&lt;/&gt;</button>
    <button class="btn-ui" onclick="execCmd('insertUnorderedList')">• 목록</button>
    <button class="btn-ui" onclick="execCmd('insertOrderedList')">1. 목록</button>
    <label class="btn-ui" style="display:flex;align-items:center;gap:8px;">
      글자
      <input class="toolbar-color" type="color" oninput="applyColor('foreColor', this.value)" />
    </label>
    <label class="btn-ui" style="display:flex;align-items:center;gap:8px;">
      배경
      <input class="toolbar-color" type="color" oninput="applyHighlight(this.value)" />
    </label>
    <button class="btn-ui" onclick="openLinkDialogForSelection()">🔗 링크</button>
    <button class="btn-ui" onclick="toggleEmojiPicker()">😊 이모지</button>
    <button class="btn-ui" onclick="clearFormat()">초기화</button>
  </div>

  <div id="emoji-picker" class="editable-only">
    <div class="menu-title">이모지 선택</div>
    <div id="emoji-grid" style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px;"></div>
  </div>

  <div id="slash-menu" class="editable-only">
    <div class="menu-title">삽입</div>
    <button class="menu-btn" onclick="insertHeading(1)"># 제목 1 <small>큰 제목 블록</small></button>
    <button class="menu-btn" onclick="insertHeading(2)">## 제목 2 <small>중간 제목 블록</small></button>
    <button class="menu-btn" onclick="insertHeading(3)">### 제목 3 <small>작은 제목 블록</small></button>
    <button class="menu-btn" onclick="insertToggle()">▶ 토글 <small>&gt; + 스페이스도 지원</small></button>
    <button class="menu-btn" onclick="insertTodo()">☑ 체크박스 <small>[] + 스페이스도 지원</small></button>
    <button class="menu-btn" onclick="insertQuote()">❝ 인용구 <small>강조 문장</small></button>
    <button class="menu-btn" onclick="insertCallout()">💡 콜아웃 <small>이모지 메모 박스</small></button>
    <button class="menu-btn" onclick="insertDivider()">— 구분선 <small>섹션 구분</small></button>
    <button class="menu-btn" onclick="insertTable()">📊 표 / 데이터베이스 <small>필터·정렬·행열 확장</small></button>
    <button class="menu-btn" onclick="openImagePicker()">🖼 사진 <small>삽입 후 슬라이더로 크기 조절</small></button>
    <button class="menu-btn" onclick="openLinkCardDialog()">🔗 링크 카드 <small>다운로드 가능한 링크 파일 생성도 지원</small></button>
    <button class="menu-btn" onclick="openFilePicker()">📎 파일 <small>다운로드 가능한 첨부파일 카드</small></button>
    <button class="menu-btn" onclick="insertCodeBlock()">⌘ 코드 블록 <small>고정폭 코드 영역</small></button>
  </div>

  <div id="table-menu" class="editable-only">
    <div class="menu-title">표 기능</div>
    <button class="menu-btn" onclick="sortCurrentCol(true)">🔼 오름차순 <small>현재 열 기준 정렬</small></button>
    <button class="menu-btn" onclick="sortCurrentCol(false)">🔽 내림차순 <small>현재 열 기준 정렬</small></button>
    <button class="menu-btn" onclick="promptRenameColumn()">✏️ 열 이름 변경 <small>헤더 텍스트 수정</small></button>
    <button class="menu-btn" onclick="addColumnToActive()">➕ 열 추가 <small>현재 표에 열 추가</small></button>
    <button class="menu-btn" onclick="moveCurrentColPrompt(-1)">⬅️ 열 왼쪽 이동 <small>현재 열 순서 변경</small></button>
    <button class="menu-btn" onclick="moveCurrentColPrompt(1)">➡️ 열 오른쪽 이동 <small>현재 열 순서 변경</small></button>
    <button class="menu-btn" onclick="addRowToActive()">➕ 행 추가 <small>현재 표에 행 추가</small></button>
    <button class="menu-btn" onclick="toggleFiltersOfActive()">🧪 필터 표시/숨김 <small>모든 열에 동일 방식 적용</small></button>
    <button class="menu-btn" onclick="deleteCurrentTable()">🗑️ 표 삭제 <small>현재 표 제거</small></button>
  </div>

  <div id="link-dialog" class="editable-only">
    <div class="menu-title">링크 삽입</div>
    <div class="dialog-grid">
      <label>주소
        <input id="link-url" class="toolbar-input" type="text" placeholder="https://example.com" />
      </label>
      <label>표시 제목
        <input id="link-title" class="toolbar-input" type="text" placeholder="표시할 제목" />
      </label>
      <label>설명
        <input id="link-desc" class="toolbar-input" type="text" placeholder="간단한 설명" />
      </label>
    </div>
    <div class="dialog-actions">
      <button class="btn-ui" onclick="closeLinkDialog()">취소</button>
      <button class="btn-ui primary" onclick="confirmLinkDialog()">삽입</button>
    </div>
  </div>

  <div class="shell">
    <div class="container">
      <div class="topbar editable-only">
        <div class="toolbar-group">
          <button class="btn-ui" onclick="toggleDarkMode()">🌓 테마</button>
          <button class="btn-ui" onclick="changePageIcon()">😀 아이콘</button>
          <button class="btn-ui" onclick="changeCoverColor()">🎨 커버</button>
          <select class="toolbar-select" onchange="setEditorFontSize(this.value)">
            <option value="17px">본문 크기</option>
            <option value="15px">15px</option>
            <option value="16px">16px</option>
            <option value="17px" selected>17px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
          </select>
          <select class="toolbar-select" onchange="setLineHeight(this.value)">
            <option value="1.8">줄간격</option>
            <option value="1.5">좁게</option>
            <option value="1.8" selected>기본</option>
            <option value="2.1">넓게</option>
          </select>
          <span class="toolbar-note">/ : 블록 메뉴 · &gt; : 토글 · [] : 체크박스</span>
        </div>
        <div class="toolbar-group page-actions">
          <button class="btn-ui soft" onclick="openImagePicker()">사진</button>
          <button class="btn-ui soft" onclick="openFilePicker()">파일</button>
          <button class="btn-ui soft" onclick="openLinkCardDialog()">링크 카드</button>
          <button class="btn-ui" onclick="saveWorkspace()">💾 저장</button>
          <button class="btn-ui" onclick="downloadEditableHtml()">📄 원본 저장</button>
          <button class="btn-ui primary" onclick="downloadReadOnlyHtml()">🔒 복사본 저장</button>
        </div>
      </div>

      <div class="page">
        <div id="cover" class="cover">
          <div class="cover-controls editable-only">
            <button class="btn-ui" onclick="changeCoverColor()">배경 변경</button>
          </div>
        </div>

        <div class="header-block">
          <div id="page-icon" contenteditable="true" spellcheck="false">📝</div>
          <input id="file-name-input" type="text" placeholder="제목을 입력하세요" />
          <div class="page-meta">
            <div class="meta-chip">/ 입력으로 블록 메뉴</div>
            <div class="meta-chip">&gt; + 스페이스 = 토글</div>
            <div class="meta-chip">[] + 스페이스 = 체크박스</div>
            <div class="meta-chip">- + 스페이스 = 글머리표</div>
            <div class="meta-chip">사진은 슬라이더로 크기 조절</div>
            <div class="meta-chip">표는 열 추가 후에도 필터/정렬 유지</div>
          </div>
        </div>

        <div id="editor" class="editor" contenteditable="true" spellcheck="false">
          <h1>시작 페이지</h1>
          <p>노션처럼 문서를 작성해보세요. <span class="inline-code">/</span> 를 입력하면 블록 메뉴가 열리고, <span class="inline-code">&gt;</span> 뒤에 스페이스를 누르면 토글 블록으로 바뀝니다.</p>
          <div class="callout"><div class="emoji">✨</div><div contenteditable="true">파일 삽입, 링크 카드, 사진 크기 조절, 표 필터/정렬, 체크박스, 토글, 저장/복사본 저장 기능을 사용할 수 있습니다.</div></div>
          <p>[] 입력 후 스페이스를 눌러 체크박스를 만들 수 있어요.</p>
          <p><br></p>
        </div>

        <div class="footer-note">브라우저 저장은 localStorage를 사용합니다. 원본 저장은 수정 가능한 HTML, 복사본 저장은 읽기 전용 HTML을 다운로드합니다.</div>
      </div>
    </div>
  </div>

  <div class="file-inputs editable-only" style="display:none;">
    <input id="image-input" type="file" accept="image/*" multiple />
    <input id="file-input" type="file" multiple />
  </div>

  <div id="toast-area"></div>

  <script>
    const editor = document.getElementById('editor');
    const floatingToolbar = document.getElementById('floating-toolbar');
    const slashMenu = document.getElementById('slash-menu');
    const tableMenu = document.getElementById('table-menu');
    const emojiPicker = document.getElementById('emoji-picker');
    const emojiGrid = document.getElementById('emoji-grid');
    const linkDialog = document.getElementById('link-dialog');
    const linkUrlInput = document.getElementById('link-url');
    const linkTitleInput = document.getElementById('link-title');
    const linkDescInput = document.getElementById('link-desc');
    const titleInput = document.getElementById('file-name-input');
    const pageIcon = document.getElementById('page-icon');
    const cover = document.getElementById('cover');
    const imageInput = document.getElementById('image-input');
    const fileInput = document.getElementById('file-input');
    const toastArea = document.getElementById('toast-area');

    let savedRange = null;
    let lastRange = null;
    let activeTh = null;
    let hideToolbarTimer = null;
    let suppressSelectionHide = false;
    let currentCoverIndex = 0;
    let linkDialogMode = 'card';

    const emojiList = ['😀','😄','😂','😊','😍','😘','🤔','😎','🥹','😭','🙌','👏','🔥','✨','⭐','🎉','📌','📎','✅','💡'];
    const coverGradients = [
      'linear-gradient(135deg, rgba(37,99,235,.13), rgba(168,85,247,.12), rgba(251,191,36,.12))',
      'linear-gradient(135deg, rgba(16,185,129,.15), rgba(59,130,246,.12), rgba(255,255,255,.08))',
      'linear-gradient(135deg, rgba(251,146,60,.14), rgba(244,114,182,.12), rgba(255,255,255,.08))',
      'linear-gradient(135deg, rgba(168,85,247,.16), rgba(59,130,246,.12), rgba(34,197,94,.10))',
      'linear-gradient(135deg, rgba(120,119,198,.18), rgba(255,255,255,.06), rgba(56,189,248,.12))'
    ];

    function showToast(message) {
      const el = document.createElement('div');
      el.className = 'toast';
      el.textContent = message;
      toastArea.appendChild(el);
      setTimeout(() => el.remove(), 2400);
    }

    function initEmojiPicker() {
      emojiGrid.innerHTML = '';
      emojiList.forEach(emoji => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'btn-ui';
        btn.style.height = '40px';
        btn.style.fontSize = '22px';
        btn.style.padding = '0';
        btn.textContent = emoji;
        btn.onclick = () => insertEmoji(emoji);
        emojiGrid.appendChild(btn);
      });
    }

    document.addEventListener('selectionchange', () => {
      const sel = window.getSelection();
      if (!sel.rangeCount) return;
      const range = sel.getRangeAt(0).cloneRange();
      if (editor.contains(sel.anchorNode)) {
        savedRange = range;
        lastRange = range.cloneRange();
      }
      if (!editor.contains(sel.anchorNode)) {
        scheduleHideToolbar();
        return;
      }
      if (sel.isCollapsed) return;
      showFloatingToolbar(range);
    });

    editor.addEventListener('keydown', handleEditorKeys);
    editor.addEventListener('mouseup', rememberCurrentSelection);
    editor.addEventListener('keyup', rememberCurrentSelection);
    editor.addEventListener('input', handleEditorInput);

    editor.addEventListener('click', (e) => {
      const clickedDownloadBtn = e.target.closest('[data-action="download-link"]');
      if (clickedDownloadBtn) {
        e.preventDefault();
        e.stopPropagation();
        downloadUrlShortcut(clickedDownloadBtn.dataset.href, clickedDownloadBtn.dataset.title || 'link');
        return;
      }

      const clickedAttachmentDownload = e.target.closest('.attachment-actions a[download]');
      if (clickedAttachmentDownload) {
        e.preventDefault();
        e.stopPropagation();
        triggerAnchorDownload(clickedAttachmentDownload);
        return;
      }

      const clickedAnchor = e.target.closest('a[href]');
      if (clickedAnchor) {
        e.preventDefault();
        e.stopPropagation();
        const href = clickedAnchor.getAttribute('href');
        const downloadName = clickedAnchor.getAttribute('download');
        if (downloadName) {
          triggerAnchorDownload(clickedAnchor);
        } else if (href) {
          window.open(href, '_blank', 'noopener,noreferrer');
        }
        return;
      }

      hideMenusExceptToolbar();

      const th = e.target.closest('th');
      if (th) {
        activeTh = th;
        openTableMenuAt(th);
        return;
      }

      const deleteBtn = e.target.closest('[data-action="delete-block"]');
      if (deleteBtn) {
        e.preventDefault();
        const target = deleteBtn.closest('[data-block-root="true"]');
        deleteBlock(target);
        return;
      }

      rememberCurrentSelection();
    });

    editor.addEventListener('input', (e) => {
      if (e.target.closest('.table-filter-row')) return;
      document.querySelectorAll('.db-wrapper').forEach(el => buildFilterInputs(el.id));
      persistWorkspace();
    });

    floatingToolbar.addEventListener('mouseenter', () => {
      suppressSelectionHide = true;
      clearTimeout(hideToolbarTimer);
    });
    floatingToolbar.addEventListener('mouseleave', () => {
      suppressSelectionHide = false;
      scheduleHideToolbar();
    });
    emojiPicker.addEventListener('mouseenter', () => {
      suppressSelectionHide = true;
      clearTimeout(hideToolbarTimer);
    });
    emojiPicker.addEventListener('mouseleave', () => {
      suppressSelectionHide = false;
      scheduleHideToolbar();
    });

    document.addEventListener('mousedown', (e) => {
      const keep = floatingToolbar.contains(e.target)
        || emojiPicker.contains(e.target)
        || slashMenu.contains(e.target)
        || tableMenu.contains(e.target)
        || linkDialog.contains(e.target)
        || e.target.closest('th');
      if (!keep) hideMenus();
    });

    floatingToolbar.addEventListener('mousedown', (e) => {
      const interactive = e.target.closest('select, option, input, button, label');
      if (!interactive) e.preventDefault();
    });

    imageInput.addEventListener('change', handleImageFiles);
    fileInput.addEventListener('change', handleAttachmentFiles);
    titleInput.addEventListener('input', () => {
      document.title = titleInput.value.trim() || 'Notion Style Workspace';
      persistWorkspace();
    });
    pageIcon.addEventListener('input', persistWorkspace);

    function handleEditorInput(e) {
      normalizeListClasses();
      persistWorkspace();
    }

    function handleEditorKeys(e) {
      if (e.key === 'Escape') {
        hideMenus();
        return;
      }

      if (e.key === '/') {
        setTimeout(showSlashMenuNearCaret, 0);
      }

      if (e.key !== ' ') return;
      const sel = window.getSelection();
      if (!sel.rangeCount) return;
      const range = sel.getRangeAt(0);
      const block = getCurrentBlock(range.startContainer);
      if (!block) return;

      const rawText = (block.textContent || '').replace(/ /g, ' ');
      const text = rawText.trim();

      if (text === '>') {
        e.preventDefault();
        block.innerHTML = '';
        placeCaretAtEnd(block);
        insertToggleAtSelection();
        return;
      }

      if (text === '[]') {
        e.preventDefault();
        block.innerHTML = '';
        placeCaretAtEnd(block);
        insertTodo();
        return;
      }

      if (/^\-$/.test(text)) {
        e.preventDefault();
        convertDashBlockToBullet(block);
        return;
      }

      if (text === '#') {
        e.preventDefault();
        block.textContent = '';
        document.execCommand('formatBlock', false, 'h1');
        return;
      }
      if (text === '##') {
        e.preventDefault();
        block.textContent = '';
        document.execCommand('formatBlock', false, 'h2');
        return;
      }
      if (text === '###') {
        e.preventDefault();
        block.textContent = '';
        document.execCommand('formatBlock', false, 'h3');
      }
    }

    function convertDashBlockToBullet(block) {
      if (!block) return;
      const li = document.createElement('li');
      li.innerHTML = '<br>';
      const ul = document.createElement('ul');
      ul.className = 'bullet-list';
      ul.appendChild(li);
      block.replaceWith(ul);
      placeCaretAtEnd(li);
      persistWorkspace();
    }

    function getCurrentBlock(node) {
      let current = node;
      while (current && current !== editor) {
        if (current.parentNode === editor) return current;
        current = current.parentNode;
      }
      return null;
    }

    function showFloatingToolbar(range) {
      clearTimeout(hideToolbarTimer);
      const rects = range.getClientRects();
      const rect = rects.length ? rects[0] : range.getBoundingClientRect();
      floatingToolbar.style.display = 'flex';

      const toolbarHeight = floatingToolbar.offsetHeight || 52;
      const toolbarWidth = floatingToolbar.offsetWidth || 650;
      const desiredTop = window.scrollY + rect.top - toolbarHeight - 22;
      const fallbackTop = window.scrollY + rect.bottom + 14;
      const top = desiredTop > window.scrollY + 8 ? desiredTop : fallbackTop;
      const left = window.scrollX + rect.left + rect.width / 2 - toolbarWidth / 2;

      floatingToolbar.style.top = `${top}px`;
      floatingToolbar.style.left = `${Math.max(12, Math.min(left, window.scrollX + window.innerWidth - toolbarWidth - 12))}px`;
    }

    function scheduleHideToolbar() {
      if (suppressSelectionHide) return;
      clearTimeout(hideToolbarTimer);
      hideToolbarTimer = setTimeout(() => {
        const sel = window.getSelection();
        if (!sel.rangeCount || sel.isCollapsed) hideFloatingToolbar();
      }, 180);
    }

    function hideFloatingToolbar() {
      floatingToolbar.style.display = 'none';
      emojiPicker.style.display = 'none';
    }

    function showSlashMenuNearCaret() {
      const sel = window.getSelection();
      if (!sel.rangeCount) return;
      const range = sel.getRangeAt(0).cloneRange();
      const rect = range.getBoundingClientRect();
      slashMenu.style.display = 'flex';
      slashMenu.style.top = `${window.scrollY + rect.bottom + 8}px`;
      slashMenu.style.left = `${window.scrollX + rect.left}px`;
    }

    function openTableMenuAt(th) {
      const rect = th.getBoundingClientRect();
      tableMenu.style.display = 'flex';
      tableMenu.style.top = `${window.scrollY + rect.bottom + 8}px`;
      tableMenu.style.left = `${window.scrollX + rect.left}px`;
    }

    function hideMenusExceptToolbar() {
      slashMenu.style.display = 'none';
      tableMenu.style.display = 'none';
      linkDialog.style.display = 'none';
    }

    function hideMenus() {
      hideFloatingToolbar();
      slashMenu.style.display = 'none';
      tableMenu.style.display = 'none';
      emojiPicker.style.display = 'none';
      linkDialog.style.display = 'none';
    }

    function rememberCurrentSelection() {
      const sel = window.getSelection();
      if (!sel.rangeCount) return;
      const range = sel.getRangeAt(0).cloneRange();
      if (editor.contains(range.startContainer)) {
        savedRange = range;
        lastRange = range.cloneRange();
      }
    }

    function restoreSelection() {
      const rangeToUse = savedRange || lastRange;
      if (!rangeToUse) return false;
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(rangeToUse);
      return true;
    }

    function execCmd(command, value = null) {
      restoreSelection();
      editor.focus();
      document.execCommand(command, false, value);
      normalizeListClasses();
      persistWorkspace();
    }

    function applyBlock(tag) {
      restoreSelection();
      editor.focus();
      document.execCommand('formatBlock', false, tag);
      persistWorkspace();
    }

    function applyFontSize(size) {
      if (!size) return;
      restoreSelection();
      editor.focus();
      document.execCommand('styleWithCSS', false, true);
      document.execCommand('fontSize', false, '7');
      [...editor.querySelectorAll('font[size="7"]')].forEach(font => {
        font.removeAttribute('size');
        font.style.fontSize = size;
      });
      persistWorkspace();
      const select = document.getElementById('floating-font-size');
      if (select) {
        requestAnimationFrame(() => {
          select.blur();
          select.value = '';
        });
      }
    }

    function applyColor(command, value) {
      restoreSelection();
      document.execCommand(command, false, value);
      persistWorkspace();
    }

    function applyHighlight(color) {
      restoreSelection();
      document.execCommand('hiliteColor', false, color);
      persistWorkspace();
    }

    function clearFormat() {
      execCmd('removeFormat');
    }

    function normalizeListClasses() {
      editor.querySelectorAll('ul').forEach(el => el.classList.add('bullet-list'));
      editor.querySelectorAll('ol').forEach(el => el.classList.add('number-list'));
    }

    function toggleInlineCode() {
      restoreSelection();
      const sel = window.getSelection();
      if (!sel.rangeCount || sel.isCollapsed) return;
      const range = sel.getRangeAt(0);
      const text = range.toString();
      document.execCommand('insertHTML', false, `<span class="inline-code">${escapeHtml(text)}</span>`);
      persistWorkspace();
    }

    function openLinkDialogForSelection() {
      linkDialogMode = 'inline';
      const rect = floatingToolbar.getBoundingClientRect();
      linkDialog.style.display = 'flex';
      linkDialog.style.top = `${window.scrollY + rect.bottom + 8}px`;
      linkDialog.style.left = `${window.scrollX + rect.left}px`;
      const selectedText = (window.getSelection() && !window.getSelection().isCollapsed) ? window.getSelection().toString() : '';
      linkUrlInput.value = '';
      linkTitleInput.value = selectedText;
      linkDescInput.value = '';
      setTimeout(() => linkUrlInput.focus(), 0);
    }

    function openLinkCardDialog() {
      linkDialogMode = 'card';
      const sel = window.getSelection();
      let rect;
      if (sel && sel.rangeCount) rect = sel.getRangeAt(0).getBoundingClientRect();
      linkDialog.style.display = 'flex';
      linkDialog.style.top = `${window.scrollY + ((rect && rect.bottom) || 160)}px`;
      linkDialog.style.left = `${window.scrollX + ((rect && rect.left) || 40)}px`;
      linkUrlInput.value = '';
      linkTitleInput.value = '';
      linkDescInput.value = '링크 열기';
      setTimeout(() => linkUrlInput.focus(), 0);
    }

    function closeLinkDialog() {
      linkDialog.style.display = 'none';
    }

    function confirmLinkDialog() {
      const rawUrl = linkUrlInput.value.trim();
      if (!rawUrl) {
        showToast('링크 주소를 입력하세요.');
        return;
      }
      const url = normalizeUrl(rawUrl);
      const title = linkTitleInput.value.trim() || url;
      const desc = linkDescInput.value.trim() || '링크 열기';
      restoreSelection();
      if (linkDialogMode === 'inline') {
        const text = title || url;
        document.execCommand('insertHTML', false, `<a href="${escapeAttr(url)}" target="_blank" rel="noopener noreferrer" class="inline-user-link">${escapeHtml(text)}</a>`);
      } else {
        insertLinkCard(url, title, desc);
      }
      closeLinkDialog();
      persistWorkspace();
    }

    function toggleEmojiPicker() {
      if (emojiPicker.style.display === 'block') {
        emojiPicker.style.display = 'none';
        return;
      }
      const rect = floatingToolbar.getBoundingClientRect();
      emojiPicker.style.display = 'block';
      emojiPicker.style.top = `${window.scrollY + rect.bottom + 8}px`;
      emojiPicker.style.left = `${window.scrollX + rect.left}px`;
    }

    function insertEmoji(emoji) {
      const activeIsPageIcon = document.activeElement === pageIcon;
      if (activeIsPageIcon) {
        pageIcon.textContent = emoji;
      } else {
        restoreSelection();
        document.execCommand('insertText', false, emoji);
      }
      emojiPicker.style.display = 'none';
      persistWorkspace();
    }

    function changePageIcon() {
      pageIcon.focus();
      toggleEmojiPicker();
    }

    function changeCoverColor() {
      currentCoverIndex = (currentCoverIndex + 1) % coverGradients.length;
      cover.style.background = coverGradients[currentCoverIndex];
      persistWorkspace();
    }

    function toggleDarkMode() {
      document.body.classList.toggle('dark-mode');
      persistWorkspace();
    }

    function setEditorFontSize(value) {
      document.documentElement.style.setProperty('--font-size', value);
      persistWorkspace();
    }

    function setLineHeight(value) {
      document.documentElement.style.setProperty('--line-height', value);
      persistWorkspace();
    }

    function insertHeading(level) {
      cleanSlashTrigger();
      document.execCommand('insertHTML', false, `<h${level}>제목 ${level}</h${level}><p><br></p>`);
      hideMenus();
      persistWorkspace();
    }

    function insertQuote() {
      cleanSlashTrigger();
      document.execCommand('insertHTML', false, `<blockquote>인용구를 입력하세요.</blockquote><p><br></p>`);
      hideMenus();
      persistWorkspace();
    }

    function insertCallout() {
      cleanSlashTrigger();
      document.execCommand('insertHTML', false, `<div class="callout"><div class="emoji">💡</div><div contenteditable="true">메모를 입력하세요.</div></div><p><br></p>`);
      hideMenus();
      persistWorkspace();
    }

    function insertDivider() {
      cleanSlashTrigger();
      document.execCommand('insertHTML', false, `<hr class="divider"><p><br></p>`);
      hideMenus();
      persistWorkspace();
    }

    function insertCodeBlock() {
      cleanSlashTrigger();
      document.execCommand('insertHTML', false, `<pre class="code-block" contenteditable="true">// 코드를 입력하세요</pre><p><br></p>`);
      hideMenus();
      persistWorkspace();
    }

    function insertToggle() {
      cleanSlashTrigger();
      insertToggleAtSelection();
      hideMenus();
    }

    function insertToggleAtSelection() {
      const html = `
        <div class="block-wrap" data-block-root="true">
          <div class="block-hover-tools editable-only">
            <button type="button" class="icon-btn" data-action="delete-block" title="삭제">✕</button>
          </div>
          <details class="toggle-block" open>
            <summary><span class="toggle-summary-text" contenteditable="true">토글 제목</span></summary>
            <div class="toggle-content" contenteditable="true"><p>토글 내용...</p></div>
          </details>
        </div>
        <p><br></p>`;
      insertHtmlAtSavedRange(html, true);
      persistWorkspace();
    }

    function insertTodo() {
      cleanSlashTrigger();
      const html = `
        <div class="block-wrap" data-block-root="true">
          <div class="block-hover-tools editable-only">
            <button type="button" class="icon-btn" data-action="delete-block" title="삭제">✕</button>
          </div>
          <label class="todo-item">
            <input type="checkbox">
            <div class="todo-text" contenteditable="true">할 일을 입력하세요</div>
          </label>
        </div>
        <p><br></p>`;
      document.execCommand('insertHTML', false, html);
      hideMenus();
      persistWorkspace();
    }

    function insertLinkCard(url, title, desc) {
      const safeUrl = normalizeUrl(url);
      const fileName = getSafeFileName((title || 'link')) + '.url';
      const html = `
        <div class="link-card-wrap" data-block-root="true">
          <div class="block-hover-tools editable-only">
            <button type="button" class="icon-btn" data-action="delete-block" title="삭제">✕</button>
          </div>
          <a class="link-card" href="${escapeAttr(safeUrl)}" target="_blank" rel="noopener noreferrer">
            <div>
              <strong>${escapeHtml(title)}</strong>
              <small>${escapeHtml(desc)}</small>
            </div>
            <div class="link-actions">
              <button type="button" class="btn-ui editable-only" data-action="download-link" data-href="${escapeAttr(safeUrl)}" data-title="${escapeAttr(title)}">URL 다운로드</button>
              <span>↗</span>
            </div>
          </a>
        </div>
        <p><br></p>`;
      document.execCommand('insertHTML', false, html);
      persistWorkspace();
    }

    function openImagePicker() {
      imageInput.click();
    }

    function openFilePicker() {
      fileInput.click();
    }

    function handleImageFiles(e) {
      const files = [...e.target.files];
      if (!files.length) return;
      restoreSelection();
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = ev => {
          const blockId = `img-${Date.now()}-${Math.random().toString(36).slice(2,7)}`;
          const html = `
            <div class="img-block" data-block-root="true" id="${blockId}">
              <div class="block-hover-tools editable-only">
                <button type="button" class="icon-btn" data-action="delete-block" title="삭제">✕</button>
              </div>
              <div class="img-frame" style="--img-width:100%;">
                <img src="${ev.target.result}" alt="${escapeAttr(file.name)}">
              </div>
              <div class="image-controls editable-only">
                <span>크기</span>
                <input class="image-width-range" type="range" min="20" max="100" value="100" oninput="updateImageWidth('${blockId}', this.value)">
                <span class="image-width-label">100%</span>
              </div>
              <div class="image-caption" contenteditable="true">이미지 설명을 입력하세요.</div>
            </div>
            <p><br></p>`;
          insertHtmlAtSavedRange(html, true);
          persistWorkspace();
        };
        reader.readAsDataURL(file);
      });
      e.target.value = '';
      hideMenus();
    }

    function updateImageWidth(blockId, value) {
      const block = document.getElementById(blockId);
      if (!block) return;
      block.querySelector('.img-frame').style.setProperty('--img-width', `${value}%`);
      const label = block.querySelector('.image-width-label');
      if (label) label.textContent = `${value}%`;
      persistWorkspace();
    }

    function handleAttachmentFiles(e) {
      const files = [...e.target.files];
      if (!files.length) return;
      restoreSelection();
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = ev => {
          const url = ev.target.result;
          const ext = file.name.split('.').pop()?.toUpperCase() || 'FILE';
          const size = formatBytes(file.size);
          const html = `
            <div class="attachment-card" data-block-root="true">
              <div class="block-hover-tools editable-only">
                <button type="button" class="icon-btn" data-action="delete-block" title="삭제">✕</button>
              </div>
              <div class="attachment-meta">
                <div class="attachment-icon">📎</div>
                <div>
                  <div class="attachment-name">${escapeHtml(file.name)}</div>
                  <div class="attachment-size">${escapeHtml(ext)} · ${escapeHtml(size)}</div>
                </div>
              </div>
              <div class="attachment-actions">
                <a class="btn-ui file-download-link" href="${url}" download="${escapeAttr(file.name)}">다운로드</a>
              </div>
            </div>
            <p><br></p>`;
          insertHtmlAtSavedRange(html, true);
          persistWorkspace();
        };
        reader.readAsDataURL(file);
      });
      e.target.value = '';
      hideMenus();
    }

    function insertTable() {
      cleanSlashTrigger();
      const id = `db-${Date.now()}`;
      const html = `
        <div class="db-wrapper" id="${id}" data-block-root="true" contenteditable="false">
          <div class="block-hover-tools editable-only">
            <button type="button" class="icon-btn" data-action="delete-block" title="삭제">✕</button>
          </div>
          <div class="db-head">
            <div class="db-head-main">
              <div class="db-title" contenteditable="true">새 표</div>
            </div>
            <div class="table-actions editable-only">
              <button class="btn-ui" onclick="addHeaderColumn('${id}')">헤더 추가</button>
              <button class="btn-ui" onclick="addRow('${id}')">행 추가</button>
              <button class="btn-ui" onclick="toggleFilters('${id}')">필터</button>
            </div>
          </div>
          <div class="table-filter-row editable-only"></div>
          <div class="table-shell">
            <table class="data-table">
              <thead>
                <tr>
                  <th contenteditable="true" data-sort=""><div class="th-label"><span>이름</span><span class="sort-indicator"></span></div></th>
                  <th contenteditable="true" data-sort=""><div class="th-label"><span>상태</span><span class="sort-indicator"></span></div></th>
                  <th contenteditable="true" data-sort=""><div class="th-label"><span>메모</span><span class="sort-indicator"></span></div></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td contenteditable="true">예시 1</td>
                  <td contenteditable="true">진행중</td>
                  <td contenteditable="true">내용 입력</td>
                </tr>
                <tr>
                  <td contenteditable="true">예시 2</td>
                  <td contenteditable="true">완료</td>
                  <td contenteditable="true">정렬·필터 가능</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="table-empty">필터 결과가 없습니다.</div>
          <div class="add-row-btn editable-only" onclick="addRow('${id}')">+ 새 행 추가</div>
        </div>
        <p><br></p>`;
      insertHtmlAtSavedRange(html, true);
      initializeTable(id);
      hideMenus();
      persistWorkspace();
    }

    function initializeTable(id) {
      buildFilterInputs(id);
      syncHeaderLabels(id);
      applyFilters(id);
    }

    function syncHeaderLabels(id) {
      const wrapper = document.getElementById(id);
      if (!wrapper) return;
      wrapper.querySelectorAll('thead th').forEach(th => {
        const text = th.innerText.replace(/[▲▼]/g, '').trim() || '열';
        const sort = th.dataset.sort || '';
        th.innerHTML = `<div class="th-label"><span>${escapeHtml(text)}</span><span class="sort-indicator">${sort === 'asc' ? '▲' : sort === 'desc' ? '▼' : ''}</span></div>`;
      });
    }

    function addHeaderColumn(id) {
      const wrapper = document.getElementById(id);
      if (!wrapper) return;
      const table = wrapper.querySelector('table');
      const headRow = table.querySelector('thead tr');
      const index = headRow.cells.length + 1;
      const th = document.createElement('th');
      th.contentEditable = 'true';
      th.dataset.sort = '';
      th.innerHTML = `<div class="th-label"><span>열 ${index}</span><span class="sort-indicator"></span></div>`;
      headRow.appendChild(th);
      table.querySelectorAll('tbody tr').forEach(row => {
        const td = document.createElement('td');
        td.contentEditable = 'true';
        row.appendChild(td);
      });
      buildFilterInputs(id);
      persistWorkspace();
    }

    function addRow(id) {
      const wrapper = document.getElementById(id);
      if (!wrapper) return;
      const table = wrapper.querySelector('table');
      const tbody = table.querySelector('tbody');
      const colCount = table.querySelectorAll('thead th').length;
      const tr = document.createElement('tr');
      for (let i = 0; i < colCount; i++) {
        const td = document.createElement('td');
        td.contentEditable = 'true';
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
      applyFilters(id);
      persistWorkspace();
    }

    function buildFilterInputs(id) {
      const wrapper = document.getElementById(id);
      if (!wrapper) return;
      const filterRow = wrapper.querySelector('.table-filter-row');
      const oldValues = [...filterRow.querySelectorAll('input')].map(i => i.value);
      const headers = [...wrapper.querySelectorAll('thead th')];
      filterRow.innerHTML = '';
      headers.forEach((th, idx) => {
        const input = document.createElement('input');
        input.placeholder = `${th.innerText.replace(/[▲▼]/g,'').trim() || `열 ${idx + 1}`} 필터`;
        input.dataset.col = idx;
        input.value = oldValues[idx] || '';
        input.oninput = () => applyFilters(id);
        filterRow.appendChild(input);
      });
    }

    function toggleFilters(id) {
      const wrapper = document.getElementById(id);
      if (!wrapper) return;
      const filterRow = wrapper.querySelector('.table-filter-row');
      filterRow.style.display = filterRow.style.display === 'grid' ? 'none' : 'grid';
      persistWorkspace();
    }

    function applyFilters(id) {
      const wrapper = document.getElementById(id);
      if (!wrapper) return;
      const inputs = [...wrapper.querySelectorAll('.table-filter-row input')];
      const rows = [...wrapper.querySelectorAll('tbody tr')];
      let visibleCount = 0;
      rows.forEach(row => {
        const visible = inputs.every(input => {
          const term = input.value.trim().toLowerCase();
          if (!term) return true;
          const idx = Number(input.dataset.col);
          const text = (row.cells[idx]?.innerText || '').toLowerCase();
          return text.includes(term);
        });
        row.style.display = visible ? '' : 'none';
        if (visible) visibleCount++;
      });
      wrapper.querySelector('.table-empty').style.display = visibleCount ? 'none' : 'block';
    }

    function sortCurrentCol(asc) {
      if (!activeTh) return;
      const wrapper = activeTh.closest('.db-wrapper');
      const table = wrapper.querySelector('table');
      const tbody = table.querySelector('tbody');
      const rows = [...tbody.rows];
      const idx = activeTh.cellIndex;
      rows.sort((a, b) => {
        const av = (a.cells[idx]?.innerText || '').trim();
        const bv = (b.cells[idx]?.innerText || '').trim();
        const an = parseFloat(av.replace(/,/g,''));
        const bn = parseFloat(bv.replace(/,/g,''));
        if (!isNaN(an) && !isNaN(bn)) return asc ? an - bn : bn - an;
        return asc ? av.localeCompare(bv, 'ko', { numeric: true }) : bv.localeCompare(av, 'ko', { numeric: true });
      });
      rows.forEach(row => tbody.appendChild(row));
      wrapper.querySelectorAll('thead th').forEach(th => th.dataset.sort = '');
      activeTh.dataset.sort = asc ? 'asc' : 'desc';
      syncHeaderLabels(wrapper.id);
      applyFilters(wrapper.id);
      hideMenus();
      persistWorkspace();
    }

    function promptRenameColumn() {
      if (!activeTh) return;
      const current = activeTh.innerText.replace(/[▲▼]/g, '').trim();
      const value = prompt('열 이름을 입력하세요', current);
      if (value == null) return;
      const wrapper = activeTh.closest('.db-wrapper');
      const sort = activeTh.dataset.sort || '';
      activeTh.innerHTML = `<div class="th-label"><span>${escapeHtml(value)}</span><span class="sort-indicator">${sort === 'asc' ? '▲' : sort === 'desc' ? '▼' : ''}</span></div>`;
      buildFilterInputs(wrapper.id);
      persistWorkspace();
      hideMenus();
    }

    function addColumnToActive() {
      if (!activeTh) return;
      addHeaderColumn(activeTh.closest('.db-wrapper').id);
      hideMenus();
    }

    function moveCurrentColPrompt(direction) {
      if (!activeTh) return;
      const wrapper = activeTh.closest('.db-wrapper');
      moveTableColumn(wrapper.id, activeTh.cellIndex, direction);
      hideMenus();
    }

    function moveTableColumn(id, fromIndex, direction) {
      const wrapper = document.getElementById(id);
      if (!wrapper) return;
      const table = wrapper.querySelector('table');
      const headers = table.querySelectorAll('thead th');
      const toIndex = fromIndex + direction;
      if (toIndex < 0 || toIndex >= headers.length) {
        showToast('더 이상 이동할 수 없습니다.');
        return;
      }

      table.querySelectorAll('tr').forEach(row => {
        const cells = row.children;
        const source = cells[fromIndex];
        const target = cells[toIndex];
        if (!source || !target) return;
        if (direction > 0) {
          target.insertAdjacentElement('afterend', source);
        } else {
          target.insertAdjacentElement('beforebegin', source);
        }
      });

      buildFilterInputs(id);
      applyFilters(id);
      activeTh = table.querySelectorAll('thead th')[toIndex] || null;
      persistWorkspace();
      showToast('열 위치를 변경했습니다.');
    }

    function addRowToActive() {
      if (!activeTh) return;
      addRow(activeTh.closest('.db-wrapper').id);
      hideMenus();
    }

    function toggleFiltersOfActive() {
      if (!activeTh) return;
      toggleFilters(activeTh.closest('.db-wrapper').id);
      hideMenus();
    }

    function deleteCurrentTable() {
      if (!activeTh) return;
      deleteBlock(activeTh.closest('.db-wrapper'));
      activeTh = null;
      hideMenus();
    }

    function deleteBlock(blockRoot) {
      if (!blockRoot) return;
      const next = blockRoot.nextElementSibling;
      blockRoot.remove();
      if (next && next.tagName === 'P') {
        placeCaretAtEnd(next);
      } else {
        const p = document.createElement('p');
        p.innerHTML = '<br>';
        editor.appendChild(p);
        placeCaretAtEnd(p);
      }
      persistWorkspace();
      showToast('블록이 삭제되었습니다.');
    }

    function downloadUrlShortcut(url, title) {
      const content = `[InternetShortcut]
URL=${url}
`;
      forceDownload(content, getSafeFileName(title || 'link') + '.url', 'application/internet-shortcut');
      showToast('링크 파일을 다운로드했습니다.');
    }

    function triggerAnchorDownload(anchor) {
      const href = anchor.getAttribute('href');
      if (!href) return;
      const fileName = anchor.getAttribute('download') || 'download';
      const temp = document.createElement('a');
      temp.href = href;
      temp.download = fileName;
      temp.rel = 'noopener';
      temp.style.display = 'none';
      document.body.appendChild(temp);
      temp.click();
      setTimeout(() => temp.remove(), 0);
      showToast('파일 다운로드를 시작했습니다.');
    }

    function saveWorkspace() {
      persistWorkspace();
      showToast('브라우저에 저장되었습니다.');
    }

    function persistWorkspace() {
      const data = {
        title: titleInput.value,
        icon: pageIcon.textContent,
        content: editor.innerHTML,
        darkMode: document.body.classList.contains('dark-mode'),
        coverStyle: cover.style.background,
        fontSize: getComputedStyle(document.documentElement).getPropertyValue('--font-size').trim(),
        lineHeight: getComputedStyle(document.documentElement).getPropertyValue('--line-height').trim(),
        pageTitle: document.title
      };
      localStorage.setItem('notion_workspace_v3', JSON.stringify(data));
    }

    function loadWorkspace() {
      const raw = localStorage.getItem('notion_workspace_v3');
      if (!raw) return;
      try {
        const data = JSON.parse(raw);
        if (data.title) titleInput.value = data.title;
        if (data.icon) pageIcon.textContent = data.icon;
        if (data.content) editor.innerHTML = data.content;
        if (data.darkMode) document.body.classList.add('dark-mode');
        if (data.coverStyle) cover.style.background = data.coverStyle;
        if (data.fontSize) document.documentElement.style.setProperty('--font-size', data.fontSize);
        if (data.lineHeight) document.documentElement.style.setProperty('--line-height', data.lineHeight);
        document.title = data.title || data.pageTitle || 'Notion Style Workspace';
        normalizeListClasses();
        document.querySelectorAll('.db-wrapper').forEach(el => initializeTable(el.id));
      } catch (e) {
        console.error(e);
      }
    }

    function buildExportHtml(readonly) {
      const clone = document.documentElement.cloneNode(true);
      const body = clone.querySelector('body');
      if (readonly) body.classList.add('readonly');
      clone.querySelectorAll('[contenteditable="true"]').forEach(el => {
        if (readonly) el.setAttribute('contenteditable', 'false');
      });
      clone.querySelectorAll('.image-width-range').forEach(range => {
        range.setAttribute('value', range.value || range.getAttribute('value') || '100');
      });
      return '<!DOCTYPE html>\n' + clone.outerHTML;
    }

    function downloadEditableHtml() {
      persistWorkspace();
      forceDownload(buildExportHtml(false), getSafeFileName(titleInput.value || 'workspace') + '.html', 'text/html;charset=utf-8');
      showToast('수정 가능한 원본 HTML을 저장했습니다.');
    }

    function downloadReadOnlyHtml() {
      persistWorkspace();
      forceDownload(buildExportHtml(true), getSafeFileName((titleInput.value || 'workspace') + '_readonly') + '.html', 'text/html;charset=utf-8');
      showToast('수정 불가 복사본 HTML을 저장했습니다.');
    }

    function forceDownload(content, fileName, mime = 'text/plain;charset=utf-8') {
      const blob = new Blob([content], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.rel = 'noopener';
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        URL.revokeObjectURL(url);
        a.remove();
      }, 1200);
    }

    function insertHtmlAtSavedRange(html, moveToTrailingParagraph = false) {
      restoreSelection();
      const sel = window.getSelection();
      if (!sel.rangeCount) {
        editor.insertAdjacentHTML('beforeend', html);
        ensureEditorTrailingParagraph();
        return;
      }
      const range = sel.getRangeAt(0);
      range.deleteContents();
      const temp = document.createElement('div');
      temp.innerHTML = html;
      const frag = document.createDocumentFragment();
      const insertedNodes = [];
      while (temp.firstChild) {
        const node = temp.firstChild;
        insertedNodes.push(node);
        frag.appendChild(node);
      }
      range.insertNode(frag);

      let target = insertedNodes[insertedNodes.length - 1] || null;
      if (moveToTrailingParagraph) {
        const p = [...insertedNodes].reverse().find(node => node.nodeType === 1 && node.matches && node.matches('p'));
        if (p) target = p;
      }
      if (target) {
        const newRange = document.createRange();
        if (target.nodeType === 1) {
          newRange.selectNodeContents(target);
          newRange.collapse(false);
        } else {
          newRange.setStartAfter(target);
          newRange.collapse(true);
        }
        sel.removeAllRanges();
        sel.addRange(newRange);
        savedRange = newRange.cloneRange();
        lastRange = newRange.cloneRange();
      }
      ensureEditorTrailingParagraph();
    }

    function ensureEditorTrailingParagraph() {
      const last = editor.lastElementChild;
      if (!last || last.tagName !== 'P') {
        const p = document.createElement('p');
        p.innerHTML = '<br>';
        editor.appendChild(p);
      }
    }

    function cleanSlashTrigger() {
      const sel = window.getSelection();
      if (!sel.rangeCount) return;
      const range = sel.getRangeAt(0);
      if (range.startContainer.nodeType === Node.TEXT_NODE) {
        const textNode = range.startContainer;
        const text = textNode.textContent || '';
        const pos = range.startOffset;
        if (text[pos - 1] === '/') {
          textNode.textContent = text.slice(0, pos - 1) + text.slice(pos);
          const newRange = document.createRange();
          newRange.setStart(textNode, Math.max(0, pos - 1));
          newRange.collapse(true);
          const sel2 = window.getSelection();
          sel2.removeAllRanges();
          sel2.addRange(newRange);
          savedRange = newRange.cloneRange();
          lastRange = newRange.cloneRange();
        }
      }
    }

    function placeCaretAtEnd(el) {
      el.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }

    function escapeHtml(str) {
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    function escapeAttr(str) {
      return escapeHtml(str).replace(/`/g, '&#096;');
    }

    function normalizeUrl(url) {
      return /^https?:\/\//i.test(url) ? url : 'https://' + url;
    }

    function formatBytes(bytes) {
      if (!bytes && bytes !== 0) return '';
      const units = ['B', 'KB', 'MB', 'GB'];
      let size = bytes;
      let idx = 0;
      while (size >= 1024 && idx < units.length - 1) {
        size /= 1024;
        idx++;
      }
      return `${size.toFixed(size >= 10 || idx === 0 ? 0 : 1)} ${units[idx]}`;
    }

    function getSafeFileName(name) {
      return String(name || 'workspace').replace(/[\\/:*?"<>|]/g, '_').trim() || 'workspace';
    }

    initEmojiPicker();
    loadWorkspace();
    ensureEditorTrailingParagraph();
    normalizeListClasses();
    if (!titleInput.value.trim()) document.title = 'Notion Style Workspace';
  </script>
</body>
</html>
