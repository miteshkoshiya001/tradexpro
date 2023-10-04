import { AMOUNT_PRICE } from "helpers/core-constants";
import p2pResuest from "lib/p2pRequest";
//Create Ads
export const createUpdateP2pAds = async (formData: any) => {
  const { data } = await p2pResuest.post("/ads", formData);
  return data;
};
export const UpdateP2pAds = async (formData: any) => {
  const { data } = await p2pResuest.post("/ads-edit", formData);
  return data;
};
export const getAdsCreateSettings = async () => {
  const { data } = await p2pResuest.get("/ads-create-setting");
  return data;
};
export const getAdsAvailanleBalance = async (
  type: number,
  coin_type: string
) => {
  const { data } = await p2pResuest.post("/ads-available-balance", {
    type: type,
    coin_type: coin_type,
  });
  return data;
};
export const getMarketHighestLowest = async (coin_type: any, currency: any) => {
  const { data } = await p2pResuest.get(
    `/ads-price-get?coin_type=${coin_type}&currency=${currency}`
  );
  return data;
};
export const getMarketPrice = async (coin: any, currency: any) => {
  const { data } = await p2pResuest.post(`/get-market-price`, {
    coin: coin,
    currency: currency,
  });
  return data;
};
//Trade Page Ads
export const getAdsDetails = async (ads_type: number, uid: string) => {
  const { data } = await p2pResuest.get(
    `/ads-details?ads_type=${ads_type}&uid=${uid}`
  );
  return data;
};
// ads-market-setting
export const getAdsMarketSettings = async () => {
  const { data } = await p2pResuest.get(`/ads-market-setting`);
  return data;
};
export const adsFilterChanges = async (
  type: number,
  amount: number,
  coin: string,
  currency: string,
  payment_method: string,
  country: string,
  per_page: number,
  page: number
) => {
  const { data } = await p2pResuest.post(`/ads-filter-change`, {
    type: type,
    amount: amount,
    coin: coin,
    currency: currency,
    payment_method: payment_method,
    country: country,
    per_page: per_page,
    page: page,
  });
  return data;
};
//Payment Method
export const AddPaymentMethod = async (formData: any) => {
  const { data } = await p2pResuest.post("/payment-method", formData);
  return data;
};
export const paymentMethodDetails = async (uid: string) => {
  const { data } = await p2pResuest.get(`/details-payment-method-${uid}`);
  return data;
};
export const getPaymentMethods = async (per_page: number, page: number) => {
  const { data } = await p2pResuest.get(
    `/payment-method?per_page=${per_page}&page=${page}`
  );
  return data;
};
export const adminPaymentMethods = async () => {
  const { data } = await p2pResuest.get(`/admin-payment-method`);
  return data;
};
//my ads
export const changeAdsStatus = async (type: number, id: string) => {
  const { data } = await p2pResuest.post("/ads-status-change", {
    type: type,
    id: id,
  });
  return data;
};
export const userAdsFilterChange = async (
  type: number,
  amount: number,
  coin: string,
  currency: string,
  payment_method: string,
  country: string,
  per_page: number,
  page: number,
  status: any
) => {
  const { data } = await p2pResuest.post("/user-ads-filter", {
    type: type,
    amount: amount,
    coin: coin,
    currency: currency,
    payment_method: payment_method,
    country: country,
    per_page: per_page,
    page: page,
    ads_status: status,
  });
  return data;
};
export const p2pOrderRate = async (
  ads_type: any,
  ads_id: any,
  amount: any,
  price: any
) => {
  const { data } = await p2pResuest.post(
    "/get-p2p-order-rate",
    amount
      ? {
          ads_type: ads_type,
          ads_id: ads_id,
          amount: amount,
        }
      : {
          ads_type: ads_type,
          ads_id: ads_id,
          price: price,
        }
  );
  return data;
};
//Wallet
export const getWalletList = async (per_page: number, page: number) => {
  const { data } = await p2pResuest.get(
    `/wallets?per_page=${per_page}&page=${page}`
  );
  return data;
};
export const walletBalanceTransfer = async (
  type: any,
  coin: any,
  amount: any
) => {
  const { data } = await p2pResuest.post("/transfer-wallet-balance", {
    type: type,
    coin: coin,
    amount: amount,
  });
  return data;
};
// trade
// place-p2p-order
export const placeP2POrder = async (
  ads_type: number,
  ads_id: string,
  payment_id: string,
  value: number,
  lastChanged: number
) => {
  const { data } = await p2pResuest.post(
    "/place-p2p-order",
    lastChanged === AMOUNT_PRICE
      ? {
          ads_type: ads_type,
          ads_id: ads_id,
          payment_id: payment_id,
          price: value,
        }
      : {
          ads_type: ads_type,
          ads_id: ads_id,
          payment_id: payment_id,
          amount: value,
        }
  );
  return data;
};
// get-p2p-order-details
//

