import React, { useEffect } from "react";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import { useDispatch } from "react-redux";
import {
  setBuyAmount,
  setBuyPrice,
  setSellAmount,
  setSellPrice,
} from "state/reducer/exchange";
import useTranslation from "next-translate/useTranslation";
const AllBuyOrders = ({ OpenBookBuy, show, customClass }: any) => {
  const { t } = useTranslation("common");
  const [buyData, setBuyData] = React.useState<any>([]);
  const dispatch = useDispatch();
  const changeSellPrice = (price: number, amount: number) => {
    dispatch(setSellPrice(price));
    dispatch(setSellAmount(amount));
    dispatch(setBuyAmount(amount));
    dispatch(setBuyPrice(price));
  };
  const [summary, setSummary] = React.useState({
    amount: 0,
    total: 0,
  });
  useEffect(() => {
    const Array = show ? [...OpenBookBuy].slice(0, show) : [...OpenBookBuy];
    setBuyData(Array);
    return () => {};
  }, [OpenBookBuy]);

  return (
    <div className={`buy-order ${customClass}`}>
      <div className="trades-table">
        <div className="trades-table-body" />
        <div
          id="exchangeAllSellOrders_wrapper"
          className="dataTables_wrapper no-footer"
        >
          <div
            id="exchangeAllSellOrders_processing"
            className="dataTables_processing"
            style={{ display: "none" }}
          >
            {t("Processing")}...
          </div>
          <div className="">
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
                <table
                  className="table dataTable no-footer"
                  role="grid"
                  style={{
                    marginLeft: "0px",
                    width: "431.25px",
                  }}
                >
                  <thead>
                    <tr role="row"></tr>
                    <tr role="row"></tr>
                    <tr role="row"></tr>
                  </thead>
                </table>
              </div>
            </div>
            <div
              className="dataTables_scrollBody mt-2"
              style={{
                position: "relative",
                overflow: "auto",
                height: "425px",
                width: "100%",
              }}
            >
              {OpenBookBuy.length > 0 ? (
                <table
                  id="exchangeAllSellOrders"
                  className="table dataTable no-footer"
                  role="grid"
                  style={{ width: "100%" }}
                >
                  <thead>
                    <tr role="row">
                      <th
                        className="table-col price sorting_disabled"
                        rowSpan={1}
                        colSpan={1}
                        // style={{ width: "170.656px" }}
                        aria-label="Price"
                      ></th>
                      <th
                        className="table-col amount sorting_disabled"
                        rowSpan={1}
                        colSpan={1}
                        // style={{ width: "120.75px" }}
                        aria-label="Amount"
                      ></th>
                      <th
                        className="table-col time text-right sorting_desc"
                        rowSpan={1}
                        colSpan={1}
                        // style={{ width: "79.8438px" }}
                        aria-label="Time"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    {buyData?.length !== 0 ? (
                      buyData?.map((item: any, index: number) => (
                        <Tooltip
                          key={index}
                          placement={"right"}
                          overlay={
                            <span>
                              <span>
                                {t("Avg Price")}: {item.price}
                              </span>
                              <br />
                              <span>
                                {t("Amount")}: {summary.amount}
                              </span>
                              <br />

                              <span>
                                {t("Size")}: {summary.total}
                              </span>
                            </span>
                          }
                          trigger={["hover"]}
                          overlayClassName="rcTooltipOverlay"
                        >
                          <tr
                            className="odd trade_tableList_two d-table-row"
                            onClick={() => {
                              changeSellPrice(item.price, item.amount);
                            }}
                            onMouseEnter={() => {
                              const selectedIndex = index;
                              const firstIndex = 0;
                              let sumtotal = 0;
                              let sumAmount = 0;
                              for (
                                let i = selectedIndex;
                                i >= firstIndex;
                                i--
                              ) {
                                sumtotal += parseFloat(OpenBookBuy[i].total);
                                sumAmount += parseFloat(OpenBookBuy[i].amount);
                              }
                              setSummary({
                                amount: sumAmount,
                                total: sumtotal,
                              });
                            }}
                          >
                            <td>
                              <div className="asset">
                                <span className="greenText">
                                  {/* {parseFloat(item.price)%1 !== 0 ? parseFloat(item.price) : parseFloat(item.price).toFixed(2)} */}
                                  {item.price}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="asset">
                                <span className="asset-name">
                                  {item.amount}
                                </span>
                              </div>
                            </td>
                            <td>
                              <div className="asset">
                                <span className="asset-name">
                                  {parseFloat(item.total).toFixed(2)}
                                </span>
                              </div>
                            </td>
                            <div
                              className="progress-green"
                              style={{
                                width: `${
                                  parseFloat(item?.percentage)
                                    ? parseFloat(item?.percentage)
                                    : 0
                                }%`,
                              }}
                            ></div>
                          </tr>
                        </Tooltip>
                      ))
                    ) : (
                      <tr className="odd">
                        <td valign="top" className="text-center">
                          {t("No data available in table")}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              ) : (
                <div className="text-center mt-5">
                  <p>{t("No data available in table")} </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllBuyOrders;
