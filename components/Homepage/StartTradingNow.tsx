import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const StartTradingNow = ({ landing, loggedin }: any) => {
  const router = useRouter();
  const { t } = useTranslation("common");
  return (
    <div>
      {" "}
      {parseInt(landing?.landing_seventh_section_status) === 1 && (
        <section className="start-trading-area">
          <div className="container">
            <div className="section-title text-center">
              <h2 className="title">{t("Start trading now")}</h2>
            </div>
            <div className="trading-button text-center">
              {!loggedin && (
                <Link href="/signup">
                  <a className="primary-btn mr-0 mr-sm-5">{t("Sign Up")}</a>
                </Link>
              )}
              <a
                href={
                  router.locale !== "en"
                    ? `/${router.locale}/exchange/dashboard`
                    : "/exchange/dashboard"
                }
              >
                <a className="primary-btn">{t("Trade Now")}</a>
              </a>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default StartTradingNow;
