import {
  FLOAT_PRICE,
  FIXED_PRICE,
  PAYMENT_METHOD_BANK,
  PAYMENT_METHOD_CARD,
  PAYMENT_METHOD_MOBILE,
  BUY,
  SELL,
  TRADE_STATUS_ESCROW,
  TRADE_STATUS_PAYMENT_DONE,
  TRADE_STATUS_TRANSFER_DONE,
} from "helpers/core-constants";
import { useApi, usePostApiFunction } from "helpers/hooks";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  createUpdateP2pAds,
  getAdsCreateSettings,
  getMarketHighestLowest,
  adminPaymentMethods,
  AddPaymentMethod,
  getPaymentMethods,
  paymentMethodDetails,
  adsFilterChanges,
  getAdsMarketSettings,
  getAdsDetails,
  p2pOrderRate,
  placeP2POrder,
  myP2pOrder,
  getP2pOrderDetails,
  paymentP2pOrder,
  p2pOrderCancel,
  releaseP2pOrder,
  getWallets,
  orderFeedback,
  userCenter,
  userProfileID,
  userAdsFilterChange,
  getMyAdsDetails,
  UpdateP2pAds,
  getAvailableBalance,
  myP2pDisputeOrder,
  getGiftCardDetails,
  payNowGiftCardOrder,
  PaymentConfirmGiftCardOrder,
  giftCardOrderCancel,
  giftCardOrderFeedback,
} from "service/p2p";
import {
  setP2pDetails,
  setP2pDetailsOrder,
  setTradeChatAll,
} from "state/reducer/user";

