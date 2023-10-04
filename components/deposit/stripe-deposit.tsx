import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import {
  currencyDepositProcess,
  getCurrencyDepositRate,
} from "service/deposit";
import {
  ElementsConsumer,
  Elements,
  CardElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import CardForm from "./cardForm";
import { useRouter } from "next/router";
import { UserSettingsApi } from "service/settings";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import DepositGoogleAuth from "./deposit-g2fa";
const StripeDeposit = ({ currencyList, walletlist, method_id }: any) => {
  const { t } = useTranslation("common");
  const [calculatedValue, setCalculatedValue] = useState<any>({
    calculated_amount: 0,
    rate: 0,
  });
  //@ts-ignore
  const stripe = loadStripe(process.env.NEXT_PUBLIC_PUBLISH_KEY);
  const router = useRouter();
  const { settings } = useSelector((state: RootState) => state.common);
  const [credential, setCredential] = useState<any>({
    wallet_id: null,
    payment_method_id: method_id ? parseInt(method_id) : null,
    amount: 0,
    currency: "USD",
    stripe_token: null,
    code: "",
  });
  const [errorMessage, setErrorMessage] = React.useState({
    status: false,
    message: "",
  });
  const CheckG2faEnabled = async () => {
    const { data } = await UserSettingsApi();
    const { user } = data;
    if (
      user.google2fa !== 1 &&
      parseInt(settings.currency_deposit_2fa_status) === 1
    ) {
      setErrorMessage({
        status: true,
        message: t("Google 2FA is not enabled, Please enable Google 2FA fist"),
      });
    }
  };
  const getCurrencyRate = async () => {
    if (
      credential.wallet_id &&
      credential.payment_method_id &&
      credential.amount
    ) {
      const response = await getCurrencyDepositRate(credential);
      setCalculatedValue(response.data);
    }
  };
  const convertCurrency = async (credential: any) => {
    if (
      credential.wallet_id &&
      credential.payment_method_id &&
      credential.amount
    ) {
      const res = await currencyDepositProcess(credential);
      if (res.success) {
        toast.success(res.message);
        router.push("/user/currency-deposit-history");
      } else {
        toast.error(res.message);
      }
    } else {
      toast.error(t("Please provide all information's"));
    }
  };
  useEffect(() => {
    getCurrencyRate();
    CheckG2faEnabled();
  }, [credential]);
  return (
    <div>
      <div className="cp-user-title mt-5 mb-4">
        <h4>{t("Credit Card Deposit")}</h4>
      </div>
      <div className="row">
        {credential.stripe_token && (
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
                            className="form-control"
                            id="amount-one"
                            placeholder={t("Please enter 1-2400000")}
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
        )}
        {credential.stripe_token && (
          <div className="col-lg-12">
            <div className="">
              <div className="swap-area">
                <div className="swap-area-top">
                  <div className="form-group">
                    <div className="swap-wrap">
                      <div className="swap-wrap-top">
                        <label>{t("Converted amount")}</label>
                        <span className="available">{t("Select wallet")}</span>
                      </div>
                      <div className="swap-input-wrap">
                        <div className="form-amount">
                          <input
                            type="number"
                            className="form-control"
                            id="amount-one"
                            disabled
                            value={calculatedValue.calculated_amount}
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
                            className="form-control "
                            id="currency-one"
                            onChange={(e) => {
                              setCredential({
                                ...credential,
                                wallet_id: e.target.value,
                              });
                            }}
                          >
                            <option value="" selected disabled hidden>
                              Select one
                            </option>
                            {walletlist.map((wallet: any, index: any) => (
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
        )}
        {!credential.stripe_token && (
          <div className="col-lg-12 mb-3">
            <Elements stripe={stripe}>
              <CardForm setCredential={setCredential} credential={credential} />
            </Elements>
          </div>
        )}
        <DepositGoogleAuth
          convertCurrency={convertCurrency}
          credential={credential}
          setCredential={setCredential}
        />
        {errorMessage.status && credential.stripe_token && (
          <div className="alert alert-danger ml-3">{errorMessage.message}</div>
        )}
        {parseInt(settings.currency_deposit_2fa_status) === 1
          ? credential.stripe_token && (
              <button
                className="primary-btn-outline w-100"
                type="button"
                data-target="#exampleModal"
                disabled={errorMessage.status === true}
                data-toggle="modal"
              >
                Deposit
              </button>
            )
          : credential.stripe_token && (
              <button
                className="primary-btn-outline w-100"
                type="button"
                disabled={errorMessage.status === true}
                onClick={() => {
                  convertCurrency(credential);
                }}
              >
                Deposit
              </button>
            )}
      </div>
    </div>
  );
};

export default StripeDeposit;
