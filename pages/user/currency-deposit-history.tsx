import Footer from "components/common/footer";
import ReportSidebar from "layout/report-sidebar";
import moment from "moment";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  CurrencyDepositHistoryAction,
  handleSearchItemsCurrency,
} from "state/actions/reports";
import SectionLoading from "components/common/SectionLoading";
import CustomDataTable from "components/Datatable";

const CurrencyDepositHistory = () => {
  type searchType = string;
  const [search, setSearch] = useState<searchType>("");
  const [sortingInfo, setSortingInfo] = useState<any>({
    column_name: "created_at",
    order_by: "desc",
  });
  const { t } = useTranslation("common");
  const [processing, setProcessing] = useState<boolean>(false);
  const [selectedLimit, setSelectedLimit] = useState<any>("10");
  const [history, setHistory] = useState<any>([]);
  const [stillHistory, setStillHistory] = useState<any>([]);
  const LinkTopaginationString = (page: any) => {
    const url = page.url.split("?")[1];
    const number = url.split("=")[1];
    CurrencyDepositHistoryAction(
      selectedLimit,
      parseInt(number),
      setHistory,
      setProcessing,
      setStillHistory,
      sortingInfo.column_name,
      sortingInfo.order_by,
      search
    );
  };
  const getReport = async () => {
    CurrencyDepositHistoryAction(
      selectedLimit,
      1,
      setHistory,
      setProcessing,
      setStillHistory,
      sortingInfo.column_name,
      sortingInfo.order_by,
      search
    );
  };

  const columns = [
    {
      Header: t("Currency Amount"),

      Cell: ({ row }: any) => (
        <div className="blance-text">
          <span className="blance market incree">
            {parseFloat(row?.original?.currency_amount).toFixed(2)}{" "}
            {row?.original?.currency}
          </span>
        </div>
      ),
    },
    {
      Header: t("Coin Amount"),

      Cell: ({ row }: any) => (
        <div className="blance-text">
          <span className="blance market incree">
            {row?.original?.coin_amount} {row?.original?.coin_type}
          </span>
        </div>
      ),
    },
    {
      Header: t("Transaction id"),
      accessor: "transaction_id",
      Cell: ({ cell }: any) => (
        <div className="blance-text">
          <span className="blance market incree">{cell?.value ?? "N/A"}</span>
        </div>
      ),
    },
    {
      Header: t("Rate"),

      Cell: ({ row }: any) => (
        <div className="blance-text">
          <span className="blance market incree">
            {row?.original?.rate} {row?.original?.coin_type}
          </span>
        </div>
      ),
    },
    {
      Header: t("Status"),
      accessor: "status",
      Cell: ({ cell }: any) => (
        <div>
          {cell.value === 0 ? (
            <span className="text-warning text-12">{t("Pending")}</span>
          ) : cell.value === 1 ? (
            <span className="text-success text-12"> {t("Success")}</span>
          ) : (
            <span className="text-danger text-12">{t("Failed")}</span>
          )}
        </div>
      ),
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
                    {t("Fiat To Crypto Deposit History")}
                  </h2>
                </div>
              </div>
            </div>
            <div className="asset-balances-area">
              <div className="asset-balances-left">
                <div className="section-wrapper">
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
  return {
    props: {},
  };
};

export default CurrencyDepositHistory;