export const useAddPostInitial = () => {
  const router = useRouter();
  const { uid, ads_type } = router.query;
  const [adsType, setAdsType] = useState(1);
  const [registerDays, setregisterDays] = useState(0);
  const [coinHolding, setcoinHolding] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState<any>([]);
  const [terms, setTerms] = useState("");
  const [auto_reply, setAuto_reply] = useState("");
  const [selectedPaymentTime, setSelectedPaymentTime] = useState<any>(null);
  const [Amount, setAmount] = useState({
    amount: 0,
    min_limit: 0,
    max_limit: 0,
  });
  const [priceType, setPriceType] = useState(FIXED_PRICE);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [selectedCurrency, setselectedCurrency] = useState<any>(null);
  const [pricePoint, setPricePoint] = useState({
    highest_price: 0,
    lowest_price: 0,
    price: 0,
  });
  const getAdsDetailsAction = async () => {
    let payment_method: any = [];
    let country: any = [];
    const response = await getMyAdsDetails(ads_type, uid);
    const ads = response.data.ads;
    setselectedCurrency({
      value: ads.currency,
      label: ads.currency,
    });
    setSelectedAsset({
      value: ads.coin_type,
      label: ads.coin_type,
    });
    setPriceType(ads?.price_type);
    setPricePoint({
      ...pricePoint,
      price: ads?.price,
    });
    setAmount({
      amount: ads.amount,
      max_limit: ads.maximum_trade_size,
      min_limit: ads.minimum_trade_size,
    });
    if (response.data?.payment_time[0]?.uid) {
      setSelectedPaymentTime({
        label: response.data?.payment_time[0]?.time,
        value: response.data?.payment_time[0]?.uid,
      });
    }

    setTerms(ads?.terms);
    setAuto_reply(ads?.auto_reply);
    setregisterDays(ads?.register_days);
    setregisterDays(ads?.register_days);
    setcoinHolding(ads?.coin_holding);
    // payment_method;
    ads?.payment_method?.map((item: any) => {
      const obj = {
        value: item.uid,
        label: item?.admin_pamynt_method?.name,
      };
      payment_method.push(obj);
    });
    ads?.country?.map((item: any) => {
      const obj = {
        value: item.key,
        label: item.key,
      };
      country.push(obj);
    });
    setSelectedPayment(payment_method);
    setSelectedCountry(country);
  };

  const getAvailableBalanceAction = async () => {
    const response = await getAvailableBalance(adsType, selectedAsset.value);
    if (response.success) {
      setAmount({
        ...Amount,
        amount: response?.data?.balance,
      });
    } else {
      toast.error(response?.message);
    }
  };
  const createUpdateP2pAdsAction = async () => {
    let paymentMethodsCommaSeparated = selectedPayment
      .map((method: any) => method.value)
      .join(",");
    let selectedCountryCommaSeparated = selectedCountry
      .map((method: any) => method.value)
      .join(",");
    let allCountries = data?.data?.country
      ?.map((method: any) => method.key)
      .join(",");
    const formData: any = new FormData();
    formData.append("ads_type", adsType);
    formData.append("coin_type", selectedAsset.value);
    formData.append("fiat_type", selectedCurrency.value);
    formData.append("price_type", priceType);
    formData.append("price", pricePoint.price);
    formData.append("price_rate", pricePoint.price);
    formData.append("amount", Amount.amount);
    formData.append("min_limit", Amount.min_limit);
    formData.append("max_limit", Amount.max_limit);
    formData.append("terms", terms);
    formData.append("auto_reply", auto_reply);
    formData.append(
      "countrys",
      selectedCountry.length > 0 ? selectedCountryCommaSeparated : allCountries
    );
    formData.append("payment_methods", paymentMethodsCommaSeparated);
    formData.append(
      "time_limit",
      selectedPaymentTime?.value ? selectedPaymentTime?.value : 0
    );
    formData.append("register_days", registerDays);
    formData.append("coin_holding", coinHolding);
    const response = await createUpdateP2pAds(formData);
    if (response.success) {
      toast.success(response.message);
      router.push("/p2p");
    } else {
      toast.error(response.message);
    }
  };
  const UpdateP2pAdsAction = async () => {
    let paymentMethodsCommaSeparated = selectedPayment
      .map((method: any) => method.value)
      .join(",");
    let selectedCountryCommaSeparated = selectedCountry
      .map((method: any) => method.value)
      .join(",");
    const formData: any = new FormData();
    formData.append("ads_type", adsType);
    formData.append("ads_uid", uid);
    formData.append("coin_type", selectedAsset.value);
    formData.append("fiat_type", selectedCurrency.value);
    formData.append("price_type", priceType);
    formData.append("price", pricePoint.price);
    formData.append("price_rate", pricePoint.price);
    formData.append("amount", Amount.amount);
    formData.append("min_limit", Amount.min_limit);
    formData.append("max_limit", Amount.max_limit);
    formData.append("terms", terms);
    formData.append("auto_reply", auto_reply);
    formData.append("countrys", selectedCountryCommaSeparated);
    formData.append("payment_methods", paymentMethodsCommaSeparated);
    {
      selectedPaymentTime?.value &&
        formData.append(
          "time_limit",
          selectedPaymentTime?.value ? selectedPaymentTime?.value : 0
        );
    }
    formData.append("register_days", registerDays);
    formData.append("coin_holding", coinHolding);
    const response = await UpdateP2pAds(formData);
    if (response.success) {
      toast.success(response.message);
      router.push("/p2p");
    } else {
      toast.error(response.message);
    }
  };
  const [addStep, setAddStep] = useState("stepOne");
  const { data, loading, error, refreshData } = useApi(getAdsCreateSettings);
  const {
    data: marketData,
    error: marketError,
    loading: marketLoading,
    postData,
    resetData,
  }: any = usePostApiFunction(getMarketHighestLowest);
  useEffect(() => {
    uid && getAdsDetailsAction();
  }, [ads_type, uid]);
  useEffect(() => {
    if (selectedAsset && selectedCurrency) {
      postData(selectedAsset.value, selectedCurrency.value);
    }
  }, [selectedAsset, selectedCurrency]);
  useEffect(() => {
    if (marketData?.success) {
      setPricePoint(marketData.data);
    }
  }, [marketData]);
  return {
    data,
    loading,
    error,
    refreshData,
    addStep,
    setAddStep,
    selectedAsset,
    selectedCurrency,
    setSelectedAsset,
    setselectedCurrency,
    pricePoint,
    priceType,
    setPriceType,
    setPricePoint,
    setSelectedPayment,
    selectedPayment,
    selectedPaymentTime,
    setSelectedPaymentTime,
    Amount,
    setAmount,
    UpdateP2pAdsAction,
    terms,
    uid,
    setTerms,
    auto_reply,
    setAuto_reply,
    selectedCountry,
    setSelectedCountry,
    registerDays,
    coinHolding,
    setregisterDays,
    setcoinHolding,
    adsType,
    setAdsType,
    createUpdateP2pAdsAction,
    getAvailableBalanceAction,
  };
};

