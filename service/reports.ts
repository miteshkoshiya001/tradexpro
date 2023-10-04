import request from "lib/request";

export const WithdrawAndDepositHistoryApi = async (
  type: string,
  per_page: number,
  page: number,
  search: any
) => {
  const { data } = await request.get(
    `/wallet-history-app?type=${type}&per_page=${per_page}&page=${page}&search=${search}`
  );
  return data;
};

export const AllBuyOrdersHistoryApi = async (
  per_page: number,
  page: number,
  column_name: string,
  order_by: string,
  search: any
) => {
  const { data } = await request.get(
    `/all-buy-orders-history-app?per_page=${per_page}&page=${page}&column_name=${column_name}&order_by=${order_by}&search=${search}`
  );
  return data;
};
export const ReferralHistoryApi = (
  per_page: any,
  page: any,
  column_name: string,
  order_by: string,
  type: any,
  search: any
) => {
  return request.get(
    `/referral-history?page=${page}&limit=${per_page}&type=${type}&search=${search}`
  );
};

export const AllStopLimitOrdersHistoryApi = async (
  per_page: number,
  page: number,
  column_name: string,
  order_by: string,
  search: any
) => {
  const { data } = await request.get(
    `/get-all-stop-limit-orders-app?per_page=${per_page}&page=${page}&column_name=${column_name}&order_by=${order_by}&search=${search}`
  );
  return data;
};
export const AllSellOrdersHistoryApi = async (
  per_page: number,
  page: number,
  column_name: string,
  order_by: string,
  search: any
) => {
  const { data } = await request.get(
    `/all-sell-orders-history-app?per_page=${per_page}&page=${page}&column_name=${column_name}&order_by=${order_by}&search=${search}`
  );
  return data;
};
export const AllTransactionHistoryApi = async (
  per_page: number,
  page: number,
  search: any
) => {
  const { data } = await request.get(
    `/all-transaction-history-app?per_page=${per_page}&page=${page}&search=${search}`
  );
  return data;
};
export const CoinConvertHistoryApi = async (
  per_page: number,
  page: number,
  search: any
) => {
  const { data } = await request.get(
    `/coin-convert-history-app?per_page=${per_page}&page=${page}&search=${search}`
  );
  return data;
};
export const currencyDepositHistory = async (
  per_page: number,
  page: number,
  column_name: string,
  order_by: string,
  search: any
) => {
  const { data } = await request.get(
    `/currency-deposit-history?per_page=${per_page}&page=${page}&column_name=${column_name}&order_by=${order_by}&search=${search}`
  );
  return data;
};

export const currencyWithdrawHistory = async (
  per_page: number,
  page: number,
  column_name: string,
  order_by: string,
  search: any
) => {
  const { data } = await request.get(
    `/fiat-withdrawal-history?per_page=${per_page}&page=${page}&column_name=${column_name}&order_by=${order_by}&search=${search}`
  );
  return data;
};

export const getFiatHistoryApi = async (
  type: any,
  limit: any,
  page: any,
  search: any
) => {
  const { data } = await request.get(
    `/wallet-currency-${type}-history?search=${search}&limit=${limit}&page=${page}`
  );
  return data;
};
