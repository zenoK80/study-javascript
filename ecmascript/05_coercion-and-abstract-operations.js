export function render() {
  // ------------------------------------------------------------------------------------------
  // [meta]
  // ------------------------------------------------------------------------------------------
  // 내용: 객체와 프로퍼티 속성을 확인한다.
  // 링크: https://zeno.it.kr/javascript/ECMAscript/07_objects-and-property-attributes
  // 배우고자 하는 것:
  // - 객체 프로퍼티가 단순히 key/value만 가진 것이 아니라는 점을 이해한다.
  // - 프로퍼티에는 writable, enumerable, configurable 같은 설정이 있음을 확인한다.
  // - Object.getOwnPropertyDescriptor()와 Object.defineProperty()를 사용해본다.
  // ------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------
  // [용어정리]
  // - Object: JavaScript의 기본 객체 관련 도구 모음
  // - Property: 객체 안에 들어있는 값. 예: user.name
  // - Descriptor: 프로퍼티 설명서
  // - writable: 값을 다시 대입할 수 있는지 여부
  // - enumerable: Object.keys() 같은 나열 작업에 보이는지 여부
  // - configurable: 프로퍼티 설정을 바꾸거나 삭제할 수 있는지 여부
  // - Object.getOwnPropertyDescriptor(): 프로퍼티 설명서를 확인하는 메서드
  // - Object.defineProperty(): 프로퍼티를 직접 만들고 설정까지 정하는 메서드
  // ------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------
  // [1]
  // ------------------------------------------------------------------------------------------
  // 내용: 일반 객체의 프로퍼티를 확인한다.
  //
  // const user = { name: "Kim" };
  //
  // 여기서 user는 객체다.
  // name은 프로퍼티 이름이다.
  // "Kim"은 프로퍼티 값이다.
  //
  // 결과:
  // Kim
  // ------------------------------------------------------------------------------------------

  const user = {
    name: "Kim"
  };

  console.log(user.name);

  // ------------------------------------------------------------------------------------------
  // [2]
  // ------------------------------------------------------------------------------------------
  // 내용: Object.getOwnPropertyDescriptor()로 name 프로퍼티 설명서를 확인한다.
  //
  // Object. 는 JavaScript가 기본으로 제공하는 객체 관련 도구 모음이다.
  //
  // Object.getOwnPropertyDescriptor(첫 번째 인자, 두 번째 인자)
  //
  // 첫 번째 인자:
  // 어떤 객체를 볼 것인가
  //
  // 두 번째 인자:
  // 그 객체의 어떤 프로퍼티를 볼 것인가
  //
  // 아래 코드는 이런 뜻이다:
  // user 객체의 "name" 프로퍼티 설명서를 보여줘
  //
  // 결과:
  // {
  //   value: "Kim",
  //   writable: true,
  //   enumerable: true,
  //   configurable: true
  // }
  // ------------------------------------------------------------------------------------------

  const nameDescriptor = Object.getOwnPropertyDescriptor(user, "name");

  console.log(nameDescriptor);
  console.log("값:", nameDescriptor.value);
  console.log("수정 가능:", nameDescriptor.writable);
  console.log("나열 가능:", nameDescriptor.enumerable);
  console.log("설정 변경 가능:", nameDescriptor.configurable);

  // ------------------------------------------------------------------------------------------
  // [3]
  // ------------------------------------------------------------------------------------------
  // 내용: Object.defineProperty()로 age 프로퍼티를 직접 만든다.
  //
  // Object.defineProperty(첫 번째 인자, 두 번째 인자, 세 번째 인자)
  //
  // 첫 번째 인자:
  // 어떤 객체에 만들 것인가
  //
  // 두 번째 인자:
  // 어떤 프로퍼티 이름으로 만들 것인가
  //
  // 세 번째 인자:
  // 그 프로퍼티의 설명서, 즉 설정값이다.
  //
  // writable: false
  // 값을 다시 바꿀 수 없다는 뜻이다.
  //
  // 결과:
  // user.age는 20으로 만들어진다.
  // user.age = 30을 해도 값이 바뀌지 않는다.
  // ------------------------------------------------------------------------------------------

  Object.defineProperty(user, "age", {
    value: 20,
    writable: false,
    enumerable: true,
    configurable: true
  });

  console.log("age 처음 값:", user.age);

  try {
    user.age = 30;
  } catch (error) {
    console.log("age 수정 에러:", error.name);
  }

  console.log("age 수정 시도 후:", user.age);

  // ------------------------------------------------------------------------------------------
  // [4]
  // ------------------------------------------------------------------------------------------
  // 내용: enumerable: false를 확인한다.
  //
  // enumerable은 "나열 가능한가?"라는 뜻이다.
  //
  // enumerable: true
  // Object.keys() 결과에 나온다.
  //
  // enumerable: false
  // 직접 접근은 가능하지만 Object.keys() 결과에는 숨겨진다.
  //
  // 결과:
  // user.password로 직접 접근하면 값이 나온다.
  // Object.keys(user)에는 password가 나오지 않는다.
  // ------------------------------------------------------------------------------------------

  Object.defineProperty(user, "password", {
    value: "secret",
    writable: true,
    enumerable: false,
    configurable: true
  });

  console.log("password 직접 접근:", user.password);
  console.log("Object.keys(user):", Object.keys(user));

  // ------------------------------------------------------------------------------------------
  // [5]
  // ------------------------------------------------------------------------------------------
  // 내용: configurable: false를 확인한다.
  //
  // configurable은 "프로퍼티 설정을 다시 바꾸거나 삭제할 수 있는가?"라는 뜻이다.
  //
  // configurable: false
  // 이 프로퍼티의 설정을 함부로 바꾸기 어렵고 삭제도 할 수 없다.
  //
  // delete user.id
  // user 객체에서 id 프로퍼티를 삭제하려는 코드다.
  //
  // 결과:
  // id는 삭제되지 않고 남아 있다.
  // ------------------------------------------------------------------------------------------

  Object.defineProperty(user, "id", {
    value: 1,
    writable: true,
    enumerable: true,
    configurable: false
  });

  console.log("id 설명서:", Object.getOwnPropertyDescriptor(user, "id"));

  try {
    delete user.id;
  } catch (error) {
    console.log("id 삭제 에러:", error.name);
  }

  console.log("id 삭제 시도 후:", user.id);

  // ------------------------------------------------------------------------------------------
  // [6]
  // ------------------------------------------------------------------------------------------
  // 내용: getter와 setter를 확인한다.
  //
  // getter:
  // 속성을 읽을 때 실행되는 함수다.
  //
  // get priceText() { ... }
  // product.priceText를 읽으면 이 함수가 실행된다.
  //
  // setter:
  // 속성에 값을 대입할 때 실행되는 함수다.
  //
  // set discountPrice(value) { ... }
  // product.discountPrice = 800을 하면 이 함수가 실행된다.
  //
  // 결과:
  // product.priceText를 읽으면 "1000원"이 나온다.
  // product.discountPrice = 800을 하면 price가 800으로 바뀐다.
  // ------------------------------------------------------------------------------------------

  const product = {
    price: 1000,

    get priceText() {
      return `${this.price}원`;
    },

    set discountPrice(value) {
      this.price = value;
    }
  };

  console.log("가격 표시:", product.priceText);

  product.discountPrice = 800;

  console.log("할인 후 가격:", product.price);
  console.log("할인 후 가격 표시:", product.priceText);

  // ------------------------------------------------------------------------------------------
  // [7]
  // ------------------------------------------------------------------------------------------
  // 내용: getter 프로퍼티의 설명서를 확인한다.
  //
  // 일반 값 프로퍼티는 value와 writable을 가진다.
  // getter/setter 프로퍼티는 get과 set을 가진다.
  //
  // 결과:
  // priceText는 get 함수가 있다.
  // discountPrice는 set 함수가 있다.
  // ------------------------------------------------------------------------------------------

  console.log(
    "priceText 설명서:",
    Object.getOwnPropertyDescriptor(product, "priceText")
  );

  console.log(
    "discountPrice 설명서:",
    Object.getOwnPropertyDescriptor(product, "discountPrice")
  );
}

