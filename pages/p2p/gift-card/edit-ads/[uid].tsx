import P2PGiftCardHeader from "components/P2P/p2p-gift-card/p2p-gift-card-header/P2PGiftCardHeader";
import P2PGiftCardNavbar from "components/P2P/p2p-gift-card/p2p-gift-card-navbar/P2PGiftCardNavbar";
import { CUstomSelect } from "components/common/CUstomSelect";
import SectionLoading from "components/common/SectionLoading";
import request from "lib/request";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getCreateAdsSettingsDataApi,
  getGiftCardAddsDetailsApi,
  updateAdsHandlerApi,
} from "service/p2pGiftCards";
import Select from "react-select";
import { GetServerSideProps } from "next";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import ImageComponent from "components/common/ImageComponent";
import { BsGiftFill } from "react-icons/bs";

const options = [
  { value: 1, label: "Bank Transfer" },
  { value: 2, label: "Crypto Transfer" },
];

const status = [
  { value: 1, label: "Active" },
  { value: 0, label: "Deactive" },
];

export default function Index() {
  const { t } = useTranslation();

  const router = useRouter();

  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [adsDetails, setAdsDetails] = useState<any>({});
  const [selectedPaymentType, setSelectedPaymentType] = useState<any>({});
  const [selectedCurrencyType, setSelectedCurrencyType] = useState<any>({});
  const [selectedStatus, setSelectedStatus] = useState<any>({});
  const [selectedPayment, setSelectedPayment] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedTime, setSelectedTime] = useState<any>({});
  const [termsData, setTermsData] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    getCreateAdsSettingsData();
  }, []);

  useEffect(() => {
    if (Object.keys(settings).length !== 0) {
      getGiftCardAddsDetails();
    }
  }, [settings]);

  const getGiftCardAddsDetails = async () => {
    const data = await getGiftCardAddsDetailsApi(router.query.uid);

    if (!data.success) {
      toast.error(data.message);
      router.push(`/p2p/gift-card/my-adds`);
      return;
    }
    const item = data.data;
    setAdsDetails(item);
    // set price
    setPrice(item.price);

    // set Status
    let selectStatus = status.find((data) => data.value === item.status);
    setSelectedStatus(selectStatus || {});

    //set Payment Type

    let selectPaymentType = options.find(
      (data) => data.value === item.payment_currency_type
    );
    setSelectedPaymentType(selectPaymentType || {});

    // set Currency Type

    if (item.payment_currency_type === 1) {
      let selectCurrency = settings?.currency.find(
        (data: any) => data.value === item.currency_type
      );
      setSelectedCurrencyType(selectCurrency);

      // set Payment Method if payment type 1

      let selectedPaymentMethods = JSON.parse(item.payment_method);

      let paymentMethod = selectedPaymentMethods?.map((data: any) =>
        settings.payment_method.find((val: any) => val.value === data)
      );
      setSelectedPayment(paymentMethod);
    }

    if (item.payment_currency_type === 2) {
      let selectCurrency = settings?.assets.find(
        (data: any) => data.value === item.currency_type
      );
      setSelectedCurrencyType(selectCurrency);
    }

    // set time limit

    let selectedTimeData = settings?.payment_time?.find(
      (data: any) => data.value === item.time_limit
    );
    setSelectedTime(selectedTimeData);

    // set terms data

    setTermsData(item.terms_condition);

    // set country

    let selectedCountries = JSON.parse(item.country);

    let selectedCountryData = selectedCountries.map((item: any) =>
      settings.country.find((val: any) => val.value === item)
    );

    setSelectedCountry(selectedCountryData);
  };

  const getCreateAdsSettingsData = async () => {
    setLoading(true);
    const data: any = await getCreateAdsSettingsDataApi();

    setLoading(false);
    if (!data?.success) {
      toast.error(data?.message);
      return;
    }

    setSettings(data?.data);
  };

  const paymentTypeHandler = (event: any) => {
    setSelectedPaymentType(event);
    setSelectedCurrencyType({});
    setSelectedPayment([]);
  };

  const handlePayment = (event: any) => {
    setSelectedPayment(event);
  };

  const handleCountry = (event: any) => {
    setSelectedCountry(event);
  };

  const handleCurrencyType = (event: any) => {
    setSelectedCurrencyType(event);
  };

  const updateAdsHandler = async () => {
    if (Object.keys(selectedPaymentType).length === 0) {
      toast.error("Select Payment Type");
      return;
    } else if (Object.keys(selectedCurrencyType).length === 0) {
      toast.error("Select Currency Type");
      return;
    } else if (price === "") {
      toast.error("Enter Price");
      return;
    } else if (selectedCountry.length === 0) {
      toast.error("Select Country");
      return;
    } else if (
      Object.keys(selectedPaymentType).length !== 0 &&
      selectedPaymentType.value === 1 &&
      selectedPayment.length === 0
    ) {
      toast.error("Select Payment Method");
      return;
    } else if (termsData === "") {
      toast.error("Enter Terms Condition");
      return;
    }

    const countries = selectedCountry.map((option: any) => option.value);

    const formData: any = new FormData();
    formData.append("uid", router.query.uid);
    formData.append("payment_currency_type", selectedPaymentType.value);
    formData.append("currency_type", selectedCurrencyType.value);
    formData.append("price", price);
    formData.append("terms_condition", termsData);
    // formData.append("country", countries);
    countries.forEach((country) => {
      formData.append("country[]", country);
    });
    formData.append("status", selectedStatus.value);
    formData.append("time_limit", selectedTime?.value ?? 0);

    if (selectedPaymentType.value === 1) {
      const payment_methods = selectedPayment.map(
        (option: any) => option.value
      );
      payment_methods.forEach((payment_method: any) => {
        formData.append("payment_method[]", payment_method);
      });
    }
    const data = await updateAdsHandlerApi(formData);
    if (!data.success) {
      toast.error(data.message);
      return;
    }
    toast.success(data.message);
    router.push(`/p2p/gift-card/my-adds`);
  };

  return (
    <section>
      <P2PGiftCardNavbar />
      <P2PGiftCardHeader title={"Edit Gift Card Ads"} />

      {/* from for create */}
      {loading ? (
        <div className="container">
          <SectionLoading />
        </div>
      ) : (
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6">
                  <div className="relative">
                    <ImageComponent
                      src={
                        adsDetails?.gift_card?.banner?.banner ||
                        "/demo_gift_banner.png"
                      }
                      height={300}
                    />{" "}
                    <div>
                      <div className="d-flex gap-10 buy-absolute-btn">
                        <BsGiftFill size={22} />
                        <h4>{`${parseFloat(adsDetails?.gift_card?.amount)} ${
                          adsDetails?.gift_card?.coin_type || ""
                        }`}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mt-5 mb-4 ">
                    <h3 className="mb-3">
                      {t(adsDetails?.gift_card?.banner?.title)}
                    </h3>
                    <h5 className="font-normal">
                      {t(adsDetails?.gift_card?.banner?.sub_title)}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group p2pSelectFilter">
                <h6 className="gift-buy-input-label font-normal mb-3">
                  {t(`Payment Currencey Type`)}
                </h6>
                <Select
                  options={options}
                  classNamePrefix={"custom-select"}
                  className={
                    "buy-amount-select-section border border-main-color rounded"
                  }
                  onChange={paymentTypeHandler}
                  value={selectedPaymentType}
                />
              </div>
            </div>
            {selectedPaymentType && (
              <div className="col-md-6">
                <div className="form-group p2pSelectFilter">
                  <h6 className="gift-buy-input-label font-normal mb-3">
                    {t(`Currencey Type`)}
                  </h6>

                  <Select
                    options={
                      selectedPaymentType.value === 1
                        ? settings?.currency
                        : settings?.assets
                    }
                    classNamePrefix={"custom-select"}
                    className={
                      "buy-amount-select-section border border-main-color rounded"
                    }
                    value={selectedCurrencyType}
                    onChange={handleCurrencyType}
                  />
                </div>
              </div>
            )}

            <div className="col-md-6">
              <div className="form-group p2pSelectFilter">
                <h6 className="gift-buy-input-label font-normal mb-3">
                  {t(`Price`)}
                </h6>
                <div className="d-flex buy-input-bg input-padding-y rounded border border-main-color">
                  <input
                    type="number"
                    min={1}
                    placeholder="Enter Price"
                    className="px-3 w-full bg-transparent border-none"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group p2pSelectFilter">
                <h6 className="gift-buy-input-label font-normal mb-3">
                  {t(`Status`)}
                </h6>
                <Select
                  options={status}
                  classNamePrefix={"custom-select"}
                  className={
                    "buy-amount-select-section border border-main-color rounded"
                  }
                  value={selectedStatus}
                  onChange={(event: any) => setSelectedStatus(event)}
                />
              </div>
            </div>
            {selectedPaymentType?.value === 1 && (
              <div className="col-md-6">
                <div className="form-group p2pSelectFilter">
                  <h6 className="gift-buy-input-label font-normal mb-3">
                    {t(`Payment Method`)}
                  </h6>

                  <Select
                    options={settings?.payment_method}
                    classNamePrefix={"custom-select"}
                    isMulti={true}
                    className={
                      "buy-amount-select-section border border-main-color rounded"
                    }
                    value={selectedPayment}
                    onChange={handlePayment}
                  />
                </div>
              </div>
            )}

            <div className="col-md-6">
              <div className="form-group p2pSelectFilter">
                <h6 className="gift-buy-input-label font-normal mb-3">
                  {t(`Country`)}
                </h6>
                <Select
                  options={settings?.country}
                  isSearchable={true}
                  isMulti={true}
                  classNamePrefix={"custom-select"}
                  className={
                    "buy-amount-select-section border border-main-color rounded"
                  }
                  onChange={handleCountry}
                  value={selectedCountry}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group p2pSelectFilter">
                <h6 className="gift-buy-input-label font-normal mb-3">
                  {t(`Time Limit`)}
                </h6>
                <Select
                  options={settings?.payment_time}
                  className={
                    "buy-amount-select-section border border-main-color rounded"
                  }
                  onChange={(event: any) => setSelectedTime(event)}
                  classNamePrefix={"custom-select"}
                  value={selectedTime}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group p2pSelectFilter">
                <h6 className="gift-buy-input-label font-normal mb-3">
                  {t(`Terms And Condition`)}
                </h6>
                <div className="d-flex buy-input-bg input-padding-y rounded border border-main-color">
                  <textarea
                    placeholder="Enter Terms And Condition"
                    className="px-3 w-full bg-transparent border-none text-primary"
                    rows={4}
                    value={termsData}
                    onChange={(e) => setTermsData(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="text-right my-3">
            <button
              className="tableButton bg-card-primary-color mr-5"
              onClick={() => router.push(`/p2p/gift-card/my-adds`)}
            >
              Cancel
            </button>
            <button className="tableButton" onClick={updateAdsHandler}>
              Update
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/p2p/gift-card");
  return {
    props: {},
  };
};
