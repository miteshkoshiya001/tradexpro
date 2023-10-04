import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CardForm from "components/deposit/cardForm";
import { loadStripe } from "@stripe/stripe-js";
import useTranslation from "next-translate/useTranslation";
import { TokenBuyIcoStripeAction } from "state/actions/launchpad";
import { STRIPE } from "helpers/core-constants";
import PaymentDetails from "./paymentDetails";
import AmountCheck from "./AmountCheck";
const StripePayment = ({ initialData, pageInfo, phaseData }: any) => {
  const [loading, setLoading] = useState(false);
  const [paymentData, setPaymentData] = useState(null);
  const [credential, setCredential] = useState<any>({
    amount: null,
    stripe_token: null,
    pay_currency: null,
  });
  const { t } = useTranslation("common");

  //@ts-ignore
  const stripe = loadStripe(process.env.NEXT_PUBLIC_PUBLISH_KEY);
  return (
    <>
      {!credential.stripe_token && (
        <div className="col-md-12 p-0">
          <div className="boxShadow mt-4 p-4">
            <Elements stripe={stripe}>
              <CardForm setCredential={setCredential} credential={credential} />
            </Elements>
          </div>
        </div>
      )}

      {credential.stripe_token && (
        <form
          className="w-100  row"
          onSubmit={(e) => {
            e.preventDefault();
            TokenBuyIcoStripeAction(
              initialData,
              setLoading,
              credential.amount,
              credential.stripe_token,
              credential.pay_currency,
              STRIPE
            );
          }}
        >
          <div className="col-md-6 form-input-div">
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
          <div className="col-md-6 form-input-div">
            <label className="ico-label-box" htmlFor="">
              {t("Select Currency")}
            </label>
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
          {credential.pay_currency &&
          credential.amount &&
          initialData.phase_id ? (
            <PaymentDetails
              currency={credential.pay_currency}
              amount={credential.amount}
              phase_id={initialData.phase_id}
              token_id={initialData.token_id}
              payment_method={STRIPE}
              data={paymentData}
              setData={setPaymentData}
            />
          ) : (
            ""
          )}
          <button
            disabled={!credential.amount || !credential.pay_currency}
            className="primary-btn-outline w-100"
            type="submit"
          >
            {loading ? "Please Wait" : t("Make Payment")}
          </button>
        </form>
      )}
    </>
  );
};

export default StripePayment;
