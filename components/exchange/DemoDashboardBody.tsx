import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import dynamic from "next/dynamic";
import useTranslation from "next-translate/useTranslation";
import {
  EXCHANGE_LAYOUT_ONE,
  EXCHANGE_LAYOUT_TWO,
} from "helpers/core-constants";
import DemoAllSellOrdersFull from "./DemoAllSellOrdersFull";
import DemoAllBuyOrdersFull from "./DemoAllBuyOrdersFull";
import DemoAllSellOrders from "./DemoAllSellOrders";
import DemoAllBuyOrders from "./DemoAllBuyOrders";
import DemoOrderHistorySection from "./DemoOrderHistorySection";
import DemoSelectCurrencyRight from "./DemoSelectCurrencyRight";
import DemoTradesHistory from "./DemoTradesHistory";
import DemoExchangeBox from "./DemoExchangeBox";
import DemoExchangeBoxBottom from "./DemoExchangeBoxBottom";
const DemoTradingChart = dynamic(
  () =>
    import("components/exchange/DemoTradingChart").then(
      (mod: any) => mod.TVChartContainer
    ),
  { ssr: false }
);
const DemoDashboardBody = ({ ThemeColor }: any) => {
  const { t } = useTranslation("common");
  const [show, setShow] = useState(true);
  const [select, setSelect] = useState(3);
  const { dashboard, OpenBookBuy, OpenBooksell, marketTrades, currentPair } =
    useSelector((state: RootState) => state.demoExchange);
  const { settings, theme } = useSelector((state: RootState) => state.common);
  useEffect(() => {
    setShow(false);
    setInterval(() => {
      setShow(true);
    }, 400);
  }, [ThemeColor.green, ThemeColor.red]);
  return (
    <div className="row trade-dashboard-side-margin">
      <div className="col-xl px-0 trade-dashboard-side-width">
        <div className="trades-section">
          <div>
            <h6 className="text-white">{t("Order Book")}</h6>
          </div>
          <div className="trades-headers">
            <div className="orderBookIcons">
              <h3
                onClick={() => {
                  setSelect(2);
                }}
                className="icon-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="css-3kwgah w-25"
                >
                  <path d="M4 4h7v16H4V4z" fill={ThemeColor.green}></path>
                  <path
                    d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
                    fill="currentColor"
                  ></path>
                </svg>
              </h3>
              <h3
                onClick={() => {
                  setSelect(1);
                }}
                className="icon-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="css-3kwgah  w-25"
                >
                  <path d="M4 4h7v16H4V4z" fill={ThemeColor.red}></path>
                  <path
                    d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
                    fill="currentColor"
                  ></path>
                </svg>
              </h3>
              <h3
                onClick={() => {
                  setSelect(3);
                }}
                className="icon-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="css-3kwgah w-25"
                >
                  <path d="M4 4h7v7H4V4z" fill={ThemeColor.green}></path>
                  <path d="M4 13h7v7H4v-7z" fill={ThemeColor.green}></path>
                  <path
                    d="M13 4h7v4h-7V4zm0 6h7v4h-7v-4zm7 6h-7v4h7v-4z"
                    fill="currentColor"
                  ></path>
                </svg>
              </h3>
            </div>
          </div>
          {select === 1 && (
            <>
              <DemoAllSellOrdersFull OpenBooksell={OpenBooksell} />
              <div className="trades-table-footer">
                <div className="trades-table-row">
                  <span
                    className={
                      parseFloat(
                        dashboard?.last_price_data &&
                          dashboard?.last_price_data[0]?.price
                      ) >
                      parseFloat(
                        dashboard?.last_price_data &&
                          dashboard?.last_price_data[0]?.last_price
                      )
                        ? "value-increase"
                        : parseFloat(
                            dashboard?.last_price_data &&
                              dashboard?.last_price_data[0]?.price
                          ) <
                          parseFloat(
                            dashboard?.last_price_data &&
                              dashboard?.last_price_data[0]?.last_price
                          )
                        ? "value-decrease"
                        : "value-same"
                    }
                  >
                    {parseFloat(
                      dashboard?.last_price_data[0]?.price
                        ? dashboard?.last_price_data[0]?.price
                        : 0
                    )}
                    {parseFloat(
                      dashboard?.last_price_data &&
                        dashboard?.last_price_data[0]?.price
                    ) >
                    parseFloat(
                      dashboard?.last_price_data &&
                        dashboard?.last_price_data[0]?.last_price
                    ) ? (
                      <i className="fa-solid fa-up-long value-increaseicon ml-2"></i>
                    ) : parseFloat(
                        dashboard?.last_price_data &&
                          dashboard?.last_price_data[0]?.price
                      ) <
                      parseFloat(
                        dashboard?.last_price_data &&
                          dashboard?.last_price_data[0]?.last_price
                      ) ? (
                      <i className="fa-solid fa-down-long value-decreaseicon ml-2"></i>
                    ) : (
                      ""
                    )}
                  </span>
                  <span className="value-previous">
                    {" "}
                    {parseFloat(
                      dashboard?.last_price_data[0]?.last_price
                        ? dashboard?.last_price_data[0]?.last_price
                        : 0
                    )}
                    ({dashboard?.order_data?.base_coin})
                  </span>
                </div>
              </div>
            </>
          )}
          {select === 2 && (
            <>
              <div className="trades-table-footer">
                <div className="trades-table-row">
                  <span
                    className={
                      parseFloat(
                        dashboard?.last_price_data &&
                          dashboard?.last_price_data[0]?.price
                      ) >
                      parseFloat(
                        dashboard?.last_price_data &&
                          dashboard?.last_price_data[0]?.last_price
                      )
                        ? "value-increase"
                        : parseFloat(
                            dashboard?.last_price_data &&
                              dashboard?.last_price_data[0]?.price
                          ) <
                          parseFloat(
                            dashboard?.last_price_data &&
                              dashboard?.last_price_data[0]?.last_price
                          )
                        ? "value-decrease"
                        : "value-same"
                    }
                  >
                    {parseFloat(
                      dashboard?.last_price_data[0]?.price
                        ? dashboard?.last_price_data[0]?.price
                        : 0
                    )}
                    {parseFloat(
                      dashboard?.last_price_data &&
                        dashboard?.last_price_data[0]?.price
                    ) >
                    parseFloat(
                      dashboard?.last_price_data &&
                        dashboard?.last_price_data[0]?.last_price
                    ) ? (
                      <i className="fa-solid fa-up-long value-increaseicon ml-2"></i>
                    ) : parseFloat(
                        dashboard?.last_price_data &&
                          dashboard?.last_price_data[0]?.price
                      ) <
                      parseFloat(
                        dashboard?.last_price_data &&
                          dashboard?.last_price_data[0]?.last_price
                      ) ? (
                      <i className="fa-solid fa-down-long value-decreaseicon ml-2"></i>
                    ) : (
                      ""
                    )}
                  </span>
                  <span className="value-previous">
                    {" "}
                    {parseFloat(
                      dashboard?.last_price_data[0]?.last_price
                        ? dashboard?.last_price_data[0]?.last_price
                        : 0
                    )}
                    ({dashboard?.order_data?.base_coin})
                  </span>
                </div>
              </div>
              <DemoAllBuyOrdersFull buy={OpenBookBuy} show={38} />
            </>
          )}
          {select === 3 && (
            <div className="tradeSection-both">
              <DemoAllSellOrders OpenBooksell={OpenBooksell} show={18} />

              <div className="trades-table-footer">
                {dashboard?.last_price_data?.length > 0 ? (
                  <div className="trades-table-row">
                    <span
                      className={
                        parseFloat(
                          dashboard?.last_price_data &&
                            dashboard?.last_price_data[0]?.price
                        ) >
                        parseFloat(
                          dashboard?.last_price_data &&
                            dashboard?.last_price_data[0]?.last_price
                        )
                          ? "value-increase"
                          : parseFloat(
                              dashboard?.last_price_data &&
                                dashboard?.last_price_data[0]?.price
                            ) <
                            parseFloat(
                              dashboard?.last_price_data &&
                                dashboard?.last_price_data[0]?.last_price
                            )
                          ? "value-decrease"
                          : "value-same"
                      }
                    >
                      {parseFloat(
                        dashboard?.last_price_data
                          ? dashboard?.last_price_data[0]?.price
                          : 0
                      )}
                      {parseFloat(
                        dashboard?.last_price_data &&
                          dashboard?.last_price_data[0]?.price
                      ) >
                      parseFloat(
                        dashboard?.last_price_data &&
                          dashboard?.last_price_data[0]?.last_price
                      ) ? (
                        <i className="fa-solid fa-up-long value-increaseicon ml-2"></i>
                      ) : parseFloat(
                          dashboard?.last_price_data &&
                            dashboard?.last_price_data[0]?.price
                        ) <
                        parseFloat(
                          dashboard?.last_price_data &&
                            dashboard?.last_price_data[0]?.last_price
                        ) ? (
                        <i className="fa-solid fa-down-long value-decreaseicon ml-2"></i>
                      ) : (
                        "0"
                      )}
                    </span>
                    <span className="value-previous">
                      {" "}
                      {parseFloat(
                        dashboard?.last_price_data
                          ? dashboard?.last_price_data[0]?.last_price
                          : 0
                      )}
                      ({dashboard?.order_data?.base_coin})
                    </span>
                  </div>
                ) : (
                  <div className="trades-table-row">
                    <span
                      className={
                        parseFloat(
                          dashboard?.last_price_data &&
                            dashboard?.last_price_data[0]?.price
                        ) >
                        parseFloat(
                          dashboard?.last_price_data &&
                            dashboard?.last_price_data[0]?.last_price
                        )
                          ? "value-increase"
                          : parseFloat(
                              dashboard?.last_price_data &&
                                dashboard?.last_price_data[0]?.price
                            ) <
                            parseFloat(
                              dashboard?.last_price_data &&
                                dashboard?.last_price_data[0]?.last_price
                            )
                          ? "value-decrease"
                          : "value-same"
                      }
                    >
                      0
                    </span>
                    <span className="value-previous">
                      ({dashboard?.order_data?.base_coin})
                    </span>
                  </div>
                )}
              </div>
              <DemoAllBuyOrders OpenBookBuy={OpenBookBuy} show={18} />
            </div>
          )}
        </div>
      </div>
      <div className="col-xl-7 px-0">
        <div className="cp-user-buy-coin-content-area">
          <div className="card cp-user-custom-card">
            {currentPair && (
              //@ts-ignore
              <DemoTradingChart
                //@ts-ignore
                currentPair={currentPair}
                theme={theme}
                ThemeColor={ThemeColor}
              />
            )}
          </div>
        </div>
        {parseInt(settings?.exchange_layout_view) === EXCHANGE_LAYOUT_ONE && (
          <DemoExchangeBoxBottom />
        )}
        {parseInt(settings?.exchange_layout_view) === EXCHANGE_LAYOUT_TWO && (
          <DemoOrderHistorySection />
        )}
      </div>
      <div className="col-xl px-0 trade-dashboard-side-width">
        {parseInt(settings?.exchange_layout_view) === EXCHANGE_LAYOUT_ONE && (
          <DemoSelectCurrencyRight />
        )}{" "}
        {parseInt(settings?.exchange_layout_view) === EXCHANGE_LAYOUT_TWO && (
          <DemoExchangeBox />
        )}
        <DemoTradesHistory marketTrades={marketTrades} />
      </div>
      {parseInt(settings?.exchange_layout_view) === EXCHANGE_LAYOUT_ONE && (
        <DemoOrderHistorySection bottom={true} />
      )}
    </div>
  );
};

export default DemoDashboardBody;
