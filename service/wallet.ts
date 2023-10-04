import request from "lib/request";

export const WalletListApi = async (url: string) => {
  const { data } = await request.get(url);
  return data;
};
export const GetCoinListApi = async () => {
  const { data } = await request.get("get-coin-list");
  return data;
};
export const WalletDepositApi = async (id: number) => {
  const { data } = await request.get(`/wallet-deposit-${id}`);
  return data;
};
export const WalletWithdrawApi = async (id: number) => {
  const { data } = await request.get(`/wallet-withdrawal-${id}`);
  return data;
};
export const MyWalletProcessSidebar = async (id: string) => {
  const { data } = await request.get(
    `/wallet-history-app?type=${id}&per_page=20&page=1`
  );
  return data;
};
export const WalletWithdrawProcessApi = async (credential: any) => {
  const { data } = await request.post("/wallet-withdrawal-process", credential);
  return data;
};
export const GetWalletAddress = async (credential: any) => {
  const { data } = await request.post("/get-wallet-network-address", {
    wallet_id: credential.wallet_id,
    network_type: credential.network_type,
  });
  return data;
};

export const getFeeAmountApi = async (credential: any) => {
  const { data } = await request.post("/pre-withdrawal-process", credential);
  return data;
};
