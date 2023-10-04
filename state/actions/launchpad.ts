import {
  FORM_CHECKBOX,
  FORM_RADIO,
  FORM_SELECT,
  PHASE_SORT_BY_FEATURED,
  PHASE_SORT_BY_FUTURE,
  PHASE_SORT_BY_RECENT,
} from "helpers/core-constants";
import { toast } from "react-toastify";
import {
  ChatHistoryByTokenId,
  DynamicSubmittedFormList,
  getEarningtDetails,
  getLaunchpadList,
  getLaunchpadListDetails,
  getMyTokenBalance,
  GetPaystackPaymentUrlIco,
  getTokenBuyHistory,
  GetTokenList,
  IcoTokenPhaseList,
  launchpadBuyIcoToken,
  launchpadCreateUpdatePhase,
  launchpadCreateUpdatePhaseAdditional,
  launchpadCreateUpdateToken,
  launchpadDynamicFrom,
  launchpadDynamicFromSubmit,
  launchpadLandingPage,
  SendChantByToken,
  TokenBuyIco,
  TokenBuyPage,
  VerificationPaystackPayment,
} from "service/launchpad";
import Router from "next/router";
import { GetCoinListApi } from "service/wallet";
import { Toast } from "react-toastify/dist/components";

const checkDisable = (request: any) => {
  if (request.disable === true) {
    Router.push("/");
  }
};

export const getLaunchpadListAction = async (
  setLaunchpadRecentItem: any,
  setLaunchpadFeatureItem: any,
  setLaunchpadUpcomingItem: any,
  setLoading: any
) => {
  setLoading(true);
  const response = await getLaunchpadList(3, PHASE_SORT_BY_FEATURED);
  checkDisable(response);
  const recentResponse = await getLaunchpadList(3, PHASE_SORT_BY_RECENT);
  const upcomingResponse = await getLaunchpadList(3, PHASE_SORT_BY_FUTURE);
  setLaunchpadRecentItem(recentResponse.data);
  setLaunchpadFeatureItem(response.data);
  setLaunchpadUpcomingItem(upcomingResponse.data);
  setLoading(false);
};
export const getLaunchpadListPageAction = async (
  setLaunchpadList: any,
  constant: any
) => {
  const response = await getLaunchpadList(3, constant);
  checkDisable(response);
  setLaunchpadList(response.data);
};
export const getLaunchpadListDetailsAction = async (
  setLaunchpadListDetails: any,
  id: any,
  setLoading: any
) => {
  const response = await getLaunchpadListDetails(id);
  checkDisable(response);
  setLaunchpadListDetails(response);
  setLoading(false);
};

export const launchpadBuyIcoTokenAction = async () => {
  const response = await launchpadBuyIcoToken();
  checkDisable(response);
  return response;
};

//find binary search in javascript.
// launchpadCreateUpdatePhaseAdditional;
export const launchpadCreateUpdatePhaseAdditionalAction = async (
  inputFields: any,
  ico_phase_id: any,
  setLoading: any
) => {
  setLoading(true);
  const formData = new FormData();
  let i = 0;
  formData.append("ico_phase_id", ico_phase_id);
  inputFields.map((item: any) => {
    formData.append(`titles[${i}]`, item.title);
    formData.append(`values[${i}]`, item.value);
    formData.append(`file_values[${i}]`, item.file ? item.file : null);
    i++;
  });
  const response = await launchpadCreateUpdatePhaseAdditional(formData);
  checkDisable(response);
  if (response.success === true) {
    toast.success(response.message);
  } else if (response.success === false) {
    toast.error(response.message);
  }
  setLoading(false);
};
export const launchpadDynamicFromSubmitAction = async (
  payload: any,
  launchpadForm: any
) => {
  const formData = new FormData();
  let i = 0;
  launchpadForm.map((item: any) => {
    if (item.type === FORM_CHECKBOX) {
      // payload[item.id].form_id}
      formData.append(`ids[${i}]`, payload[item.id].form_id);
      formData.append(`values[${i}]`, String(payload[item.id].value));
      i++;
      return;
    }
    formData.append(`ids[${i}]`, payload[item.id].form_id);
    formData.append(`values[${i}]`, payload[item.id].value);
    i++;
    // formData.append(payload[item.id].form_id, payload[item.id].value);
  });
  const response = await launchpadDynamicFromSubmit(formData);
  checkDisable(response);
  if (response.success === true) {
    toast.success(response.message);
    Router.push("/ico/applied-launchpad");
  } else if (response.success === false) {
    toast.error(response.message);
  }
  return response;
};

