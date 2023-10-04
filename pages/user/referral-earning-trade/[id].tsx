import type { GetServerSideProps, NextPage } from "next";
import ReportSidebar from "layout/report-sidebar";
import React, { useState } from "react";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import {
  ReferralHistoryAction,
  handleSearchItems,
} from "state/actions/reports";
import SectionLoading from "components/common/SectionLoading";
import useTranslation from "next-translate/useTranslation";
import moment from "moment";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { formatCurrency } from "common";
import Footer from "components/common/footer";
import { customPage, landingPage } from "service/landing-page";
import { useRouter } from "next/router";
import CustomDataTable from "components/Datatable";

const ReferralEarningTrade: NextPage = () => {
  type searchType = string;
  const { t } = useTranslation("common");
  const [search, setSearch] = useState<searchType>("");
  const router = useRouter();
  const [sortingInfo, setSortingInfo] = useState<any>({
    column_name: "created_at",
    order_by: "desc",
  });
  const { settings } = useSelector((state: RootState) => state.common);
  const [selectedLimit, setSelectedLimit] = useState<any>("10");

  const [processing, setProcessing] = useState<boolean>(false);
  const [history, setHistory] = useState<any>([]);
  const [stillHistory, setStillHistory] = useState<any>([]);

  const LinkTopaginationString = (page: any) => {
    const url = page.url.split("?")[1];
    const number = url.split("=")[1];
    ReferralHistoryAction(
      selectedLimit,
      parseInt(number),
      setHistory,
      setProcessing,
      setStillHistory,
      sortingInfo.column_name,
      sortingInfo.order_by,
      router.query.id,
      search
    );
  };
  const getReport = async () => {
    ReferralHistoryAction(
      selectedLimit,
      1,
      setHistory,
      setProcessing,
      setStillHistory,
      sortingInfo.column_name,
      sortingInfo.order_by,
      router.query.id,
      search
    );
  };
  const columns = [
    {
      Header: t("Referral user email"),
      accessor: "referral_user_email",
    },
    {
      Header: t("Transaction id"),
      accessor: "transaction_id",
    },
    {
      Header: t("Amount"),
      Cell: ({ row }: any) =>
        `${row?.original?.amount} ${row?.original?.coin_type}`,
    },
    {
      Header: t("Date"),
      accessor: "created_at",
      Cell: ({ cell }: any) => moment(cell.value).format("YYYY-MM-DD HH:mm:ss"),
    },
  ];

  React.useEffect(() => {
    getReport();
    return () => {
      setHistory([]);
    };
  }, [selectedLimit, search]);
  return (
    <>
      <div className="page-wrap rightMargin">
        <ReportSidebar />

        <div className="page-main-content">
          <div className="container-fluid">
            <div className="section-top-wrap mb-25 inner-section-margin-top">
              <div className="overview-area">
                <div className="overview-left">
                  <h2 className="section-top-title">
                    {t("Referral earning trade")}
                  </h2>
                </div>
              </div>
            </div>

            <div className="asset-balances-area">
              <div className="asset-balances-left">
                <div className="section-wrapper ">
                  <div className="tableScroll">
                    <CustomDataTable
                      columns={columns}
                      data={history}
                      selectedLimit={selectedLimit}
                      setSelectedLimit={setSelectedLimit}
                      search={search}
                      setSearch={setSearch}
                      processing={processing}
                    />
                    {history?.length > 0 && (
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
      </div>
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/buy-order-history");
  return {
    props: {},
  };
};

export default ReferralEarningTrade;
