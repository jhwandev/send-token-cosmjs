type ObjType = {
  [index: string]: string;
  nova: string;
  cosmos: string;
};

export const RPC_URL: ObjType = {
  nova: "champagne.dev-supernova.xyz:26657",
  cosmos: "rpc.sentry-01.theta-testnet.polypore.xyz:26657",
};

export const DENOM: ObjType = {
  nova: "unova",
  cosmos: "uatom",
};

export const TICKER: ObjType = {
  nova: "nova",
  cosmos: "atom",
};
