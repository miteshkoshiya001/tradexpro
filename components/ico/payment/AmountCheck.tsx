import useTranslation from "next-translate/useTranslation";
import React from "react";

const AmountCheck = ({ phaseData, data }: any) => {
  const { t } = useTranslation("common");
  return (
    <div>
      <div className="mt-3">
        <span> Min amount {phaseData.minimum_purchase_price}</span>
        <span className="ml-3">
          Max amount {phaseData.maximum_purchase_price}
        </span>
      </div>
      {data.amount > parseFloat(phaseData.maximum_purchase_price) &&
      parseFloat(phaseData.maximum_purchase_price) !== 0 &&
      parseFloat(phaseData.minimum_purchase_price) !== 0 &&
      parseInt(data.amount) !== 0 ? (
        <div className="alert alert-danger mt-4" role="alert">
          {t("Amount cannot be larger than maximum amount")}
        </div>
      ) : data.amount < parseFloat(phaseData.minimum_purchase_price) &&
        parseFloat(phaseData.maximum_purchase_price) !== 0 &&
        parseFloat(phaseData.minimum_purchase_price) !== 0 &&
        data.amount !== null ? (
        <div className="alert alert-danger mt-4" role="alert">
          {t("Amount cannot be less than miniumum amount")}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default AmountCheck;
