const title = document.getElementById('title');
const view = document.getElementById('view');
const sidebarToggle = document.getElementById('sidebar-toggle');

// ------------------------------------------------------------------------------------------
// [0]
// ------------------------------------------------------------------------------------------
// 내용: 사이드바 클릭을 감지하고 data-file에 적힌 JS 파일을 불러온다.
// ------------------------------------------------------------------------------------------

document.getElementById('sidebar').addEventListener('click', async (e) => {
  const filePath = e.target.dataset.file;
  if (!filePath) return;

  title.textContent = e.target.textContent;
  sidebarToggle.checked = false;

  try {
    // ------------------------------------------------------------------------------------------
    // [1]
    // ------------------------------------------------------------------------------------------
    // 내용: 선택한 JS 파일을 실제로 실행한다.
    // ------------------------------------------------------------------------------------------

    const module = await import(`./${filePath}?t=${Date.now()}`);
    module.render();


    // ------------------------------------------------------------------------------------------
    // [2]
    // ------------------------------------------------------------------------------------------
    // 내용: 같은 JS 파일의 원본 코드를 문자열로 읽는다.
    // ------------------------------------------------------------------------------------------

    const response = await fetch(`./${filePath}`);
    const source = await response.text();


    // ------------------------------------------------------------------------------------------
    // [3]
    // ------------------------------------------------------------------------------------------
    // 내용: 읽어온 코드를 <pre><code> 코드블록으로 출력한다.
    // ------------------------------------------------------------------------------------------

    view.innerHTML = '';

    const pre = document.createElement('pre');
    const code = document.createElement('code');

    pre.className = 'overflow-x-auto mb-0 rounded-box p-3 text-sm md:p-4 md:text-base';
    code.className = 'language-javascript';
    code.textContent = source;

    pre.appendChild(code);
    view.appendChild(pre);


    // ------------------------------------------------------------------------------------------
    // [4]
    // ------------------------------------------------------------------------------------------
    // 내용: highlight.js로 JavaScript 문법 색상을 적용한다.
    // ------------------------------------------------------------------------------------------

    hljs.highlightElement(code);

  } catch (err) {
    view.textContent = `에러: ${err.message}`;
    console.error(err);
  }
});
