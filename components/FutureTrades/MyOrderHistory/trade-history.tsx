import { formateData } from "common";
import {
  FUTURE_TRADE_TYPE_CLOSE,
  FUTURE_TRADE_TYPE_OPEN,
  FUTURE_TRADE_TYPE_STOP_LOSS_CLOSE,
  FUTURE_TRADE_TYPE_TAKE_PROFIT_CLOSE,
  TRADE_TYPE_BUY,
  TRADE_TYPE_SELL,
} from "helpers/core-constants";
import React from "react";

const TradeHistory = ({ tradeHistory }: any) => {
  const condition = (item: any) => {
    if (item.side === 1) {
      if (item?.take_profit_price > 0) {
        return "Mark price >= " + item?.take_profit_price;
      } else {
        return "Mark price <= " + item?.stop_loss_price;
      }
    } else {
      if (item?.take_profit_price > 0) {
        return "Mark price <= " + item?.take_profit_price;
      } else {
        return "Mark price >= " + item?.stop_loss_price;
      }
    }
  };
  return (
    <div>
      {" "}
      <div className="tab-content" style={{padding: '0 10px'}} id="ordersTabContent">
        <div
          className="tab-pane fade show active"
          id="Open-orders"
          role="tabpanel"
          aria-labelledby="Open-orders-tab"
        >
          <div className="table-responsive order-history-table-min-h">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col" className="pl-0">Time</th>
                  <th scope="col">Symbol</th>
                  <th scope="col">Fee</th>
                  <th scope="col">Side</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Role</th>
                  <th scope="col">Resized Profit</th>
                </tr>
              </thead>
              <tbody>
                {tradeHistory.map((item: any, index: any) => (
                  <tr key={index}>
                    <td className="pl-0">{formateData(item?.created_at)}</td>
                    <td>{item?.profit_loss_calculation?.symbol}</td>
                    <td>
                      {item?.trade_type === FUTURE_TRADE_TYPE_OPEN &&
                      item?.is_market === 0
                        ? "Limit"
                        : item?.trade_type === FUTURE_TRADE_TYPE_CLOSE &&
                          item?.is_market === 0
                        ? "Limit"
                        : item?.trade_type ===
                          FUTURE_TRADE_TYPE_TAKE_PROFIT_CLOSE
                        ? "Take profit market"
                        : item?.trade_type ===
                          FUTURE_TRADE_TYPE_TAKE_PROFIT_CLOSE
                        ? "stop market"
                        : "Market"}
                    </td>

                    {item?.side === TRADE_TYPE_BUY &&
                    item?.trade_type === FUTURE_TRADE_TYPE_OPEN ? (
                      <td className="text-success">Open Long</td>
                    ) : item?.side === TRADE_TYPE_SELL &&
                      item?.trade_type === FUTURE_TRADE_TYPE_OPEN ? (
                      <td className="text-success">Open short</td>
                    ) : item?.side === TRADE_TYPE_BUY &&
                      item?.trade_type === FUTURE_TRADE_TYPE_CLOSE ? (
                      <td className="text-danger">Close Long</td>
                    ) : item?.side === TRADE_TYPE_SELL &&
                      item?.trade_type === FUTURE_TRADE_TYPE_CLOSE ? (
                      <td className="text-success">Close Short</td>
                    ) : item?.side === TRADE_TYPE_SELL &&
                      item?.trade_type ===
                        FUTURE_TRADE_TYPE_TAKE_PROFIT_CLOSE ? (
                      <td className="text-success">Close Short</td>
                    ) : item?.side === TRADE_TYPE_SELL &&
                      item?.trade_type === FUTURE_TRADE_TYPE_STOP_LOSS_CLOSE ? (
                      <td className="text-danger">Close Long</td>
                    ) : item?.side === TRADE_TYPE_BUY &&
                      item?.trade_type ===
                        FUTURE_TRADE_TYPE_TAKE_PROFIT_CLOSE ? (
                      <td className="text-success">Open Short</td>
                    ) : item?.side === TRADE_TYPE_BUY &&
                      item?.trade_type === FUTURE_TRADE_TYPE_STOP_LOSS_CLOSE ? (
                      <td className="text-danger">Open Long</td>
                    ) : (
                      ""
                    )}

                    <td>
                      {item?.price}{" "}
                      {item?.profit_loss_calculation?.base_coin_type}
                    </td>
                    <td>
                      {item?.amount_in_trade_coin}{" "}
                      {item?.profit_loss_calculation?.trade_coin_type}
                    </td>
                    <td className="text-danger"> Taker</td>

                    <td>
                      {item?.profit_loss_calculation?.pnl}
                      {item?.profit_loss_calculation?.base_coin_type}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeHistory;
