import { CUstomSelect } from "components/common/CUstomSelect";
import MarketsCards from "components/markets/MarketsCards";
import TradesTable from "components/markets/TradesTable";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCurrenyApi, getMarketCardDatasApi } from "service/markets";

async function listenMessages(setMarketsCardData: any) {
  //@ts-ignore
  window.Pusher = Pusher;
  //@ts-ignore
  window.Echo = new Echo({
    broadcaster: "pusher",
    key: "test",
    wsHost: process.env.NEXT_PUBLIC_HOST_SOCKET,
    wsPort: process.env.NEXT_PUBLIC_WSS_PORT
      ? process.env.NEXT_PUBLIC_WSS_PORT
      : 6006,
    wssPort: 443,
    forceTLS: false,
    cluster: "mt1",
    disableStats: true,
    enabledTransports: ["ws", "wss"],
  });
  //@ts-ignore
  window.Echo.channel(`market-overview-coin-statistic-list-data`).listen(
    ".market-overview-coin-statistic-list",
    (e: any) => {
      setMarketsCardData(e);
    }
  );
}

export default function Index() {
  const { t } = useTranslation();
  const [marketsCardData, setMarketsCardData] = useState<any>();
  const [allCurrency, setAllCurrency] = useState([
    {
      label: "USD",
      value: "USD",
    },
  ]);

  const [selectedCurrency, setSelectedCurrency] = useState({
    label: "USD",
    value: "USD",
  });

  useEffect(() => {
    getCurreny();
  }, []);

  useEffect(() => {
    getMarketCardDatas(selectedCurrency.value);
  }, [selectedCurrency]);

  useEffect(() => {
    listenMessages(setMarketsCardData);
  }, []);

  const getCurreny = async () => {
    const data = await getCurrenyApi();
    if (!data.success) {
      toast.error(data.message);
    }
    setAllCurrency(data.data);
  };
  const getMarketCardDatas = async (currency_type: any) => {
    const data = await getMarketCardDatasApi(currency_type);
    if (!data.success) {
      toast.error(data.message);
      return;
    }
    setMarketsCardData(data.data);
  };

  const handleCoinType = (data: any) => {
    setSelectedCurrency(data);
  };

  return (
    <section>
      <div className="container">
        <div className=" pt-4 pb-2 p2p-gift-card-navbar-margin-top">
          <h1 className="banner-title">{t("Markets Overview")}</h1>
          <div className="d-flex gap-5 align-items-center">
            <p className="text-14">All price information is in</p>
            <CUstomSelect
              options={allCurrency}
              handleFunction={handleCoinType}
              classname={"market-select-page"}
              defaultValue={allCurrency[0]}
            />
          </div>
        </div>

        <div className="row my-2">
          {marketsCardData?.highlight_coin.length > 0 && (
            <div className="col-md-4 col-lg-3">
              <MarketsCards
                title={`Highlight Coin`}
                cardItems={marketsCardData?.highlight_coin}
              />
            </div>
          )}
          {marketsCardData?.new_listing.length > 0 && (
            <div className="col-md-4 col-lg-3">
              <MarketsCards
                title={`New Listing`}
                cardItems={marketsCardData?.new_listing}
              />
            </div>
          )}
          {marketsCardData?.top_gainer_coin.length > 0 && (
            <div className="col-md-4 col-lg-3">
              <MarketsCards
                title={`Top Gainer Coin`}
                cardItems={marketsCardData?.top_gainer_coin}
              />
            </div>
          )}
          {marketsCardData?.top_volume_coin.length > 0 && (
            <div className="col-md-4 col-lg-3">
              <MarketsCards
                title={`Top Volume Coin`}
                cardItems={marketsCardData?.top_volume_coin}
              />
            </div>
          )}
        </div>
      </div>
      <div className="bg-card-primary-clr">
        {/* trade section start*/}
        <TradesTable selectedCurrency={selectedCurrency} />
        {/* trade section end */}
      </div>
    </section>
  );
}
