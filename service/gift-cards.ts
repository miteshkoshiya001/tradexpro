import request from "lib/request";

export const getGiftCardsData = async (ctxCookie: string) => {
  const { data } = await request.get("/gift-card/gift-card-main-page", {
    headers: {
      Authorization: `Bearer ${ctxCookie}`,
    },
  });
  return data;
};

export const getThemedGiftCardCategory = async () => {
  const { data } = await request.get(`/gift-card/gift-card-themes-page`);
  return data;
};

export const getThemedGiftCardDataApi = async (
  category: any,
  page: any,
  limit: any
) => {
  const { data } = await request.get(
    `/gift-card/get-gift-card-themes?uid=${category}&limit=${limit}&page=${page}`
  );

  return data;
};

export const getMyCardPageDataApi = async () => {
  const { data } = await request.get(`/gift-card/my-gift-card-page`);

  return data;
};

export const getMyCardsApi = async (status: any, limit: any, page: any) => {
  const { data } = await request.get(
    `/gift-card/my-gift-card-list?status=${status}&limit=${limit}&page=${page}`
  );

  return data;
};

export const handleCoinsApi = async (coin_type: any) => {
  const { data } = await request.get(
    `/gift-card/gift-card-wallet-data?coin_type=${coin_type}`
  );

  return data;
};

export const getBuyPageDataApi = async (uid: any) => {
  const { data } = await request.get(
    `/gift-card/buy-card-page-data?uid=${uid}`
  );
  return data;
};

export const handleBuyCardApi = async (value: any) => {
  const { data } = await request.post(`/gift-card/buy-card`, {
    ...value,
  });
  return data;
};

export const checkGiftCardApi = async (code: any) => {
  const { data } = await request.get(`gift-card/check-card?code=${code}`);
  return data;
};

export const addGiftCardApi = async (code: any) => {
  const { data } = await request.get(`gift-card/add-gift-card?code=${code}`);
  return data;
};

export const redeemGiftCardApi = async (code: any) => {
  const { data } = await request.get(`gift-card/redeem-card?code=${code}`);
  return data;
};

export const sendGiftCardApi = async (url: any) => {
  const { data } = await request.get(url);
  return data;
};

export const giftCardUpdateApi = async (buyDetails: any) => {
  const { data } = await request.post(`/gift-card/update-card`, {
    ...buyDetails,
  });
  return data;
};

export const getRedeemCodeApi = async (uid: any, pass: any) => {
  const { data } = await request.post(`/gift-card/get-redeem-code`, {
    card_uid: uid,
    password: pass,
  });
  return data;
};
