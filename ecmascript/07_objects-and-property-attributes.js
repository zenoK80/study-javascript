export function render(){
  // ------------------------------------------------------------------------------------------
  // [meta]
  // ------------------------------------------------------------------------------------------
  // 내용: 객체와 프로퍼티 속성을 확인한다.
  // 링크: https://zeno.it.kr/javascript/ECMAscript/07_objects-and-property-attributes
  // 배우고자 하는 것:
  // - 객체 프로퍼티에는 value 말고도 writable, enumerable, configurable 같은 설정이 있음을 이해한다.
  // - Object.getOwnPropertyDescriptor()로 프로퍼티 설명서를 확인한다.
  // - Object.defineProperty()로 프로퍼티 속성을 직접 정한다.
  // ------------------------------------------------------------------------------------------

  // [1] 일반 객체 프로퍼티 확인
  const user ={ name:"Kim" };
  console.log(user.name);

   // [2] name 프로퍼티 설명서 확인
  const descriptor = Object.getOwnPropertyDescriptor(user,"name");

  console.log(descriptor);
  console.log("값:", descriptor.value);
  console.log("수정 가능:", descriptor.writable);
  console.log("반복 노출:", descriptor.enumerable);
  console.log("설정 변경 가능:", descriptor.configurable);

  // [3] writable: false
  Object.defineProperty(user, "age", {
    value: 20,
    writable: false,
    enumerable: true,
    configurable: true
  });

  console.log(user.age);

  try{
    user.age = 30;
  }catch(e){
    console.log(e.name);
  }

  console.log("age 유지:", user.age);


}
