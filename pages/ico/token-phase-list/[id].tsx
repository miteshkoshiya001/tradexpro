import Footer from "components/common/footer";
import LaunchpadSidebar from "layout/launchpad-sidebar";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import moment from "moment";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { IoCreateOutline } from "react-icons/io5";
import { customPage, landingPage } from "service/landing-page";
import { SaveIcoPhaseStatus } from "service/launchpad";
import { IcoTokenPhaseListAction } from "state/actions/launchpad";
import { handleSwapHistorySearch } from "state/actions/reports";

const IcoTokenPhaseList = ({ id }: any) => {
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
      name: t("Phase title"),
      selector: (row: any) => row?.phase_title,
      sortable: true,
    },
    {
      name: t("Token name"),
      selector: (row: any) => row?.coin_type,
      sortable: true,
    },
    {
      name: t("Total Token Supply"),
      // selector: (row: any) => parseFloat(row.total_token_supply).toFixed(5),
      sortable: true,
      cell: (row: any) => (
        <div className="blance-text">
          {parseFloat(row.total_token_supply).toFixed(5)} {row?.coin_type}
        </div>
      ),
    },
    {
      name: t("Available Token Supply"),
      sortable: true,
      cell: (row: any) => (
        <div className="blance-text">
          {parseFloat(row?.available_token_supply).toFixed(4)} {row?.coin_type}
        </div>
      ),
    },
    {
      name: t("Coin Price"),
      sortable: true,
      cell: (row: any) => (
        <div className="blance-text">
          {row?.coin_price} {row?.coin_currency}
        </div>
      ),
    },
    {
      name: t("Status"),
      selector: (row: any) => row?.status,
      sortable: true,
      cell: (row: any) => (
        <div>
          <li
            className="toolTip ml-3"
            title={row.status === 0 ? "Turn on" : "Turn off"}
            onClick={async () => {
              await SaveIcoPhaseStatus(row.id);
              await IcoTokenPhaseListAction(
                10,
                1,
                setHistory,
                setProcessing,
                setStillHistory,
                sortingInfo.column_name,
                sortingInfo.order_by,
                id
              );
            }}
          >
            {row.status === 0 ? (
              <BsToggle2Off size={20} />
            ) : (
              <BsToggle2On size={20} />
            )}
          </li>
        </div>
      ),
    },
    {
      name: t("Start Date"),
      selector: (row: any) =>
        moment(row.start_date).format("YYYY-MM-DD HH:mm:ss"),
      sortable: true,
    },
    {
      name: t("End Date"),
      selector: (row: any) =>
        moment(row.end_date).format("YYYY-MM-DD HH:mm:ss"),
      sortable: true,
    },
    {
      name: t("Actions"),
      sortable: true,
      cell: (row: any) => (
        <div className="blance-text">
          <Link href={`/ico/create-edit-phase/${row?.id}?edit=true`}>
            <li className="toolTip" title="Edit Phase">
              <IoCreateOutline size={20} />
            </li>
          </Link>
          <Link href={`/ico/create-edit-additional-phase/${row?.id}`}>
            <li className="toolTip ml-3" title="Add Edit Additional phase">
              <AiOutlineAppstoreAdd size={20} />
            </li>
          </Link>
        </div>
      ),
    },
  ];
  const LinkTopaginationString = (page: any) => {
    const url = page.url.split("?")[1];
    const number = url.split("=")[1];
    IcoTokenPhaseListAction(
      10,
      parseInt(number),
      setHistory,
      setProcessing,
      setStillHistory,
      sortingInfo.column_name,
      sortingInfo.order_by,
      id
    );
  };
  useEffect(() => {
    IcoTokenPhaseListAction(
      10,
      1,
      setHistory,
      setProcessing,
      setStillHistory,
      sortingInfo.column_name,
      sortingInfo.order_by,
      id
    );
  }, []);
  return (
    <>
      <div className="page-wrap">
        <LaunchpadSidebar />
        <div className="page-main-content">
          <div className="container-fluid">
            <div className="section-top-wrap mb-25">
              <div className="profle-are-top">
                <h2 className="section-top-title">{t("Token Phase List")}</h2>
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
                    <DataTable columns={columns} data={history} />
                    <div
                      className="pagination-wrapper"
                      id="assetBalances_paginate"
                    >
                      <span>
                        {stillHistory?.links?.map((link: any, index: number) =>
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
                              onClick={() => LinkTopaginationString(link)}
                              key={index}
                            >
                              {link.label}
                            </a>
                          )
                        )}
                      </span>
                    </div>
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
  const { id, edit } = ctx.query;

  return {
    props: {
      id: id,
      edit: edit ? edit : null,
    },
  };
};
export default IcoTokenPhaseList;
