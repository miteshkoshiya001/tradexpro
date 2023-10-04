import React from "react";
import AllSellOrdersFull from "components/exchange/AllSellOrdersFull";
import AllBuyOrdersFull from "components/exchange/AllBuyOrdersFull";
import AllSellOrders from "components/exchange/AllSellOrders";
import AllBuyOrders from "components/exchange/AllBuyOrders";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { RootState } from "state/store";

const OrderBook = () => {
  const { t } = useTranslation("common");
  const [select, setSelect] = React.useState(3);
  const { dashboard, OpenBookBuy, OpenBooksell, marketTrades, currentPair } =
    useSelector((state: RootState) => state.futureExchange);
  const { settings, theme } = useSelector((state: RootState) => state.common);

  return (
    <div className="trades-section mb-0">
      <div>
        <h6 className="text-white">{t("Order Book")}</h6>
      </div>
      <div className="trades-headers mb-3">
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
              <path d="M4 4h7v16H4V4z" fill="#0ECB81"></path>
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
              <path d="M4 4h7v16H4V4z" fill="#F6465D"></path>
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
              <path d="M4 4h7v7H4V4z" fill="#F6465D"></path>
              <path d="M4 13h7v7H4v-7z" fill="#0ECB81"></path>
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
          <AllSellOrdersFull OpenBooksell={OpenBooksell} customClss={'buy-sell-order-max-h'}/>
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
          <AllBuyOrdersFull buy={OpenBookBuy} show={38} customClss={'buy-sell-order-max-h'}/>
        </>
      )}
      {select === 3 && (
        <div className="tradeSection-both">
          <div className="order-book-section-max-h">
            <AllSellOrders OpenBooksell={OpenBooksell} show={18} />
          </div>
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
          <div className="order-book-section-max-h">
            <AllBuyOrders OpenBookBuy={OpenBookBuy} show={18} />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderBook;