export const useCreatePaymentMethods = () => {
  const router: any = useRouter();
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethods, setSelectedMethods] = useState<any>();
  const [SubmitData, setSubmitData] = useState({
    payment_uid: "",
    username: "",
    bank_name: "",
    bank_account_number: "",
    account_opening_branch: "",
    transaction_reference: "",
    card_number: "",
    card_type: "",
    mobile_account_number: "",
  });
  const getData = async () => {
    let payments: any = [];

    const response = await adminPaymentMethods();
    response?.data?.map((asset: any) => {
      const obj = {
        value: asset.uid,
        label: asset.name,
        payment_type: asset.payment_type,
      };
      payments.push(obj);
    });
    setPaymentMethods(payments);
  };
  const handleSelectedMethod = (e: any) => {
    setSelectedMethods(e);
    setSubmitData({ ...SubmitData, payment_uid: e.value });
  };
  const handleCardSelectedMethod = (e: any) => {
    setSubmitData({ ...SubmitData, card_type: e.value });
  };
  useEffect(() => {
    getData();
  }, []);
  const submitData = async () => {
    const formData = new FormData();
    formData.append("payment_uid", SubmitData.payment_uid);
    formData.append("username", SubmitData.username);
    if (selectedMethods?.payment_type === PAYMENT_METHOD_BANK) {
      formData.append("bank_name", SubmitData.bank_name);
      formData.append("bank_account_number", SubmitData.bank_account_number);
      formData.append(
        "account_opening_branch",
        SubmitData.account_opening_branch
      );
      formData.append(
        "transaction_reference",
        SubmitData.transaction_reference
      );
    }
    if (selectedMethods?.payment_type === PAYMENT_METHOD_CARD) {
      formData.append("card_number", SubmitData.card_number);
      formData.append("card_type", SubmitData.card_type);
    }
    if (selectedMethods?.payment_type === PAYMENT_METHOD_MOBILE) {
      formData.append(
        "mobile_account_number",
        SubmitData.mobile_account_number
      );
    }

    const response = await AddPaymentMethod(formData);
    if (response.success) {
      toast.success(response.message);
      router.push("/p2p/p2p-profile");
    } else {
      toast.error(response.message);
    }
  };

  const getDetails = async () => {
    const response = await paymentMethodDetails(router.query.uid.toString());
    setSubmitData(response.data);
    setSelectedMethods({
      payment_type: parseInt(response.data.admin_pamynt_method.payment_type),
    });
  };
  const editData = async () => {
    const formData = new FormData();
    formData.append("payment_uid", SubmitData.payment_uid);
    formData.append("uid", router?.query?.uid);
    formData.append("username", SubmitData.username);
    if (selectedMethods?.payment_type === PAYMENT_METHOD_BANK) {
      formData.append("bank_name", SubmitData.bank_name);
      formData.append("bank_account_number", SubmitData.bank_account_number);
      formData.append(
        "account_opening_branch",
        SubmitData.account_opening_branch
      );
      formData.append(
        "transaction_reference",
        SubmitData.transaction_reference
      );
    }
    if (selectedMethods?.payment_type === PAYMENT_METHOD_CARD) {
      formData.append("card_number", SubmitData.card_number);
      formData.append("card_type", SubmitData.card_type);
    }
    if (selectedMethods?.payment_type === PAYMENT_METHOD_MOBILE) {
      formData.append(
        "mobile_account_number",
        SubmitData.mobile_account_number
      );
    }

    const response = await AddPaymentMethod(formData);
    if (response.success) {
      toast.success(response.message);
      // router.push("/p2p/payment-methods");
    } else {
      toast.error(response.message);
    }
  };
  useEffect(() => {
    if (router.query.uid) {
      getDetails();
    }
  }, [router.query.uid]);

  return {
    paymentMethods,
    setPaymentMethods,
    handleSelectedMethod,
    selectedMethods,
    setSelectedMethods,
    setSubmitData,
    SubmitData,
    handleCardSelectedMethod,
    submitData,
    editData,
    uid: router.query.uid,
  };
};

