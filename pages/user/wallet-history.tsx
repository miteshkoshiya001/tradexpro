import type { GetServerSideProps, NextPage } from "next";
import React, { useState, useEffect } from "react";
import ReportSidebar from "layout/report-sidebar";
import DataTable from "react-data-table-component";
import {
  WithdrawAndDepositHistoryAction,
  handleSearch,
} from "state/actions/reports";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { useRouter } from "next/router";
import useTranslation from "next-translate/useTranslation";
import moment from "moment";
import Footer from "components/common/footer";
import { toast } from "react-toastify";
import { BiCopy } from "react-icons/bi";
import SectionLoading from "components/common/SectionLoading";
import CustomDataTable from "components/Datatable";
import { getFiatHistoryApi } from "service/reports";
import FiatTableForDeposit from "components/user/fiat/FiatTableForDeposit";
import FiatTableForWithdraw from "components/user/fiat/FiatTableForWithdraw";
import { AiOutlineSearch } from "react-icons/ai";
const DepositHistory: NextPage = () => {
  const router = useRouter();
  const { type } = router.query;
  const { t } = useTranslation("common");
  const [search, setSearch] = useState<any>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [selectedLimit, setSelectedLimit] = useState<any>("10");
  const [selectedType, setSelectedType] = useState({
    id: 1,
    name: "Crypto",
  });
  const [history, setHistory] = useState<any>([]);
  // const [fiatHistory, setFiatHistory] = useState<any>([])
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

  const LinkTopaginationStringForFiat = (page: any) => {
    const url = page.url.split("?")[1];
    const number = url.split("=")[1];
    getFiatHistory(parseInt(number), search);
  };
  const getReport = async () => {
    if (type === "deposit" || type === "withdrawal") {
      WithdrawAndDepositHistoryAction(
        type === "withdrawal" ? "withdraw" : "deposit",
        selectedLimit,
        1,
        setHistory,
        setProcessing,
        setStillHistory,
        search
      );
    }
  };
  const getFiatHistory = async (page: any, searchField: string) => {
    setProcessing(true);
    const data = await getFiatHistoryApi(
      type === "withdrawal" ? "withdraw" : "deposit",
      selectedLimit,
      page,
      searchField
    );
    if (!data.success) {
      toast.error(data.message);
      setProcessing(false);
      return;
    }
    setHistory(data?.data?.data);
    setStillHistory(data.data);
    setProcessing(false);
  };

  const walletTypes = [
    {
      id: 1,
      name: "Crypto",
    },
    {
      id: 2,
      name: "Fiat",
    },
  ];
  const columns = [
    {
      Header: t("Created At"),
      accessor: "created_at",
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
      Header:
        type === t("deposit") ? t("Transaction Id") : t("Transaction Hash"),
      accessor: "transaction_id",
    },
    {
      Header: t("Status"),
      accessor: "status",

      Cell: ({ cell: { value } }: any) =>
        value == 1 ? (
          <span className="badge badge-pill text-12 badge-success">Active</span>
        ) : (
          <span className="badge badge-pill text-12 badge-danger">
            InActive
          </span>
        ),
    },
  ];
  useEffect(() => {
    setHistory([]);
    setStillHistory([]);
    setSearch("");
    if (selectedType.id == 1) {
      getReport();
    }
    if (selectedType.id == 2) {
      getFiatHistory(1, "");
    }
    return () => {
      setHistory([]);
    };
  }, [type, selectedType, selectedLimit]);

  useEffect(() => {
    setHistory([]);
    setStillHistory([]);
    if (selectedType.id == 1) {
      getReport();
    }
    if (selectedType.id == 2) {
      getFiatHistory(1, search);
    }
  }, [search]);

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
                    {type === "deposit"
                      ? t("Deposit History")
                      : t("Withdrawal History")}
                    {search}
                  </h2>
                </div>
              </div>
            </div>

            <div>
              <div className="select-method mb-4">
                {walletTypes?.map((wallet_type: any, index: number) => (
                  <div
                    className={
                      selectedType.id === wallet_type.id
                        ? "select-method-item-active mr-0 mr-md-3 mt-0"
                        : "select-method-item mr-0 mr-md-3 mt-0"
                    }
                    key={index}
                    onClick={() => {
                      setSelectedType(wallet_type);
                      setSelectedLimit("10");
                    }}
                  >
                    {wallet_type.name}
                  </div>
                ))}
              </div>
            </div>
            {selectedType.id == 1 && (
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
                            {stillHistory?.histories?.links.map(
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
            )}

            {selectedType.id == 2 && (
              <div className="asset-balances-area">
                <div className="asset-balances-left">
                  <div className="section-wrapper">
                    <div className="tableScroll">
                      <div className="cp-user-wallet-table table-responsive tableScroll">
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
                                  placeholder="10"
                                  onChange={(e) => {
                                    setSelectedLimit(e.target.value);
                                  }}
                                  value={selectedLimit}
                                >
                                  <option value="10">10</option>
                                  <option value="25">25</option>
                                  <option value="50">50</option>
                                  <option value="100">100</option>
                                </select>
                              </label>
                            </div>
                            <div className="dataTables_filter_class">
                              <label>
                                <AiOutlineSearch />
                                <input
                                  type="search"
                                  className="data_table_input"
                                  placeholder="Search..."
                                  value={search}
                                  onChange={(e) => setSearch(e.target.value)}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        {processing ? (
                          <SectionLoading />
                        ) : (
                          <>
                            {type === "withdrawal" ? (
                              <FiatTableForWithdraw data={history} />
                            ) : (
                              <FiatTableForDeposit data={history} />
                            )}
                          </>
                        )}
                      </div>
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
                                      if (link.url)
                                        LinkTopaginationStringForFiat(link);
                                    }}
                                    key={index}
                                  >
                                    <i className="fa fa-angle-left"></i>
                                  </a>
                                ) : link.label === "Next &raquo;" ? (
                                  <a
                                    className="paginate-button"
                                    onClick={() =>
                                      LinkTopaginationStringForFiat(link)
                                    }
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
                                    onClick={() =>
                                      LinkTopaginationStringForFiat(link)
                                    }
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
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/wallet-history");
  return {
    props: {},
  };
};

export default DepositHistory;
