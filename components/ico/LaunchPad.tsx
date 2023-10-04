import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";

const LaunchPad = ({ viewMore, data, core, image, link }: any) => {
  const { t } = useTranslation("common");
  return (
    <>
      <Link href={link === false ? "#" : `/ico/token-details/${data?.id}`}>
        <div className="mt-3 mb-5 row launchpad-container">
          {}
          {image !== false && (
            <div className="col-lg-4 col-12  mb-2">
              <img
                src={
                  data?.image
                    ? data?.image
                    : "/binance-logo-6219389_960_720.webp"
                }
                alt=""
                className="launchpad-cover"
              />
            </div>
          )}

          <div
            className={`${
              image === false ? "col-lg-12" : "col-lg-8"
            } col-12 subscriptionRightContent`}
          >
            <div>
              <h3 className="mt-1">{data?.title}</h3>
              <p>{data?.project_introduction}</p>

              <div className="row">
                <div className="col-lg-6 col-md-12 pool-row">
                  <p className="pool-title">{t("Tokens Offered:")}</p>
                  <p className="pool-value">
                    {parseFloat(data?.total_token_supply)} {data?.coin_type}
                  </p>
                </div>
                <div className="col-lg-6 col-md-12 pool-row">
                  <p className="pool-title">{t("Participants:")}</p>
                  <p className="pool-value">
                    {data?.total_participated ? data?.total_participated : 0}
                  </p>
                </div>

                <div className="col-lg-6 col-md-12 pool-row">
                  <p className="pool-title">{t("Sale Price:")}</p>
                  <p className="pool-value">{`1 ${
                    data?.coin_type
                  } = ${parseFloat(data?.coin_price).toFixed(2)} ${
                    data?.coin_currency
                  }`}</p>
                </div>
                <div className="col-lg-6 col-md-12 pool-row">
                  <p className="pool-title">{t("Total Sell:")}</p>
                  <p className="pool-value">
                    { parseFloat(data?.sold_phase_tokens)}{" "}
                    {data?.coin_type}
                  </p>
                </div>
                <div className="col-lg-6 col-md-12 pool-row">
                  <p className="pool-title">{t("Available:")}</p>
                  <p className="pool-value">
                    
                    {parseFloat(data?.total_token_supply) -
                      parseFloat(data?.sold_phase_tokens)}{" "}
                    {data?.coin_type}
                  </p>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-6 pool-row">
                  <p className="pool-title">{t("Start time:")}</p>
                  <p className="pool-value">{data?.start_date}</p>
                </div>
                <div className="col-6 pool-row">
                  <p className="pool-title">{t("End time:")}</p>
                  <p className="pool-value">{data?.end_date}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      {viewMore && (
        <div className="viewMoreLink">
          <Link href={"/ico/view-all/lists?type=" + core}>
            <a>View more</a>
          </Link>
        </div>
      )}
    </>
  );
};

export default LaunchPad;