// export get-gift-card-order
export const getGiftCardDetails = async (order_uid: string) => {
  const { data } = await p2pResuest.get(
    `/get-gift-card-order?order_uid=${order_uid}`
  );
  return data;
};
export const getP2pOrderDetails = async (order_uid: string) => {
  const { data } = await p2pResuest.post("/get-p2p-order-details", {
    order_uid: order_uid,
  });
  return data;
};
export const myP2pOrder = async (
  per_page: number,
  page: number,
  selectedStatus: any,
  selectedCoin: any,
  fromDate: any,
  toDate: any
) => {
  const { data } = await p2pResuest.get(
    `/my-p2p-order?per_page=${per_page}&page=${page}&ads_status=${
      selectedStatus ? selectedStatus : "alll"
    }&type=all&coin=${
      selectedCoin ? selectedCoin : "all"
    }&fromDate=${fromDate}&toDate=${toDate}`
  );
  return data;
};
export const myP2pOrderListData = async () => {
  const { data } = await p2pResuest.get(`/my-order-list-data`);
  return data;
};
export const myP2pDisputeOrder = async (per_page: number, page: number) => {
  const { data } = await p2pResuest.get(
    `/my-p2p-dispute?per_page=${per_page}&page=${page}&type=all&coin=all`
  );
  return data;
};
export const getMyAdsDetails = async (ads_type: any, uid: any) => {
  const { data } = await p2pResuest.post(`/my-ads-details`, {
    uid: uid,
    ads_type: ads_type,
  });
  return data;
};
export const getAvailableBalance = async (
  ads_type: any,
  coin_type: any,
  uid = null
) => {
  const { data } = await p2pResuest.post(
    `/ads-available-balance`,
    uid
      ? {
          coin_type: coin_type,
          type: ads_type,
          uid: uid,
        }
      : {
          coin_type: coin_type,
          type: ads_type,
        }
  );
  return data;
};
export const payNowGiftCardOrder = async (formData: any) => {
  const { data } = await p2pResuest.post("/pay-now-gift-card-order", formData);
  return data;
};
export const paymentP2pOrder = async (formData: any) => {
  const { data } = await p2pResuest.post("/payment-p2p-order", formData);
  return data;
};
export const p2pOrderCancel = async (formData: any) => {
  const { data } = await p2pResuest.post("/cancel-p2p-order", formData);
  return data;
};
export const giftCardOrderCancel = async (formData: any) => {
  const { data } = await p2pResuest.post("/gift-card-order-cancel", formData);
  return data;
};
// payment-confirm-gift-card-order

export const PaymentConfirmGiftCardOrder = async (formData: any) => {
  const { data } = await p2pResuest.post(
    "/payment-confirm-gift-card-order",
    formData
  );
  return data;
};

// release-p2p-order
export const releaseP2pOrder = async (formData: any) => {
  const { data } = await p2pResuest.post("/release-p2p-order", formData);
  return data;
};
// wallets
export const getWallets = async (per_page: any, page: any, search: any) => {
  const { data } = await p2pResuest.get(
    `/wallets?per_page=${per_page}&page=${page}&search=${search}`
  );
  return data;
};
export const orderFeedback = async (formData: any) => {
  const { data } = await p2pResuest.post("/order-feedback", formData);
  return data;
};
export const giftCardOrderFeedback = async (formData: any) => {
  const { data } = await p2pResuest.post(
    "/update-gift-card-order-feedback",
    formData
  );
  return data;
};
// update-gift-card-order-feedback
// dispute-process
export const disputeProcess = async (formData: any) => {
  const { data } = await p2pResuest.post("/dispute-process", formData);
  return data;
};
// gift-card-order-dispute
export const disputeProcessGiftCard = async (formData: any) => {
  const { data } = await p2pResuest.post("/gift-card-order-dispute", formData);
  return data;
};

// send-message
export const sendMessageTrade = async (formData: any) => {
  const { data } = await p2pResuest.post("/send-message", formData);
  return data;
};
export const sendMessageGift = async (formData: any) => {
  const { data } = await p2pResuest.post("/send-message-gift", formData);
  return data;
};
// user-center
export const userCenter = async () => {
  const { data } = await p2pResuest.get("/user-center");
  return data;
};
export const userProfileID = async (id: any) => {
  const { data } = await p2pResuest.get(`/user-profile?id=${id}`);
  return data;
};

export const getGiftCardTradeHeder = async () => {
  const { data } = await p2pResuest.get(`/get-gift-card-trade-header`);
  return data;
};
