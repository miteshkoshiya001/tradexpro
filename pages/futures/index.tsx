import MarketIndex from "components/FutureTrades/home/market-index/MarketIndex";
import TopCharts from "components/FutureTrades/home/top-charts/TopCharts";
import TradeSections from "components/FutureTrades/home/trade-sections/TradeSections";
import request from "lib/request";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getExchangeMarketDetails } from "service/futureTrade";
import { listenMessagesFutureMarketData } from "state/actions/exchange";

export default function Index() {
  const { t } = useTranslation();
  const [tradeDatas, setTradeDatas] = useState<any>({});
  const router = useRouter();
  useEffect(() => {
    getTradeSectionData();
  }, []);

  const getTradeSectionData = async () => {
    const data: any = await getExchangeMarketDetails("assets");
    if (!data.success) {
      toast.error(data.message);
      return;
    }
    setTradeDatas(data.data);
  };
  return (
    <section>
      <div className="container">
        <h1 className="banner-title py-4">{t("Crypto Futures Market")}</h1>
        {/* top chart start*/}
        {tradeDatas?.coins?.length > 0 && <TopCharts tradeDatas={tradeDatas} />}
        {/* top chart end*/}
      </div>
      <div className="bg-card-primary-clr">
        {/* trade section start*/}
        <TradeSections />
        {/* trade section end */}

        {/* market index  start*/}
        <MarketIndex tradeDatas={tradeDatas} />
        {/* market index  end*/}

        <section className="py-5">
          <div className="container">
            <div className="section-title text-center">
              <h2 className="title">{t("Start trading now")}</h2>
            </div>
            <div className="trading-button text-center">
              <Link
                href={
                  router.locale !== "en"
                    ? `/${router.locale}/exchange/dashboard`
                    : "/exchange/dashboard"
                }
              >
                <a>
                  <a className="primary-btn">{t("Trade Now")}</a>
                </a>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