export const deletePaymentMethodsAction = async (
  per_page: number,
  page: number,
  setReport: React.Dispatch<SetStateAction<object>>,
  setProcessing: React.Dispatch<SetStateAction<boolean>>,
  setStillHistory: React.Dispatch<SetStateAction<boolean>>,
  uid: string
) => {
  setProcessing(true);
  const formData = new FormData();
  formData.append("delete", uid);
  const responseOne = await AddPaymentMethod(formData);
  if (responseOne.success) {
    toast.success(responseOne.message);
  } else {
    toast.error(responseOne.message);
  }

  const response = await getPaymentMethods(per_page, page);
  setReport(response.data.data);
  setStillHistory(response.data);
  setProcessing(false);
  return response;
};
// myP2pOrder
export const myP2pOrderAction = async (
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
  console.log(selectedStatus, "selectedStatus");
  const response = await myP2pOrder(
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
// myP2pOrderListData;
export const myP2pDisputeAction = async (
  per_page: number,
  page: number,
  setReport: React.Dispatch<SetStateAction<object>>,
  setProcessing: React.Dispatch<SetStateAction<boolean>>,
  setStillHistory: React.Dispatch<SetStateAction<boolean>>
) => {
  setProcessing(true);
  const response = await myP2pDisputeOrder(per_page, page);
  setReport(response.data.data);
  setStillHistory(response.data);
  setProcessing(false);
  return response;
};
export const getPaymentMethodsAction = async (
  per_page: number,
  page: number,
  setReport: React.Dispatch<SetStateAction<object>>,
  setProcessing: React.Dispatch<SetStateAction<boolean>>,
  setStillHistory: React.Dispatch<SetStateAction<boolean>>
) => {
  setProcessing(true);
  const response = await getPaymentMethods(per_page, page);
  setReport(response.data.data);
  setStillHistory(response.data);
  setProcessing(false);
  return response;
};

export const landingPageAction = async (
  type: any,
  amount: any,
  coin: any,
  currency: any,
  payment_method: any,
  country: any,
  per_page: any,
  page: any,
  setHistory: any,
  setProcessing: any,
  setStillHistory: any,
  setSettings: any
) => {
  setProcessing(true);
  const { data } = await getAdsMarketSettings();
  setSettings(data);
  const response = await adsFilterChanges(
    type,
    amount,
    coin,
    currency,
    payment_method,
    country,
    per_page,
    page
  );
  setHistory(response?.data?.data);
  setStillHistory(response?.data);
  setProcessing(false);
};
export const landingSettingsAction = async (
  setProcessing: any,
  setSettings: any,
  setFilters: any,
  filters: any,
  data: any
) => {
  setProcessing(true);
  setSettings(data);
  if (data?.assets?.length > 0) {
    setFilters({ ...filters, coin: data?.assets[0]?.coin_type });
  }
  setProcessing(false);
};
// getAdsMarketSettings;
export const getAdsDetailsAction = async (
  uid: any,
  type: any,
  setDetails: any
) => {
  const { data } = await getAdsDetails(type, uid);
  setDetails(data);
};
export const userAdsFilterChangeAction = async (
  type: any,
  amount: any,
  coin: any,
  currency: any,
  payment_method: any,
  status: any,
  country: any,
  per_page: any,
  page: any,
  setHistory: any,
  setProcessing: any,
  setStillHistory: any,
  setSettings: any
) => {
  setProcessing(true);
  const { data } = await getAdsMarketSettings();
  setSettings(data);
  const response = await userAdsFilterChange(
    type,
    amount,
    coin,
    currency,
    payment_method,
    country,
    per_page,
    page,
    status
  );
  setHistory(response?.data?.data);
  setStillHistory(response?.data);
  setProcessing(false);
};
export const p2pOrderRateAction = async (
  ads_type: any,
  ads_id: any,
  amount: any,
  price: any,
  setRate: any
) => {
  const { data } = await p2pOrderRate(
    parseInt(ads_type),
    ads_id,
    amount,
    price
  );
  setRate(data);
  console.log(data, "My data");
};

export const placeP2POrderAction = async (
  ads_type: any,
  ads_id: any,
  payment_id: any,
  value: any,
  lastChanged: any,
  router: any
) => {
  const response = await placeP2POrder(
    ads_type,
    ads_id,
    payment_id,
    value,
    lastChanged
  );
  if (response.success) {
    toast.success(response.message);
    router.push(`/p2p/trade/${response.data.uid}`);
  } else {
    toast.error(response.message);
  }
  return response;
};
// getGiftCardDetails;
export const getGiftCardDetailsAction = async (
  order_uid: string,
  setStep: any,
  setLoading: any,
  dispatch: any
) => {
  setLoading(true);
  const response = await getGiftCardDetails(order_uid);
  dispatch(setP2pDetails(response?.data));
  dispatch(setTradeChatAll(response?.data?.chat_messages));
  console.log(response, "responseresponseresponse");
  if (response?.data?.order?.status === TRADE_STATUS_ESCROW) {
    setStep(1);
  } else if (response?.data?.order?.status === TRADE_STATUS_PAYMENT_DONE) {
    setStep(2);
  } else if (response?.data?.order?.status === TRADE_STATUS_TRANSFER_DONE) {
    setStep(3);
  }

  setLoading(false);
};
export const getP2pOrderDetailsAction = async (
  order_uid: string,
  setStep: any,
  setLoading: any,
  dispatch: any
) => {
  setLoading(true);
  const response = await getP2pOrderDetails(order_uid);
  dispatch(setP2pDetails(response?.data));
  dispatch(setTradeChatAll(response?.data?.chat_messages));
  if (response?.data?.order.status === TRADE_STATUS_ESCROW) {
    setStep(1);
  } else if (response?.data?.order.status === TRADE_STATUS_PAYMENT_DONE) {
    setStep(2);
  } else if (response?.data?.order.status === TRADE_STATUS_TRANSFER_DONE) {
    setStep(3);
  }

  setLoading(false);
};
export const payNowGiftCardOrderAction = async (
  order_id: any,
  doc: any,
  setStep: any
) => {
  const formData = new FormData();
  formData.append("gift_card_order_id", order_id);
  doc && formData.append("slip", doc);
  const response = await payNowGiftCardOrder(formData);
  if (response.success) {
    setStep(2);
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }
};
// paymentP2pOrder
export const paymentP2pOrderAction = async (
  trade_id: any,
  doc: any,
  setStep: any
) => {
  const formData = new FormData();
  formData.append("trade_id", trade_id);
  formData.append("payment_slip", doc);
  const response = await paymentP2pOrder(formData);
  if (response.success) {
    setStep(2);
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }
};
// giftCardOrderCancel;
export const giftCardOrderCancelAction = async (
  order_uid: any,
  reason: any,
  router: any
) => {
  const formData = new FormData();
  formData.append("gift_card_order_id", order_uid);
  formData.append("reason", reason);
  const response = await giftCardOrderCancel(formData);
  if (response.success) {
    toast.success(response.message);
    router.push("/p2p/gift-card");
  } else {
    toast.error(response.message);
  }
};
export const p2pOrderCancelAction = async (
  order_uid: any,
  reason: any,
  router: any
) => {
  const formData = new FormData();
  formData.append("order_uid", order_uid);
  formData.append("reason", reason);
  const response = await p2pOrderCancel(formData);
  if (response.success) {
    toast.success(response.message);
    router.push("/p2p");
  } else {
    toast.error(response.message);
  }
};
export const submitTradeFeedback = async (
  order_uid: any,
  feedback_type: any,
  feedback: any
) => {
  if (!feedback) {
    toast.error("Please enter feedback field first");
    return;
  }
  const formData = new FormData();
  formData.append("order_uid", order_uid);
  formData.append("feedback_type", feedback_type);
  formData.append("feedback", feedback);
  const response = await orderFeedback(formData);
  if (response.success) {
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }
};
export const giftCardOrderFeedbackAction = async (
  order_uid: any,
  feedback_type: any,
  feedback: any
) => {
  if (!feedback) {
    toast.error("Please enter feedback field first");
    return;
  }
  const formData = new FormData();
  formData.append("order_uid", order_uid);
  formData.append("feedback_type", feedback_type);
  formData.append("feedback", feedback);
  const response = await giftCardOrderFeedback(formData);
  if (response.success) {
    toast.success(response.message);
  } else {
    toast.error(response.message);
  }
};
// giftCardOrderFeedback;
// releaseP2pOrder;
export const PaymentConfirmGiftCardOrderAction = async (
  order_id: any,
  dispatch: any
) => {
  const formData = new FormData();
  formData.append("gift_card_order_id", order_id);
  const response = await PaymentConfirmGiftCardOrder(formData);
  if (response.success) {
    toast.success(response.message);
    // setDetails(response?.data);
    dispatch(setP2pDetails(response?.data));
  } else {
    toast.error(response.message);
  }
};
// releaseP2pOrder;
export const releaseP2pOrderAction = async (trade_id: any, dispatch: any) => {
  const formData = new FormData();
  formData.append("trade_id", trade_id);
  const response = await releaseP2pOrder(formData);
  if (response.success) {
    toast.success(response.message);
    // setDetails(response?.data);
    dispatch(setP2pDetails(response?.data));
  } else {
    toast.error(response.message);
  }
};
// getWallets;
export const getWalletsAction = async (per_page: any, page: any, search:any) => {
  const response = await getWallets(per_page, page, search);
  return response;
};
// userCenter;
export const userCenterAction = async (setLoading: any, setDetails: any) => {
  setLoading(true);
  const response = await userCenter();
  setDetails(response.data);
  setLoading(false);
  return response;
};
export const userProfileIDAction = async (
  setLoading: any,
  setDetails: any,
  id: any
) => {
  setLoading(true);
  const response = await userProfileID(id);
  setDetails(response.data);
  setLoading(false);
  return response;
};
