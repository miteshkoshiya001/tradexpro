import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";
import PoolCard from "./PoolCard";

const Launchpool = ({ viewMore }: any) => {
  const { t } = useTranslation("common");
  return (
    <>
      {" "}
      <div className="launchPool-container row">
        <div className="co-12 col-sm-12 col-md-6 col-lg-3 mt-3">
          <div className="status-launchpool">
            <p>{t("Completed")}</p>
          </div>
          <div className="mt-3 title-pool">
            <img alt="GAL" src="/gal.svg" className="pool-icon " />
            <h2 className=" ml-2">GAL</h2>
          </div>
          <p className="mt-3 desc-pool">
            Project Galaxy, A Web3 Credential Data Network.
          </p>
          <div className="pool-row">
            <p className="pool-title">Total Rewards:</p>
            <p className="pool-value">3,000,000.00</p>
          </div>
          <div className="pool-row">
            <p className="pool-title">Farming Period:</p>
            <p className="pool-value">30 day/s</p>
          </div>
          <div className="pool-row">
            <p className="pool-title">Session end date:</p>
            <p className="pool-value">2022-05-29</p>
          </div>
        </div>
        <div className="co-12 col-sm-12 col-md-6 col-lg-3 mt-3 ">
          <PoolCard />
        </div>
        <div className="co-12 col-sm-12 col-md-6 col-lg-3 mt-3">
          <PoolCard />
        </div>
        <div className="co-12 col-sm-12 col-md-6 col-lg-3 mt-3">
          <PoolCard />
        </div>
      </div>
      {viewMore && (
        <div className="viewMoreLink">
          <Link href="/launchpad/view-all/lp">
            <a>View more</a>
          </Link>
        </div>
      )}
    </>
  );
};

export default Launchpool;
