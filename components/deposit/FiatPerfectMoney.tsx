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
import { submitFiatWalletDepositApi } from "service/fiat-wallet";

const infoList = [
  "Login to your Perfect Money account.",
  "Click the Settings Tab.",
  'Click the "Change Security Settings" link under the Security section.',
  'On the page that appears, click the "Enable" button on the API section.',
  'And then click the "Edit" button below this API section.',
  "A form will appear with a field for IP.",
  'Enter this IP 123.45.67.89 in that field and click the "Save" button.',
];
const FiatPerfectMoney = ({ method_id, currency_type, currencyLists }: any) => {
  const { t } = useTranslation("common");
  const { settings } = useSelector((state: RootState) => state.common);
  const [errorMessage, setErrorMessage] = React.useState({
    status: false,
    message: "",
  });

  const [credential, setCredential] = useState<any>({
    payment_method_id: method_id,
    amount: 0,
    currency: currency_type,
    account_id: "",
    account_password: "",
    payer_id: "",
  });
  const router = useRouter();
  const convertCurrency = async (credential: any) => {
    let selectedCurrencyType = currencyLists?.find(
      (item: any) => item.code == currency_type
    );
    
    localStorage.setItem(
      "perfect_money_payment_method_id_for_fiat_wallet",
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
        value: `${process.env.NEXT_PUBLIC_HOSTED_CLIENT_URL}/user/fiat/deposit?type=deposit`,
      },
      {
        name: "PAYMENT_URL",
        value: `${process.env.NEXT_PUBLIC_HOSTED_CLIENT_URL}/user/fiat/deposit?type=deposit`,
      },
      { name: "PAYMENT_URL_METHOD", value: "GET" },
      {
        name: "NOPAYMENT_URL",
        value: `${process.env.NEXT_PUBLIC_HOSTED_CLIENT_URL}/user/fiat/deposit?type=deposit`,
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
                            <input
                              type="text"
                              className="form-control border-0"
                              value={currency_type}
                              readOnly
                            />
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
              <button
                className="primary-btn-outline w-100"
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
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FiatPerfectMoney;
