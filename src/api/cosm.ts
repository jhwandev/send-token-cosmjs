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

//Rpc주소
const rpc = "rpc.sentry-01.theta-testnet.polypore.xyz:26657"; //cosmos testnet

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
export const getBalance = async (address: string): Promise<readonly Coin[]> => {
  const client = await StargateClient.connect(rpc);
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
  amount: string
): Promise<DeliverTxResponse> => {
  // 니모닉 추출
  const signer: OfflineDirectSigner = await getSignerFromMnemonic(
    mnemonic,
    "cosmos"
  );
  const sender: string = (await signer.getAccounts())[0].address;

  // signingClient 생성
  const signingClient: SigningStargateClient =
    await SigningStargateClient.connectWithSigner(rpc, signer);

  // 토큰 전송
  const result = await signingClient.sendTokens(
    sender, //sender
    receiver, //receiver
    [{ denom: "uatom", amount: amount }],
    {
      amount: [{ denom: "uatom", amount: "500" }],
      gas: "200000",
    }
  );
  return result;
};
