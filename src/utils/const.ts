type ObjType = {
  [index: string]: string;
  nova: string;
  cosmos: string;
};

export const RPC_URL: ObjType = {
  nova: "wss://champagne-tendermint.dev-supernova.xyz",
  cosmos: "wss://rpc.sentry-01.theta-testnet.polypore.xyz",
};

export const DENOM: ObjType = {
  nova: "unova",
  cosmos: "uatom",
};

export const TICKER: ObjType = {
  nova: "nova",
  cosmos: "atom",
};
