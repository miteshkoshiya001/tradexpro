import launchpadRequest from "lib/launchpadRequest";

export const getLaunchpadList = async (page: any, type: any) => {
  const { data } = await launchpadRequest.get(
    `/ico-phase-active-list?per_page=${page}&type=${type}`
  );
  return data;
};

export const getLaunchpadListDetails = async (id: number) => {
  const { data } = await launchpadRequest.get(
    `/active-ico-phase-details?id=${id}`
  );
  return data;
};
// /token-earns
export const getEarningtDetails = async () => {
  const { data } = await launchpadRequest.get(`/token-earns`);
  return data;
};
export const getTokenWithdrawPrice = async (payload: any) => {
  const { data } = await launchpadRequest.post(
    `/token-withdraw-price`,
    payload
  );
  return data;
};
export const withDrawMoney = async (payload: any) => {
  const { data } = await launchpadRequest.post(
    `/token-withdraw-request`,
    payload
  );
  return data;
};

export const getMyTokenBalance = async (
  per_page: any,
  page: any,
  column_name: any,
  order_by: any
) => {
  const { data } = await launchpadRequest.get(
    `/my-token-balance?per_page=${per_page}&page=${page}&column_name=${column_name}&order_by=${order_by}`
  );
  return data;
};
export const getTokenBuyHistory = async (
  per_page: any,
  page: any,
  column_name: any,
  order_by: any,
  search: any
) => {
  const { data } = await launchpadRequest.get(
    `/token-buy-history?per_page=${per_page}&page=${page}&column_name=${column_name}&order_by=${order_by}&search=${search}`
  );
  return data;
};

export const TokenPriceInfo = async (
  amount: any,
  phase_id: any,
  id: any,
  pay_currency: any,
  payer_wallet: any,
  token_id: any,
  payment_method: any
) => {
  if (!pay_currency) {
    const { data } = await launchpadRequest.get(
      `/token-price-info?phase_id=${phase_id}&amount=${amount}&wallet_id=${id}&token_id=${token_id}&payment_method=${payment_method}&payer_wallet=${payer_wallet}`
    );
    return data;
  } else {
    const { data } = await launchpadRequest.get(
      `/token-price-info?phase_id=${phase_id}&amount=${amount}&token_id=${token_id}&payment_method=${payment_method}&pay_currency=${pay_currency}`
    );
    return data;
  }
};

export const launchpadBuyIcoToken = async () => {
  const { data } = await launchpadRequest.get("/buy-ico-token");
  return data;
};
export const launchpadDynamicFromSubmit = async (payload: any) => {
  const { data } = await launchpadRequest.post("/dynamic-form-submit", payload);
  return data;
};

export const launchpadDynamicFrom = async () => {
  const { data } = await launchpadRequest.get("/dynamic-form");
  return data;
};
export const launchpadLandingPage = async () => {
  const { data } = await launchpadRequest.get("/launchpad-settings");
  return data;
};
export const DynamicSubmittedFormList = async (
  per_page: number,
  page: number,
  column_name: string,
  order_by: string
) => {
  const { data } = await launchpadRequest.get(
    `/submitted-dynamic-form-list?per_page=${per_page}&page=${page}&column_name=${column_name}&order_by=${order_by}`
  );
  return data;
};
export const launchpadCreateUpdateToken = async (payload: any) => {
  const { data } = await launchpadRequest.post(
    "/create-update-ico-token",
    payload
  );
  return data;
};
// get-contract-address-details
export const getContractAddressDetails = async (payload: any) => {
  const { data } = await launchpadRequest.post(
    "/get-contract-address-details",
    payload
  );
  return data;
};
export const launchpadCreateUpdatePhase = async (payload: any) => {
  const { data } = await launchpadRequest.post(
    "/create-update-ico-token-phase",
    payload
  );
  return data;
};
export const launchpadCreateUpdatePhaseAdditional = async (payload: any) => {
  const { data } = await launchpadRequest.post(
    "/create-update-ico-token-phase-additional",
    payload
  );
  return data;
};
export const GetTokenList = async (
  per_page: number,
  page: number,
  column_name: string,
  order_by: string,
  search: any
) => {
  const { data } = await launchpadRequest.get(
    `/ico-list-user?per_page=${per_page}&page=${page}&column_name=${column_name}&order_by=${order_by}&search=${search}`
  );
  return data;
};
export const icoListDetails = async (id: any) => {
  const { data } = await launchpadRequest.get(`/ico-details?id=${id}`);
  return data;
};
export const phaseListDetails = async (id: any, ctxCookie: any) => {
  const { data } = await launchpadRequest.get(
    `/ico-token-phase-details?id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${ctxCookie}`,
      },
    }
  );
  return data;
};
export const getAdditionalPhaseDetails = async (id: any, ctxCookie: any) => {
  const { data } = await launchpadRequest.get(
    `/ico-token-phase-additional-details?id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${ctxCookie}`,
      },
    }
  );
  return data;
};
//127.0.0.1:8000/dynamic-form/api/save-ico-phase-status

export const SaveIcoPhaseStatus = async (id: any) => {
  const { data } = await launchpadRequest.post(`/save-ico-phase-status`, {
    id,
  });
  return data;
};
export const IcoTokenPhaseList = async (
  per_page: number,
  page: number,
  column_name: string,
  order_by: string,
  id: any
) => {
  const { data } = await launchpadRequest.get(
    `/ico-token-phase-list?ico_token_id=${id}&per_page=${per_page}&page=${page}&column_name=${column_name}&order_by=${order_by}`
  );
  return data;
};
// /token-buy-page

export const TokenBuyPage = async () => {
  const { data } = await launchpadRequest.get(`/token-buy-page`);
  return data;
};
// /token-buy-ico
export const TokenBuyIco = async (payload: any) => {
  // const { data } = await launchpadRequest.post(`/token-buy-ico`, payload);
  const { data } = await launchpadRequest.post(`/token-buy-ico-new`, payload);
  return data;
};
export const VerificationPaystackPayment = async (payload: any) => {
  // const { data } = await launchpadRequest.post(`/token-buy-ico`, payload);
  const { data } = await launchpadRequest.post(
    `/verification-paystack-payment`,
    payload
  );
  return data;
};
export const GetPaystackPaymentUrlIco = async (payload: any) => {
  const { data } = await launchpadRequest.post(
    `/get-paystack-payment-url`,
    payload
  );
  return data;
};
export const SendChantByToken = async (payload: any) => {
  const { data } = await launchpadRequest.post(
    `/ico-chat-conversation-store`,
    payload
  );
  return data;
};
export const ChatHistoryByTokenId = async (
  token_id: any,
  selectedAdmin: any
) => {
  const { data } = await launchpadRequest.get(
    `/ico-chat-details?token_id=${token_id}&admin_id=${selectedAdmin}`
  );
  return data;
};
