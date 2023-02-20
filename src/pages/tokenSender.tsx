import React, { useState, useEffect } from "react";
import { sendToken } from "api/cosm";
import { confirmAlert } from "react-confirm-alert";
import {
  isValidMnemonic,
  isValidAddress,
  isValidAmount,
  isValidAmountForChangeEvent,
  isValidAddressForChangeEvent,
  isValidMnemonicForChangeEvent,
} from "utils/validator";
import { TICKER } from "utils/const";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import NavButtons from "components/NavButtons";
interface SystemError {
  code: string;
  message: string;
}

function TokenSender({ network }: { network: string }) {
  // form
  const [mnemonic, setMnemonic] = useState<string | "">("");
  const [receiverAddress, setReceiverAddress] = useState<string | "">("");
  const [amount, setAmount] = useState<string | "">("");
  // button status
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
  const { isSuccess, message } = result;
  //i18n
  const { t } = useTranslation();
  const { mnemonicError, receiverAddressError, amountError } = errors;
  const [networkBtnActive, setNetworkBtnActive] = useState<string | "">(
    TICKER[network]
  );
  const navigate = useNavigate();

  useEffect(() => {
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
    isValidAmount(amount) === "" &&
    isValidAddress(receiverAddress, network) === "" &&
    isValidMnemonic(mnemonic) === ""
      ? setIsValid(true)
      : setIsValid(false);
  }, [amount, receiverAddress, mnemonic, network]);

  // onChangeEvents
  const onChangeMnemonic = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value.toLocaleLowerCase();
    if (isValidMnemonicForChangeEvent(value) !== "") {
      setErrors({
        ...errors,
        mnemonicError: isValidMnemonicForChangeEvent(value),
      });
      return;
    } else {
      setMnemonic(value);
    }
  };
  const onChangeReciverAddress = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value.toLocaleLowerCase();
    if (isValidAddressForChangeEvent(value) !== "") {
      setErrors({
        ...errors,
        receiverAddressError: isValidAddressForChangeEvent(value),
      });
      return;
    } else {
      setReceiverAddress(value);
    }
  };
  const onChangeAmount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (isValidAmountForChangeEvent(value) !== "") {
      setErrors({
        ...errors,
        amountError: isValidAmountForChangeEvent(value),
      });
      return;
    } else {
      setAmount(value);
    }
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
    if (isValidMnemonic(value) === "") {
      setErrors({ ...errors, mnemonicError: "" });
    } else {
      setErrors({ ...errors, mnemonicError: isValidMnemonic(value) });
    }
  };
  const onBlurReceiverAddress = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value === "") {
      setErrors({ ...errors, receiverAddressError: "" });
      return;
    }
    // 유효성 검사
    isValidAddress(value, network) === ""
      ? setErrors({ ...errors, receiverAddressError: "" })
      : setErrors({
          ...errors,
          receiverAddressError: isValidAddress(value, network),
        });
  };
  const onBlurAmount = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value === "") {
      setErrors({ ...errors, amountError: "" });
      return;
    }

    isValidAmount(value) === ""
      ? setErrors({ ...errors, amountError: "" })
      : setErrors({ ...errors, amountError: isValidAmount(value) });
  };

  /**
   * send button click event
   */
  const sendButton = () => {
    confirmAlert({
      title: `${t("confirm.send.title")}`,
      message: `${Number(amount)} ${
        TICKER[network].toUpperCase() + " " + t("confirm.send.content")
      } ${receiverAddress}`,
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
    setResult({ isSuccess: false, message: "" });
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
    }
  };

  /**
   * 버튼 클릭시 네트워크 변경
   * @param token
   */
  const onClickNetworkButton = (token: string) => {
    if (!isInputDataEmpty()) {
      confirmAlert({
        title: `${t("confirm.network.title")}`,
        message: `${t("confirm.network.content")}`,
        buttons: [
          {
            label: "Yes",
            onClick: () => {
              navigate("/token/" + token);
              setNetworkBtnActive(token);
            },
          },
          {
            label: "No",
            onClick: () => {},
          },
        ],
      });
      return;
    } else {
      navigate("/token/" + token);
      setNetworkBtnActive(token);
    }
  };

  /**
   * 빈값인지 확인
   * @returns
   */
  const isInputDataEmpty = (): boolean => {
    if (mnemonic === "" && receiverAddress === "" && amount === "") {
      return true;
    } else {
      return false;
    }
  };
  //상단바에 사용할 네트워크 목록
  const networks = ["nova", "atom"];

  return (
    <div>
      <div className="flex w-[100%] min-h-[75vh] text-1xl text-white flex-col items-center">
        <NavButtons networks={networks} />
        {/* 코드 리팩토링 */}
        {/* <div className="flex justify-center">
          
          <button
            onClick={() => {
              onClickNetworkButton("nova");
            }}
            className={
              "min-w-[100px] text-center hover:bg-gradient-to-bl from-nova-start to-nova-end active:from-nova-start-active active:to-nova-end-active focus:outline-none focus:ring focus:ring-blue-300 py-4 text-white rounded font-bold " +
              ("nova" === networkBtnActive
                ? "bg-gradient-to-bl from-nova-start to-nova-end rounded"
                : "")
            }
          >
            NOVA
          </button>
          <div className="w-3"></div>
          <button
            onClick={() => {
              onClickNetworkButton("atom");
            }}
            className={
              "min-w-[100px] text-center hover:bg-gradient-to-bl from-atom-start to-atom-end active:from-atom-start-active active:to-atom-end-active focus:outline-none focus:ring focus:ring-blue-300 py-4 text-white rounded font-bold " +
              ("atom" === networkBtnActive
                ? "bg-gradient-to-bl from-atom-start to-atom-end rounded"
                : "")
            }
          >
            ATOM
          </button>
        </div> */}

        <span className="flex mt-10 w-[90%] max-w-lg font-bold">
          {t(`title.mnemonic`)}
        </span>
        <textarea
          className={
            "w-[90%] h-20 max-w-lg rounded text-black " +
            (mnemonicError === "" ? "" : "border-2 border-rose-500")
          }
          value={mnemonic}
          placeholder={`${t("placeholder.mnemonic")}`}
          onChange={onChangeMnemonic}
          onBlur={onBlurMnemonic}
        ></textarea>
        <span className="flex w-[90%] max-w-lg font-normal text-rose-500 ">
          {t(`${mnemonicError}`)} &nbsp;
        </span>

        <span className="mt-2 w-[90%] flex max-w-lg font-bold ">
          {t(`title.receiverAddress`)}
        </span>
        <textarea
          className={
            "w-[90%] max-w-lg rounded text-black " +
            (receiverAddressError === "" ? "" : "border-2 border-rose-500")
          }
          value={receiverAddress}
          placeholder={`${t("placeholder.receiverAddress")}${network}1234`}
          onChange={onChangeReciverAddress}
          onBlur={onBlurReceiverAddress}
        ></textarea>
        <span className="flex w-[90%] max-w-lg font-normal text-rose-500">
          {t(`${receiverAddressError}`)}
          &nbsp;
        </span>

        <span className={"mt-2 w-[90%] flex max-w-lg font-bold"}>
          {t(`title.amount`)}
        </span>
        <textarea
          className={
            "w-[90%] max-w-lg rounded text-black " +
            (amountError === "" ? "" : "border-2 border-rose-500")
          }
          value={amount}
          placeholder={`${t("placeholder.amount")}`}
          onChange={onChangeAmount}
          onBlur={onBlurAmount}
        ></textarea>
        <span className="flex w-[90%] max-w-lg font-normal text-rose-500">
          {t(`${amountError}`)}
          &nbsp;
        </span>

        <button
          style={{ fontSize: "20px" }}
          className={
            "w-[90%] max-w-lg mt-7 text-white rounded py-5 px-3 " +
            (network === "cosmos"
              ? " bg-gradient-to-bl from-atom-start to-atom-end rounded font-bold active:from-atom-start-active active:to-atom-end-active disabled:from-atom-start-active disabled:to-atom-end-active focus:outline-none focus:ring"
              : " bg-gradient-to-bl from-nova-start to-nova-end rounded font-bold active:from-nova-start-active active:to-nova-end-active disabled:from-nova-start-active disabled:to-nova-end-active focus:outline-none focus:ring")
          }
          onClick={sendButton}
          disabled={isLoading || !isValid}
        >
          {isLoading
            ? `${t(`button.sending`)}`
            : `${t(`button.send.1`)}
               ${TICKER[network].toUpperCase()} 
               ${t(`button.send.2`)}`}
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

export default TokenSender;
