import TableLoading from "components/common/SectionLoading";
import ReportSidebar from "layout/report-sidebar";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import DataTable from "react-data-table-component";

const LaunchPad = () => {
  const { t } = useTranslation("common");
  const [processing, setProcessing] = React.useState<boolean>(false);
  return (
    <div className="page-wrap">
      <ReportSidebar />
      <div className="page-main-content">
        <div className="container-fluid">
          <div className="section-top-wrap mb-25">
            <div className="overview-area">
              <div className="overview-left">
                <h2 className="">{t("Launch Pad History")}</h2>
              </div>
            </div>
          </div>
          <div className="asset-balances-area">
            {processing ? (
              <TableLoading />
            ) : (
              <div className="asset-balances-left">
                <div className="section-wrapper">
                  <div className="table-responsive">
                    <div
                      id="assetBalances_wrapper"
                      className="dataTables_wrapper no-footer"
                    >
                      <div className="dataTables_head">
                        <div
                          className="dataTables_length"
                          id="assetBalances_length"
                        >
                          <label className="">
                            {t("Show")}
                            <select
                              name="assetBalances_length"
                              aria-controls="assetBalances"
                              className=""
                              // onChange={(e) => {
                              //   CoinConvertHistoryAction(
                              //     parseInt(e.target.value),
                              //     1,
                              //     setHistory,
                              //     setProcessing,
                              //     setStillHistory
                              //   );
                              // }}
                            >
                              <option selected disabled hidden>
                                10
                              </option>
                              <option value="10">10</option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                            </select>
                          </label>
                        </div>
                        <div id="table_filter" className="dataTables_filter">
                          <label>
                            {t("Search:")}
                            <input
                              type="search"
                              className="data_table_input"
                              aria-controls="table"
                              // value={search}
                              // onChange={(e) => {
                              //   handleSwapHistorySearch(
                              //     e,
                              //     setSearch,
                              //     stillHistory,
                              //     setHistory
                              //   );
                              // }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* <DataTable columns={columns} data={history} /> */}

                    <div
                      className="pagination-wrapper"
                      id="assetBalances_paginate"
                    >
                      {/* <span>
                        {stillHistory?.list?.links.map(
                          (link: any, index: number) =>
                            link.label === "&laquo; Previous" ? (
                              <a
                                className="paginate-button"
                                onClick={() => {
                                  if (link.url) LinkTopaginationString(link);
                                }}
                                key={index}
                              >
                                <i className="fa fa-angle-left"></i>
                              </a>
                            ) : link.label === "Next &raquo;" ? (
                              <a
                                className="paginate-button"
                                onClick={() => LinkTopaginationString(link)}
                                key={index}
                              >
                                <i className="fa fa-angle-right"></i>
                              </a>
                            ) : (
                              <a
                                className="paginate_button paginate-number"
                                aria-controls="assetBalances"
                                data-dt-idx="1"
                                // onClick={() => LinkTopaginationString(link)}
                                // key={index}
                              >
                                {link.label}
                              </a>
                            )
                        )}
                      </span> */}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/launchpad-history");
  return {
    props: {},
  };
};
export default LaunchPad;
