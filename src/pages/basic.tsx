import React, { useState } from "react";
import { sendToken } from "../api/cosm";

function Basic() {
  const [mnemonic, setMnemonic] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [amount, setAmount] = useState("0");
  const [isLoading, setIsLoading] = useState(false);
  const [sendButtonText, setSendButtonText] = useState("SEND");

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
    const amount = Number(value);
    if (Number.isNaN(amount)) return;
    if (Number.isInteger(amount * 10 ** 6) === false) return;

    setAmount(value);
  };

  const sendNova = async () => {
    setIsLoading(true);
    setSendButtonText("SENDING...");
    const result = await sendToken(
      mnemonic,
      receiverAddress,
      String(Number(amount) * 10 ** 6)
    );
    setIsLoading(false);
    setSendButtonText("SEND");
    console.log(result);
  };

  return (
    <div>
      <div className="flex w-[100%] min-h-[65vh] text-1xl text-white flex-col items-center">
        <span className="mt-12 w-[90%] flex max-w-lg font-bold">Mnemonic</span>
        <textarea
          className="w-[90%] h-20 max-w-lg rounded text-black"
          value={mnemonic}
          onChange={onChangeMnemonic}
        ></textarea>

        <span className="mt-5 w-[90%] flex max-w-lg font-bold">
          Receiver Address
        </span>
        <textarea
          className="w-[90%] max-w-lg rounded text-black"
          value={receiverAddress}
          onChange={onChangeReciverAddress}
        ></textarea>

        <span className="mt-5 w-[90%] flex max-w-lg font-bold">Amount</span>
        <textarea
          className="w-[90%] max-w-lg rounded text-black"
          value={amount}
          onChange={onChangeAmount}
        ></textarea>

        <button
          style={{ fontSize: "20px" }}
          className="w-[90%] max-w-lg mt-10 bg-blue-500 font-bold hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 mr-3 py-5 px-3 text-white rounded "
          onClick={sendNova}
          disabled={isLoading}
        >
          {sendButtonText}
        </button>
      </div>
    </div>
  );
}

export default Basic;
