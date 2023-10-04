import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { copyTextById } from "common";
import { useRef } from "react";

import {
  currencyDepositProcess,
  getCurrencyDepositRate,
} from "service/deposit";
import { toast } from "react-toastify";
import BankDetails from "./bankDetails";
import { useRouter } from "next/router";
import { UserSettingsApi } from "service/settings";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import DepositGoogleAuth from "./deposit-g2fa";
import request from "lib/request";

const infoList = [
  "Login to your Perfect Money account.",
  "Click the Settings Tab.",
  'Click the "Change Security Settings" link under the Security section.',
  'On the page that appears, click the "Enable" button on the API section.',
  'And then click the "Edit" button below this API section.',
  "A form will appear with a field for IP.",
];
const PerfectMoney = ({ currencyList, walletlist, method_id, banks }: any) => {
  const { t } = useTranslation("common");
  const { settings } = useSelector((state: RootState) => state.common);

  const [calculatedValue, setCalculatedValue] = useState<any>({
    calculated_amount: 0,
    rate: 0,
  });

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
  const [credential, setCredential] = useState<any>({
    wallet_id: null,
    payment_method_id: method_id ? parseInt(method_id) : null,
    amount: 0,
    currency: null,
    code: "",
    account_id: "",
    account_password: "",
    payer_id: "",
  });
  const router = useRouter();
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
    let selectedCurrencyType = currencyList.find(
      (item: any) => item.code == credential.currency
    );
    console.log(
      "selectedCurrencyType",
      selectedCurrencyType,
      currencyList,
      credential.currency
    );
    localStorage.setItem("perfect_money_wallet_id", credential?.wallet_id);
    localStorage.setItem(
      "perfect_money_payment_method_id",
      credential?.payment_method_id
    );
    // return
    const form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "https://perfectmoney.com/api/step1.asp");

    const formData = [
      {
        name: "PAYEE_ACCOUNT",
        value: `${selectedCurrencyType?.perfect_money_account}`,
      },
      { name: "PAYEE_NAME", value: `${settings.app_title}` },
      { name: "PAYMENT_AMOUNT", value: credential?.amount },
      { name: "PAYMENT_UNITS", value: `${selectedCurrencyType?.code}` },
      {
        name: "STATUS_URL",
        value: `${process.env.NEXT_PUBLIC_HOSTED_CLIENT_URL}/fiat-deposit?status=pending`,
      },
      {
        name: "PAYMENT_URL",
        value: `${process.env.NEXT_PUBLIC_HOSTED_CLIENT_URL}/fiat-deposit?status=success`,
      },
      { name: "PAYMENT_URL_METHOD", value: "GET" },
      {
        name: "NOPAYMENT_URL",
        value: `${process.env.NEXT_PUBLIC_HOSTED_CLIENT_URL}/fiat-deposit?status=cancel`,
      },
      { name: "NOPAYMENT_URL_METHOD", value: "GET" },
      { name: "SUGGESTED_MEMO", value: "" },
      { name: "BAGGAGE_FIELDS", value: "" },
    ];

    formData.forEach((field: any) => {
      const input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", field.name);
      input.setAttribute("value", field.value);
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };
  useEffect(() => {
    getCurrencyRate();
    // CheckG2faEnabled();
  }, [credential]);
  return (
    <div>
      <div className="cp-user-title mt-5 mb-4">
        <h4>{t("Perfect Money")}</h4>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-lg-12">
              <div className="">
                <div className="swap-area">
                  <div className="swap-area-top">
                    <div className="form-group">
                      <div className="swap-wrap">
                        <div className="swap-wrap-top">
                          <label>{t("Enter amount")}</label>
                          <span className="available">
                            {t("Select currency")}
                          </span>
                        </div>
                        <div className="swap-input-wrap">
                          <div className="form-amount">
                            <input
                              type="number"
                              className="form-control border-0"
                              id="amount-one"
                              placeholder={t("Please enter 1 -2400000")}
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
                              onChange={(e) => {
                                setCredential({
                                  ...credential,
                                  currency: e.target.value,
                                });
                              }}
                            >
                              <option value="" selected disabled hidden>
                                {t("Select one")}
                              </option>
                              {currencyList
                                .filter(
                                  (item: any) =>
                                    item.perfect_money_account !== null
                                )
                                .map((currency: any, index: any) => (
                                  <option value={currency.code} key={index}>
                                    {currency.name}
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
                      <div className="swap-wrap">
                        <div className="swap-wrap-top">
                          <label>{t("Converted amount")}</label>
                          <span className="available">
                            {t("Select wallet")}
                          </span>
                        </div>
                        <div className="swap-input-wrap">
                          <div className="form-amount">
                            <input
                              type="number"
                              className="form-control border-0"
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
                              className="form-control border-0 ticketFilterBg"
                              id="currency-one"
                              onChange={(e) => {
                                setCredential({
                                  ...credential,
                                  wallet_id: e.target.value,
                                });
                              }}
                            >
                              <option value="" selected disabled hidden>
                                {t("Select one")}
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
            {/* <div className="col-lg-6">
              <div className="">
                <div className="swap-area">
                  <div className="swap-area-top">
                    <div className="form-group">
                      <div className="swap-wrap mt-3">
                        <div className="swap-wrap-top">
                          <label>{t("Account Id")}</label>
                        </div>
                        <div className="swap-input-wrap">
                          <div className="form-amount">
                            <input
                              type="text"
                              className="form-control border-0"
                              id="amount-one"
                              value={credential.account_id}
                              placeholder={t("Please enter 10 -2400000")}
                              onChange={(e) => {
                                setCredential({
                                  ...credential,
                                  account_id: e.target.value,
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
            <div className="col-lg-6">
              <div className="">
                <div className="swap-area">
                  <div className="swap-area-top">
                    <div className="form-group">
                      <div className="swap-wrap mt-3">
                        <div className="swap-wrap-top">
                          <label>{t("Account Password")}</label>
                        </div>
                        <div className="swap-input-wrap">
                          <div className="form-amount">
                            <input
                              type="text"
                              className="form-control border-0"
                              id="amount-one"
                              value={credential.account_password}
                              placeholder={t("Account Password")}
                              onChange={(e) => {
                                setCredential({
                                  ...credential,
                                  account_password: e.target.value,
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
                          <label>{t("Payer Id")}</label>
                        </div>
                        <div className="swap-input-wrap">
                          <div className="form-amount">
                            <input
                              type="text"
                              className="form-control border-0"
                              id="amount-one"
                              value={credential.payer_id}
                              placeholder={t("Payer Id")}
                              onChange={(e) => {
                                setCredential({
                                  ...credential,
                                  payer_id: e.target.value,
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
            </div> */}

            <div className="col-lg-12 my-3">
              {/* <DepositGoogleAuth
                convertCurrency={convertCurrency}
                credential={credential}
                setCredential={setCredential}
              /> */}
              {errorMessage.status && (
                <div className="alert alert-danger">{errorMessage.message}</div>
              )}
              {/* {parseInt(settings.currency_deposit_2fa_status) === 1 ? (
                <button
                  className="primary-btn-outline w-100 mt-5"
                  type="button"
                  data-target="#exampleModal"
                  disabled={errorMessage.status === true}
                  data-toggle="modal"
                >
                  {t("Deposit")}
                </button>
              ) : (
                <button
                  className="primary-btn-outline w-100 mt-5"
                  type="button"
                  disabled={errorMessage.status === true}
                  onClick={() => {
                    convertCurrency(credential);
                  }}
                >
                  {t("Deposit")}
                </button>
              )} */}
              <button
                className="primary-btn-outline w-100 mt-5"
                type="button"
                disabled={errorMessage.status === true}
                onClick={() => {
                  convertCurrency(credential);
                }}
              >
                {t("Deposit")}
              </button>
            </div>
          </div>
        </div>
        {/* <div className="col-lg-4">
          <div className="bg-main-clr p-3">
            {infoList.map((item, index) => (
              <div
                className="py-1 d-flex gap-10 align-items-center"
                key={index}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="perfect-money-svg"
                  >
                    <path
                      d="M12.24 8L8 12.24l4.24 4.24 4.24-4.24L12.24 8zm-1.41 4.24l1.41-1.41 1.41 1.41-1.41 1.41-1.41-1.41z"
                      fill="currentColor"
                    ></path>
                  </svg>
                </span>
                <span>{item}</span>
              </div>
            ))}
            <div className="py-1 d-flex gap-10 align-items-center">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="perfect-money-svg"
                >
                  <path
                    d="M12.24 8L8 12.24l4.24 4.24 4.24-4.24L12.24 8zm-1.41 4.24l1.41-1.41 1.41 1.41-1.41 1.41-1.41-1.41z"
                    fill="currentColor"
                  ></path>
                </svg>
              </span>
              <span>{`Enter this IP ${settings?.perfect_money_server_ip} in that field and click the "Save" button.`}</span>
            </div>
            <div></div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default PerfectMoney;
