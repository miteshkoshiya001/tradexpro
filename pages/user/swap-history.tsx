import type { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import ReportSidebar from "layout/report-sidebar";
import {
  CoinConvertHistoryAction,
  handleSwapHistorySearch,
} from "state/actions/reports";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import TableLoading from "components/common/SectionLoading";
import useTranslation from "next-translate/useTranslation";
import moment from "moment";
import DataTable from "react-data-table-component";
import { formatCurrency } from "common";
import { customPage, landingPage } from "service/landing-page";
import Footer from "components/common/footer";
import CustomDataTable from "components/Datatable";
const SwapHistory: NextPage = () => {
  const { t } = useTranslation("common");
  type searchType = string;
  const [search, setSearch] = React.useState<searchType>("");
  const [processing, setProcessing] = React.useState<boolean>(false);
  const [history, setHistory] = React.useState<any>([]);
  const [stillHistory, setStillHistory] = React.useState<any>([]);
  const [selectedLimit, setSelectedLimit] = React.useState<any>("10");
  const LinkTopaginationString = (page: any) => {
    const url = page.url.split("?")[1];
    const number = url.split("=")[1];
    CoinConvertHistoryAction(
      selectedLimit,
      parseInt(number),
      setHistory,
      setProcessing,
      setStillHistory,
      search
    );
  };
  const getReport = async () => {
    CoinConvertHistoryAction(selectedLimit, 1, setHistory, setProcessing, setStillHistory, search);
  };
  const columns = [
    {
      Header: t("From Wallet"),
      accessor: "from_wallet.name",
    },
    {
      Header: t("To Wallet"),
      accessor: "to_wallet.name",
    },
    {
      Header: t("Requested Amount"),
      accessor: "requested_amount",

      Cell: ({ cell }: any) => (
        <div className="blance-text">
          <span className="blance market incree">
            {formatCurrency(cell?.value)}
          </span>
        </div>
      ),
    },
    {
      Header: t("Converted Amount"),
      accessor: "converted_amount",
      Cell: ({ cell }: any) => <div>{parseFloat(cell.value).toFixed(8)}</div>,
    },
    {
      Header: t("Rate"),
      accessor: "rate",
    },
    {
      Header: t("Created At"),
      accessor: "created_at",

      Cell: ({ cell }: any) => (
        <div>{moment(cell.value).format("YYYY-MM-DD HH:mm:ss")}</div>
      ),
    },
    {
      Header: t("Status"),
      accessor: "status",

      Cell: ({ cell }: any) => (
        <div>
          {cell.value === 0 ? (
            <span className="text-warning">{t("Pending")}</span>
          ) : cell.value === 1 ? (
            <span className="text-success"> {t("Success")}</span>
          ) : (
            <span className="text-danger">{t("Failed")}</span>
          )}
        </div>
      ),
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
      <div className="page-wrap">
        <ReportSidebar />
        <div className="page-main-content">
          <div className="container-fluid">
            <div className="section-top-wrap mb-25 inner-section-margin-top">
              <div className="overview-area">
                <div className="overview-left">
                  <h2 className="section-top-title">
                    {t("Coin Swap History")}
                  </h2>
                </div>
              </div>
            </div>

            <div className="asset-balances-area">
              <div className="asset-balances-left">
                <div className="section-wrapper">
                  <div className="tableScroll">
                    <div className=" table-responsive tableScroll">
                      <CustomDataTable
                        columns={columns}
                        data={history}
                        selectedLimit={selectedLimit}
                        setSelectedLimit={setSelectedLimit}
                        search={search}
                        setSearch={setSearch}
                        processing={processing}
                      />
                    </div>
                    {history?.length > 0 && (
                      <div
                        className="pagination-wrapper"
                        id="assetBalances_paginate"
                      >
                        <span>
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
  await SSRAuthCheck(ctx, "/user/swap-history");
  return {
    props: {},
  };
};

export default SwapHistory;
