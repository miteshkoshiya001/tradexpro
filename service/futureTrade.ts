import request from "lib/futureTradeRequest";

export const appDashboardData = async (pair: string | null) => {
  if (pair) {
    const { data } = await request.get(`/app-dashboard/${pair}`);
    return data;
  } else {
    return null;
  }
};
export const getWalletsFuture = async (
  per_page: any,
  page: any,
  type: number,
  search: any
) => {
  const { data } = await request.get(
    `/wallet-list?limit=${per_page}&page=${page}&type=${type}&search=${search}`
  );
  return data;
};
export const walletBalanceTransferFuture = async (
  type: any,
  coin: any,
  amount: any
) => {
  const { data } = await request.post("/wallet-balance-transfer", {
    transfer_from: type,
    coin_type: coin,
    amount: amount,
  });
  return data;
};
export const appDashboardDataWithoutPair = async () => {
  const { data } = await request.get(`/app-dashboard`);
  return data;
};

export const buyLimitApp = async (
  amount: number,
  price: number,
  trade_coin_id: string,
  base_coin_id: string
) => {
  const { data } = await request.post(`/buy-limit-app`, {
    amount,
    price,
    trade_coin_id,
    base_coin_id,
  });
  return data;
};
export const prePlaceOrderData = async (payload: any) => {
  const { data } = await request.post(`/preplace-order-data`, payload);
  return data;
};

export const buyMarketApp = async (
  amount: number,
  price: number,
  trade_coin_id: string,
  base_coin_id: string
) => {
  const { data } = await request.post(`/buy-market-app`, {
    amount,
    price,
    trade_coin_id,
    base_coin_id,
  });
  return data;
};

export const buyStopLimitApp = async (
  amount: number,
  limit: number,
  stop: number,
  trade_coin_id: string,
  base_coin_id: string
) => {
  const { data } = await request.post(`/buy-stop-limit-app`, {
    amount,

    limit,
    stop,
    trade_coin_id,
    base_coin_id,
  });
  return data;
};

export const sellLimitApp = async (
  amount: number,
  price: number,
  trade_coin_id: string,
  base_coin_id: string
) => {
  const { data } = await request.post(`/sell-limit-app`, {
    amount,
    price,
    trade_coin_id,
    base_coin_id,
  });
  return data;
};
export const sellMarketApp = async (
  amount: number,
  price: number,
  trade_coin_id: string,
  base_coin_id: string
) => {
  const { data } = await request.post(`/sell-market-app`, {
    amount,
    price,
    trade_coin_id,
    base_coin_id,
  });
  return data;
};
export const sellStopLimitApp = async (
  amount: number,
  limit: number,
  stop: number,
  trade_coin_id: string,
  base_coin_id: string
) => {
  const { data } = await request.post(`/sell-stop-limit-app`, {
    amount,
    limit,
    stop,
    trade_coin_id,
    base_coin_id,
  });
  return data;
};

export const ordersHistoryDashboard = async (
  base_coin_id: string,
  trade_coin_id: string,
  dashboard_type: string,
  order_type: string
) => {
  const { data } = await request.get(
    `/get-my-all-orders-app?base_coin_id=${base_coin_id}&trade_coin_id=${trade_coin_id}&dashboard_type=${dashboard_type}&order_type=${order_type}`
  );
  return data;
};

export const tradesHistoryDashboard = async (
  base_coin_id: string,
  trade_coin_id: string,
  dashboard_type: string
) => {
  const { data } = await request.get(
    `/get-my-trades-app?base_coin_id=${base_coin_id}&trade_coin_id=${trade_coin_id}&dashboard_type=${dashboard_type}`
  );
  return data;
};

export const openBookDashboard = async (
  base_coin_id: string,
  trade_coin_id: string,
  dashboard_type: string,
  order_type: string,
  per_page: number
) => {
  const { data } = await request.get(
    `/get-exchange-all-orders-app?per_page=${per_page}&dashboard_type=${dashboard_type}&order_type=${order_type}&base_coin_id=${base_coin_id}&trade_coin_id=${trade_coin_id}`
  );
  return data;
};
export const marketTradesDashboard = async (
  base_coin_id: string,
  trade_coin_id: string,
  dashboard_type: string,
  per_page: number
) => {
  const { data } = await request.get(
    `/get-exchange-market-trades-app?dashboard_type=${dashboard_type}&base_coin_id=${base_coin_id}&trade_coin_id=${trade_coin_id}`
  );
  return data;
};
export const cancelOrderApp = async (type: string, id: string) => {
  const { data } = await request.post(`/cancel-open-order-app`, {
    type,
    id,
  });
  return data;
};

//new

export const preplaceOrderData = async (payload: any) => {
  const { data } = await request.post("/preplace-order-data", payload);
  return data;
};

export const placeBuyOrderData = async (payload: any) => {
  const { data } = await request.post("/placed-buy-order", payload);
  return data;
};

export const placeSellOrderData = async (payload: any) => {
  const { data } = await request.post("/placed-sell-order", payload);
  return data;
};
export const placeCloseOrderData = async (payload: any) => {
  const { data } = await request.post("/close-long-short-order", payload);
  return data;
};

export const closeLongShortAllOrder = async (payload: any) => {
  const { data } = await request.post("/close-long-short-all-orders", payload);
  return data;
};

export const getLongShortPositionOrderList = async (base: any, trade: any) => {
  const { data } = await request.get(
    `/get-long-short-position-order-list?base_coin_id=${base}&trade_coin_id=${trade}`
  );
  return data;
};
export const openORderFuture = async (base: any, trade: any) => {
  const { data } = await request.get(
    `/get-long-short-open-order-list?base_coin_id=${base}&trade_coin_id=${trade}`
  );
  return data;
};
export const getTpslFuture = async (uid: string) => {
  const { data } = await request.get(`/get-tp-sl-details-${uid}`);
  return data;
};
export const getShortLongOrderHistory = async (base: any, trade: any) => {
  const { data } = await request.get(
    `/get-long-short-order-history?base_coin_id=${base}&trade_coin_id=${trade}`
  );
  return data;
};
export const canceledBuySellOrder = async (payload: any) => {
  const { data } = await request.post("/canceled-long-short-order", payload);
  return data;
};

export const updateProfitLongShort = async (payload: any) => {
  const { data } = await request.post(
    "/update-profit-loss-long-short-order",
    payload
  );
  return data;
};
export const orderHistoryFuture = async (base: any, trade: any) => {
  const { data } = await request.get(
    `/get-long-short-order-history?base_coin_id=${base}&trade_coin_id=${trade}`
  );
  return data;
};

export const getTransactionHistory = async (coin_id: any) => {
  const { data } = await request.get(
    `/get-long-short-transaction-history?coin_pair_id=${coin_id}`
  );
  return data;
};

export const getLongShortTradeHistory = async (base: any, trade: any) => {
  const { data } = await request.get(
    `/get-long-short-trade-history?base_coin_id=${base}&trade_coin_id=${trade}`
  );
  return data;
};
export const getExchangeMarketDetails = async (selectType : any) => {
  const { data } = await request.get(
    `/get-exchange-market-details-app?limit=8&page=1&type=${selectType}`
  );
  return data;
};
