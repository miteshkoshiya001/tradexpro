import ImageComponent from "components/common/ImageComponent";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const MarketTrends = ({
  landing,
  asset_coin_pairs,
  hourly_coin_pairs,
  latest_coin_pairs,
}: any) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  return (
    <div>
      {parseInt(landing.landing_third_section_status) === 1 && (
        <section className="market-trend-area">
          <div className="container">
            <div className="section-title">
              <h2 className="title">
                {landing?.market_trend_title || t("Market Trend")}
              </h2>
            </div>
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
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "81.2812px" }}
                            >
                              {t("Price")}
                            </th>
                            <th
                              scope="col"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "193.797px" }}
                            >
                              {t("Change (24h)")}
                            </th>
                            <th
                              scope="col"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "182.297px" }}
                            >
                              {t("Chart")}
                            </th>
                            <th
                              scope="col"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "207.766px" }}
                            >
                              {t("Volume")}
                            </th>
                            <th
                              scope="col"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "127.344px" }}
                            >
                              {t("Actions")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {asset_coin_pairs?.map((item: any, index: number) => (
                            <tr role="row" className="odd" key={index}>
                              <td className="p-2">
                                <div className="d-flex flex-wrap">
                                  <img
                                    className="icon mr-3"
                                    src={item?.coin_icon || "/bitcoin.png"}
                                    alt="coin"
                                    width="25px"
                                    height="25px"
                                  />
                                  <a className="cellMarket" href="#">
                                    <div className="marketSymbols">
                                      <span className="quoteSymbol">
                                        {item?.child_coin_name}
                                      </span>
                                      <span className="baseSymbol">
                                        /{item?.parent_coin_name}
                                      </span>
                                    </div>
                                  </a>
                                </div>
                              </td>
                              <td className="text-black p-2">
                                {item.last_price}
                              </td>
                              <td className="p-2">
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
                              <td className="p-2">
                                {item.price_change >= 0 ? (
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
                              <td className="text-black p-2">
                                {item.volume} {item.parent_coin_name}
                              </td>
                              <td
                                className="p-2"
                                onClick={async () => {
                                  await localStorage.setItem(
                                    "base_coin_id",
                                    item?.parent_coin_id
                                  );
                                  await localStorage.setItem(
                                    "trade_coin_id",
                                    item?.child_coin_id
                                  );
                                  // await localStorage.setItem(
                                  //   "current_pair",
                                  //   item?.child_coin_name +
                                  //     "_" +
                                  //     item?.parent_coin_name
                                  // );
                                }}
                              >
                                <Link
                                  href={
                                    router.locale !== "en"
                                      ? `/${
                                          router.locale
                                        }/exchange/dashboard?coin_pair=${
                                          item?.child_coin_name +
                                          "_" +
                                          item?.parent_coin_name
                                        }`
                                      : `/exchange/dashboard?coin_pair=${
                                          item?.child_coin_name +
                                          "_" +
                                          item?.parent_coin_name
                                        }`
                                  }
                                >
                                  <a className="btnTrade btn-link">
                                    {t("Trade")}
                                  </a>
                                </Link>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="Gainers"
                role="tabpanel"
                aria-labelledby="Gainers-tab"
              >
                <div className="exchange-volume-table">
                  <div className="table-responsive">
                    <div
                      id="DataTables_Table_1_wrapper"
                      className="dataTables_wrapper no-footer"
                    >
                      <table
                        className="table table-borderless dataTable no-footer"
                        id="DataTables_Table_1"
                        role="grid"
                        aria-describedby="DataTables_Table_1_info"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              scope="col"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "0px" }}
                            >
                              {t("Market")}
                            </th>
                            <th
                              scope="col"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "0px" }}
                            >
                              {t("Price")}
                            </th>
                            <th
                              scope="col"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "0px" }}
                            >
                              {t("Change (24h)")}
                            </th>
                            <th
                              scope="col"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "0px" }}
                            >
                              {t("Chart")}
                            </th>
                            <th
                              scope="col"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "0px" }}
                            >
                              {t("Volume")}
                            </th>
                            <th
                              scope="col"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "0px" }}
                            >
                              {t("Actions")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {hourly_coin_pairs?.map(
                            (item: any, index: number) => (
                              <tr role="row" className="odd" key={index}>
                                <td className="p-2">
                                  <div className="d-flex flex-wrap">
                                    <img
                                      className="icon mr-3"
                                      src={item?.coin_icon || "/bitcoin.png"}
                                      alt="coin"
                                      width="25px"
                                      height="25px"
                                    />
                                    <a className="cellMarket" href="#">
                                      <div className="marketSymbols">
                                        <span className="quoteSymbol">
                                          {item?.child_coin_name}
                                        </span>
                                        <span className="baseSymbol">
                                          /{item?.parent_coin_name}
                                        </span>
                                      </div>
                                    </a>
                                  </div>
                                </td>
                                <td className="text-black p-2">
                                  {item.last_price}
                                </td>
                                <td className="p-2">
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
                                <td className="p-2">
                                  {item.price_change >= 0 ? (
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
                                <td className="text-black p-2">
                                  {item.volume} {item.parent_coin_name}
                                </td>
                                <td
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
                                  }}
                                  className="p-2"
                                >
                                  <a
                                    href="/exchange/dashboard"
                                    className="btnTrade btn-link"
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
              </div>
              <div
                className="tab-pane fade"
                id="Listings"
                role="tabpanel"
                aria-labelledby="Listings-tab"
              >
                <div className="exchange-volume-table">
                  <div className="table-responsive">
                    <div
                      id="DataTables_Table_2_wrapper"
                      className="dataTables_wrapper no-footer"
                    >
                      <table
                        className="table table-borderless dataTable no-footer"
                        id="DataTables_Table_2"
                        role="grid"
                        aria-describedby="DataTables_Table_2_info"
                      >
                        <thead>
                          <tr role="row">
                            <th
                              scope="col"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "0px" }}
                            >
                              {t("Market")}
                            </th>
                            <th
                              scope="col"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "0px" }}
                            >
                              {t("Price")}
                            </th>
                            <th
                              scope="col"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "0px" }}
                            >
                              {t("Change (24h)")}
                            </th>
                            <th
                              scope="col"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "0px" }}
                            >
                              {t("Chart")}
                            </th>
                            <th
                              scope="col"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "0px" }}
                            >
                              {t("Volume")}
                            </th>
                            <th
                              scope="col"
                              className="sorting_disabled"
                              rowSpan={1}
                              colSpan={1}
                              style={{ width: "0px" }}
                            >
                              {t("Actions")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {latest_coin_pairs?.map(
                            (item: any, index: number) => (
                              <tr role="row" className="odd" key={index}>
                                <td className="p-2">
                                  <div className="d-flex flex-wrap">
                                    <img
                                      className="icon mr-3"
                                      src={item?.coin_icon || "/bitcoin.png"}
                                      alt="coin"
                                      width="25px"
                                      height="25px"
                                    />
                                    <a className="cellMarket" href="#">
                                      <div className="marketSymbols">
                                        <span className="quoteSymbol">
                                          {item?.child_coin_name}
                                        </span>
                                        <span className="baseSymbol">
                                          /{item?.parent_coin_name}
                                        </span>
                                      </div>
                                    </a>
                                  </div>
                                </td>
                                <td className="text-black p-2">
                                  {item.last_price}
                                </td>
                                <td className="p-2">
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
                                <td className="p-2">
                                  {item.price_change >= 0 ? (
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
                                <td className="text-black p-2">
                                  {item.volume} {item.parent_coin_name}
                                </td>
                                <td
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
                                  }}
                                  className="p-2"
                                >
                                  <a
                                    href="/exchange/dashboard"
                                    className="btnTrade btn-link"
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
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default MarketTrends;
