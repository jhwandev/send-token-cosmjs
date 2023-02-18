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

import { RPC_URL, DENOM } from "utils/const";

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
 * 지갑주소, 네트워크로 전체토큰의 잔액 조회
 * @param address 지갑주소
 * @returns
 */
export const getAllBalance = async (
  address: string,
  network: string
): Promise<readonly Coin[]> => {
  const client = await StargateClient.connect(RPC_URL[network]);
  const result = await client.getAllBalances(address);
  client.disconnect();
  return result;
};

/**
 * 지갑주소, 네트워크, denom으로 특정토큰의 잔액 조회
 * @param address
 * @param network
 * @param denom
 * @returns
 */
export const getBalanceByDenom = async (
  address: string,
  network: string,
  denom: string
): Promise<Coin> => {
  const client = await StargateClient.connect(RPC_URL[network]);
  const result = await client.getBalance(address, denom);
  client.disconnect();
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

  // 전송전 토큰갯수
  const beforeSenderBalance: Coin = await getBalanceByDenom(
    sender,
    network,
    DENOM[network]
  );
  const beforeReceiverBalance: Coin = await getBalanceByDenom(
    receiver,
    network,
    DENOM[network]
  );
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
  } finally {
    // client disconnect
    signingClient.disconnect();
  }

  //전송 후 토큰갯수
  const afterSenderBalance: Coin = await getBalanceByDenom(
    sender,
    network,
    DENOM[network]
  );
  const afterReceiverBalance: Coin = await getBalanceByDenom(
    receiver,
    network,
    DENOM[network]
  );

  // 형식에 맞게 convert
  const beforeSenderAmount: number = convertBalance(beforeSenderBalance.amount);
  const beforeReceiverAmount: number = convertBalance(
    beforeReceiverBalance.amount
  );
  const afterSenderAmount: number = convertBalance(afterSenderBalance.amount);
  const afterReceiverAmount: number = convertBalance(
    afterReceiverBalance.amount
  );

  const resultMessage = `
  sender : ${beforeSenderAmount} -> ${afterSenderAmount}
  receiver : ${beforeReceiverAmount} -> ${afterReceiverAmount} 
  txHash: ${result.transactionHash}`;

  const resultObject = {
    isSuccess: true,
    message: resultMessage,
  } as resultObject;
  return resultObject;
};

const convertBalance = (balance: string): number => {
  return Number(balance) / 10 ** 6;
};
