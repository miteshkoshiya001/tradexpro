import { copyTextById } from "common";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const ProviderDetails = ({ providerInfo }: any) => {
  const { t } = useTranslation("common");
  return (
    <div className="bank-container">
      <div className="bank-item">
        <p className="bank-title">{t("Account Holder Name")} </p>
        <p>{providerInfo.account_holder_name ?? ""}</p>
      </div>
      <div className="bank-item">
        <p className="bank-title">{t("Mobile Number")} </p>
        <p>{providerInfo.mobile_number ?? ""}</p>
      </div>
      <div className="bank-item">
        <p className="bank-title">{t("Service Provider Name")}</p>
        <p>{providerInfo.service_provider_name ?? ""}</p>
      </div>
    </div>
  );
};

export default ProviderDetails;
