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
  getGiftCardDetailsForP2PGiftCardApi,
  storeAdsHandlerApi,
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
  const [giftCardDetais, setgiftCardDetais] = useState<any>({});
  const [selectedPaymentType, setSelectedPaymentType] = useState(null);
  const [selectedCurrencyType, setSelectedCurrencyType] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState(status[0].value);
  const [selectedPayment, setSelectedPayment] = useState<any>([]);
  const [selectedCountry, setSelectedCountry] = useState([]);
  const [selectedTime, setSelectedTime] = useState(0);
  const [termsData, setTermsData] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    getCreateAdsSettingsData();
    getGiftCardDetailsForP2PGiftCard();
  }, []);

  const getGiftCardDetailsForP2PGiftCard = async () => {
    const data = await getGiftCardDetailsForP2PGiftCardApi(router.query.id);
    if (!data.success) {
      toast.error(data.message);
      return;
    }
    setgiftCardDetais(data.data);
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
    setSelectedPaymentType(event.value);
    setSelectedCurrencyType(null);
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

  const createAdsHandler = async () => {
    if (!selectedPaymentType) {
      toast.error("Select Payment Type");
      return;
    } else if (!selectedCurrencyType) {
      toast.error("Select Currency Type");
      return;
    } else if (price === "") {
      toast.error("Enter Price");
      return;
    } else if (selectedCountry.length === 0) {
      toast.error("Select Country");
      return;
    } else if (
      selectedPaymentType &&
      selectedPaymentType === 1 &&
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
    formData.append("gift_card_id", router.query.id);
    formData.append("payment_currency_type", selectedPaymentType);
    formData.append("currency_type", selectedCurrencyType.value);
    formData.append("price", price);
    formData.append("terms_condition", termsData);
    // formData.append("country", countries);
    countries.forEach((country) => {
      formData.append("country[]", country);
    });
    formData.append("status", selectedStatus);
    formData.append("time_limit", selectedTime);

    if (selectedPaymentType === 1) {
      const payment_methods = selectedPayment.map(
        (option: any) => option.value
      );
      payment_methods.forEach((payment_method: any) => {
        formData.append("payment_method[]", payment_method);
      });
    }
    const data = await storeAdsHandlerApi(formData);
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
      <P2PGiftCardHeader title={"Create Gift Card Ads"} />

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
                        giftCardDetais?.banner?.banner ||
                        "/demo_gift_banner.png"
                      }
                      height={300}
                    />{" "}
                    <div>
                      <div className="d-flex gap-10 buy-absolute-btn">
                        <BsGiftFill size={22} />
                        <h4>{`${parseFloat(giftCardDetais.amount)} ${
                          giftCardDetais?.coin_type || ""
                        }`}</h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mt-5 mb-4 ">
                    <h3 className="mb-3">{t(giftCardDetais?.banner?.title)}</h3>
                    <h5 className="font-normal">
                      {t(giftCardDetais?.banner?.sub_title)}
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
                <CUstomSelect
                  options={options}
                  classname={
                    "buy-amount-select-section border border-main-color rounded"
                  }
                  handleFunction={paymentTypeHandler}
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
                      selectedPaymentType === 1
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
                <CUstomSelect
                  options={status}
                  classname={
                    "buy-amount-select-section border border-main-color rounded"
                  }
                  defaultValue={status[0]}
                  handleFunction={(event: any) =>
                    setSelectedStatus(event.value)
                  }
                />
              </div>
            </div>
            {selectedPaymentType === 1 && (
              <div className="col-md-6">
                <div className="form-group p2pSelectFilter">
                  <h6 className="gift-buy-input-label font-normal mb-3">
                    {t(`Payment Method`)}
                  </h6>

                  <Select
                    options={settings?.payment_method}
                    classNamePrefix={"custom-select"}
                    isMulti={true}
                    className={"buy-amount-select-section border rounded"}
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
                <CUstomSelect
                  options={settings?.country}
                  isSearchable={true}
                  isMulti={true}
                  classname={
                    "buy-amount-select-section border border-main-color rounded"
                  }
                  handleFunction={handleCountry}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group p2pSelectFilter">
                <h6 className="gift-buy-input-label font-normal mb-3">
                  {t(`Time Limit`)}
                </h6>
                <CUstomSelect
                  options={settings?.payment_time}
                  classname={
                    "buy-amount-select-section border border-main-color rounded"
                  }
                  handleFunction={(event: any) => setSelectedTime(event.value)}
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
              onClick={() => router.push(`/p2p/gift-card/lists`)}
            >
              Cancel
            </button>
            <button className="tableButton" onClick={createAdsHandler}>
              Create
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
