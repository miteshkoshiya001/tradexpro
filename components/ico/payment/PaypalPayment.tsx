import PaypalButtons from "components/ico/payment/PaypalComponent";
import { PAYPAL } from "helpers/core-constants";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import PaymentDetails from "./paymentDetails";
import AmountCheck from "./AmountCheck";

const PaypalPayment = ({ initialData, pageInfo, phaseData }: any) => {
  const { t } = useTranslation("common");
  const [paymentData, setPaymentData] = useState(null);
  const [credential, setCredential] = useState<any>({
  payment_method_id: PAYPAL,
    amount: null,
    currency: "USD",
    paypal_token: null,
    phase_id: initialData.phase_id,
    token_id: initialData.token_id,
    pay_currency: "USD",
  });
  return (
    <div className=" text-center">
      <form className="w-100 row mt-3 p-3 boxShadow m-1">
        <div className="col-md-12 form-input-div  pr-0 ">
          <label className="ico-label-box" htmlFor="">
            {t("Quantity of token")}
          </label>
          <input
            type="number"
            name="amount"
            value={credential.amount}
            placeholder="Quantity of token"
            required
            className={`ico-input-box`}
            onChange={(e: any) => {
              setCredential({
                ...credential,
                amount: e.target.value,
              });
            }}
          />
          <AmountCheck phaseData={phaseData} data={credential} />
        </div>
        {/* <div className="col-md-6 form-input-div pr-0 pr-sm-3">
          <label className="ico-label-box" htmlFor="">
            {t("Select Currency")}
          </label>
          <div className="cp-select-area">
            <select
              name="bank"
              className={`ico-input-box`}
              required
              onChange={(e) => {
                setCredential({
                  ...credential,
                  pay_currency: e.target.value,
                });
              }}
            >
              <option value="">{t("Select")}</option>
              {pageInfo?.currency_list?.map((item: any, index: any) => (
                <option value={item.code} key={index}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>
        </div> */}
        {credential.pay_currency &&
        credential.amount &&
        initialData?.phase_id ? (
          <PaymentDetails
            currency={credential.pay_currency}
            amount={credential.amount}
            phase_id={initialData.phase_id}
            token_id={initialData.token_id}
            payment_method={PAYPAL}
            data={paymentData}
            setData={setPaymentData}
          />
        ) : (
          ""
        )}
        {credential.amount && credential.pay_currency && (
          <div className="col-lg-12 mb-3 paypal-container">
            <PaypalButtons
              credential={credential}
              setCredential={setCredential}
              paymentData={paymentData}
            />
          </div>
        )}
      </form>
    </div>
  );
};

export default PaypalPayment;
