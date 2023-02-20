type ObjType = {
  [index: string]: string;
  nova: string;
  cosmos: string;
  osmosis: string;
};

export const RPC_URL: ObjType = {
  nova: "wss://champagne-tendermint.dev-supernova.xyz",
  cosmos: "wss://champagne-cosmos-tendermint.dev-supernova.xyz",
  osmosis: "wss://champagne-osmosis-tendermint.dev-supernova.xyz",
};

export const DENOM: ObjType = {
  nova: "unova",
  cosmos: "uatom",
  osmosis: "uosmo",
};

export const TICKER: ObjType = {
  nova: "nova",
  cosmos: "atom",
  osmosis: "osmo",
};

export const PREFIX: ObjType = {
  nova: "nova",
  cosmos: "cosmos",
  osmosis: "osmo",
};
