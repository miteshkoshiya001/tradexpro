import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import {
  currencyDepositProcess,
  getCurrencyDepositRate,
} from "service/deposit";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import PaypalButtons from "./PaypalDeposit";
import FiatPaypalButtons from "./FiatPaypalButtons";
const FiatPaypalSection = ({ method_id, currency_type }: any) => {
  const { t } = useTranslation("common");

  //@ts-ignore
  const router = useRouter();
  const [credential, setCredential] = useState<any>({
    payment_method_id: method_id ? parseInt(method_id) : null,
    amount: 0,
    currency: currency_type,
    paypal_token: null,
  });

  return (
    <div>
      <div className="cp-user-title mt-5 mb-4">
        <h4>{t("Deposit With Paypal")}</h4>
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
                      <span className="available">{t("Currency(USD)")}</span>
                    </div>
                    <div className="swap-input-wrap">
                      <div className="form-amount">
                        <input
                          type="number"
                          className="form-control border-0"
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

        {credential.payment_method_id && credential.amount ? (
          <div className="col-lg-12 mb-3">
            <FiatPaypalButtons
              credential={credential}
              setCredential={setCredential}
            />
          </div>
        ) : null}

        {/* <div className="col-lg-12 mb-3 w-100">
          <button
            className="primary-btn-outline w-100"
            data-toggle="modal"
            data-target="#exampleModal"
            onClick={convertCurrency}
          >
            Deposit
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default FiatPaypalSection;
