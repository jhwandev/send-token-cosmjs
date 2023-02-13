/**
 * 니모닉 시드 유효성 검사
 * @param mnemonic
 * @returns
 */
export const isValidMnemonic = (mnemonic: string): boolean => {
  // 알파벳과 공백 이외에 다른 문자 있는지 확인
  const alphabetSpace = RegExp(/[^a-z\s]/);
  const isNotValid = alphabetSpace.test(mnemonic);

  if (isNotValid) return false;

  //갯수확인
  const nemonicSplit = mnemonic.split(" ");
  const nemonicLength = nemonicSplit.length;

  // 12개 또는 24개 니모닉인지 확인
  if (nemonicLength === 24 || nemonicLength === 12) {
    return true;
  } else {
    return false;
  }
};

/**
 * 지갑주소 유효성 검사
 * @param address
 * @returns
 */
export const isValidAddress = (address: string, prefix: string): boolean => {
  // prefix 일치여부 확인
  var splittedAddress = address.split(prefix);
  if (splittedAddress.length !== 2) return false;
  // 길이확인 - prefix제외 39자리
  if (splittedAddress[1].length !== 39) return false;
  // 소문자 알파벳과 숫자 이외에 다른 문자 있는지 확인
  var eee = RegExp(/[^a-z0-9]/);
  const isValid = eee.test(address);
  if (isValid) return false;

  return true;
};

/**
 * 토큰전송 Amount 유효성 검사
 * @param amount
 * @returns
 */
export const isValidAmount = (value: string): boolean => {
  const amount = Number(value);
  // 0과 같거나 보다 작은 수 입력 불가
  if (amount <= 0) return false;
  // 14자리 이상 입력 불가
  if (value.length > 14) return false;
  // 숫자만 입력 가능
  if (Number.isNaN(amount)) return false;
  // 소수점 6자리 이상 입력 불가
  if (Number.isInteger(amount * 10 ** 6) === false) return false;

  return true;
};

/**
 * 토큰전송 Amount 유효성 검사 - onChange 이벤트용
 * @param value
 * @returns
 */
export const isValidAmountForChangeEvent = (value: string): boolean => {
  const amount = Number(value);
  // 14자리 이상 입력 불가
  if (value.length > 14) return false;
  // 숫자만 입력 가능
  if (Number.isNaN(amount)) return false;
  // 소수점 6자리 이상 입력 불가
  if (Number.isInteger(amount * 10 ** 6) === false) return false;
  // "0"다음에는 "."만 입력 가능
  // if (
  //   value.length > 1 &&
  //   value.split("")[0] === "0" &&
  //   value.split("")[1] !== "."
  // ) {
  //   return false;
  // }
  return true;
};
