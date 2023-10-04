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
import { AiOutlineCloudUpload } from "react-icons/ai";
const BankDeposit = ({ currencyList, walletlist, method_id, banks }: any) => {
  const { t } = useTranslation("common");
  const inputRef = useRef(null);
  const { settings } = useSelector((state: RootState) => state.common);
  const handleClick = () => {
    // 👇️ open file input box on click of other element
    //@ts-ignore
    inputRef.current.click();
  };
  const prepareCopyData = (data: any) => {
    const copyData = `Account Holder Name:${data.account_holder_name},
     Bank Name:${data.bank_name}, 
     Bank Address:${data.bank_address}, 
     Country:${data.country}, 
     Swift Code:${data.swift_code}, 
     Account Number:${data.iban}`;
    copyTextById(copyData);
  };

  const handleFileChange = (event: any) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    event;
    if (fileObj.size > 2 * 1024 * 1024) {
      toast.error(t("File size must be less than 2MB"));
      return;
    }
    setDoc(event.target.files[0]);
  };
  const [calculatedValue, setCalculatedValue] = useState<any>({
    calculated_amount: 0,
    rate: 0,
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
  const [credential, setCredential] = useState<any>({
    wallet_id: null,
    payment_method_id: method_id ? parseInt(method_id) : null,
    amount: 0,
    currency: null,
    bank_id: null,
    code: "",
  });
  const router = useRouter();
  const [bankInfo, setBankInfo] = useState({});
  const [doc, setDoc] = useState(null);
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
      credential.amount &&
      credential.currency &&
      credential.bank_id &&
      doc
    ) {
      const formData: any = new FormData();
      formData.append("wallet_id", credential.wallet_id);
      formData.append("payment_method_id", credential.payment_method_id);
      formData.append("amount", credential.amount);
      formData.append("currency", credential.currency);
      formData.append("bank_id", credential.bank_id);
      formData.append("bank_receipt", doc);
      formData.append("code", credential.code);

      const res = await currencyDepositProcess(formData);
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
        <h4>{t("Bank Deposit")}</h4>
      </div>
      <div className="row">
        <div className="col-md-12">
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
                              {currencyList.map((currency: any, index: any) => (
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
                      <div className="swap-wrap mt-3">
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
            <div className="col-lg-12 my-3">
              <div className="">
                <span className="file-lable">{t("Select Bank")}</span>
              </div>
              <select
                name="method"
                className="form-control mt-2 "
                onChange={(e: any) => {
                  setCredential({
                    ...credential,
                    bank_id: parseInt(e.target.value),
                  });
                  setBankInfo(
                    banks.find(
                      (bank: any) => bank.id === parseInt(e.target.value)
                    )
                  );
                }}
              >
                <option>{t("Select bank")}</option>
                {banks?.map((bank: any, index: any) => (
                  <option key={index} value={bank.id}>
                    {bank.bank_name}
                  </option>
                ))}
              </select>
            </div>
            {credential.bank_id && (
              <div className="col-lg-12 mb-3">
                <div className="split-title">
                  <span className="file-lable">{t("Bank details")}</span>
                  <span
                    className="file-lable copy-btn"
                    onClick={() => {
                      prepareCopyData(bankInfo);
                    }}
                  >
                    {t("Copy")}
                  </span>
                </div>
                <BankDetails bankInfo={bankInfo} />
              </div>
            )}
            <div className="col-lg-12 my-3">
              <div className="swap-wrap">
                <div className="">
                  <span className="file-lable">{t("Select document")}</span>
                </div>
                <div className="file-upload-wrapper">
                  {/* @ts-ignore */}
                  <label htmlFor="upload-photo" onClick={handleClick}>
                    {/* @ts-ignore */}
                    {doc ? doc.name : t("Browse")}
                  </label>
                  <input
                    style={{ display: "none" }}
                    ref={inputRef}
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <DepositGoogleAuth
                convertCurrency={convertCurrency}
                credential={credential}
                setCredential={setCredential}
              />
              {errorMessage.status && (
                <div className="alert alert-danger">{errorMessage.message}</div>
              )}
              {parseInt(settings.currency_deposit_2fa_status) === 1 ? (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDeposit;
