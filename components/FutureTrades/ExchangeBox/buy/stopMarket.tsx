import { formateZert } from "common";
import {
  AMOUNT_TYPE_BASE,
  AMOUNT_TYPE_TRADE,
  BASE,
  TRADE,
} from "helpers/core-constants";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { buyLimitAppAction } from "state/actions/exchange";

const BuyStopMarketLimit = ({
  dashboard,
  OpenCloseStopMarketCoinData,
  setOpenCloseStopMarketCoinData,
  isLoggedIn,
  selectedCoinType,
  preplaceData,
  setSelectedCoinType,
  BuyOrder,
  SellOrder,
}: any) => {
  const { t } = useTranslation("common");
  const [selectedMarketValue, setSelectedMarketValue] = useState(0);
  const [tpSlchecked, setChecked] = useState(false);
  const dispatch = useDispatch();

  const setSizeBasedOnPercentage = (percentage: any) => {
    const { maker_fees, taker_fees } = dashboard.fees_settings;
    const amount =
      parseFloat(dashboard?.order_data?.total?.base_wallet?.balance) /
      parseFloat(OpenCloseStopMarketCoinData.price);
    const feesPercentage =
      parseFloat(maker_fees) > parseFloat(taker_fees)
        ? parseFloat(maker_fees)
        : parseFloat(taker_fees);
    const total =
      amount * percentage * parseFloat(OpenCloseStopMarketCoinData.price);
    const fees = (total * feesPercentage) / 100;
    setOpenCloseStopMarketCoinData({
      ...OpenCloseStopMarketCoinData,
      size: (total - fees) / parseFloat(OpenCloseStopMarketCoinData.price),
      total: total - fees,
    });
  };
  return (
    <div id="BuyTabContent" className="tab-content p-0">
      <div
        id="imit"
        role="tabpanel"
        aria-labelledby="Limit-tab"
        className="tab-pane fade show active"
      >
        <div className="row">
          <div className="col-md-12">
            <div className="cp-user-profile-info">
              <form
                id="buy-form"
                style={{
                  overflow: "hidden",
                }}
              >
                <input
                  type="hidden"
                  name="_token"
                  defaultValue="g2OWJq3pDqYRQmVvmGt799aCsDmkkV4UjrWDhzcF"
                />
                <div className="form-group">
                  {/* <div className="total-top">
                    <label>{t("Total")}</label> <label>{t("Available")}</label>
                  </div> */}
                  <div className="total-top-blance">
                    <div className="total-blance">
                      <label>{t("Available")}</label>
                    </div>
                    <div className="avilable-blance">
                      <span
                        className="text-warning"
                        style={{ fontWeight: 700 }}
                      >
                        <span>
                          {" "}
                          {parseFloat(
                            dashboard?.order_data?.total?.base_wallet?.balance
                              ? dashboard?.order_data?.total?.base_wallet
                                  ?.balance
                              : 0
                          ).toFixed(4)}
                        </span>
                      </span>
                      <span
                        className="text-warning ml-1"
                        style={{ fontWeight: 700 }}
                      >
                        <span className="trade_coin_type">
                          {dashboard?.order_data?.total?.base_wallet?.coin_type}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="form-group boxShadow mt-2">
                    <label className="cstmHead">Stop price</label>
                    <input
                      name="price"
                      type="number"
                      placeholder=""
                      className="form-control number_only input_1"
                      value={OpenCloseStopMarketCoinData.stop_price}
                      onChange={(e) => {
                        setOpenCloseStopMarketCoinData({
                          ...OpenCloseStopMarketCoinData,
                          stop_price: e.target.value,
                        });
                      }}
                    />

                    <span className=" blns" style={{ fontWeight: 700 }}>
                      <span
                        className={
                          selectedCoinType === TRADE
                            ? "text-warning mr-2"
                            : "mr-2"
                        }
                        onClick={() => {
                          setSelectedCoinType(TRADE);
                        }}
                      >
                        Mark
                      </span>
                    </span>
                  </div>
                </div>
                {/* <div className="form-group mt-3 boxShadow">
                  <label className="cstmHead">{t("Price")}</label>
                  <input
                    name="price"
                    type="text"
                    placeholder="0"
                    className="form-control number_only input_1"
                    value={OpenCloseStopMarketCoinData.price}
                    onChange={async (e) => {
                      await setOpenCloseStopMarketCoinData({
                        ...OpenCloseStopMarketCoinData,
                        price: e.target.value,
                        total:
                          parseFloat(e.target.value) *
                          OpenCloseStopMarketCoinData.size,
                      });
                    }}
                  />
                  <span
                    className="text-warning blns"
                    style={{ fontWeight: 700 }}
                  >
                    <span className="trade_coin_type">
                      {dashboard?.order_data?.total?.base_wallet?.coin_type}
                    </span>
                  </span>
                </div> */}
                <div className="form-group mt-3 boxShadow">
                  <label className="cstmHead">{t("Size")}</label>
                  <input
                    name="Size"
                    type="number"
                    placeholder="0"
                    className="form-control number_only input_2"
                    value={
                      OpenCloseStopMarketCoinData.amount !== 0 &&
                      OpenCloseStopMarketCoinData.amount
                    }
                    onChange={async (e) => {
                      await setOpenCloseStopMarketCoinData({
                        ...OpenCloseStopMarketCoinData,
                        amount: e.target.value,
                      });
                    }}
                  />
                  <span className=" blns" style={{ fontWeight: 700 }}>
                    <span
                      className={
                        OpenCloseStopMarketCoinData.amount_type ===
                        AMOUNT_TYPE_TRADE
                          ? "text-warning mr-2"
                          : "mr-2"
                      }
                      onClick={() => {
                        setOpenCloseStopMarketCoinData({
                          ...OpenCloseStopMarketCoinData,
                          amount_type: AMOUNT_TYPE_TRADE,
                        });
                      }}
                    >
                      {dashboard?.order_data?.total?.trade_wallet?.coin_type}
                    </span>
                    <span
                      className={
                        OpenCloseStopMarketCoinData.amount_type ===
                        AMOUNT_TYPE_BASE
                          ? "text-warning mr-2"
                          : ""
                      }
                      onClick={() => {
                        setOpenCloseStopMarketCoinData({
                          ...OpenCloseStopMarketCoinData,
                          amount_type: AMOUNT_TYPE_BASE,
                        });
                      }}
                    >
                      {dashboard?.order_data?.total?.base_wallet?.coin_type}
                    </span>
                  </span>
                </div>

                {/* <div className="future-balance-container">
                  <div>
                    <label>Buy</label>
                    <span className="text-warning ml-1">
                      55 {dashboard?.order_data?.total?.trade_wallet?.coin_type}
                    </span>
                  </div>
                  <div>
                    <label>Sell</label>
                    <span className="text-warning ml-1">
                      886.53{" "}
                      {dashboard?.order_data?.total?.trade_wallet?.coin_type}
                    </span>
                  </div>
                </div> */}
                <div className="total-top">
                  <label>
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={(e) => {
                        setChecked(e.target.checked);
                      }}
                    />
                    TP/SL
                  </label>{" "}
                  <label>Advance %</label>
                </div>
                {tpSlchecked === true && (
                  <div>
                    <div className="form-group boxShadow">
                      <label className="cstmHead">Take Profit</label>
                      <input
                        name="price"
                        type="number"
                        placeholder=""
                        className="form-control number_only input_1"
                        value={OpenCloseStopMarketCoinData.take_profit}
                        onChange={(e) => {
                          setOpenCloseStopMarketCoinData({
                            ...OpenCloseStopMarketCoinData,
                            take_profit: e.target.value,
                          });
                        }}
                      />
                      {/* make a select here */}
                      {/* <select
                        name=""
                        className="form-control border-0 swapSelect"
                        id=""
                      >
                        <option value="">Mark</option>
                        <option value="">Last</option>
                      </select> */}
                      <span className=" blns" style={{ fontWeight: 700 }}>
                        <span
                          className={
                            selectedCoinType === TRADE
                              ? "text-warning mr-2"
                              : "mr-2"
                          }
                          onClick={() => {
                            setSelectedCoinType(TRADE);
                          }}
                        >
                          Mark
                        </span>
                      </span>
                    </div>
                    <div className="form-group boxShadow">
                      <label className="cstmHead">Stop Loss</label>
                      <input
                        name="price"
                        type="number"
                        placeholder=""
                        className="form-control number_only input_1"
                        value={OpenCloseStopMarketCoinData.stop_loss}
                        onChange={(e) => {
                          setOpenCloseStopMarketCoinData({
                            ...OpenCloseStopMarketCoinData,
                            stop_loss: e.target.value,
                          });
                        }}
                      />

                      <span className=" blns" style={{ fontWeight: 700 }}>
                        <span
                          className={
                            selectedCoinType === TRADE
                              ? "text-warning mr-2"
                              : "mr-2"
                          }
                          onClick={() => {
                            setSelectedCoinType(TRADE);
                          }}
                        >
                          Mark
                        </span>
                      </span>
                    </div>
                  </div>
                )}

                {/* {isLoggedIn && (
                  <div className=" mt-3 percent-container ">
                    <span
                      className=" percent-btn col-3"
                      onClick={() => setSizeBasedOnPercentage(0.25)}
                    >
                      {t("25%")}
                    </span>
                    <span
                      className=" percent-btn col-3"
                      onClick={() => setSizeBasedOnPercentage(0.5)}
                    >
                      {t("50%")}
                    </span>
                    <span
                      className=" percent-btn col-3"
                      onClick={() => setSizeBasedOnPercentage(0.75)}
                    >
                      {t("75%")}
                    </span>
                    <span
                      className=" percent-btn col-3"
                      onClick={() => setSizeBasedOnPercentage(1)}
                    >
                      {t("100%")}
                    </span>
                  </div>
                )} */}

                {!isLoggedIn ? (
                  <div className="form-group mt-4">
                    <Link href="/signin?redirect=/futures/exchange">
                      <a className="btn theme-btn-red">{t("Login")}</a>
                    </Link>
                  </div>
                ) : (
                  <div className="button-section-future gap-10">
                    <button
                      type="submit"
                      className="btn theme-btn-future"
                      onClick={(e) => {
                        e.preventDefault();
                        // await dispatch(getDashboardData(currentPair));
                        // setOpenCloseStopMarketCoinData({
                        //   ...OpenCloseStopMarketCoinData,
                        //   amount: 0,
                        //   total: 0,
                        // });
                        BuyOrder(
                          OpenCloseStopMarketCoinData,
                          setOpenCloseStopMarketCoinData
                        );
                      }}
                    >
                      <span v-else="">{t("Open long")}</span>
                    </button>
                    <button
                      type="submit"
                      className="btn theme-btn-red-future"
                      onClick={(e) => {
                        e.preventDefault();
                        SellOrder(
                          OpenCloseStopMarketCoinData,
                          setOpenCloseStopMarketCoinData
                        );
                      }}
                    >
                      <span v-else="">{t("open short")}</span>
                    </button>
                  </div>
                )}
                <div className="future-balance-container mt-3">
                  {preplaceData?.long_cost && (
                    <div>
                      <label>Cost</label>
                      <span className="text-warning ml-1">
                        {parseFloat(preplaceData?.long_cost)}{" "}
                        {dashboard?.order_data?.total?.base_wallet?.coin_type}
                      </span>
                    </div>
                  )}

                  {preplaceData?.short_cost && (
                    <div>
                      <label>Cost</label>
                      <span className="text-warning ml-1">
                        {parseFloat(preplaceData?.short_cost)}{" "}
                        {dashboard?.order_data?.total?.base_wallet?.coin_type}
                      </span>
                    </div>
                  )}
                </div>
                <div className="future-balance-container">
                  {(preplaceData?.max_size_open_long_base ||
                    preplaceData?.max_size_open_long_trade) && (
                    <div>
                      <label>Max</label>
                      {OpenCloseStopMarketCoinData.amount_type === BASE ? (
                        <span className="text-warning ml-1">
                          {parseFloat(preplaceData?.max_size_open_long_base)}{" "}
                          {dashboard?.order_data?.total?.base_wallet?.coin_type}
                        </span>
                      ) : (
                        <span className="text-warning ml-1">
                          {parseFloat(preplaceData?.max_size_open_long_trade)}{" "}
                          {
                            dashboard?.order_data?.total?.trade_wallet
                              ?.coin_type
                          }
                        </span>
                      )}
                    </div>
                  )}

                  {(preplaceData?.max_size_open_short_base ||
                    preplaceData.max_size_open_short_trade) && (
                    <div>
                      <label>Max</label>
                      {OpenCloseStopMarketCoinData.amount_type === BASE ? (
                        <span className="text-warning ml-1">
                          {parseFloat(preplaceData?.max_size_open_short_base)}{" "}
                          {dashboard?.order_data?.total?.base_wallet?.coin_type}
                        </span>
                      ) : (
                        <span className="text-warning ml-1">
                          {parseFloat(preplaceData?.max_size_open_short_trade)}{" "}
                          {
                            dashboard?.order_data?.total?.trade_wallet
                              ?.coin_type
                          }
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyStopMarketLimit;
