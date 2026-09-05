export function render() {
  // ------------------------------------------------------------------------------------------
  // [meta]
  // ------------------------------------------------------------------------------------------
  // 내용: 브라우저 렌더링 파이프라인을 DOM 변경과 스타일 변경으로 확인한다.
  // 링크: https://zeno.it.kr/javascript/web_apis/03_rendering-pipeline
  // 배우고자 하는 것:
  // - 브라우저가 HTML, CSS, JavaScript 결과를 화면에 그리는 흐름을 이해한다.
  // - DOM 변경과 style 변경이 화면 렌더링에 영향을 준다는 점을 확인한다.
  // - Layout, Paint, Composite의 차이를 가볍게 구분한다.
  // - requestAnimationFrame()이 화면 갱신 타이밍에 맞춰 실행된다는 점을 확인한다.
  // ------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------
  // [용어정리]
  // - Rendering: 브라우저가 HTML/CSS/JS 결과를 화면에 그리는 과정
  // - DOM: HTML 문서를 JavaScript에서 다룰 수 있게 만든 객체 구조
  // - CSSOM: CSS 규칙을 브라우저가 이해할 수 있게 만든 객체 구조
  // - Layout: 요소의 크기와 위치를 계산하는 단계
  // - Paint: 글자, 색, 테두리, 그림자 같은 픽셀을 칠하는 단계
  // - Composite: 여러 레이어를 합쳐 최종 화면을 만드는 단계
  // - requestAnimationFrame(): 다음 화면 갱신 직전에 콜백을 실행하는 Web API
  // - getBoundingClientRect(): 요소의 현재 위치와 크기를 읽는 메서드
  // ------------------------------------------------------------------------------------------

  console.log("Rendering Pipeline");

  // ------------------------------------------------------------------------------------------
  // [1]
  // ------------------------------------------------------------------------------------------
  // 내용: 실습용 화면을 만든다.
  //
  // document.getElementById("view"):
  // index.html에 있는 코드 표시 영역을 가져온다.
  //
  // innerHTML:
  // 요소 안의 HTML 내용을 문자열로 넣는다.
  //
  // 여기서는 렌더링 변화를 눈으로 보기 위해 버튼과 박스를 만든다.
  // ------------------------------------------------------------------------------------------

  const view = document.getElementById("view");

  view.innerHTML = `
    <div class="card-body gap-4">
      <div class="flex flex-wrap gap-2">
        <button id="move-button" class="btn btn-primary">transform 이동</button>
        <button id="resize-button" class="btn btn-secondary">width 변경</button>
        <button id="paint-button" class="btn btn-accent">색 변경</button>
        <button id="reset-button" class="btn btn-ghost">초기화</button>
      </div>

      <div class="rounded-box border border-base-300 bg-base-200 p-4">
        <div
          id="render-box"
          class="flex h-24 w-24 items-center justify-center rounded-box bg-primary text-sm font-bold text-primary-content transition-all duration-500"
        >
          BOX
        </div>
      </div>

      <pre id="render-log" class="rounded-box bg-base-300 p-4 text-sm whitespace-pre-wrap"></pre>
    </div>
  `;

  const moveButton = document.getElementById("move-button");
  const resizeButton = document.getElementById("resize-button");
  const paintButton = document.getElementById("paint-button");
  const resetButton = document.getElementById("reset-button");
  const box = document.getElementById("render-box");
  const log = document.getElementById("render-log");

  function addLog(message) {
    console.log(message);
    log.textContent += `${message}\n`;
  }

  addLog("실습 화면 생성 완료");

  // ------------------------------------------------------------------------------------------
  // [2]
  // ------------------------------------------------------------------------------------------
  // 내용: 요소의 현재 크기와 위치를 읽는다.
  //
  // getBoundingClientRect():
  // 요소가 브라우저 화면에서 어디에 있고, 크기가 얼마인지 알려준다.
  //
  // 이 값은 Layout 단계에서 계산된 결과다.
  //
  // 결과:
  // box의 x, y, width, height 값이 출력된다.
  // ------------------------------------------------------------------------------------------

  const firstRect = box.getBoundingClientRect();

  addLog(`처음 위치 x: ${Math.round(firstRect.x)}, y: ${Math.round(firstRect.y)}`);
  addLog(`처음 크기 width: ${Math.round(firstRect.width)}, height: ${Math.round(firstRect.height)}`);

  // ------------------------------------------------------------------------------------------
  // [3]
  // ------------------------------------------------------------------------------------------
  // 내용: requestAnimationFrame()으로 다음 화면 갱신 직전에 transform을 변경한다.
  //
  // requestAnimationFrame(callback):
  // 브라우저가 다음 화면을 그리기 직전에 callback 함수를 실행한다.
  //
  // transform:
  // 요소의 실제 자리 계산을 크게 다시 하지 않고 이동, 회전, 확대 같은 변화를 줄 때 자주 쓴다.
  //
  // transform 변경은 보통 Layout보다 Composite 단계에서 처리하기 좋아서
  // 애니메이션에 자주 사용된다.
  // ------------------------------------------------------------------------------------------

  moveButton.addEventListener("click", () => {
    addLog("transform 이동 버튼 클릭");

    requestAnimationFrame(() => {
      box.style.transform = "translateX(160px)";
      addLog("다음 프레임에서 transform 변경");
    });
  });

  // ------------------------------------------------------------------------------------------
  // [4]
  // ------------------------------------------------------------------------------------------
  // 내용: width를 변경한다.
  //
  // width:
  // 요소의 실제 너비다.
  //
  // width가 바뀌면 주변 배치에 영향을 줄 수 있으므로
  // 브라우저가 Layout을 다시 계산해야 할 수 있다.
  //
  // 결과:
  // 박스가 넓어진다.
  // ------------------------------------------------------------------------------------------

  resizeButton.addEventListener("click", () => {
    box.style.width = "180px";
    addLog("width 변경: Layout 계산에 영향을 줄 수 있음");

    const rect = box.getBoundingClientRect();
    addLog(`변경 후 width: ${Math.round(rect.width)}`);
  });

  // ------------------------------------------------------------------------------------------
  // [5]
  // ------------------------------------------------------------------------------------------
  // 내용: backgroundColor를 변경한다.
  //
  // backgroundColor:
  // 요소의 배경색이다.
  //
  // 색만 바꾸는 작업은 보통 요소의 위치와 크기를 다시 계산하지 않는다.
  // 대신 Paint 단계에서 다시 칠해야 할 수 있다.
  //
  // 결과:
  // 박스 색이 바뀐다.
  // ------------------------------------------------------------------------------------------

  paintButton.addEventListener("click", () => {
    box.style.backgroundColor = "tomato";
    box.style.color = "white";
    addLog("색 변경: Paint 단계에 영향을 줄 수 있음");
  });

  // ------------------------------------------------------------------------------------------
  // [6]
  // ------------------------------------------------------------------------------------------
  // 내용: classList와 style을 이용해 상태를 초기화한다.
  //
  // style:
  // 요소의 인라인 스타일을 JavaScript로 바꾸는 속성이다.
  //
  // removeProperty("속성이름"):
  // JavaScript로 넣은 인라인 스타일을 제거한다.
  //
  // 결과:
  // 박스가 처음 상태로 돌아간다.
  // ------------------------------------------------------------------------------------------

  resetButton.addEventListener("click", () => {
    box.style.removeProperty("transform");
    box.style.removeProperty("width");
    box.style.removeProperty("background-color");
    box.style.removeProperty("color");
    log.textContent = "";
    addLog("초기화 완료");
  });
}

