import useTranslation from "next-translate/useTranslation";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import SellTable from "./SellTable";
const TradesHistory = ({ marketTrades, customClass }: any) => {
  const { t } = useTranslation("common");
  const { dashboard } = useSelector((state: RootState) => state.exchange);

  return (
    <div className={`trades-section1 ${customClass}`}>
      <div className="trades-headers mb-2">
        <h3>{t("Market Trades")}</h3>
      </div>
      <div className="primary-table">
        {/* <div className="table-header">
          <div className="table-row" />
        </div>
        <div className="table-body" /> */}
        <div
          id="marketTradeTable_wrapper"
          className="dataTables_wrapper no-footer"
        >
          <div
            id="marketTradeTable_processing"
            className="dataTables_processing"
            style={{ display: "none" }}
          >
            {t("Processing")}...
          </div>
          <div className="dataTables_scroll px-0">
            <div
              className="dataTables_scrollHead"
              style={{
                overflow: "hidden",
                position: "relative",
                border: "0px",
                width: "100%",
              }}
            >
              <div
                className="dataTables_scrollHeadInner"
                style={{
                  boxSizing: "content-box",
                  width: "431.25px",
                  paddingRight: "0px",
                }}
              >
                {marketTrades.length > 0 ? (
                  <table
                    className="table dataTable  no-footer"
                    role="grid"
                    style={{
                      marginLeft: "0px",
                      width: "431.25px",
                    }}
                  >
                    <thead>
                      <tr role="row">
                        <th
                          className="table-col price sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "170.656px", padding: "4px" }}
                          aria-label="Price"
                        >
                          {t("Price")}({dashboard?.order_data?.base_coin})
                        </th>
                        <th
                          className="table-col amount sorting_disabled"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "120.75px", padding: "4px" }}
                          aria-label="Amount"
                        >
                          {t("Amount")}({dashboard?.order_data?.trade_coin})
                        </th>
                        <th
                          className="table-col time text-right sorting_desc"
                          rowSpan={1}
                          colSpan={1}
                          style={{ width: "79.8438px", padding: "4px" }}
                          aria-label="Time"
                        >
                          {t("Time")}
                        </th>
                      </tr>
                    </thead>
                    <SellTable marketTrades={marketTrades} />
                  </table>
                ) : (
                  <div className="text-center mt-5">
                    <p>{t("No data available in table")} </p>
                  </div>
                )}
              </div>
            </div>
            <div
              className="dataTables_scrollBody"
              style={{
                position: "relative",
                overflow: "auto",
                height: "244px",
                width: "100%",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradesHistory;
