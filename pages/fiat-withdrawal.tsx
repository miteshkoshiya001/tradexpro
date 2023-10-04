import FiatSidebar from "layout/fiat-sidebar";
import {
  pageAvailabilityCheck,
  SSRAuthCheck,
} from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { customPage, landingPage } from "service/landing-page";
import { GetUserInfoByTokenServer } from "service/user";
import useTranslation from "next-translate/useTranslation";
import Footer from "components/common/footer";
import {
  apiFiatWithdrawalAction,
  fiatWithdrawProcessAction,
  getFiatWithdrawalRateAction,
} from "state/actions/fiat-deposit-withawal";
import SectionLoading from "components/common/SectionLoading";
import SelectWithdrawl from "components/deposit/SelectWithdrawl";
import { BANK_DEPOSIT } from "helpers/core-constants";
import { NoItemFound } from "components/NoItemFound/NoItemFound";

const FiatWithdrawal = () => {
  const { t } = useTranslation("common");
  const [loading, setLoading]: any = useState<any>(false);
  const [initialData, setInitialData]: any = useState<any>([]);
  const [selectedMethod, setSelectedMethod] = useState<any>({
    method: null,
    method_id: null,
  });
  const [rateCred, setRateCred]: any = useState<any>({
    wallet_id: "",
    currency: "",
    amount: "",
    type: "fiat",
    bank_id: "",
    payment_method_id: "",
    payment_method_type: "",
    payment_info: "",
  });
  const [converted_value, setConverted_value] = useState(0);
  const [fees, setFees] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [currency, setcurrency] = useState("");
  const [selectedPaymentMethod, setPaymentMethod] = useState<any>();
  const getRate = async () => {
    if (rateCred.wallet_id && rateCred.currency && rateCred.amount) {
      const response = await getFiatWithdrawalRateAction({
        wallet_id: rateCred.wallet_id,
        currency: rateCred.currency,
        amount: rateCred.amount,
      });

      setConverted_value(response.data.convert_amount);
      setFees(response.data.fees);
      setNetAmount(response.data.net_amount);
      setcurrency(response.data.currency);
    }
  };
  useEffect(() => {
    getRate();
  }, [rateCred?.amount, rateCred?.wallet_id, rateCred?.currency]);

  useEffect(() => {
    apiFiatWithdrawalAction(setInitialData, setLoading, setPaymentMethod);
  }, []);

  useEffect(() => {
    setRateCred({
      wallet_id: "",
      currency: "",
      amount: "",
      type: "fiat",
      bank_id: "",
      payment_method_id: selectedMethod?.method_id,
      payment_method_type: selectedMethod?.method,
      payment_info: "",
    });
    setConverted_value(0);
    setNetAmount(0);
    setFees(0);
    setcurrency("");
  }, [selectedMethod]);
  return (
    <>
      <div className="page-wrap">
        <FiatSidebar />
        <div className="page-main-content">
          <div className="container-fluid">
            <div className="section-top-wrap mb-25">
              <div className="profle-are-top">
                <h2 className="section-top-title">
                  {t("Crypto To Fiat Withdrawal")}
                </h2>
              </div>
            </div>
            <SelectWithdrawl
              setSelectedMethod={setSelectedMethod}
              depositInfo={initialData?.payment_method_list}
              selectedMethod={selectedMethod}
            />
            <div className="asset-balances-area">
              <div className=" bank-section">
                <div className="">
                  <div className="ico-tokenCreate ">
                    <div className="ico-create-form col-12">
                      {loading ? (
                        <SectionLoading />
                      ) : initialData?.payment_method_list?.length > 0 ? (
                        <form
                          className="row"
                          onSubmit={(e) => {
                            e.preventDefault();
                            fiatWithdrawProcessAction(rateCred, setLoading);
                          }}
                        >
                          <div className="col-md-6 form-input-div">
                            <label className="ico-label-box" htmlFor="">
                              {t("Select Wallet")}
                            </label>
                            <select
                              name="wallet"
                              className={`ico-input-box `}
                              value={rateCred?.wallet_id}
                              required
                              onChange={(e: any) => {
                                setRateCred({
                                  ...rateCred,
                                  wallet_id: e.target.value,
                                });
                              }}
                            >
                              <option value="">
                                {t("Select Your Wallet")}
                              </option>
                              {initialData?.my_wallet?.map(
                                (item: any, index: number) => (
                                  <option value={item.encryptId} key={index}>
                                    {item.coin_type}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className="col-md-6 form-input-div">
                            <label className="ico-label-box" htmlFor="">
                              {t("Select Currency")}
                            </label>
                            <select
                              name="coin_list"
                              value={rateCred?.currency}
                              required
                              className={`ico-input-box `}
                              onChange={(e: any) => {
                                setRateCred({
                                  ...rateCred,
                                  currency: e.target.value,
                                });
                              }}
                            >
                              <option value="">{t("Select Currency")}</option>
                              {initialData?.currency?.map(
                                (item: any, index: number) => (
                                  <option key={index} value={item.code}>
                                    {item.name}
                                  </option>
                                )
                              )}
                            </select>
                          </div>

                          <div className="col-md-6 form-input-div">
                            <label className="ico-label-box" htmlFor="">
                              {t("Amount")}
                            </label>
                            <input
                              type="text"
                              required
                              value={rateCred?.amount}
                              onChange={(e) => {
                                setRateCred({
                                  ...rateCred,
                                  amount: e.target.value,
                                });
                                // getFiatWithdrawalRateAction(rateCred);
                              }}
                              name="amount"
                              className={`ico-input-box`}
                            />
                          </div>

                          <div className="col-md-6 form-input-div">
                            <label className="ico-label-box" htmlFor="">
                              {t("Amount Convert Price")}
                            </label>
                            <input
                              type="text"
                              disabled
                              value={converted_value}
                              required
                              name="convert_price"
                              className={`ico-input-box `}
                            />
                            <div>
                              <span>
                                {t("Fees:")}
                                {fees}
                              </span>
                              <span className="float-right">
                                {t("Net Amount:")}
                                {netAmount}
                                {currency}
                              </span>
                            </div>
                          </div>
                          {parseInt(selectedMethod.method) === BANK_DEPOSIT ? (
                            <div className="col-md-6 form-input-div">
                              <label className="ico-label-box" htmlFor="">
                                {t("Select Bank")}
                              </label>
                              <select
                                name="bank_list"
                                className={`ico-input-box `}
                                required
                                value={rateCred?.bank_id}
                                onChange={(e) => {
                                  setRateCred({
                                    ...rateCred,
                                    bank_id: e.target.value,
                                  });
                                }}
                              >
                                <option value="">
                                  {t("Select Bank List")}
                                </option>
                                {initialData?.my_bank?.map(
                                  (item: any, index: number) => (
                                    <option value={item.id} key={index}>
                                      {item.bank_name}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          ) : (
                            <div className="col-md-12 form-input-div">
                              <label className="ico-label-box" htmlFor="">
                                {t("Payment Info")}
                              </label>
                              <textarea
                                className={`ico-input-box `}
                                value={rateCred?.payment_info}
                                onChange={(e) => {
                                  setRateCred({
                                    ...rateCred,
                                    payment_info: e.target.value,
                                  });
                                }}
                              ></textarea>
                            </div>
                          )}

                          {/* <div className="col-md-6 form-input-div">
                            <label className="ico-label-box" htmlFor="">
                              {t("Select Bank")}
                            </label>
                            <select
                              name="bank_list"
                              className={`ico-input-box `}
                              required
                              onChange={(e) => {
                                setRateCred({
                                  ...rateCred,
                                  bank_id: e.target.value,
                                });
                              }}
                            >
                              <option value="">{t("Select Bank List")}</option>
                              {initialData?.my_bank?.map(
                                (item: any, index: number) => (
                                  <option value={item.id} key={index}>
                                    {item.bank_name}
                                  </option>
                                )
                              )}
                            </select>
                          </div> */}
                          <div className="col-md-12 form-input-div">
                            <button type="submit" className="primary-btn">
                              {loading ? t("Loading..") : t("Submit Withdrawl")}
                            </button>
                          </div>
                        </form>
                      ) : (
                        <NoItemFound message={`No Payment Method Found`}/>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/profile");
  const commonRes = await pageAvailabilityCheck();

  if (parseInt(commonRes.currency_deposit_status) !== 1) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
export default FiatWithdrawal;