export const launchpadDynamicFromAction = async (
  setLaunchpadForm: any,
  formFields: any,
  setFormFields: any,
  setLoading: any
) => {
  setLoading(true);
  const response = await launchpadDynamicFrom();
  checkDisable(response);
  setLaunchpadForm(response.data);

  let tempJson: any = {};
  response?.data?.dynamic_form?.map((item: any) => {
    tempJson[item.id] = {
      value:
        item.type === FORM_CHECKBOX
          ? []
          : item.type === FORM_RADIO
          ? [item?.optionList.length > 0 && item?.optionList[0]]
          : "",
      form_id: item.id,
    };
  });
  setFormFields(tempJson);
  setLoading(false);
};
export const getLaunchpadLandingPageAction = async (
  setLaunchpadLandingPage: any
) => {
  const response = await launchpadLandingPage();
  checkDisable(response);
  setLaunchpadLandingPage(response);
};
export const DynamicSubmittedFormListAction = async (
  per_page: number,
  page: number,
  setReport: any,
  setProcessing: any,
  setStillHistory: any,
  column_name: string,
  order_by: string
) => {
  setProcessing(true)
  const response = await DynamicSubmittedFormList(
    per_page,
    page,
    column_name,
    order_by
  );
  checkDisable(response);
  if (response.success === true) {
    setReport(response.data.data);
    setStillHistory(response.data);
  }
  setProcessing(false);

};

export const launchpadCreateUpdateTokenAction = async (
  payload: any,
  setLoading: any,
  image: any
) => {
  setLoading(true);
  if (Object.keys(payload).length > 0) {
    const formData: any = new FormData();
    formData.append("form_id", payload.form_id);
    formData.append("base_coin", payload.base_coin);
    formData.append("token_name", payload.token_name);
    formData.append("network", payload.network);
    formData.append("wallet_address", payload.wallet_address);
    formData.append("contract_address", payload.contract_address);
    formData.append("wallet_private_key", payload.wallet_private_key);
    formData.append("chain_id", payload.chain_id);
    formData.append("image", image);
    formData.append("decimal", payload.decimal);
    formData.append("chain_link", payload.chain_link);
    formData.append("gas_limit", payload.gas_limit);
    formData.append("id", payload.id);
    formData.append("details_rule", payload.details_rule);
    formData.append("website_link", payload.website_link);
    formData.append("token_symbol", payload.token_symbol);
    const response = await launchpadCreateUpdateToken(formData);
    checkDisable(response);
    if (response.success === true) {
      toast.success(response.message);
      Router.push("/ico/ico-tokens");
    } else if (response.success === false) {
      toast.error(response.message);
    }
    return response;
  }
  setLoading(false);
};
export const launchpadCreateUpdatePhaseAction = async (
  payload: any,
  setLoading: any,
  id: any
) => {
  setLoading(true);
  if (Object.keys(payload).length > 0) {
    const formData: any = new FormData();
    formData.append("ico_token_id", payload.ico_token_id);
    formData.append("coin_price", payload.coin_price);
    formData.append("maximum_purchase_price", payload.maximum_purchase_price);
    formData.append("minimum_purchase_price", payload.minimum_purchase_price);
    formData.append("coin_currency", payload.coin_currency);
    formData.append("phase_title", payload.phase_title);
    formData.append("start_date", payload.start_date);
    formData.append("end_date", payload.end_date);
    formData.append("description", payload.description);
    formData.append("video_link", payload.video_link);
    formData.append("image", payload.image);
    formData.append("social_link[1]", payload.social_link["1"]);
    formData.append("social_link[2]", payload.social_link["2"]);
    formData.append("social_link[3]", payload.social_link["3"]);
    formData.append("id", payload.id === null ? null : payload.id);
    formData.append("total_token_supply", payload.total_token_supply);
    const response = await launchpadCreateUpdatePhase(formData);
    checkDisable(response);
    if (response.success === true) {
      toast.success(response.message);
      Router.push("/ico/token-phase-list/" + payload.ico_token_id);
    } else if (response.success === false) {
      toast.error(response.message);
    }
    return response;
  }
};

// IcoTokenPhaseList;
export const IcoTokenPhaseListAction = async (
  per_page: number,
  page: number,
  setReport: any,
  setProcessing: any,
  setStillHistory: any,
  column_name: string,
  order_by: string,
  id: number
) => {
  const response = await IcoTokenPhaseList(
    per_page,
    page,
    column_name,
    order_by,
    id
  );
  checkDisable(response);
  if (response.success === true) {
    setReport(response.data.data);
    setStillHistory(response.data);
  }
};
export const GetTokenListAction = async (
  per_page: number,
  page: number,
  setReport: any,
  setProcessing: any,
  setStillHistory: any,
  column_name: string,
  order_by: string,
  search: any
) => {
  const response = await GetTokenList(per_page, page, column_name, order_by, search);
  checkDisable(response);
  if (response.success === true) {
    setReport(response.data.data);
    setStillHistory(response.data);
  }
};
export const getEarningDetailsAction = async (
  setLoading: any,
  setData: any
) => {
  setLoading(true);

  const response = await getEarningtDetails();
  checkDisable(response);
  if (response.success === true) {
    setData(response.data);
  }
  setLoading(false);

};

