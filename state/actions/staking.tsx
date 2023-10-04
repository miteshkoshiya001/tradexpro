import { SetStateAction } from "react";
import { toast } from "react-toastify";
import {
  GetOfferlist,
  GetOfferlistDetails,
  GetPaymentList,
  InvesmentList,
  InvesmentStatistics,
  InvesmentSubmit,
  investmentCanceled,
} from "service/staking";

export const getOfferListAction = async (setOffers: any, setLoading: any) => {
  setLoading(true);
  const response = await GetOfferlist();
  setOffers(response.data);
  setLoading(false);
};
export const myOrderAction = async (
  per_page: number,
  page: number,
  setReport: React.Dispatch<SetStateAction<object>>,
  setProcessing: React.Dispatch<SetStateAction<boolean>>,
  setStillHistory: React.Dispatch<SetStateAction<boolean>>,
  selectedStatus: any,
  selectedCoin: any,
  fromDate: any,
  toDate: any
) => {
  setProcessing(true);
  const response = await InvesmentList(
    per_page,
    page,
    selectedStatus,
    selectedCoin.value,
    fromDate,
    toDate
  );
  setReport(response.data.data);
  setStillHistory(response.data);
  setProcessing(false);
  return response;
};
// InvesmentList;
export const GetOfferlistDetailsAction = async (
  uid: any,
  setDetails: any,
  setLoading: any,
  setOfferList: any
) => {
  setLoading(true);
  const response = await GetOfferlistDetails(uid);
  setDetails(response.data?.offer_details);
  setOfferList(response.data?.offer_list);
  console.log(response.data, "response.data");
  setLoading(false);
};
// InvesmentSubmit;
export const InvesmentSubmitAction = async (
  uid: any,
  auto_renew_status: number,
  amount: number,
  setbuttonLoading: any,
  router: any
) => {
  setbuttonLoading(true);
  const response = await InvesmentSubmit(uid, auto_renew_status, amount);
  if (response.success) {
    router.push("/staking");
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }
  setbuttonLoading(false);
};
export const earningsAction = async (setStatsDetails: any) => {
  const { data } = await InvesmentStatistics();
  setStatsDetails(data);
};
export const GetPaymentListAction = async (
  per_page: number,
  page: number,
  setReport: React.Dispatch<SetStateAction<object>>,
  setProcessing: React.Dispatch<SetStateAction<boolean>>,
  setStillHistory: React.Dispatch<SetStateAction<boolean>>
) => {
  setProcessing(true);
  const response = await GetPaymentList(per_page, page);
  setReport(response.data.data);
  setStillHistory(response.data);
  setProcessing(false);
};

// investmentCanceled();
