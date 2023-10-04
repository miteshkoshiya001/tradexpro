import { NoItemFound } from "components/NoItemFound/NoItemFound";
import request from "lib/request";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getExchangeMarketDetails } from "service/futureTrade";
import { listenMessagesFutureMarketData } from "state/actions/exchange";

export default function TradeSections() {
  const [tradeDatas, setTradeDatas] = useState<any>([]);
  const [selectType, setSelectType] = useState("assets");
  const router = useRouter();
  useEffect(() => {
    getTradeSectionData();
  }, [selectType]);
  useEffect(() => {
    listenMessagesFutureMarketData(setTradeDatas);
  }, []);
  const getTradeSectionData = async () => {
   const data: any = await getExchangeMarketDetails(selectType);
    if (!data.success) {
      toast.error(data.message);
      return;
    }
    setTradeDatas(data.data);
  };

  const { t } = useTranslation();
  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-12 px-2">
          <div className="market-trend-area ">
            <div className="container">
              <div className="exchange-tab-menu">
                <ul className="nav nav-tabs" id="exchangeTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link active"
                      id="CoreAssets-tab"
                      data-toggle="tab"
                      href="#CoreAssets"
                      role="tab"
                      aria-controls="CoreAssets"
                      aria-selected="true"
                      onClick={() => {
                        setSelectType("assets");
                      }}
                    >
                      {t("Core Assets")}
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="Gainers-tab"
                      data-toggle="tab"
                      href="#Gainers"
                      role="tab"
                      aria-controls="Gainers"
                      aria-selected="false"
                      onClick={() => setSelectType("hour")}
                    >
                      {t("24H Gainers")}
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="Listings-tab"
                      data-toggle="tab"
                      href="#Listings"
                      role="tab"
                      aria-controls="Listings"
                      aria-selected="false"
                      onClick={() => setSelectType("new")}
                    >
                      {t("New Listings")}
                    </a>
                  </li>
                </ul>
              </div>
              <div className="tab-content" id="exchangeTabContent">
                <div
                  className="tab-pane fade show active"
                  id="CoreAssets"
                  role="tabpanel"
                  aria-labelledby="CoreAssets-tab"
                >
                  {tradeDatas?.coins?.length > 0 ? (
                    <div className="exchange-volume-table">
                      <div className="table-responsive">
                        <div
                          id="DataTables_Table_0_wrapper"
                          className="dataTables_wrapper no-footer"
                        >
                          <table
                            className="table table-borderless dataTable no-footer"
                            id="DataTables_Table_0"
                            role="grid"
                            aria-describedby="DataTables_Table_0_info"
                          >
                            <thead>
                              <tr role="row">
                                <th
                                  scope="col"
                                  className="sorting_disabled"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "137.516px" }}
                                >
                                  {t("Market")}
                                </th>
                                <th
                                  scope="col"
                                  className="sorting_disabled text-center"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "81.2812px" }}
                                >
                                  {t("Price")}
                                </th>
                                <th
                                  scope="col"
                                  className="sorting_disabled text-center"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "193.797px" }}
                                >
                                  {t("Change (24h)")}
                                </th>
                                <th
                                  scope="col"
                                  className="sorting_disabled text-center"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "182.297px" }}
                                >
                                  {t("Chart")}
                                </th>
                                <th
                                  scope="col"
                                  className="sorting_disabled text-center"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "207.766px" }}
                                >
                                  {t("Volume")}
                                </th>
                                <th
                                  scope="col"
                                  className="sorting_disabled text-right"
                                  rowSpan={1}
                                  colSpan={1}
                                  style={{ width: "127.344px" }}
                                >
                                  {t("Actions")}
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {tradeDatas?.coins?.map(
                                (item: any, index: any) => (
                                  <tr role="row" className="odd" key={index}>
                                    <td className="d-flex">
                                      <img
                                        className="icon mr-3"
                                        src={item?.coin_icon ?? "/bitcoin.png"}
                                        alt="coin"
                                        width="25px"
                                        height="25px"
                                      />
                                      <a className="cellMarket" href="#">
                                        <div className="marketSymbols">
                                          <span className="quoteSymbol">
                                            {item.child_coin_name}
                                          </span>
                                          <span className="baseSymbol">
                                            /{item.parent_coin_name}
                                          </span>
                                        </div>
                                      </a>
                                    </td>
                                    <td className="text-black text-center">
                                      {item.last_price}
                                    </td>
                                    <td className="text-center">
                                      <span
                                        className={`changePos  ${
                                          parseFloat(item.price_change) >= 0
                                            ? "text-success"
                                            : "text-danger"
                                        } `}
                                      >
                                        {item.price_change}%
                                      </span>
                                    </td>
                                    <td className="text-center">
                                      {parseFloat(item.price_change) >= 0 ? (
                                        <img
                                          src="/chart-image-1.png"
                                          alt="chart-image"
                                          className="chart-img"
                                        />
                                      ) : (
                                        <img
                                          src="/chart-image-2.png"
                                          alt="chart-image"
                                          className="chart-img"
                                        />
                                      )}
                                    </td>
                                    <td className="text-black text-center">
                                      {item.volume} {item.parent_coin_name}
                                    </td>
                                    <td
                                      className="text-right"
                                      onClick={async () => {
                                        await localStorage.setItem(
                                          "base_coin_id",
                                          item?.parent_coin_id
                                        );
                                        await localStorage.setItem(
                                          "trade_coin_id",
                                          item?.child_coin_id
                                        );
                                        await localStorage.setItem(
                                          "current_pair",
                                          item?.child_coin_name +
                                            "_" +
                                            item?.parent_coin_name
                                        );
                                        await localStorage.setItem(
                                          "coin_pair_id",
                                          item?.coin_pair_id
                                        );
                                      }}
                                    >
                                      <a
                                        className="btnTrade btn-link mb-2"
                                        href={
                                          router.locale !== "en"
                                            ? `/${router.locale}/futures/exchange`
                                            : "/futures/exchange"
                                        }
                                      >
                                        {t("Trade")}
                                      </a>
                                    </td>
                                  </tr>
                                )
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <NoItemFound />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
