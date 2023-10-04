import request from "lib/request";

export const getWalletOverviewDataApi = async (coin_type: any) => {
  const { data } = await request.get(
    `/get-wallet-balance-details?coin_type=${coin_type}`
  );
  return data;
};
