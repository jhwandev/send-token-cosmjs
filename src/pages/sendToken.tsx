import React, { useState, useEffect } from "react";
import { sendToken } from "../api/cosm";
import { confirmAlert } from "react-confirm-alert";
import {
  isValidMnemonic,
  isValidAddress,
  isValidAmount,
  isValidAmountForChangeEvent,
} from "../utils/validator";
import { TICKER } from "../utils/const";

interface SystemError {
  code: string;
  message: string;
}

function SendNova({ network }: { network: string }) {
  // form
  const [mnemonic, setMnemonic] = useState<string | "">("");
  const [receiverAddress, setReceiverAddress] = useState<string | "">("");
  const [amount, setAmount] = useState<string | "">("");
  // button status
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sendButtonText, setSendButtonText] = useState<string | "">(
    "SEND NOVA"
  );
  const [isValid, setIsValid] = useState<boolean>(false);
  // textarea error message
  const [errors, setErrors] = useState({
    mnemonicError: "",
    receiverAddressError: "",
    amountError: "",
  });
  // token send result message
  const [result, setResult] = useState({
    isSuccess: false,
    message: "",
  });
  const { mnemonicError, receiverAddressError, amountError } = errors;
  const { isSuccess, message } = result;

  /**
   * network 변경시 form 초기화
   */
  useEffect(() => {
    setSendButtonText(`SEND ${TICKER[network].toUpperCase()}`);
    setAmount("");
    setReceiverAddress("");
    setMnemonic("");
    setErrors({
      mnemonicError: "",
      receiverAddressError: "",
      amountError: "",
    });
    setResult({
      isSuccess: false,
      message: "",
    });
  }, [network]);

  /**
   * 값 변할 때마다 유효성검증 후 버튼 (비)활성화
   */
  useEffect(() => {
    isValidAmount(amount) &&
    isValidAddress(receiverAddress, network) &&
    isValidMnemonic(mnemonic)
      ? setIsValid(true)
      : setIsValid(false);
  }, [amount, receiverAddress, mnemonic, network]);

  // onChangeEvents
  const onChangeMnemonic = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMnemonic(e.target.value);
  };
  const onChangeReciverAddress = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReceiverAddress(e.target.value);
  };
  const onChangeAmount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (!isValidAmountForChangeEvent(value)) {
      setErrors({ ...errors, amountError: "Only numbers can be entered." });
      return;
    }
    setAmount(value);
  };

  // onBlurEvents
  const onBlurMnemonic = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    // 빈값일경우 에러제거
    if (value === "") {
      setErrors({ ...errors, mnemonicError: "" });
      return;
    }
    // 앞뒤공백 제거
    value = value.trim();
    // 콤마 스페이스로 변환
    value = value.replaceAll(",", " ");
    // 변환값 반영
    setMnemonic(value);
    // 유효성 검사
    if (isValidMnemonic(value)) {
      setErrors({ ...errors, mnemonicError: "" });
    } else {
      setErrors({ ...errors, mnemonicError: "Invalid nemonic" });
    }
  };
  const onBlurReceiverAddress = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value === "") {
      setErrors({ ...errors, receiverAddressError: "" });
      return;
    }
    // 유효성 검사
    isValidAddress(value, network)
      ? setErrors({ ...errors, receiverAddressError: "" })
      : setErrors({ ...errors, receiverAddressError: "Invalid address" });
  };
  const onBlurAmount = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value === "") {
      setErrors({ ...errors, amountError: "" });
      return;
    }

    isValidAmount(value)
      ? setErrors({ ...errors, amountError: "" })
      : setErrors({ ...errors, amountError: "Invalid amount" });
  };

  /**
   * send button click event
   */
  const sendButton = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: `${Number(amount)} ${TICKER[
        network
      ].toUpperCase()} Token will be sent to ${receiverAddress}`,
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            sendTokenByMnemonic();
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  /**
   * send token by mnemonic
   */
  const sendTokenByMnemonic = async () => {
    setIsLoading(true);
    setSendButtonText("SENDING...");

    try {
      const result = await sendToken(
        mnemonic,
        receiverAddress,
        String(Number(amount) * 10 ** 6),
        network
      );

      setResult({ isSuccess: result.isSuccess, message: result.message });
    } catch (error) {
      const err = error as SystemError;
      setResult({ isSuccess: false, message: err.message });
    } finally {
      setIsLoading(false);
      setSendButtonText(`SEND ${TICKER[network].toUpperCase()}`);
    }
  };

  return (
    <div>
      <div className="flex w-[100%] min-h-[65vh] text-1xl text-white flex-col items-center">
        <span className="flex mt-10 w-[90%] max-w-lg font-bold">Mnemonic</span>
        <textarea
          className={
            "w-[90%] h-20 max-w-lg rounded text-black " +
            (mnemonicError.length ? "border-2 border-rose-500" : "")
          }
          value={mnemonic}
          placeholder="12 or 24 words, ex)apple banana grape..."
          onChange={onChangeMnemonic}
          onBlur={onBlurMnemonic}
        ></textarea>
        <span className="flex w-[90%] max-w-lg font-normal text-rose-500 ">
          {mnemonicError}
          &nbsp;
        </span>

        <span className="mt-2 w-[90%] flex max-w-lg font-bold ">
          Receiver Address
        </span>
        <textarea
          className={
            "w-[90%] max-w-lg rounded text-black " +
            (receiverAddressError ? "border-2 border-rose-500" : "")
          }
          value={receiverAddress}
          placeholder={`Receiver Address, ex)${network}123abc...`}
          onChange={onChangeReciverAddress}
          onBlur={onBlurReceiverAddress}
        ></textarea>
        <span className="flex w-[90%] max-w-lg font-normal text-rose-500">
          {receiverAddressError}&nbsp;
        </span>

        <span className={"mt-2 w-[90%] flex max-w-lg font-bold"}>Amount</span>
        <textarea
          className={
            "w-[90%] max-w-lg rounded text-black " +
            (amountError ? "border-2 border-rose-500" : "")
          }
          value={amount}
          placeholder="amount ex)10.123"
          onChange={onChangeAmount}
          onBlur={onBlurAmount}
        ></textarea>
        <span className="flex w-[90%] max-w-lg font-normal text-rose-500">
          {amountError}&nbsp;
        </span>

        <button
          style={{ fontSize: "20px" }}
          className={
            "w-[90%] max-w-lg mt-7 text-white rounded py-5 px-3 " +
            (network === "cosmos"
              ? "bg-violet-500 font-bold hover:bg-violet-600 active:bg-violet-700 disabled:bg-violet-900 focus:outline-none focus:ring focus:ring-violet-300"
              : " bg-blue-500 font-bold hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-300")
          }
          onClick={sendButton}
          disabled={isLoading || !isValid}
        >
          {sendButtonText}
        </button>
        <div
          className={
            "flex w-[90%] mt-2 max-w-lg font-normal break-all " +
            (isSuccess ? "text-green-500" : "text-rose-500")
          }
        >
          {message
            ? isSuccess
              ? `Success : ${message}`
              : `Failed : ${message}`
            : ""}
          &nbsp;
        </div>
      </div>
    </div>
  );
}

export default SendNova;
