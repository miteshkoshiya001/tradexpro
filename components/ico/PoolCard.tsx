import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";

const PoolCard = () => {
  const { t } = useTranslation("common");
  return (
    <Link href={"/launchpool/2"}>
      <div className="pool-card p-3">
        <div className="card-pool-title ">
          <img alt="GAL" src="/gal.svg" className="pool-icon-small" />
          <h5 className=" ml-2">{t("GAL")}</h5>
        </div>
        <p className="text-center">{t("Stake BUSD, Earn GAL")}</p>
        <div className="center-img-pool">
          <img alt={t("GAL")} src="/gal.svg" className="pool-icon" />
        </div>
        <div className="pool-row">
          <p className="pool-title">{t("APY:")}</p>
          <p className="pool-value">{t("1.32%")}</p>
        </div>
        <div className="pool-row">
          <p className="pool-title">{t("Participants:")}</p>
          <p className="pool-value">{t("146,264")}</p>
        </div>
        <div className="pool-row">
          <p className="pool-title">{t("Total Staked:")}</p>
          <p className="pool-value">{t("1,571,348 BUSD")}</p>
        </div>
      </div>
    </Link>
  );
};

export default PoolCard;
