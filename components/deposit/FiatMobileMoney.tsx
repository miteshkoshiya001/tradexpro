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
import ProviderDetails from "./providerDetails";
import { submitFiatWalletDepositApi } from "service/fiat-wallet";
const FiatMobileMoney = ({ method_id, mobiles, currency_type }: any) => {
  const { t } = useTranslation("common");
  const inputRef = useRef(null);
  const { settings } = useSelector((state: RootState) => state.common);
  console.log(mobiles, "mobilesmobilesmobiles");
  const handleClick = () => {
    // 👇️ open file input box on click of other element
    //@ts-ignore
    inputRef.current.click();
  };
  const prepareCopyData = (data: any) => {
    const copyData = `Account Holder Name:${data.account_holder_name},
     Mobile Number:${data.mobile_number}, 
     Bank Address:${data.bank_address}, 
     Service Provider Name:${data.service_provider_name}, 
     `;
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

  const [errorMessage, setErrorMessage] = React.useState({
    status: false,
    message: "",
  });

  const [credential, setCredential] = useState<any>({
    payment_method_id: method_id ? parseInt(method_id) : null,
    amount: 0,
    currency: currency_type,
    mobile_money_id: null,
  });
  const router = useRouter();
  const [providerInfo, setMobileInfo] = useState({});
  const [doc, setDoc] = useState(null);

  const convertCurrency = async (credential: any) => {
    if (
      credential.payment_method_id &&
      credential.amount &&
      credential.currency &&
      credential.mobile_money_id &&
      doc
    ) {
      const formData: any = new FormData();
      formData.append("payment_method_id", credential.payment_method_id);
      formData.append("amount", credential.amount);
      formData.append("currency", currency_type);
      formData.append("mobile_money_id", credential.mobile_money_id);
      formData.append("mobile_money_receipt", doc);

      const res = await submitFiatWalletDepositApi(formData);
      if (res.success) {
        toast.success(res.message);
        router.push("/user/wallet-history?type=deposit");
      } else {
        toast.error(res.message);
      }
    } else {
      toast.error(t("Please provide all information's"));
    }
  };

  return (
    <div>
      <div className="cp-user-title mt-5 mb-4">
        <h4>{t("Mobile Money")}</h4>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="">
            <div className="swap-area">
              <div className="swap-area-top">
                <div className="form-group">
                  <div className="swap-wrap">
                    <div className="swap-wrap-top">
                      <label>{t("Enter amount")}</label>
                      <span className="available">{t("Select currency")}</span>
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
                mobile_money_id: parseInt(e.target.value),
              });
              setMobileInfo(
                mobiles.find(
                  (bank: any) => bank.id === parseInt(e.target.value)
                )
              );
            }}
          >
            <option>{t("Select Provider")}</option>
            {mobiles?.map((bank: any, index: any) => (
              <option key={index} value={bank.id}>
                {bank.service_provider_name}
              </option>
            ))}
          </select>
        </div>
        {credential.mobile_money_id && (
          <div className="col-lg-12 mb-3">
            <div className="split-title">
              <span className="file-lable">{t("Mobile Payment details")}</span>
              <span
                className="file-lable copy-btn"
                onClick={() => {
                  prepareCopyData(providerInfo);
                }}
              >
                {t("Copy")}
              </span>
            </div>
            <ProviderDetails providerInfo={providerInfo} />
          </div>
        )}
        <div className="col-lg-12 my-3">
          <div className="swap-wrap">
            <div className="">
              <span className="file-lable">{t("Select document")}</span>
            </div>
            <div>
              {/* @ts-ignore */}
              <label
                className="text-center file-upload-wrapper w-full"
                htmlFor="upload-photo"
                onClick={handleClick}
              >
                {/* @ts-ignore */}
                {doc ? (
                  // @ts-ignore
                  doc.name
                ) : (
                  <div>
                    <div>
                      <AiOutlineCloudUpload size={30} />
                    </div>
                    <p>{t("Browse")}</p>
                  </div>
                )}
              </label>
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
              />
            </div>
          </div>
          {errorMessage.status && (
            <div className="alert alert-danger">{errorMessage.message}</div>
          )}
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
  );
};

export default FiatMobileMoney;
