import type { GetServerSideProps, NextPage } from "next";
import ProfileComp from "components/profile/profile";
import { parseCookies } from "nookies";

import { GetUserInfoByTokenServer } from "service/user";
import ProfileSidebar from "layout/profile-sidebar";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import useTranslation from "next-translate/useTranslation";
import Footer from "components/common/footer";
import { customPage, landingPage } from "service/landing-page";
import moment from "moment";
import LaunchpadSidebar from "layout/launchpad-sidebar";
import { useEffect, useState } from "react";
import { DynamicSubmittedFormListAction } from "state/actions/launchpad";
import TableLoading from "components/common/SectionLoading";
import DataTable from "react-data-table-component";
import { handleSwapHistorySearch } from "state/actions/reports";
import Link from "next/link";
import { IoWalletOutline } from "react-icons/io5";
import { GiToken } from "react-icons/gi";
import SectionLoading from "components/common/SectionLoading";
const Profile: NextPage = () => {
  const [history, setHistory] = useState<any>([]);
  const { t } = useTranslation("common");
  const [search, setSearch] = useState<any>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [sortingInfo, setSortingInfo] = useState<any>({
    column_name: "created_at",
    order_by: "desc",
  });
  const [stillHistory, setStillHistory] = useState<any>([]);
  const columns = [
    {
      name: t("Id"),
      selector: (row: any) => row?.unique_id,
      sortable: true,
    },
    {
      name: t("Updated At"),
      selector: (row: any) => row?.updated_at,
      sortable: true,
    },

    {
      name: t("Status"),
      selector: (row: any) => row?.status,
      sortable: true,
      cell: (row: any) => (
        <div>
          {row.status === 0 ? (
            <span className="text-warning">{t("Pending")}</span>
          ) : row.status === 1 ? (
            <span className="text-success"> {t("Success")}</span>
          ) : (
            <span className="text-danger">{t("Failed")}</span>
          )}
        </div>
      ),
    },
    {
      name: t("Date"),
      selector: (row: any) =>
        moment(row.created_at).format("YYYY-MM-DD HH:mm:ss"),
      sortable: true,
    },
    {
      name: t("Actions"),
      selector: (row: any) => row?.status,
      sortable: true,
      cell: (row: any) => (
        <div className="blance-text">
          {row?.status === 1 && row?.token_create_status === 1 && (
            <Link href={`/ico/create-edit-token/${row?.id}`}>
              <li className="toolTip" title="Create Token">
                <GiToken size={25} />
              </li>
            </Link>
          )}
        </div>
      ),
    },
  ];
  const LinkTopaginationString = (page: any) => {
    const url = page.url.split("?")[1];
    const number = url.split("=")[1];
    DynamicSubmittedFormListAction(
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
    DynamicSubmittedFormListAction(
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
      <div className="page-wrap">
        <LaunchpadSidebar />
        <div className="page-main-content">
          <div className="container-fluid">
            <div className="section-top-wrap mb-25 inner-section-margin-top">
              <div className="profle-are-top">
                <h2 className="section-top-title">{t("Applied launchpad")}</h2>
              </div>
            </div>
            <div className="asset-balances-area">
              <div className="asset-balances-left">
                <div className="section-wrapper">
                  <div className="tableScroll">
                    <div
                      id="assetBalances_wrapper"
                      className="dataTables_wrapper no-footer"
                    >
                      <div className="dataTables_head">
                        <div id="table_filter" className="dataTables_filter">
                          <label>
                            {t("Search:")}
                            <input
                              type="search"
                              className="data_table_input"
                              aria-controls="table"
                              value={search}
                              onChange={(e) => {
                                handleSwapHistorySearch(
                                  e,
                                  setSearch,
                                  stillHistory,
                                  setHistory
                                );
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    {processing ? (
                      <SectionLoading />
                    ) : (
                      <>
                        <DataTable columns={columns} data={history} />
                        <div
                          className="pagination-wrapper"
                          id="assetBalances_paginate"
                        >
                          <span>
                            {stillHistory?.links?.map(
                              (link: any, index: number) =>
                                link.label === "&laquo; Previous" ? (
                                  <a
                                    className="paginate-button"
                                    onClick={() => {
                                      if (link.url)
                                        LinkTopaginationString(link);
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
                                    onClick={() => LinkTopaginationString(link)}
                                    key={index}
                                  >
                                    {link.label}
                                  </a>
                                )
                            )}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
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
  await SSRAuthCheck(ctx, "/user/profile");
  const cookies = parseCookies(ctx);
  const response = await GetUserInfoByTokenServer(cookies.token);

  return {
    props: {
      user: response.user,
      profileActivity: response.activityLog,
    },
  };
};
export default Profile;