export const getMyTokenBalanceAction = async (
  per_page: number,
  page: number,
  setReport: any,
  setProcessing: any,
  setStillHistory: any,
  column_name: string,
  order_by: string
) => {
  setProcessing(true)
  const response = await getMyTokenBalance(
    per_page,
    page,
    column_name,
    order_by
  );
  checkDisable(response);
  if (response.success === true) {
    setReport(response.data.data);
    setStillHistory(response.data);
  }
  setProcessing(false);

};
export const getTokenBuyHistoryAction = async (
  per_page: number,
  page: number,
  setReport: any,
  setProcessing: any,
  setStillHistory: any,
  column_name: string,
  order_by: string,
  search: any
) => {
  setProcessing(true)
  const response = await getTokenBuyHistory(
    per_page,
    page,
    column_name,
    order_by,
    search
  );
  checkDisable(response);
  if (response.success === true) {
    setReport(response.data.data);
    setStillHistory(response.data);
  }
  setProcessing(false);
};
export const TokenBuyPageAction = async (setPage: any, setLoading: any) => {
  const response = await TokenBuyPage();
  checkDisable(response);
  setLoading(true);
  if (response.success === true) {
    setPage(response.data);
  }
  setLoading(false);
};
// /token-buy-ico
export const PaystackAction = async (
  initialData: any,
  setLoading: any,
  email: any,
  amount: any,
  payment_method: any
) => {
  setLoading(true);
  const formData = new FormData();
  formData.append("email", email);
  formData.append("amount", amount);
  formData.append("phase_id", initialData.phase_id);
  formData.append("token_id", initialData.token_id);
  formData.append("payment_method", payment_method);
  const response = await TokenBuyIco(formData);
  checkDisable(response);

  if (response.success === true) {
    toast.success(response.message);
    window.open(response.data.authorization_url, "_blank");
  } else {
    toast.error(response.message);
  }
  setLoading(false);
};

export const TokenBuyIcoBankAction = async (
  initialData: any,
  setLoading: any,
  doc: any,
  bank_id: any,
  amount: any,
  payment_method: any,
  ref: any,
  pay_currency: any
) => {
  setLoading(true);
  const formData = new FormData();
  formData.append("phase_id", initialData.phase_id);
  formData.append("token_id", initialData.token_id);
  formData.append("bank_slep", doc ? doc : "");
  formData.append("bank_id", bank_id);
  formData.append("amount", amount);
  formData.append("payment_method", payment_method);
  formData.append("bank_ref", ref);
  formData.append("pay_currency", pay_currency);
  const response = await TokenBuyIco(formData);
  checkDisable(response);

  if (response.success === true) {
    toast.success(response.message);
    Router.push("/ico/token-buy-history");
  } else {
    toast.error(response.message);
  }
  setLoading(false);
};
export const TokenBuyIcoCryptoAction = async (
  initialData: any,
  setLoading: any,
  payer_wallet: any,
  amount: any,
  payment_method: any
) => {
  setLoading(true);
  const formData = new FormData();
  formData.append("phase_id", initialData.phase_id);
  formData.append("token_id", initialData.token_id);
  formData.append("payer_wallet", payer_wallet);
  formData.append("amount", amount);
  formData.append("payment_method", payment_method);
  const response = await TokenBuyIco(formData);
  checkDisable(response);

  if (response.success === true) {
    toast.success(response.message);
    Router.push("/ico/token-buy-history");
  } else {
    toast.error(response.message);
  }
  setLoading(false);
};
export const TokenBuyIcoStripeAction = async (
  initialData: any,
  setLoading: any,
  amount: any,
  stripe_token: any,
  pay_currency: any,
  payment_method: any
) => {
  setLoading(true);
  const formData = new FormData();
  formData.append("phase_id", initialData.phase_id);
  formData.append("token_id", initialData.token_id);
  formData.append("amount", amount);
  formData.append("stripe_token", stripe_token);
  formData.append("payment_method", payment_method);
  formData.append("pay_currency", pay_currency);
  const response = await TokenBuyIco(formData);
  checkDisable(response);

  if (response.success === true) {
    toast.success(response.message);
    Router.push("/ico/token-buy-history");
  } else {
    toast.error(response.message);
  }
  setLoading(false);
};
export const TokenBuyIcoPaypalAction = async (credentials: any) => {
  const response = await TokenBuyIco(credentials);
  checkDisable(response);

  if (response.success === true) {
    toast.success(response.message);
    Router.push("/ico/token-buy-history");
  } else {
    toast.error(response.message);
  }
};
export const TokenBuyIcoPaystackAction = async (credentials: any) => {
  const response = await VerificationPaystackPayment(credentials);
  checkDisable(response);

  if (response.success === true) {
    toast.success(response.message);
    Router.push("/ico/token-buy-history");
  } else {
    toast.error(response.message);
    Router.push("/ico");
  }
};
export const SendChantByTokenAction = async (
  token_id: any,
  file: any,
  message: any,
  setMessage: any,
  setSendFile: any,
  setFile: any,
  selectedAdmin: any
) => {
  const formData = new FormData();
  if (!selectedAdmin) {
    toast.error("Please select an admin first");
    return;
  }
  formData.append("token_id", token_id);
  formData.append("message", message);
  formData.append("receiver_id", selectedAdmin);
  // formData.append("admin_id", selectedAdmin);
  if (file) formData.append("file", file);
  setMessage("");
  const response = await SendChantByToken(formData);
  checkDisable(response);
  setSendFile(null);
  setFile(null);
  // return response;
};