// ------------------------------------------------------------------------------------------
// [배운 것]
// - Rendering은 브라우저가 HTML/CSS/JS 결과를 화면에 그리는 과정이다.
// - DOM은 HTML 문서를 JavaScript에서 다룰 수 있게 만든 객체 구조다.
// - CSSOM은 CSS 규칙을 브라우저가 이해할 수 있게 만든 객체 구조다.
// - Layout은 요소의 크기와 위치를 계산하는 단계다.
// - Paint는 글자, 색, 테두리, 배경 같은 픽셀을 칠하는 단계다.
// - Composite는 여러 레이어를 합쳐 최종 화면을 만드는 단계다.
// - getBoundingClientRect()는 요소의 현재 위치와 크기를 읽는 메서드다.
// - requestAnimationFrame()은 다음 화면 갱신 직전에 코드를 실행한다.
// - width 변경은 요소 크기와 배치에 영향을 주므로 Layout을 다시 계산하게 만들 수 있다.
// - backgroundColor 변경은 위치와 크기보다 색칠에 가까워 Paint에 영향을 줄 수 있다.
// - transform 변경은 이동이나 확대 같은 효과를 줄 때 자주 쓰며 Composite 단계에서 처리하기 좋다.
// - style 속성으로 JavaScript에서 요소의 인라인 스타일을 바꿀 수 있다.
// - removeProperty()는 JavaScript로 넣은 인라인 스타일을 제거한다.
// ------------------------------------------------------------------------------------------
