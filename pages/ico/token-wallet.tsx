import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import type { GetServerSideProps, NextPage } from "next";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { TiArrowRepeat } from "react-icons/ti";
import { getMyTokenBalanceAction } from "state/actions/launchpad";
import Loading from "components/common/SectionLoading";
import useTranslation from "next-translate/useTranslation";
import Footer from "components/common/footer";
import { customPage, landingPage } from "service/landing-page";
import LaunchpadSidebar from "layout/launchpad-sidebar";
import SectionLoading from "components/common/SectionLoading";

const MyWallet: NextPage = () => {
  const [history, setHistory] = useState<any>([]);
  const { t } = useTranslation("common");
  const [processing, setProcessing] = useState<boolean>(false);
  const [sortingInfo, setSortingInfo] = useState<any>({
    column_name: "created_at",
    order_by: "desc",
  });
  const [stillHistory, setStillHistory] = useState<any>([]);
  const LinkTopaginationString = (page: any) => {
    const url = page.url.split("?")[1];
    const number = url.split("=")[1];
    getMyTokenBalanceAction(
      10,
      parseInt(number),
      setHistory,
      setProcessing,
      setStillHistory,
      sortingInfo.column_name,
      sortingInfo.order_by
    );
  };
  useEffect(() => {
    getMyTokenBalanceAction(
      10,
      1,
      setHistory,
      setProcessing,
      setStillHistory,
      sortingInfo.column_name,
      sortingInfo.order_by
    );
  }, []);
  return (
    <>
      <div className="page-wrap rightMargin">
        <LaunchpadSidebar />
        <div className="page-main-content">
          <div className="container-fluid">
            <div className="section-top-wrap mb-25 inner-section-margin-top">
              <div className="overview-area">
                <div className="overview-left">
                  <h2 className="section-top-title">{t("Token Wallet")}</h2>
                </div>
              </div>
            </div>
            <div className="asset-balances-area cstm-loader-area">
              <div className="asset-balances-left">
                <div className="section-wrapper">
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
                            // onChange={async (e) => {
                            //   await getWalletLists(
                            //     "/wallet-list?page=1&per_page=" + e.target.value
                            //   );
                            // }}
                          >
                            <option value="15">15</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                          </select>
                        </label>
                      </div>
                      <div id="table_filter" className="dataTables_filter">
                        <label>
                          {t("Search")}:
                          <input
                            type="search"
                            className="data_table_input"
                            placeholder=""
                            aria-controls="table"
                            // onChange={(e) =>
                            //   SearchObjectArrayFuesJS(
                            //     walletList,
                            //     setChangeable,
                            //     e.target.value
                            //   )
                            // }
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive tableScroll">
                    {processing ? (
                      <SectionLoading />
                    ) : (
                      <table
                        id="assetBalances"
                        className="table table-borderless secendary-table asset-balances-table"
                      >
                        <thead>
                          <tr>
                            <th scope="col">{t("Asset")}</th>
                            <th scope="col">{t("Symbol")}</th>
                            <th scope="col">{t("Available Balance")}</th>
                            <th scope="col">{t("Address")}</th>
                            <th scope="col">{t("Date")}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {history?.map((item: any, index: number) => (
                            <tr id="" key={index}>
                              <td>
                                <div className="asset">
                                  <img
                                    className="asset-icon"
                                    src={item?.image_path || "/bitcoin.png"}
                                    alt=""
                                  />
                                  <span className="asset-name">
                                    {item?.name}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <span className="symbol">
                                  {item?.coin_type}
                                </span>
                              </td>
                              <td>
                                <div className="blance-text">
                                  <span className="blance">
                                    {parseFloat(item?.balance).toFixed(8)}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="blance-text">
                                  <span className="blance">
                                    {/* @ts-ignore */}
                                    {item?.address}
                                  </span>
                                </div>
                              </td>
                              <td>
                                <div className="blance-text">
                                  <span className="blance">
                                    {/* @ts-ignore */}
                                    {item?.created_at}
                                  </span>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                  {history.length > 0 && (
                    <div
                      className="pagination-wrapper"
                      id="assetBalances_paginate"
                    >
                      <span>
                        {stillHistory?.links?.map((link: any, index: number) =>
                          link.label === "&laquo; Previous" ? (
                            <a
                              className="paginate-button"
                              onClick={() => LinkTopaginationString(link)}
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
                              className={`paginate_button paginate-number ${
                                link.active === true && "text-warning"
                              }`}
                              aria-controls="assetBalances"
                              data-dt-idx="1"
                              onClick={() => LinkTopaginationString(link)}
                              key={index}
                            >
                              {link.label}
                            </a>
                          )
                        )}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/my-wallet");

  return {
    props: {},
  };
};

export default MyWallet;
