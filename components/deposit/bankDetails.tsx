import { copyTextById } from "common";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const BankDetails = ({ bankInfo }: any) => {
  const { t } = useTranslation("common");
  console.log(bankInfo, "bankInfo");
  return (
    <div className="bank-container">
      <div className="bank-item">
        <p className="bank-title">{t("Account Number")} </p>
        <p>{bankInfo.iban ?? ""}</p>
      </div>
      <div className="bank-item">
        <p className="bank-title">{t("Bank name")} </p>
        <p>{bankInfo.bank_name ?? ""}</p>
      </div>
      <div className="bank-item">
        <p className="bank-title">{t("Bank address")}</p>
        <p>{bankInfo.bank_address ?? ""}</p>
      </div>
      <div className="bank-item">
        <p className="bank-title">{t("Account holder name")} </p>
        <p>{bankInfo.account_holder_name ?? ""}</p>
      </div>
      <div className="bank-item">
        <p className="bank-title">{t("Account holder address")} </p>
        <p>{bankInfo.account_holder_address ?? ""}</p>
      </div>{" "}
      <div className="bank-item">
        <p className="bank-title">{t("Swift code")} </p>
        <p>{bankInfo.swift_code ?? ""}</p>
      </div>
    </div>
  );
};

export default BankDetails;
