export async function render() {
  // ------------------------------------------------------------------------------------------
  // [meta]
  // ------------------------------------------------------------------------------------------
  // 내용: crypto, UUID, 랜덤 값, TextEncoder, ArrayBuffer, SHA-256 해시를 확인한다.
  // 링크: https://zeno.it.kr/javascript/web_apis/02_api-design-patterns
  // 배우고자 하는 것:
  // - crypto와 crypto.subtle의 차이를 이해한다.
  // - Uint8Array, Uint32Array가 숫자 배열이라는 점을 확인한다.
  // - 문자열을 바이트로 바꾸고 SHA-256 해시를 만드는 흐름을 본다.
  // ------------------------------------------------------------------------------------------

  // ------------------------------------------------------------------------------------------
  // [용어정리]
  // - crypto: 브라우저 보안/암호 관련 도구 상자
  // - crypto.subtle: 해시, 암호화, 서명 같은 고급 보안 API 묶음
  // - UUID: 겹칠 확률이 매우 낮은 랜덤 ID 문자열
  // - bit: 0 또는 1 하나를 담는 가장 작은 단위
  // - Uint8Array: 8비트 정수 배열
  // - Uint32Array: 32비트 정수 배열
  // - TextEncoder: 문자열을 바이트 데이터로 바꾸는 도구
  // - ArrayBuffer: 메모리에 있는 날것의 바이트 덩어리
  // - SHA-256: 데이터를 고정 길이 해시값으로 바꾸는 해시 알고리즘
  // ------------------------------------------------------------------------------------------

  console.log("crypto와 바이트 데이터");

  // ------------------------------------------------------------------------------------------
  // [1]
  // ------------------------------------------------------------------------------------------
  // 내용: SecureContext와 crypto 객체를 확인한다.
  //
  // SecureContext:
  // 브라우저가 안전하다고 인정하는 실행 환경이다.
  // 보통 https, localhost, 127.0.0.1은 안전한 환경으로 본다.
  //
  // crypto:
  // 보안/암호 관련 기능 묶음 객체다.
  //
  // crypto.subtle:
  // crypto 안에 들어있는 고급 암호화 API 묶음이다.
  // ------------------------------------------------------------------------------------------

  console.log("현재 안전한 환경인가?", window.isSecureContext);
  console.log("crypto 객체:", crypto);
  console.log("crypto.subtle 사용 가능?", typeof crypto.subtle);

  // ------------------------------------------------------------------------------------------
  // [2]
  // ------------------------------------------------------------------------------------------
  // 내용: randomUUID로 랜덤 ID를 만든다.
  //
  // crypto.randomUUID():
  // 겹칠 확률이 매우 낮은 랜덤 ID 문자열을 만든다.
  // 임시 게시글 ID, 업로드 작업 ID, 채팅 메시지 ID 같은 곳에 쓸 수 있다.
  // ------------------------------------------------------------------------------------------

  const id1 = crypto.randomUUID();
  const id2 = crypto.randomUUID();

  console.log("랜덤 UUID 1:", id1);
  console.log("랜덤 UUID 2:", id2);
  console.log("두 UUID가 같은가?", id1 === id2); // 거의 항상 false

  // ------------------------------------------------------------------------------------------
  // [3]
  // ------------------------------------------------------------------------------------------
  // 내용: getRandomValues와 정수 배열을 확인한다.
  //
  // Uint8Array(5):
  // 5자리 숫자가 아니라 8비트 정수 5개를 담는 배열이다.
  // 한 칸에는 0부터 255까지 들어갈 수 있다.
  //
  // Uint32Array(5):
  // 5자리 숫자가 아니라 32비트 정수 5개를 담는 배열이다.
  // 한 칸에는 0부터 4,294,967,295까지 들어갈 수 있다.
  //
  // crypto.getRandomValues(배열):
  // 전달한 배열의 각 칸에 보안용 랜덤 숫자를 채운다.
  // ------------------------------------------------------------------------------------------

  const randomBytes = new Uint8Array(5);
  const randomNumbers = new Uint32Array(5);

  crypto.getRandomValues(randomBytes);
  crypto.getRandomValues(randomNumbers);

  console.log("Uint8Array 랜덤 값:", randomBytes);
  console.log("Uint32Array 랜덤 값:", randomNumbers);

  // ------------------------------------------------------------------------------------------
  // [4]
  // ------------------------------------------------------------------------------------------
  // 내용: TextEncoder와 TextDecoder를 확인한다.
  //
  // TextEncoder:
  // 문자열을 Uint8Array 같은 바이트 데이터로 바꿔준다.
  //
  // TextDecoder:
  // 바이트 데이터를 다시 문자열로 되돌려준다.
  //
  // crypto.subtle.digest()는 문자열을 직접 받지 않고 바이트 데이터를 받는다.
  // 그래서 해시를 만들기 전에 TextEncoder로 문자열을 바이트로 바꾼다.
  // ------------------------------------------------------------------------------------------

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const helloBytes = encoder.encode("hello");
  const decodedText = decoder.decode(helloBytes);

  console.log("hello를 바이트로 바꾼 값:", helloBytes);
  console.log("바이트를 다시 문자열로 바꾼 값:", decodedText); // hello

  // ------------------------------------------------------------------------------------------
  // [5]
  // ------------------------------------------------------------------------------------------
  // 내용: SHA-256 해시를 만든다.
  //
  // SHA-256:
  // 해시를 만드는 알고리즘 이름이다.
  //
  // 같은 데이터 + 같은 알고리즘 = 같은 해시
  // 다른 데이터 + 같은 알고리즘 = 다른 해시
  //
  // crypto.subtle.digest("SHA-256", 데이터):
  // 데이터를 SHA-256 해시로 바꾼다.
  //
  // digest()는 Promise를 반환한다.
  // Promise는 "나중에 결과를 줄게"라는 비동기 결과 상자다.
  // 그래서 await로 결과가 나올 때까지 기다린다.
  // ------------------------------------------------------------------------------------------

  const data1 = encoder.encode("hello");
  const data2 = encoder.encode("hello");
  const data3 = encoder.encode("hello!");

  const hashBuffer1 = await crypto.subtle.digest("SHA-256", data1);
  const hashBuffer2 = await crypto.subtle.digest("SHA-256", data2);
  const hashBuffer3 = await crypto.subtle.digest("SHA-256", data3);

  // ------------------------------------------------------------------------------------------
  // [6]
  // ------------------------------------------------------------------------------------------
  // 내용: ArrayBuffer 해시 결과를 사람이 읽기 좋은 16진수 문자열로 바꾼다.
  //
  // ArrayBuffer:
  // 메모리에 있는 날것의 바이트 덩어리다.
  //
  // new Uint8Array(buffer):
  // ArrayBuffer를 1바이트씩 숫자로 볼 수 있게 만든다.
  //
  // Array.from():
  // 배열처럼 생긴 값을 일반 배열로 바꿔준다.
  //
  // map():
  // 배열의 각 값을 하나씩 바꿔서 새 배열을 만든다.
  //
  // byte.toString(16):
  // 바이트 숫자를 16진수 문자열로 바꾼다.
  // 여기서 16은 "16진수로 바꿔라"는 뜻이다.
  //
  // padStart(2, "0"):
  // 한 자리 문자열 앞에 0을 붙여 두 자리로 맞춘다.
  //
  // join(""):
  // 배열의 문자열 조각들을 구분자 없이 하나로 이어붙인다.
  // ------------------------------------------------------------------------------------------

  function bufferToHex(buffer) {
    const byteArray = Array.from(new Uint8Array(buffer));

    return byteArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  const hash1 = bufferToHex(hashBuffer1);
  const hash2 = bufferToHex(hashBuffer2);
  const hash3 = bufferToHex(hashBuffer3);

  console.log("hello 해시 1:", hash1);
  console.log("hello 해시 2:", hash2);
  console.log("hello! 해시:", hash3);
  console.log("같은 글자 hello끼리는 해시가 같은가?", hash1 === hash2); // true
  console.log("hello와 hello!는 해시가 같은가?", hash1 === hash3); // false
}

// ------------------------------------------------------------------------------------------
// [배운 것]
// - crypto는 브라우저 보안/암호 관련 도구 상자다.
// - crypto.subtle은 crypto 안에 있는 해시, 암호화, 서명 같은 고급 보안 API 묶음이다.
// - SecureContext는 https 또는 localhost처럼 브라우저가 안전하다고 보는 환경이다.
// - crypto.randomUUID()는 겹칠 확률이 매우 낮은 랜덤 ID 문자열을 만든다.
// - bit는 0 또는 1 하나를 담는 가장 작은 단위다.
// - Uint8Array(5)는 5자리 숫자가 아니라 8비트 정수 5개를 담는 배열을 만든다.
// - Uint8Array 한 칸에는 0부터 255까지의 값이 들어갈 수 있다.
// - Uint32Array(5)는 5자리 숫자가 아니라 32비트 정수 5개를 담는 배열을 만든다.
// - Uint32Array 한 칸에는 0부터 4,294,967,295까지의 값이 들어갈 수 있다.
// - crypto.getRandomValues()는 Uint8Array, Uint32Array 같은 배열에 보안용 랜덤 값을 채워준다.
// - TextEncoder는 문자열을 Uint8Array 같은 바이트 데이터로 바꿔주는 도구다.
// - TextDecoder는 바이트 데이터를 다시 문자열로 되돌려주는 도구다.
// - SHA-256은 데이터를 고정 길이 해시값으로 바꾸는 해시 알고리즘이다.
// - 해시는 원본을 복원하는 암호화가 아니라, 데이터가 같은지 비교하는 지문에 가깝다.
// - crypto.subtle.digest()는 Promise를 반환하므로 결과를 받으려면 await를 사용한다.
// - await를 쓰는 함수는 앞에 async를 붙여야 한다.
// - ArrayBuffer는 메모리에 있는 날것의 바이트 덩어리다.
// - byte.toString(16)은 바이트 숫자를 16진수 문자열로 바꾼다.
// - padStart(2, "0")은 한 자리 문자열 앞에 0을 붙여 두 자리로 맞춘다.
// - join("")은 배열의 문자열 조각들을 구분자 없이 하나로 이어붙인다.
// ------------------------------------------------------------------------------------------
