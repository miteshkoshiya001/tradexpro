import request from "lib/request";

export const getP2PGiftCardListsApi = async (limit: any, page: any) => {
  const { data } = await request.get(
    `/p2p/get-gift-card-p2p?limit=${limit}&page=${page}`
  );
  return data;
};

export const getP2PGiftCardOrderListsApi = async (
  limit: any,
  page: any,
  status: any
) => {
  const { data } = await request.get(
    `/p2p/get-gift-card-orders?status=${status}&limit=${limit}&page=${page}`
  );
  return data;
};

export const getCreateAdsSettingsDataApi = async () => {
  const { data } = await request.get(`/p2p/get-gift-card-page-data`);
  return data;
};

export const getMyGiftCardAdsListsApi = async (
  limit: any,
  page: any,
  status: any
) => {
  const { data } = await request.get(
    `/p2p/user-gift-card-ads-list?status=${status}&limit=${limit}&page=${page}`
  );
  return data;
};

export const handleAdsDeleteApi = async (ads_id: any) => {
  const { data } = await request.post(`/p2p/gift-card-delete`, {
    gift_card_id: ads_id,
  });
  return data;
};

export const storeAdsHandlerApi = async (formData: any) => {
  const { data } = await request.post(`/p2p/store-gift-card-adds`, formData);
  return data;
};

export const getGiftCardAddsDetailsApi = async (ads_uid: any) => {
  const { data } = await request.get(`/p2p/gift-card-details?uid=${ads_uid}`);
  return data;
};

export const updateAdsHandlerApi = async (formData: any) => {
  const { data } = await request.post(`/p2p/update-gift-card-adds`, formData);
  return data;
};

export const getAllGiftCardAdsApi = async (
  payment_type: any,
  currency_type: any,
  price: any,
  payment_method: any,
  country: any,
  page: any,
  limit: any
) => {
  const { data } = await request.get(
    `p2p/all-gift-card-ads-list?payment_currency_type=${payment_type}&currency_type=${currency_type}&price=${price}&payment_method=${payment_method}&country=${country}&page=${page}&limit=${limit}`
  );
  return data;
};

export const getGiftCardAdsDetailsForBuyApi = async (ads_uid: any) => {
  const { data } = await request.get(
    `/p2p/get-gift-card-ads-details-p2p?uid=${ads_uid}`
  );
  return data;
};

export const buyP2PGiftCardAdsApi = async (params: any) => {
  const { data } = await request.post(`/p2p/place-gift-card-order`, {
    ...params,
  });
  return data;
};

export const getGiftCardDetailsForP2PGiftCardApi = async (giftCardId:any)=> {
  const {data} = await request.get(`/p2p/get-gift-card-details-${giftCardId}`);
  return data;
}
