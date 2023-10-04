import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import DemoOpenOrders from "./DemoOpenOrders";
import DemoOrderHistory from "./DemoOrderHistory";
import DemoTradeOrder from "./DemoTradeOrder";

const DemoOrderHistorySection = ({ bottom }: any) => {
  type activeTabType = {
    openOrders: boolean;
    orderHistory: boolean;
    tradeOrder: boolean;
  };
  const [activeTab, setActiveTab] = useState<activeTabType>({
    openOrders: true,
    orderHistory: false,
    tradeOrder: false,
  });
  const { t } = useTranslation("common");
  const {
    dashboard,
    currentPair,
    openOrderHistory,
    sellOrderHistory,
    buyOrderHistory,
    tradeOrderHistory,
  } = useSelector((state: RootState) => state.demoExchange);

  React.useEffect(() => {
    return () => {};
  }, [currentPair, dashboard]);
  return (
    <div className={`orders-area`} style={{padding: '10px'}}>
      <div className="orders-area-top p-0 mb-2">
        <div className="top-left">
          <ul id="ordersTab" role="tablist" className="nav nav-tabs">
            <li
              role="presentation"
              className="nav-item"
              onClick={() => {
                setActiveTab({
                  openOrders: true,
                  orderHistory: false,
                  tradeOrder: false,
                });
              }}
            >
              <a
                id="Open-orders-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="Open-orders"
                aria-selected="true"
                className={"nav-link " + (activeTab.openOrders && "active")}
              >
                {t("Open orders")}
              </a>
            </li>
            <li
              role="presentation"
              className="nav-item"
              onClick={() => {
                setActiveTab({
                  openOrders: false,
                  orderHistory: true,
                  tradeOrder: false,
                });
              }}
            >
              <a
                id="Open-orders-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="Open-orders"
                aria-selected="true"
                className={"nav-link " + (activeTab.orderHistory && "active")}
              >
                {t("Order history")}
              </a>
            </li>
            <li
              role="presentation"
              className="nav-item"
              onClick={() => {
                setActiveTab({
                  openOrders: false,
                  orderHistory: false,
                  tradeOrder: true,
                });
              }}
            >
              <a
                id="Open-orders-tab"
                data-toggle="tab"
                role="tab"
                aria-controls="Open-orders"
                aria-selected="true"
                className={"nav-link " + (activeTab.tradeOrder && "active")}
              >
                {t("Trade history")}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="tab-content p-0" id="ordersTabContent">
        <DemoOpenOrders
          openOrders={activeTab.openOrders}
          openOrderHistory={openOrderHistory}
        />
        <DemoOrderHistory
          orderHistory={activeTab.orderHistory}
          sellOrderHistoryState={sellOrderHistory}
          buyOrderHistoryState={buyOrderHistory}
        />
        <DemoTradeOrder
          tradeOrder={activeTab.tradeOrder}
          tradeOrderHistory={tradeOrderHistory}
        />
      </div>
    </div>
  );
};

export default DemoOrderHistorySection;
