import { formateData } from "common";
import {
  FUTURE_TRADE_TYPE_OPEN,
  FUTURE_TRADE_TYPE_CLOSE,
  FUTURE_TRADE_TYPE_TAKE_PROFIT_CLOSE,
  FUTURE_TRADE_TYPE_STOP_LOSS_CLOSE,
  TRADE_TYPE_BUY,
  TRADE_TYPE_SELL,
} from "helpers/core-constants";
import React from "react";
import { canceledBuySellOrderAction } from "state/actions/futureTrade";
import TpslModal from "../Modals/TPSL-modal";

const OpenOrder = ({ openOrder }: any) => {
  const conditon = (item: any) => {
    if (item.side === 1) {
      if (item?.take_profit_price > 0) {
        return "Mark price >= " + item?.take_profit_price;
      } else if (item?.stop_loss_price > 0) {
        return "Mark price <= " + item?.stop_loss_price;
      } else if (item?.stop_price > 0) {
        return "Mark price >= " + item?.stop_price;
      }
    } else {
      if (item?.take_profit_price > 0) {
        return "Mark price <= " + item?.take_profit_price;
      } else if (item?.stop_loss_price > 0) {
        return "Mark price >= " + item?.stop_loss_price;
      } else if (item?.stop_price > 0) {
        return "Mark price <= " + item?.stop_price;
      }
    }
  };

  function getOrderTypeLabel(item: any) {
    if (item.order_type === 3) {
      return "Stop Limit";
    } else if (item.order_type === 4) {
      return "Stop Market";
    } else {
      if (
        item?.trade_type === FUTURE_TRADE_TYPE_OPEN &&
        item?.is_market === 0
      ) {
        return "Limit";
      } else if (
        item?.trade_type === FUTURE_TRADE_TYPE_CLOSE &&
        item?.is_market === 0
      ) {
        return "Limit";
      } else if (item?.trade_type === FUTURE_TRADE_TYPE_TAKE_PROFIT_CLOSE) {
        return "Take profit market";
      } else if (item?.trade_type === FUTURE_TRADE_TYPE_STOP_LOSS_CLOSE) {
        return "Stop market";
      } else {
        return "Market";
      }
    }
  }
  return (
    <div>
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
                  <th scope="col">Type</th>
                  <th scope="col">Side</th>
                  <th scope="col">Price</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Filled</th>
                  <th scope="col">Trigger Conditions</th>
                  <th scope="col">TP/SL</th>
                  <th scope="col">Cancel</th>
                </tr>
              </thead>
              <tbody>
                {openOrder.map((item: any, index: any) => (
                  <tr key={index}>
                    <td className="pl-0">{formateData(item?.created_at)}</td>
                    <td>{item?.profit_loss_calculation?.symbol}</td>
                    <td>{getOrderTypeLabel(item)}</td>

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
                      <td className="text-success">Close Short</td>
                    ) : item?.side === TRADE_TYPE_BUY &&
                      item?.trade_type ===
                        FUTURE_TRADE_TYPE_TAKE_PROFIT_CLOSE ? (
                      <td className="text-danger">Close Long</td>
                    ) : item?.side === TRADE_TYPE_BUY &&
                      item?.trade_type === FUTURE_TRADE_TYPE_STOP_LOSS_CLOSE ? (
                      <td className="text-danger">Close Long</td>
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
                    <td> 0{item?.profit_loss_calculation?.trade_coin_type}</td>

                    <td>{conditon(item)}</td>
                    <td>
                      {(item?.take_profit_price > 0 ||
                        item?.stop_loss_price > 0) && (
                        <TpslModal uid={item?.uid} />
                      )}
                    </td>
                    <td>
                      <button
                        className="cancel"
                        onClick={() => {
                          canceledBuySellOrderAction(item?.uid);
                        }}
                      >
                        Cancel
                      </button>
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

export default OpenOrder;
