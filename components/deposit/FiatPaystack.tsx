import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { GetPaystackPaymentUrl } from "service/deposit";
import { UserSettingsApi } from "service/settings";
import { RootState } from "state/store";
import DepositGoogleAuth from "./deposit-g2fa";
import {
  GetFiatPaystackPaymentUrl,
  submitFiatWalletDepositApi,
} from "service/fiat-wallet";
import { useRouter } from "next/router";

const FiatPaystack = ({ currency_type, method_id,wallet_id }: any) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [credential, setCredential] = useState<any>({
    payment_method_id: method_id ? parseInt(method_id) : null,
    amount: 0,
    currency: currency_type,
    email: "",
  });
  const [walletID, setwalletID] = useState<any>();
  const { settings } = useSelector((state: RootState) => state.common);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = React.useState({
    status: false,
    message: "",
  });
  //   const CheckG2faEnabled = async () => {
  //     const { data } = await UserSettingsApi();
  //     const { user } = data;
  //     if (
  //       user.google2fa !== 1 &&
  //       parseInt(settings.currency_deposit_2fa_status) === 1
  //     ) {
  //       setErrorMessage({
  //         status: true,
  //         message: t("Google 2FA is not enabled, Please enable Google 2FA fist"),
  //       });
  //     }
  //   };
  //   useEffect(() => {
  //     CheckG2faEnabled();
  //   }, []);
  //   const onSubmit = async (e: any) => {
  //     e.preventDefault();
  //     const response = await GetPaystackPaymentUrl(email, amount, walletID);
  //     if (response.success) {
  //       toast.success(response.message);
  //       window.open(response.data.authorization_url, "_blank");
  //     } else {
  //       toast.error(response.message);
  //     }
  //   };
  const submitFiatWalletDeposit = async (e: any) => {
    e.preventDefault();
    if (
      // !credential.payment_method_id ||
      !credential.amount ||
      !credential.email
    ) {
      toast.error(t("Please provide all information's"));
      return;
    }
    setLoading(true);
    const response = await GetPaystackPaymentUrl(
      credential.email,
      credential.amount,
      wallet_id,
      2,
      currency_type,
      method_id
    );
    // const res = await submitFiatWalletDepositApi(credential);
    if (response.success) {
      toast.success(response.message);
      setLoading(false);
      window.open(response.data.authorization_url, "_blank");
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="cp-user-title mt-5 mb-4">
        <h4>{t("Deposit With Paystack")}</h4>
      </div>
      <div>
        <form className="row" onSubmit={submitFiatWalletDeposit}>
          <div className="col-lg-12">
            <div className="">
              <div className="swap-area">
                <div className="swap-area-top">
                  <div className="form-group">
                    <div className="swap-wrap">
                      <div className="swap-wrap-top">
                        <label>{t("Enter amount")}</label>
                        <span className="available">
                          {t(`Currency(${currency_type})`)}
                        </span>
                      </div>
                      <div className="swap-input-wrap">
                        <div className="form-amount">
                          <input
                            type="number"
                            className="form-control border-0"
                            id="amount-one"
                            placeholder={t("Please enter 1-2400000")}
                            value={credential.amount}
                            onChange={(e) => {
                              setCredential({
                                ...credential,
                                amount: e.target.value,
                              });
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
                            value={credential.email}
                            onChange={(e: any) => {
                              setCredential({
                                ...credential,
                                email: e.target.value,
                              });
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
          {errorMessage.status && (
            <div className="alert alert-danger col-lg-12">
              {errorMessage.message}
            </div>
          )}
          {/* {parseInt(settings.currency_deposit_2fa_status) === 1 &&
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
            {loading ? (
              <button className="primary-btn-outline w-100" disabled>
                {t("Processing")}
              </button>
            ) : (
              <button
                className="primary-btn-outline w-100"
                type="submit"
                disabled={errorMessage.status === true}
              >
                {t("Deposit")}
              </button>
            )}
          </div>
          {/* {email && amount && walletID && (
            <button className="primary-btn-outline w-100 mt-5" type="submit">
              {t("Deposit")}
            </button>
          )} */}
        </form>
      </div>
    </div>
  );
};

export default FiatPaystack;