// ------------------------------------------------------------------------------------------
// [배운 것]
// - 객체는 여러 프로퍼티를 담는 값이다.
// - 프로퍼티는 객체 안에 있는 이름과 값의 묶음이다.
// - user.name에서 name은 프로퍼티 이름이고, user.name은 그 값을 읽는 코드다.
// - Object는 JavaScript가 기본으로 제공하는 객체 관련 도구 모음이다.
// - Object.getOwnPropertyDescriptor()는 프로퍼티 설명서를 확인하는 메서드다.
// - descriptor는 프로퍼티의 값과 설정을 담은 설명서다.
// - value는 프로퍼티에 들어있는 실제 값이다.
// - writable은 값을 다시 대입할 수 있는지 정한다.
// - enumerable은 Object.keys() 같은 나열 작업에 보이는지 정한다.
// - configurable은 프로퍼티 설정을 바꾸거나 삭제할 수 있는지 정한다.
// - Object.defineProperty()는 프로퍼티를 직접 만들고 설정까지 정하는 메서드다.
// - writable: false이면 값을 바꾸려 해도 바뀌지 않는다.
// - enumerable: false이면 직접 접근은 가능하지만 Object.keys()에는 나오지 않는다.
// - configurable: false이면 프로퍼티를 삭제하거나 설정을 바꾸기 어렵다.
// - delete는 객체의 프로퍼티를 삭제하려는 연산자다.
// - getter는 속성을 읽을 때 실행되는 함수다.
// - setter는 속성에 값을 대입할 때 실행되는 함수다.
// - get 키워드는 getter를 만들 때 사용한다.
// - set 키워드는 setter를 만들 때 사용한다.
// - 일반 값 프로퍼티는 value, writable 같은 설명을 가진다.
// - getter/setter 프로퍼티는 get, set 같은 설명을 가진다.
// ------------------------------------------------------------------------------------------
