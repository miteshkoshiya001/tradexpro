import request from "lib/request";

export const GetOfferlist = async () => {
  const { data } = await request.get("/staking/offer-list");
  return data;
};
export const GetOfferlistDetails = async (uid: any) => {
  const { data } = await request.get(`/staking/offer-list-details?uid=${uid}`);
  return data;
};

export const InvesmentSubmit = async (
  uid: any,
  auto_renew_status: number,
  amount: number
) => {
  const { data } = await request.post(`/staking/investment-submit`, {
    amount: amount,
    uid: uid,
    auto_renew_status: auto_renew_status,
  });
  return data;
};

export const InvesmentList = async (
  per_page: number,
  page: number,
  selectedStatus: any,
  selectedCoin: any,
  fromDate: any,
  toDate: any
) => {
  const { data } = await request.get(
    `/staking/investment-list?per_page=${per_page}&page=${page}&ads_status=${
      selectedStatus ? selectedStatus : "alll"
    }&type=all&coin=${
      selectedCoin ? selectedCoin : "all"
    }&fromDate=${fromDate}&toDate=${toDate}`
  );
  return data;
};
// /staking/investment-statistics
export const InvesmentStatistics = async () => {
  const { data } = await request.get("/staking/investment-statistics");
  return data;
};
// staking/landing-details
export const LandingDetailsStaking = async () => {
  const { data } = await request.get("/staking/landing-details");
  return data;
};
export const investmentCanceled = async (uid: string) => {
  const { data } = await request.post("/staking/investment-canceled", {
    uid: uid,
  });
  return data;
};
// staking/get-total-investment-bonus
export const TotalInvestmentBonus = async (uid: any, amount: any) => {
  const { data } = await request.post("/staking/get-total-investment-bonus", {
    uid: uid,
    amount: amount,
  });
  return data;
};
// /staking/investment-get-payment-list
export const GetPaymentList = async (per_page: number, page: number) => {
  const { data } = await request.get(
    `/staking/investment-get-payment-list??per_page=${per_page}&page=${page}`
  );
  return data;
};
