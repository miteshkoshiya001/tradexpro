import { formatCurrency } from "common";
import Footer from "components/common/footer";
import TableLoading from "components/common/SectionLoading";
import ProfileSidebar from "layout/profile-sidebar";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import moment from "moment";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineEdit } from "react-icons/ai";
import { TiArrowRepeat } from "react-icons/ti";
import { customPage, landingPage } from "service/landing-page";
import { GetUserInfoByTokenServer } from "service/user";
import { geyBankListAction } from "state/actions/fiat-deposit-withawal";

const List = () => {
  const { t } = useTranslation("common");
  const [processing, setProcessing] = React.useState<boolean>(false);
  type searchType = string;
  const [bankList, setBankList] = useState([]);
  const [search, setSearch] = React.useState<searchType>("");
  const columns = [
    {
      name: t("Account holder name"),
      selector: (row: any) => row?.account_holder_name,
      sortable: true,
    },
    {
      name: t("Bank name"),
      selector: (row: any) => row?.bank_name,
      sortable: true,
    },

    {
      name: t("Country"),
      selector: (row: any) => row?.country,
      sortable: true,
    },
    {
      name: t("Date"),
      selector: (row: any) =>
        moment(row.created_at).format("YYYY-MM-DD HH:mm:ss"),
      sortable: true,
    },
    {
      name: t("Actions"),
      cell: (row: any) => (
        <td>
          <div className="active-link">
            <Link href={`/user/bank/add-edit-bank?id=${row.id}`}>
              <span className="toolTip" title="Edit bank">
                <AiOutlineEdit size={20} />
              </span>
            </Link>
          </div>
        </td>
      ),
    },
  ];
  useEffect(() => {
    geyBankListAction(setBankList, setProcessing);
  }, []);
  return (
    <>
      <div className="page-wrap">
        <ProfileSidebar />
        <div className="page-main-content">
          <div className="container-fluid">
            <div className="section-top-wrap mb-25 inner-section-margin-top">
              <div className="profle-are-top">
                <h2 className="section-top-title">{t("Bank List")}</h2>
              </div>
            </div>

            <div className="asset-balances-area">
              {processing ? (
                <TableLoading />
              ) : (
                <div className="asset-balances-left">
                  <div className="section-wrapper">
                    <div className="table-responsive tableScroll">
                      <div
                        id="assetBalances_wrapper"
                        className="dataTables_wrapper no-footer"
                      >
                        <div className="bank-table-header">
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
                            <div
                              id="table_filter"
                              className="dataTables_filter"
                            >
                              <label>
                                {t("Search")}:
                                <input
                                  type="search"
                                  className="data_table_input"
                                  aria-controls="table"
                                  value={search}
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

                          <div className="dataTables_head">
                            <div className="">
                              <Link href={"/user/bank/add-edit-bank"}>
                                <button className="add-bank-btn">
                                  <span>{t("Add Bank")}</span>
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <DataTable columns={columns} data={bankList} />
                    </div>
                  </div>
                </div>
              )}
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

  return {
    props: {},
  };
};
export default List;
