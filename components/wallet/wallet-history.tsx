import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  WithdrawAndDepositHistoryAction,
  handleSearch,
} from "state/actions/reports";
import Loading from "components/common/SectionLoading";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import moment from "moment";
import CustomDataTable from "components/Datatable";
const Wallethistory = ({ type }: any) => {
  const { t } = useTranslation("common");
  const [search, setSearch] = useState<any>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [selectedLimit, setSelectedLimit] = useState<any>("10");
  const [history, setHistory] = useState<any>([]);
  const [stillHistory, setStillHistory] = useState<any>([]);
  const LinkTopaginationString = (page: any) => {
    const url = page.url.split("?")[1];
    const number = url.split("=")[1];
    WithdrawAndDepositHistoryAction(
      type === "withdrawal" ? "withdraw" : "deposit",
      10,
      parseInt(number),
      setHistory,
      setProcessing,
      setStillHistory,
      search
    );
  };
  const getReport = async () => {
    if (type === "deposit" || type === "withdrawal") {
      WithdrawAndDepositHistoryAction(
        type === "withdrawal" ? "withdraw" : "deposit",
        10,
        1,
        setHistory,
        setProcessing,
        setStillHistory,
        search
      );
    }
  };
  const columns = [
    {
      Header: t("Created At"),
      accessor: "created_at",
      Cell: ({ cell }: any) => (
        <div>{moment(cell.value).format("YYYY-MM-DD HH:mm:ss")}</div>
      ),
    },
    {
      Header: t("Address"),
      accessor: "address",
    },
    {
      Header: t("Coin Type"),
      accessor: "coin_type",
    },
    {
      Header: t("Amount"),
      accessor: "amount",
    },
    {
      Header: t("Fees"),
      accessor: "fees",
    },
    {
      Header: t("Status"),
      accessor: "status",

      Cell: ({ cell: { value } }: any) => (
        <div>
          {value == 0 ? (
            <span className="text-warning">{t("Pending")}</span>
          ) : value == 1 ? (
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
  }, [type, selectedLimit, search]);
  return (
    <>
      <div className="page-wrap mt-2">
        <div className="page-main-content">
          <div className="container-fluid px-0">
            <div className="asset-balances-area">
              <div className="asset-balances-left">
                <div className="section-wrapper wallet-border-history shadow-sm rounded">
                  <div className="tableScroll">
                    <div
                      id="assetBalances_wrapper"
                      className="dataTables_wrapper no-footer"
                    ></div>
                    <div className="cp-user-wallet-table table-responsive tableScroll">
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
                          {stillHistory?.histories?.links.map(
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
    </>
  );
};

export default Wallethistory;
