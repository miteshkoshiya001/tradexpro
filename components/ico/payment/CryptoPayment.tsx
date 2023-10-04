import { CRYPTO_DEPOSIT } from "helpers/core-constants";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { TokenBuyIcoCryptoAction } from "state/actions/launchpad";
import PaymentDetails from "./paymentDetails";
import AmountCheck from "./AmountCheck";

const CryptoPayment = ({ walletlist, initialData, phaseData }: any) => {
  const [data, setData] = useState<any>({
    amount: null,
    payer_wallet: null,
  });
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation("common");
  return (
    <form
      onSubmit={(e: any) => {
        e.preventDefault();
        TokenBuyIcoCryptoAction(
          initialData,
          setLoading,
          data.payer_wallet,
          data.amount,
          CRYPTO_DEPOSIT
        );
      }}
    >
      <div className="w-100 ico-tokenCreate row">
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
        <div className="col-md-6 form-input-div">
          <label className="ico-label-box" htmlFor="">
            {t("Select Coin Currency")}
          </label>
          <select
            name="coin_currency"
            className={`ico-input-box`}
            required
            onChange={(e) => {
              setData({
                ...data,
                payer_wallet: e.target.value,
              });
            }}
          >
            <option value="">{t("Select")}</option>
            {walletlist?.map((item: any, index: any) => (
              <option value={item.id} key={index}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
        {data.payer_wallet && data.amount && initialData.phase_id ? (
          <PaymentDetails
            amount={data.amount}
            phase_id={initialData.phase_id}
            token_id={initialData.token_id}
            payment_method={CRYPTO_DEPOSIT}
            payer_wallet={data.payer_wallet}
            data={paymentData}
            setData={setPaymentData}
          />
        ) : (
          ""
        )}
        <button className="primary-btn-outline w-100" type="submit">
          {loading ? t("Please wait") : t("Make Payment")}
        </button>
      </div>
    </form>
  );
};

export default CryptoPayment;
