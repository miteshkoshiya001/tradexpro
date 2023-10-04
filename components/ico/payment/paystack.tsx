import { PAYSTACK } from "helpers/core-constants";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { PaystackAction } from "state/actions/launchpad";
import PaymentDetails from "./paymentDetails";
import AmountCheck from "./AmountCheck";

const Paystack = ({ pageInfo, initialData, phaseData }: any) => {
  const { t } = useTranslation("common");
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [data, setData] = useState<any>({
    email: null,
    amount: null,
  });
  return (
    <div className="boxShadow mt-3">
      <form
        className="w-100 ico-tokenCreate row"
        onSubmit={(e: any) => {
          e.preventDefault();
          PaystackAction(
            initialData,
            setLoading,
            data.email,
            data.amount,
            PAYSTACK
          );
        }}
      >
        <div className="col-md-6 form-input-div">
          <label className="ico-label-box" htmlFor="">
            {t("Email")}
          </label>
          <input
            type="email"
            name="email"
            value={data.email}
            placeholder="Enter your email"
            required
            className={`ico-input-box`}
            onChange={(e: any) => {
              setData({
                ...data,
                email: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-md-6 form-input-div">
          <label className="ico-label-box" htmlFor="">
            {t("Quantity of token")}
          </label>
          <input
            type="number"
            name="amount"
            value={data.amount}
            placeholder="Quantity of token"
            required
            className={`ico-input-box`}
            onChange={(e: any) => {
              setData({
                ...data,
                amount: e.target.value,
              });
            }}
          />
          <AmountCheck phaseData={phaseData} data={data} />
        </div>
        {data.amount && initialData.phase_id ? (
          <PaymentDetails
            currency={"USD"}
            amount={data.amount}
            phase_id={initialData.phase_id}
            token_id={initialData.token_id}
            payment_method={PAYSTACK}
            data={paymentData}
            setData={setPaymentData}
          />
        ) : (
          ""
        )}
        <button
          className="primary-btn-outline w-100"
          type="submit"
          disabled={!data.email && !data.amount}
        >
          {loading ? "Please Wait" : t("Make Payment")}
        </button>
      </form>
    </div>
  );
};

export default Paystack;
