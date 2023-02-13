import {
  Coin,
  DirectSecp256k1HdWallet,
  OfflineDirectSigner,
} from "@cosmjs/proto-signing";

import {
  DeliverTxResponse,
  StargateClient,
  SigningStargateClient,
} from "@cosmjs/stargate";

import { RPC_URL, DENOM } from "../utils/const";

interface SystemError {
  code: string;
  message: string;
}
interface resultObject {
  isSuccess: boolean;
  message: string;
}

/**
 * 니모닉 시드로 signer 생성
 * @param mnemonic 니모닉 시드
 * @returns
 */
export const getSignerFromMnemonic = async (
  mnemonic: string,
  network: string
): Promise<OfflineDirectSigner> => {
  return DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: network,
  });
};

/**
 * 지갑주소로 잔액 조회
 * @param address 지갑주소
 * @returns
 */
export const getBalance = async (
  address: string,
  network: string
): Promise<readonly Coin[]> => {
  const client = await StargateClient.connect(RPC_URL[network]);
  const result = await client.getAllBalances(address);
  return result;
};

/**
 * 니모닉 시드를 이용 토큰 전송
 * @param mnemonic 니모닉 시드
 * @param receiver 받는지갑 주소
 * @param amount 토큰갯수(decimal)
 * @returns
 */
export const sendToken = async (
  mnemonic: string,
  receiver: string,
  amount: string,
  network: string
): Promise<resultObject> => {
  let signer: OfflineDirectSigner;

  // 니모닉 시드로 signer 생성
  try {
    signer = await getSignerFromMnemonic(mnemonic, network);
  } catch (error) {
    const err = error as SystemError;
    const resultObject = {
      isSuccess: false,
      message: err.message,
    } as resultObject;
    return resultObject;
  }

  // sender 주소 추출
  const sender: string = (await signer.getAccounts())[0].address;

  // signingClient 생성
  let signingClient: SigningStargateClient;

  try {
    signingClient = await SigningStargateClient.connectWithSigner(
      RPC_URL[network],
      signer
    );
  } catch (error) {
    const err = error as SystemError;
    const resultObject = {
      isSuccess: false,
      message: err.message,
    } as resultObject;
    return resultObject;
  }

  const beforeSenderBalance = await getBalance(sender, network);
  const beforeReceiverBalance = await getBalance(receiver, network);
  // 토큰 전송
  let result: DeliverTxResponse;

  try {
    result = await signingClient.sendTokens(
      sender,
      receiver,
      [{ denom: DENOM[network], amount: amount }],
      {
        amount: [{ denom: DENOM[network], amount: "500" }],
        gas: "200000",
      }
    );
  } catch (error) {
    const err = error as SystemError;
    const resultObject = {
      isSuccess: false,
      message: err.message,
    } as resultObject;
    return resultObject;
  }

  const afterSenderBalance = await getBalance(sender, network);
  const afterReceiverBalance = await getBalance(receiver, network);

  const resultMessage = `
  sender : ${getBalanceByDenom(
    beforeSenderBalance,
    DENOM[network]
  )} -> ${getBalanceByDenom(afterSenderBalance, DENOM[network])}
  receiver : ${getBalanceByDenom(
    beforeReceiverBalance,
    DENOM[network]
  )} -> ${getBalanceByDenom(afterReceiverBalance, DENOM[network])} 
  txHash: ${result.transactionHash}`;

  const resultObject = {
    isSuccess: true,
    message: resultMessage,
  } as resultObject;
  return resultObject;
};

/**
 * denom으로 잔액 조회
 * @param array
 * @param denom
 * @returns
 */
const getBalanceByDenom = (array: readonly Coin[], denom: string) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].denom === denom) {
      return String(Number(array[i].amount) / 10 ** 6);
    }
  }
};
