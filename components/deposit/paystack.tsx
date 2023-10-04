import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetPaystackPaymentUrl, globalConvertAmount } from "service/deposit";
import { UserSettingsApi } from "service/settings";
import { RootState } from "state/store";
import DepositGoogleAuth from "./deposit-g2fa";

const Paystack = ({ walletlist, method_id }: any) => {
  const { t } = useTranslation("common");
  const [email, setEmail] = useState("");
  const [credential, setCredential] = useState<any>({
    code: "",
  });
  const [calculatedValue, setCalculatedValue] = useState<any>(0);
  const [walletID, setwalletID] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { settings } = useSelector((state: RootState) => state.common);
  const [errorMessage, setErrorMessage] = React.useState({
    status: false,
    message: "",
  });
  // const CheckG2faEnabled = async () => {
  //   const { data } = await UserSettingsApi();
  //   const { user } = data;
  //   if (
  //     user.google2fa !== 1 &&
  //     parseInt(settings.currency_deposit_2fa_status) === 1
  //   ) {
  //     setErrorMessage({
  //       status: true,
  //       message: t("Google 2FA is not enabled, Please enable Google 2FA fist"),
  //     });
  //   }
  // };
  // useEffect(() => {
  //   CheckG2faEnabled();
  // }, []);
  const [amount, setAmount] = useState("");
  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const response = await GetPaystackPaymentUrl(
      email,
      amount,
      walletID,
      1,
      "",
      method_id
    );
    if (response.success) {
      toast.success(response.message);
      setLoading(false);

      window.open(response.data.authorization_url, "_blank");
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    convertAmount();
  }, [walletID, amount]);

  const convertAmount = async () => {
    if (!amount || !walletID) return;
    const newWallet = walletlist.find((item: any) => item.id == walletID);

    const response = await globalConvertAmount(
      "USD",
      newWallet?.coin_type,
      amount
    );

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    setCalculatedValue(response.data.converted_amount);
  };

  return (
    <div>
      <div className="cp-user-title mt-5 mb-4">
        <h4>{t("Deposit With Paystack")}</h4>
      </div>
      <div>
        <form className="row" onSubmit={onSubmit}>
          <div className="col-lg-12">
            <div className="">
              <div className="swap-area">
                <div className="swap-area-top">
                  <div className="form-group">
                    <div className="swap-wrap">
                      <div className="swap-wrap-top">
                        <label>{t("Enter amount")}</label>
                        <span className="available">{t("Currency(USD)")}</span>
                      </div>
                      <div className="swap-input-wrap">
                        <div className="form-amount">
                          <input
                            type="number"
                            className="form-control border-0"
                            id="amount-one"
                            placeholder={t("Please enter 1-2400000")}
                            value={amount}
                            onChange={(e) => {
                              setAmount(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-lg-12">
            <select
              className="form-control "
              id="currency-one"
              onChange={(e) => {
                setwalletID(e.target.value);
              }}
            >
              <option value="" selected disabled hidden>
                Select one
              </option>
              {walletlist?.map((wallet: any, index: any) => (
                <option value={wallet.id} key={index}>
                  {wallet.coin_type}
                </option>
              ))}
            </select>
          </div> */}
          <div className="col-lg-12">
            <div className="">
              <div className="swap-area">
                <div className="swap-area-top">
                  <div className="form-group">
                    <div className="swap-wrap mt-3">
                      <div className="swap-wrap-top">
                        <label>{t("Converted amount")}</label>
                        <span className="available">{t("Select wallet")}</span>
                      </div>
                      <div className="swap-input-wrap">
                        <div className="form-amount">
                          <input
                            type="number"
                            className="form-control border-0"
                            id="amount-one"
                            disabled
                            value={calculatedValue}
                            placeholder={t("Please enter 10 -2400000")}
                            onChange={(e) => {
                              setCredential({
                                ...credential,
                                amount: e.target.value,
                              });
                            }}
                          />
                        </div>
                        <div className="cp-select-area">
                          <select
                            className="form-control border-0 ticketFilterBg"
                            id="currency-one"
                            value={walletID}
                            onChange={(e) => {
                              setwalletID(e.target.value);
                            }}
                          >
                            <option value="" selected disabled hidden>
                              {t("Select one")}
                            </option>
                            {walletlist?.map((wallet: any, index: any) => (
                              <option value={wallet.id} key={index}>
                                {wallet.coin_type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12">
            <div className="">
              <div className="swap-area">
                <div className="swap-area-top">
                  <div className="form-group">
                    <div className="swap-wrap mt-3">
                      <div className="swap-wrap-top">
                        {/* <label>{t("Converted amount")}</label> */}
                        <span className="available">
                          {t("Enter Email address")}
                        </span>
                      </div>
                      <div className="swap-input-wrap">
                        <div className="form-amount">
                          <input
                            type="email"
                            className="form-control border-0"
                            id="amount-one"
                            placeholder={t("Enter your email")}
                            value={email}
                            onChange={(e: any) => {
                              setEmail(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* <DepositGoogleAuth
            convertCurrency={onSubmit}
            credential={credential}
            setCredential={setCredential}
          /> */}
          {/* {errorMessage.status && (
            <div className="alert alert-danger col-lg-12">
              {errorMessage.message}
            </div>
          )}
          {parseInt(settings.currency_deposit_2fa_status) === 1 &&
          email &&
          amount &&
          walletID ? (
            <button
              className="primary-btn-outline w-100"
              type="button"
              data-target="#exampleModal"
              disabled={errorMessage.status === true}
              data-toggle="modal"
            >
              {t("Deposit")}
            </button>
          ) : (
            <button
              className="primary-btn-outline w-100"
              type="button"
              data-target="#exampleModal"
              disabled={errorMessage.status === true}
              data-toggle="modal"
            >
              {t("Deposit")}
            </button>
          )} */}
          <div className="col-lg-12">
            {email && amount && walletID && (
              <button
                disabled={loading}
                className="primary-btn-outline w-100 mt-5"
                type="submit"
              >
                {t(loading ? "Processing" : "Deposit")}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Paystack;
