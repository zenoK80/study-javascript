export function render() {
  // ------------------------------------------------------------------------------------------
  // [meta]
  // ------------------------------------------------------------------------------------------
  // 내용: Web API 객체의 인터페이스 상속과 typeof, instanceof, in 연산자를 확인한다.
  // 링크: https://zeno.it.kr/javascript/web_apis/02_api-design-patterns
  // 배우고자 하는 것:
  // - DOM 요소들이 공통 기능을 물려받는다는 점을 확인한다.
  // - typeof, instanceof, in의 기본 의미를 이해한다.
  // - MouseEvent와 KeyboardEvent의 차이를 확인한다.
  // ------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------
  // [용어정리]
  // - Interface: API 객체의 공통 설계 단위
  // - Inheritance: 어떤 객체가 다른 객체의 기능을 물려받는 구조
  // - typeof: 값의 타입을 문자열로 확인하는 연산자
  // - instanceof: 객체가 특정 생성자 계열인지 확인하는 연산자
  // - in: 객체가 특정 속성을 사용할 수 있는지 확인하는 연산자
  // - MouseEvent: 마우스 이벤트 객체
  // - KeyboardEvent: 키보드 이벤트 객체
  // ------------------------------------------------------------------------------------------

  console.log("인터페이스 상속 확인");

  // ------------------------------------------------------------------------------------------
  // [1]
  // ------------------------------------------------------------------------------------------
  // 내용: button, input, div 요소를 코드로 만든다.
  //
  // document.createElement("button"):
  // HTML button 요소를 JavaScript 객체로 만든다.
  //
  // 아직 화면에 붙인 것은 아니다.
  // 그냥 메모리 안에 요소 객체만 만든 상태다.
  // ------------------------------------------------------------------------------------------

  const button = document.createElement("button");
  const input = document.createElement("input");
  const box = document.createElement("div");

  console.log(button);
  console.log(input);
  console.log(box);

  // ------------------------------------------------------------------------------------------
  // [2]
  // ------------------------------------------------------------------------------------------
  // 내용: typeof, instanceof, in으로 객체 특징을 확인한다.
  //
  // typeof button.addEventListener:
  // addEventListener가 어떤 타입인지 확인한다.
  //
  // button instanceof EventTarget:
  // button이 EventTarget 계열인지 확인한다.
  //
  // "value" in input:
  // input 객체에 value 속성이 있는지 확인한다.
  // ------------------------------------------------------------------------------------------

  console.log("button.addEventListener 타입:", typeof button.addEventListener); // function
  console.log("button은 EventTarget 계열인가?", button instanceof EventTarget); // true
  console.log("input에는 value 속성이 있는가?", "value" in input); // true
  console.log("div에는 value 속성이 있는가?", "value" in box); // false

  // ------------------------------------------------------------------------------------------
  // [3]
  // ------------------------------------------------------------------------------------------
  // 내용: MouseEvent와 KeyboardEvent를 코드로 만들어본다.
  //
  // new MouseEvent("click", { clientX: 100 }):
  // click이라는 마우스 이벤트 객체를 만든다.
  // clientX는 브라우저 화면 기준 마우스 x좌표다.
  //
  // new KeyboardEvent("keydown", { key: "Enter" }):
  // keydown이라는 키보드 이벤트 객체를 만든다.
  // key는 어떤 키를 눌렀는지 나타낸다.
  // ------------------------------------------------------------------------------------------

  const mouseEvent = new MouseEvent("click", { clientX: 100 });
  const keyboardEvent = new KeyboardEvent("keydown", { key: "Enter" });

  console.log("mouseEvent는 Event 계열인가?", mouseEvent instanceof Event); // true
  console.log("mouseEvent.clientX 값:", mouseEvent.clientX); // 100
  console.log("mouseEvent.preventDefault 타입:", typeof mouseEvent.preventDefault); // function
  console.log("keyboardEvent.key 값:", keyboardEvent.key); // Enter
  console.log("keyboardEvent에 clientX가 있는가?", "clientX" in keyboardEvent); // false
}

// ------------------------------------------------------------------------------------------
// [배운 것]
// - 인터페이스 상속은 여러 Web API 객체가 공통 기능을 물려받는 구조다.
// - button이 addEventListener를 쓸 수 있는 이유는 EventTarget 계열 기능을 물려받기 때문이다.
// - typeof는 값의 타입을 문자열로 확인하는 연산자다.
// - instanceof는 객체가 특정 생성자 계열인지 확인하는 연산자다.
// - in은 객체가 특정 속성을 사용할 수 있는지 확인하는 연산자다.
// - document.createElement()는 HTML 요소 객체를 만든다.
// - input에는 value가 있지만 div에는 value가 없는 것처럼 요소 종류마다 가진 속성이 다르다.
// - MouseEvent는 마우스 이벤트 객체이고 clientX 같은 마우스 좌표 정보를 가질 수 있다.
// - KeyboardEvent는 키보드 이벤트 객체이고 key 같은 키 정보를 가질 수 있다.
// - MouseEvent는 Event를 상속하므로 preventDefault() 같은 기본 이벤트 메서드를 가진다.
// ------------------------------------------------------------------------------------------
