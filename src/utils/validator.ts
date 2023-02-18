/**
 * 니모닉 시드 유효성 검사
 * @param mnemonic
 * @returns
 */
export const isValidMnemonic = (mnemonic: string): string => {
  // 알파벳과 공백 이외에 다른 문자 있는지 확인
  const alphabetSpace = RegExp(/[^a-z\s]/);
  const isNotValidType = alphabetSpace.test(mnemonic);

  if (isNotValidType) return "valid.mnemonic.01";

  const nemonicSplit = mnemonic.split(" ");
  const nemonicLength = nemonicSplit.length;

  // 12개 또는 24개 니모닉인지 확인
  if (nemonicLength === 24 || nemonicLength === 12) {
    return "";
  } else {
    return "valid.mnemonic.02";
  }
};

/**
 * 지갑주소 유효성 검사
 * @param address
 * @returns
 */
export const isValidAddress = (address: string, prefix: string): string => {
  // prefix 일치여부 확인
  const splittedAddress = address.split(prefix);
  if (splittedAddress.length !== 2) return "valid.receiverAddress.01";

  // 소문자 알파벳과 숫자 이외에 다른 문자 있는지 확인
  const alphabetNumber = RegExp(/[^a-z0-9]/);
  const isNotValidType = alphabetNumber.test(address);
  if (isNotValidType) return "valid.receiverAddress.02";

  // 길이확인 - prefix제외 39자리
  if (splittedAddress[1].length !== 39) return "valid.receiverAddress.03";

  return "";
};

/**
 * 토큰전송 Amount 유효성 검사
 * @param amount
 * @returns
 */
export const isValidAmount = (value: string): string => {
  const amount = Number(value);
  // 0과 같거나 보다 작은 수 입력 불가
  if (amount <= 0) return "valid.amount.01";

  // 14자리 이상 입력 불가
  if (value.length > 14) return "valid.amount.02";

  // 숫자만 입력 가능
  if (Number.isNaN(amount)) return "valid.amount.03";

  // 소수점 6자리 이상 입력 불가
  if (Number.isInteger(amount * 10 ** 6) === false) return "valid.amount.04";

  return "";
};

/**
 * 니모닉 시드 유효성 검사 - onChange 이벤트용
 * @param value
 * @returns
 */
export const isValidMnemonicForChangeEvent = (value: string): string => {
  // 알파벳과 공백 이외에 다른 문자 있는지 확인
  const alphabetSpace = RegExp(/[^a-z\s]/);
  const isNotValidType = alphabetSpace.test(value);
  if (isNotValidType) return "valid.mnemonic.01";

  return "";
};

/**
 * 토큰전송 Amount 유효성 검사 - onChange 이벤트용
 * @param value
 * @returns
 */
export const isValidAddressForChangeEvent = (value: string): string => {
  // 소문자 알파벳과 숫자 이외에 다른 문자 있는지 확인
  const alphabetNumber = RegExp(/[^a-z0-9]/);
  const isNotValidType = alphabetNumber.test(value);
  if (isNotValidType) return "valid.receiverAddress.02";

  return "";
};

/**
 * 토큰전송 Amount 유효성 검사 - onChange 이벤트용
 * @param value
 * @returns
 */
export const isValidAmountForChangeEvent = (value: string): string => {
  const amount = Number(value);

  // 14자리 이상 입력 불가
  if (value.length > 14) return "valid.amount.02";
  // 숫자만 입력 가능
  if (Number.isNaN(amount)) return "valid.amount.03";
  // 소수점 6자리 이상 입력 불가
  if (Number.isInteger(amount * 10 ** 6) === false) return "valid.amount.04";
  // "0"다음에는 "."만 입력 가능 - 편의상 제거
  // if (
  //   value.length > 1 &&
  //   value.split("")[0] === "0" &&
  //   value.split("")[1] !== "."
  // ) {
  //   return false;
  // }
  return "";
};
