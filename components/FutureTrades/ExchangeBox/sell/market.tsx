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

const Market = ({
  dashboard,
  OpenCloseMarketCoinData,
  setOpenCloseMarketCoinData,
  isLoggedIn,
  selectedCoinType,
  preplaceData,
  setSelectedCoinType,
  BuyOrder,
  SellOrder,
}: any) => {
  const { t } = useTranslation("common");
  const [selectedMarketValue, setSelectedMarketValue] = useState(0);
  const dispatch = useDispatch();

  const setSizeBasedOnPercentage = (percentage: any) => {
    const { maker_fees, taker_fees } = dashboard.fees_settings;
    const amount =
      parseFloat(dashboard?.order_data?.total?.base_wallet?.balance) /
      parseFloat(OpenCloseMarketCoinData.price);
    const feesPercentage =
      parseFloat(maker_fees) > parseFloat(taker_fees)
        ? parseFloat(maker_fees)
        : parseFloat(taker_fees);
    const total =
      amount * percentage * parseFloat(OpenCloseMarketCoinData.price);
    const fees = (total * feesPercentage) / 100;
    setOpenCloseMarketCoinData({
      ...OpenCloseMarketCoinData,
      size: (total - fees) / parseFloat(OpenCloseMarketCoinData.price),
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
                </div>
                {/* <div className="form-group mt-3 boxShadow">
                  <label className="cstmHead">{t("Price")}</label>
                  <input
                    name="price"
                    type="text"
                    placeholder="0"
                    className="form-control number_only input_1"
                    value={OpenCloseMarketCoinData.price}
                    onChange={async (e) => {
                      await setOpenCloseMarketCoinData({
                        ...OpenCloseMarketCoinData,
                        price: e.target.value,
                        total:
                          parseFloat(e.target.value) *
                          OpenCloseMarketCoinData.size,
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
                      OpenCloseMarketCoinData.amount !== 0 &&
                      OpenCloseMarketCoinData.amount
                    }
                    onChange={async (e) => {
                      await setOpenCloseMarketCoinData({
                        ...OpenCloseMarketCoinData,
                        amount: e.target.value,
                      });
                    }}
                  />
                  <span className=" blns" style={{ fontWeight: 700 }}>
                    <span
                      className={
                        OpenCloseMarketCoinData.amount_type ===
                        AMOUNT_TYPE_TRADE
                          ? "text-warning mr-2"
                          : "mr-2"
                      }
                      onClick={() => {
                        setOpenCloseMarketCoinData({
                          ...OpenCloseMarketCoinData,
                          amount_type: AMOUNT_TYPE_TRADE,
                        });
                      }}
                    >
                      {dashboard?.order_data?.total?.trade_wallet?.coin_type}
                    </span>
                    <span
                      className={
                        OpenCloseMarketCoinData.amount_type === AMOUNT_TYPE_BASE
                          ? "text-warning mr-2"
                          : ""
                      }
                      onClick={() => {
                        setOpenCloseMarketCoinData({
                          ...OpenCloseMarketCoinData,
                          amount_type: AMOUNT_TYPE_BASE,
                        });
                      }}
                    >
                      {dashboard?.order_data?.total?.base_wallet?.coin_type}
                    </span>
                  </span>
                </div>

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
                        // setOpenCloseMarketCoinData({
                        //   ...OpenCloseMarketCoinData,
                        //   amount: 0,
                        //   total: 0,
                        // });
                        BuyOrder(
                          OpenCloseMarketCoinData,
                          setOpenCloseMarketCoinData
                        );
                      }}
                    >
                      <span v-else="">{t("Close Short")}</span>
                    </button>
                    <button
                      type="submit"
                      className="btn theme-btn-red-future"
                      onClick={(e) => {
                        e.preventDefault();
                        SellOrder(
                          OpenCloseMarketCoinData,
                          setOpenCloseMarketCoinData
                        );
                      }}
                    >
                      <span v-else="">{t("Close Long")}</span>
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
