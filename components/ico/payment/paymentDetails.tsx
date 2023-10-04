import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { TokenPriceInfo } from "service/launchpad";

const PaymentDetails = ({
  currency,
  amount,
  phase_id,
  payer_wallet,
  token_id,
  payment_method,
  data,
  setData
}: any) => {
  const { t } = useTranslation("common");
  const getTokenInfo = async () => {
    const response = await TokenPriceInfo(
      amount,
      phase_id,
      payer_wallet,
      currency,
      payer_wallet,
      token_id,
      payment_method
    );
    setData(response.data);
  };
  useEffect(() => {
    getTokenInfo();
  }, [currency, amount, phase_id]);
  return (
    <div className="w-100 p-3 row">
      {data ? (
        <>
          <div className="col-lg-6 col-md-12 pool-row">
            <p className="pool-title">{t("Token Price:")}</p>
            <p className="pool-value">{data.token_price}</p>
          </div>
          <div className="col-lg-6 col-md-12 pool-row">
            <p className="pool-title">{t("Token Currency:")}</p>
            <p className="pool-value">{data.token_currency}</p>
          </div>
          <div className="col-lg-6 col-md-12 pool-row">
            <p className="pool-title">{t("Token Amount:")}</p>
            <p className="pool-value">{data.token_amount}</p>
          </div>
          <div className="col-lg-6 col-md-12 pool-row">
            <p className="pool-title">{t("Total Token Price:")}</p>
            <p className="pool-value">{data.token_total_price}</p>
          </div>
          <div className="col-lg-6 col-md-12 pool-row">
            <p className="pool-title">{t("Pay Amount:")}</p>
            <p className="pool-value">{data.pay_amount}</p>
          </div>
          <div className="col-lg-6 col-md-12 pool-row">
            <p className="pool-title">{t("Pay Currency:")}</p>
            <p className="pool-value">{data.pay_currency}</p>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default PaymentDetails;
