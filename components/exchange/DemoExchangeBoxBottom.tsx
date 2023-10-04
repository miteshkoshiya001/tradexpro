import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import Limit from "components/exchange/demo_buy/limit";
import Market from "components/exchange/demo_buy/market";
import StopLimit from "components/exchange/demo_buy/stopLimit";
import SellLimit from "components/exchange/demo_sell/limit";
import SellMarket from "components/exchange/demo_sell/market";
import SellStopLimit from "components/exchange/demo_sell/stopLimit";
import useTranslation from "next-translate/useTranslation";

const DemoExchangeBoxBottom = () => {
  type tradingTabType = number;
  const { t } = useTranslation("common");
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const { dashboard, currentPair } = useSelector(
    (state: RootState) => state.demoExchange
  );
  const [tradingTab, setTradingTab] = useState<tradingTabType>(1);
  const [buyLimitCoinData, setBuyLimitCoinData] = useState<any>({
    price: dashboard?.order_data?.sell_price,
    amount: dashboard?.order_data?.sell_amount ?? 0,
    total: 0.0,
  });
  const [buyMarketCoinData, setBuyMarketCoinData] = useState<any>({
    price: dashboard?.order_data?.sell_price,
    amount: dashboard?.order_data?.sell_amount ?? 0,
    total: 0.0,
  });
  const [buyStopLimitCoinData, setBuyStopLimitCoinData] = useState<any>({
    amount: 0.0,
    total: 0,
    limit: 0,
    stop: 0,
  });
  const [SellLimitCoinData, setSellLimitCoinData] = useState<any>({
    price: dashboard?.order_data?.buy_price,
    amount: dashboard?.order_data?.buy_amount ?? 0,
    total: 0.0,
  });
  const [SellMarketCoinData, setSellMarketCoinData] = useState<any>({
    price: dashboard?.order_data?.buy_price,
    amount: dashboard?.order_data?.buy_amount ?? 0,
    total: 0.0,
  });
  const [SellStopLimitCoinData, setSellStopLimitCoinData] = useState<any>({
    amount: 0.0,
    total: 0,
    limit: 0,
    stop: 0,
  });

  const [buySelectedTab, setBuySelectedTab] = useState<number>(1);

  const initialSetUp = () => {
    setBuyLimitCoinData({
      price: dashboard?.order_data?.sell_price,
      amount: dashboard?.order_data?.sell_amount ?? 0,
      total:
        dashboard?.order_data?.sell_price * dashboard?.order_data?.sell_amount>0?dashboard?.order_data?.sell_price * dashboard?.order_data?.sell_amount:0,
    });
    setBuyMarketCoinData({
      price: dashboard?.order_data?.sell_price,
      amount: dashboard?.order_data?.sell_amount ?? 0,
      total:
        dashboard?.order_data?.sell_price * dashboard?.order_data?.sell_amount>0?dashboard?.order_data?.sell_price * dashboard?.order_data?.sell_amount:0,
    });
    setBuyStopLimitCoinData({
      amount: 0,
      total: 0,
      limit: 0,
      stop: 0,
    });
    setSellLimitCoinData({
      price: dashboard?.order_data?.buy_price,
      amount: dashboard?.order_data?.buy_amount ?? 0,
      total:
        dashboard?.order_data?.buy_price * dashboard?.order_data?.buy_amount,
    });
    setSellMarketCoinData({
      price: dashboard?.order_data?.buy_price,
      amount: dashboard?.order_data?.buy_amount ?? 0,
      total:
        dashboard?.order_data?.buy_price * dashboard?.order_data?.buy_amount,
    });
  };

  useEffect(() => {
    initialSetUp();
  }, [
    dashboard?.order_data?.buy_price,
    dashboard?.order_data?.sell_price,
    dashboard?.order_data?.buy_amount,
    dashboard?.order_data?.sell_amount,
  ]);

  return (
    <div className="exchange-box order-box mt-4">
      <div id="pills-tabContent" className="tab-content">
        <div
          id="pills-transfer-1"
          role="tabpanel"
          aria-labelledby="pills-transfer-1-tab"
        >
          <ul
            id="BuyTab"
            role="tablist"
            className="nav nav-tabs inner-tabs-menu"
          >
            <li role="presentation" className="nav-item">
              <a
                id="Limit-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="Limit"
                aria-selected="true"
                className="nav-link active"
                onClick={() => {
                  setBuySelectedTab(1);
                }}
              >
                {t("Limit")}
              </a>
            </li>
            <li role="presentation" className="nav-item">
              <a
                id="Market-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="Market"
                aria-selected="false"
                className="nav-link"
                onClick={() => {
                  setBuySelectedTab(2);
                }}
              >
                {t("Market")}
              </a>
            </li>
            <li role="presentation" className="nav-item">
              <a
                id="Stop-limit-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="Stop-limit"
                aria-selected="false"
                className="nav-link"
                onClick={() => {
                  setBuySelectedTab(3);
                }}
              >
                {t("Stop-limit")}
              </a>
            </li>
          </ul>
          {buySelectedTab === 1 && (
            <div className="column">
              <div className="row">
                <div className="col-md-6">
                  <Limit
                    dashboard={dashboard}
                    buySellLimitCoinData={buyLimitCoinData}
                    setBuySellLimitCoinData={setBuyLimitCoinData}
                    isLoggedIn={isLoggedIn}
                    currentPair={currentPair}
                  />
                </div>
                <div className="col-md-6">
                  <SellLimit
                    dashboard={dashboard}
                    buySellLimitCoinData={SellLimitCoinData}
                    setBuySellLimitCoinData={setSellLimitCoinData}
                    isLoggedIn={isLoggedIn}
                    currentPair={currentPair}
                  />
                </div>
              </div>
            </div>
          )}
          {buySelectedTab === 2 && (
            <div className="column">
              <div className="row">
                <div className="col-md-6">
                  <Market
                    dashboard={dashboard}
                    buySellMarketCoinData={buyMarketCoinData}
                    setBuySellMarketCoinData={setBuyMarketCoinData}
                    isLoggedIn={isLoggedIn}
                    currentPair={currentPair}
                  />
                </div>

                <div className="col-md-6">
                  <SellMarket
                    dashboard={dashboard}
                    buySellMarketCoinData={SellMarketCoinData}
                    setBuySellMarketCoinData={setSellMarketCoinData}
                    isLoggedIn={isLoggedIn}
                    currentPair={currentPair}
                  />
                </div>
              </div>
            </div>
          )}
          {buySelectedTab === 3 && (
            <div className="column">
              <div className="row">
                <div className="col-md-6">
                  <StopLimit
                    dashboard={dashboard}
                    buySellStopLimitCoinData={buyStopLimitCoinData}
                    setBuySellStopLimitCoinData={setBuyStopLimitCoinData}
                    isLoggedIn={isLoggedIn}
                    currentPair={currentPair}
                  />
                </div>
                <div className="col-md-6">
                  <SellStopLimit
                    dashboard={dashboard}
                    buySellStopLimitCoinData={SellStopLimitCoinData}
                    setBuySellStopLimitCoinData={setSellStopLimitCoinData}
                    isLoggedIn={isLoggedIn}
                    currentPair={currentPair}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DemoExchangeBoxBottom;
