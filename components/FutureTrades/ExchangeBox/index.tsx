import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state/store";
import Limit from "./buy/limit";
import Market from "./buy/market";
import SellLimit from "./sell/limit";
import SellMarket from "./sell/market";
import useTranslation from "next-translate/useTranslation";
import Leverage from "../Modals/leverage";
import Isolated from "../Modals/isolated";
import {
  AMOUNT_TYPE_BASE,
  BASE,
  CROSS,
  FUTURE_TRADE_TYPE_CLOSE,
  FUTURE_TRADE_TYPE_OPEN,
  ISOLATED,
  LIMIT_ORDER,
  MARGIN_MODE_ISOLATED,
  MARKET_ORDER,
  STOP_LIMIT_ORDER,
  STOP_MARKET_ORDER,
} from "helpers/core-constants";
import {
  CloseBuyOrderAction,
  CloseSellOrderAction,
  placeBuyOrderAction,
  placeSellOrderDataAction,
  preplaceOrderDataAction,
} from "state/actions/futureTrade";
import BuyStopLimit from "./buy/stopLimit";
import SellStopLimit from "./sell/stopLimit";
import SellStopMarketLimit from "./sell/stopMarket";
import BuyStopMarketLimit from "./buy/stopMarket";

const ExchangeBox = ({ disableCross, disableIsolated }: any) => {
  type trade_type = number;
  const { t } = useTranslation("common");
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const [leverage, setLeverage] = useState(20);
  const [marginMode, setmarginMode] = useState(disableCross ? ISOLATED : CROSS);

  const { dashboard, currentPair } = useSelector(
    (state: RootState) => state.futureExchange
  );
  const [trade_type, setTrade_type] = useState<trade_type>(AMOUNT_TYPE_BASE);
  const [selectedCoinType, setSelectedCoinType] = useState(BASE);
  const [preplaceData, setPrePlaceData] = useState({});
  const [OpenCloseLimitCoinData, setOpenCloseLimitCoinData] = useState<any>({
    // dashboard?.order_data?.sell_price
    price: dashboard?.order_data?.sell_price,
    amount: 0,
    total: 0,
    margin_mode: MARGIN_MODE_ISOLATED,
    amount_type: AMOUNT_TYPE_BASE,
    take_profit: 0,
    stop_loss: 0,
  });
  const [OpenCloseMarketCoinData, setOpenCloseMarketCoinData] = useState<any>({
    // price: dashboard?.order_data?.sell_price,
    amount: 0,
    total: 0,
    margin_mode: MARGIN_MODE_ISOLATED,
    amount_type: AMOUNT_TYPE_BASE,
    take_profit: 0,
    stop_loss: 0,
  });
  const [OpenCloseStopLimitCoinData, setOpenCloseStopLimitCoinData] =
    useState<any>({
      // dashboard?.order_data?.sell_price
      stop_price: 0,
      price: dashboard?.order_data?.sell_price,
      amount: 0,
      total: 0,
      margin_mode: MARGIN_MODE_ISOLATED,
      amount_type: AMOUNT_TYPE_BASE,
      take_profit: 0,
      stop_loss: 0,
    });
  const [OpenCloseStopMarketCoinData, setOpenCloseStopMarketCoinData] =
    useState<any>({
      // dashboard?.order_data?.sell_price
      stop_price: 0,
      price: dashboard?.order_data?.sell_price,
      amount: 0,
      total: 0,
      margin_mode: MARGIN_MODE_ISOLATED,
      amount_type: AMOUNT_TYPE_BASE,
      take_profit: 0,
      stop_loss: 0,
    });

  useEffect(() => {
    setOpenCloseLimitCoinData({
      ...OpenCloseLimitCoinData,
      price:
        trade_type === FUTURE_TRADE_TYPE_OPEN
          ? dashboard?.order_data?.sell_price
          : dashboard?.order_data?.buy_price,
    });
    setOpenCloseMarketCoinData({
      ...OpenCloseLimitCoinData,
      price:
        trade_type === FUTURE_TRADE_TYPE_OPEN
          ? dashboard?.order_data?.sell_price
          : dashboard?.order_data?.buy_price,
    });
  }, [dashboard?.order_data?.sell_price, trade_type]);

  const [orderType, setorderType] = useState<number>(LIMIT_ORDER);
  const handletrade_type = (tab: number) => {
    setTrade_type(tab);
  };
  // useEffect(() => {
  //   console.log("Changing");
  //   setorderType(LIMIT_ORDER);
  // }, [trade_type]);
  const dispatch = useDispatch();

  const checkPreOrder = async (data: any) => {
    if (data.amount && data.price) {
      await dispatch(
        preplaceOrderDataAction(
          trade_type,
          marginMode,
          orderType,
          data.price,
          data.amount_type,
          data.amount,
          data.take_profit,
          data.stop_loss,
          leverage,
          setPrePlaceData,
          dashboard?.order_data?.coin_pair_id,
          data.stop_price
        )
      );
    }
  };
  const BuyOrder = async (data: any, setData: any) => {
    await dispatch(
      placeBuyOrderAction(
        trade_type,
        marginMode,
        orderType,
        data.price,
        data.amount_type,
        data.amount,
        data.take_profit,
        data.stop_loss,
        leverage,
        setPrePlaceData,
        dashboard?.order_data?.coin_pair_id,
        data.stop_price
      )
    );
    setData({
      ...data,
      amount: 0,
      total: 0,
      take_profit: 0,
      stop_loss: 0,
      stop_price: 0,
      price: dashboard?.order_data?.buy_price,
      amount_type: AMOUNT_TYPE_BASE,
      margin_mode: MARGIN_MODE_ISOLATED,
    });
  };
  const SellOrder = async (data: any, setData: any) => {
    await dispatch(
      placeSellOrderDataAction(
        trade_type,
        marginMode,
        orderType,
        data.price,
        data.amount_type,
        data.amount,
        data.take_profit,
        data.stop_loss,
        leverage,
        setPrePlaceData,
        dashboard?.order_data?.coin_pair_id,
        data.stop_price
      )
    );
    setData({
      ...data,
      amount: 0,
      total: 0,
      take_profit: 0,
      stop_loss: 0,
      stop_price: 0,
      price: dashboard?.order_data?.buy_price,
      amount_type: AMOUNT_TYPE_BASE,
      margin_mode: MARGIN_MODE_ISOLATED,
    });
  };
  const CloseBuyOrder = async (data: any, setData: any) => {
    await dispatch(
      CloseBuyOrderAction(
        2,
        marginMode,
        orderType,
        data.price,
        data.amount_type,
        data.amount,
        leverage,
        setPrePlaceData,
        dashboard?.order_data?.coin_pair_id,
        data.stop_price
      )
    );
    setData({
      ...data,
      amount: 0,
      total: 0,
      take_profit: 0,
      stop_loss: 0,
      stop_price: 0,
      price: dashboard?.order_data?.buy_price,
      amount_type: AMOUNT_TYPE_BASE,
      margin_mode: MARGIN_MODE_ISOLATED,
    });
  };
  const CloseSellOrder = async (data: any, setData: any) => {
    await dispatch(
      CloseSellOrderAction(
        1,
        marginMode,
        orderType,
        data.price,
        data.amount_type,
        data.amount,
        leverage,
        setPrePlaceData,
        dashboard?.order_data?.coin_pair_id,
        data.stop_price
      )
    );
    setData({
      ...data,
      amount: 0,
      total: 0,
      take_profit: 0,
      stop_loss: 0,
      stop_price: 0,
      price: dashboard?.order_data?.buy_price,
      amount_type: AMOUNT_TYPE_BASE,
      margin_mode: MARGIN_MODE_ISOLATED,
    });
  };
  useEffect(() => {
    if (orderType === 1) {
      checkPreOrder(OpenCloseLimitCoinData);
    } else if (orderType === 2) {
      checkPreOrder(OpenCloseMarketCoinData);
    } else if (orderType === 3) {
      checkPreOrder(OpenCloseStopLimitCoinData);
    } else if (orderType === 4) {
      checkPreOrder(OpenCloseStopMarketCoinData);
    }
  }, [
    trade_type,
    OpenCloseLimitCoinData,
    OpenCloseMarketCoinData,
    OpenCloseStopLimitCoinData,
    OpenCloseStopMarketCoinData,
    orderType,
    leverage,
    marginMode,
  ]);
  useEffect(() => {
    setorderType(1);
  }, [trade_type]);

  return (
    <div className="exchange-box order-box">
      <div className="trades-headers">
        <ul
          id="pills-tab"
          role="tablist"
          className="nav nav-pills transfer-tabs"
        >
          <li
            role="presentation"
            className="nav-item"
            onClick={() => {
              // initialSetUp();
              handletrade_type(FUTURE_TRADE_TYPE_OPEN);
            }}
          >
            <a
              id="pills-transfer-1-tab"
              data-toggle="pill"
              role="tab"
              aria-controls="pills-transfer-1"
              aria-selected="true"
              className={`nav-link ${trade_type === 1 ? "active" : ""}`}
            >
              {t("Open")}
            </a>
          </li>
          <li
            role="presentation"
            className="nav-item"
            onClick={() => {
              // initialSetUp();
              handletrade_type(FUTURE_TRADE_TYPE_CLOSE);
            }}
          >
            <a
              id="pills-transfer-2-tab"
              data-toggle="pill"
              role="tab"
              aria-controls="pills-transfer-2"
              aria-selected="false"
              className={`nav-link ${trade_type === 2 ? "activeSell" : ""}`}
            >
              {t("Close")}
            </a>
          </li>
        </ul>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Isolated
          isolated={marginMode}
          setIsolated={setmarginMode}
          disableCross={disableCross}
          disableIsolated={disableIsolated}
        />
        <Leverage
          leverage={leverage}
          setLeverage={setLeverage}
          dashboard={dashboard}
        />
      </div>
      <div id="pills-tabContent" className="tab-content">
        <div
          id="pills-transfer-1"
          role="tabpanel"
          aria-labelledby="pills-transfer-1-tab"
          className={`tab-pane fade show ${trade_type === 1 && "active"} `}
        >
          <ul
            id="BuyTab"
            role="tablist"
            className="nav nav-tabs inner-tabs-menu gap-10"
          >
            <li role="presentation" className="nav-item mr-0">
              <a
                id="Limit-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="Limit"
                aria-selected="true"
                className="nav-link active"
                onClick={() => {
                  setorderType(LIMIT_ORDER);
                }}
              >
                {t("Limit")}
              </a>
            </li>
            <li role="presentation" className="nav-item mr-0">
              <a
                id="Market-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="Market"
                aria-selected="false"
                className="nav-link"
                onClick={() => {
                  setorderType(MARKET_ORDER);
                }}
              >
                {t("Market")}
              </a>
            </li>
            <li role="presentation" className="nav-item mr-0">
              <a
                id="Market-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="Market"
                aria-selected="false"
                className="nav-link"
                onClick={() => {
                  setorderType(STOP_LIMIT_ORDER);
                }}
              >
                {t("Stop Limit")}
              </a>
            </li>
            <li role="presentation" className="nav-item mr-0">
              <a
                id="Market-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="Market"
                aria-selected="false"
                className="nav-link"
                onClick={() => {
                  setorderType(STOP_MARKET_ORDER);
                }}
              >
                {t("Stop Market")}
              </a>
            </li>
          </ul>
          {orderType === 1 && (
            <Limit
              dashboard={dashboard}
              OpenCloseLimitCoinData={OpenCloseLimitCoinData}
              setOpenCloseLimitCoinData={setOpenCloseLimitCoinData}
              isLoggedIn={isLoggedIn}
              currentPair={currentPair}
              preplaceData={preplaceData}
              selectedCoinType={selectedCoinType}
              setSelectedCoinType={setSelectedCoinType}
              BuyOrder={BuyOrder}
              SellOrder={SellOrder}
            />
          )}
          {orderType === 2 && (
            <Market
              dashboard={dashboard}
              OpenCloseMarketCoinData={OpenCloseMarketCoinData}
              setOpenCloseMarketCoinData={setOpenCloseMarketCoinData}
              isLoggedIn={isLoggedIn}
              currentPair={currentPair}
              preplaceData={preplaceData}
              selectedCoinType={selectedCoinType}
              setSelectedCoinType={setSelectedCoinType}
              BuyOrder={BuyOrder}
              SellOrder={SellOrder}
            />
          )}
          {orderType === 3 && (
            <BuyStopLimit
              dashboard={dashboard}
              OpenCloseStopLimitCoinData={OpenCloseStopLimitCoinData}
              setOpenCloseStopLimitCoinData={setOpenCloseStopLimitCoinData}
              isLoggedIn={isLoggedIn}
              currentPair={currentPair}
              preplaceData={preplaceData}
              selectedCoinType={selectedCoinType}
              setSelectedCoinType={setSelectedCoinType}
              BuyOrder={BuyOrder}
              SellOrder={SellOrder}
            />
          )}
          {orderType === 4 && (
            <BuyStopMarketLimit
              dashboard={dashboard}
              OpenCloseStopMarketCoinData={OpenCloseStopMarketCoinData}
              setOpenCloseStopMarketCoinData={setOpenCloseStopMarketCoinData}
              isLoggedIn={isLoggedIn}
              currentPair={currentPair}
              preplaceData={preplaceData}
              selectedCoinType={selectedCoinType}
              setSelectedCoinType={setSelectedCoinType}
              BuyOrder={BuyOrder}
              SellOrder={SellOrder}
            />
          )}
        </div>
        <div
          id="pills-transfer-2"
          role="tabpanel"
          aria-labelledby="pills-transfer-2-tab"
          className={`tab-pane fade show ${trade_type === 2 && "active"} `}
        >
          <ul
            id="SellTab"
            role="tablist"
            className="nav nav-tabs inner-tabs-menu gap-10"
          >
            <li
              role="presentation"
              className="nav-item sellBox mr-0"
              onClick={() => {
                setorderType(LIMIT_ORDER);
              }}
            >
              <a
                id="sell-Limit-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="LimitSell"
                aria-selected="true"
                className="nav-link active"
              >
                {t("Limit")}
              </a>
            </li>
            <li
              role="presentation"
              className="nav-item sellBox mr-0"
              onClick={() => {
                setorderType(MARKET_ORDER);
              }}
            >
              <a
                id="sell-Market-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="MarketSell"
                aria-selected="false"
                className="nav-link"
              >
                {t("Market")}
              </a>
            </li>
            <li role="presentation" className="nav-item sellBox mr-0">
              <a
                id="Market-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="Market"
                aria-selected="false"
                className="nav-link"
                onClick={() => {
                  setorderType(STOP_LIMIT_ORDER);
                }}
              >
                {t("Stop Limit")}
              </a>
            </li>
            <li role="presentation" className="nav-item sellBox mr-0">
              <a
                id="Market-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="Market"
                aria-selected="false"
                className="nav-link"
                onClick={() => {
                  setorderType(STOP_MARKET_ORDER);
                }}
              >
                {t("Stop Market")}
              </a>
            </li>
          </ul>
          {orderType === 1 && (
            <SellLimit
              dashboard={dashboard}
              OpenCloseMarketCoinData={OpenCloseMarketCoinData}
              setOpenCloseMarketCoinData={setOpenCloseMarketCoinData}
              isLoggedIn={isLoggedIn}
              currentPair={currentPair}
              preplaceData={preplaceData}
              selectedCoinType={selectedCoinType}
              setSelectedCoinType={setSelectedCoinType}
              BuyOrder={CloseBuyOrder}
              SellOrder={CloseSellOrder}
            />
          )}
          {orderType === 2 && (
            <SellMarket
              dashboard={dashboard}
              OpenCloseMarketCoinData={OpenCloseMarketCoinData}
              setOpenCloseMarketCoinData={setOpenCloseMarketCoinData}
              isLoggedIn={isLoggedIn}
              currentPair={currentPair}
              preplaceData={preplaceData}
              selectedCoinType={selectedCoinType}
              setSelectedCoinType={setSelectedCoinType}
              BuyOrder={CloseBuyOrder}
              SellOrder={CloseSellOrder}
            />
          )}
          {orderType === 3 && (
            <SellStopLimit
              dashboard={dashboard}
              OpenCloseStopLimitCoinData={OpenCloseStopLimitCoinData}
              setOpenCloseStopLimitCoinData={setOpenCloseStopLimitCoinData}
              isLoggedIn={isLoggedIn}
              currentPair={currentPair}
              preplaceData={preplaceData}
              selectedCoinType={selectedCoinType}
              setSelectedCoinType={setSelectedCoinType}
              BuyOrder={CloseBuyOrder}
              SellOrder={CloseSellOrder}
            />
          )}
          {orderType === 4 && (
            <SellStopMarketLimit
              dashboard={dashboard}
              OpenCloseStopMarketCoinData={OpenCloseStopMarketCoinData}
              setOpenCloseStopMarketCoinData={setOpenCloseStopMarketCoinData}
              isLoggedIn={isLoggedIn}
              currentPair={currentPair}
              preplaceData={preplaceData}
              selectedCoinType={selectedCoinType}
              setSelectedCoinType={setSelectedCoinType}
              BuyOrder={CloseBuyOrder}
              SellOrder={CloseSellOrder}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ExchangeBox;
