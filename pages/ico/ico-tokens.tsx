import type { GetServerSideProps, NextPage } from "next";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import useTranslation from "next-translate/useTranslation";
import Footer from "components/common/footer";
import { customPage, landingPage } from "service/landing-page";
import moment from "moment";
import LaunchpadSidebar from "layout/launchpad-sidebar";
import { useEffect, useState } from "react";
import { GetTokenListAction } from "state/actions/launchpad";
import Link from "next/link";
import DataTable from "react-data-table-component";
import { handleSwapHistorySearch } from "state/actions/reports";
import { MdCreateNewFolder } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { AiOutlineOrderedList } from "react-icons/ai";
import { toast } from "react-toastify";
import {
  STATUS_ACCEPTED,
  STATUS_MODIFICATION,
  STATUS_PENDING,
} from "helpers/core-constants";
import { BsFillChatFill } from "react-icons/bs";
import CustomDataTable from "components/Datatable";
const Profile: NextPage = ({}: any) => {
  const [history, setHistory] = useState<any>([]);
  const { t } = useTranslation("common");
  const [search, setSearch] = useState<any>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [selectedLimit, setSelectedLimit] = useState<any>("10");
  const [sortingInfo, setSortingInfo] = useState<any>({
    column_name: "created_at",
    order_by: "desc",
  });
  const [stillHistory, setStillHistory] = useState<any>([]);
  const columns = [
    {
      Header: t("Base Coin"),
      accessor: "base_coin",
    },
    {
      Header: t("Token Name"),
      accessor: "token_name",
    },

    {
      Header: t("Approved Status"),
      accessor: "approved_status",
      Cell: ({ cell }: any) => (
        <div>
          {cell.value === STATUS_PENDING ? (
            <span className="text-warning">{t("Pending")}</span>
          ) : cell.value === STATUS_ACCEPTED ? (
            <span className="text-success"> {t("Accepted")}</span>
          ) : cell.value === STATUS_MODIFICATION ? (
            <span className="text-warning"> {t("Modification request")}</span>
          ) : (
            <span className="text-danger">{t("Rejected")}</span>
          )}
        </div>
      ),
    },
    {
      Header: t("Date"),
      accessor: "created_at",
      Cell: ({ cell }: any) => moment(cell.value).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      Header: t("Wallet Address"),
      accessor: "wallet_address",
    },
    {
      Header: t("Actions"),
      Cell: ({ row }: any) => (
        <div className="blance-text flex flex-row">
          {row?.original?.approved_status === 1 ? (
            <Link href={`/ico/create-edit-phase/${row?.original?.id}`}>
              <li className="toolTip" title="Create Phase">
                <MdCreateNewFolder size={20} />
              </li>
            </Link>
          ) : (
            <li
              className="toolTip"
              title="Create Phase"
              onClick={() => {
                toast.warning(
                  t("Cannot create phase,Please wait for token approval!")
                );
              }}
            >
              <MdCreateNewFolder size={20} />
            </li>
          )}
          <Link href={`/chat/${row?.original?.id}`}>
            <li className="toolTip ml-2" title="Chat">
              <BsFillChatFill size={20} />
            </li>
          </Link>
          <Link href={`/ico/create-edit-token/${row?.original?.id}?edit=true`}>
            <li className="toolTip ml-2" title="Edit token">
              <IoCreateOutline size={20} />
            </li>
          </Link>
          <Link href={`/ico/token-phase-list/${row?.original?.id}`}>
            <li className="toolTip ml-2" title="Phase List">
              <AiOutlineOrderedList size={20} />
            </li>
          </Link>
        </div>
      ),
    },
  ];
  const LinkTopaginationString = (page: any) => {
    const url = page.url.split("?")[1];
    const number = url.split("=")[1];
    GetTokenListAction(
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
  useEffect(() => {
    GetTokenListAction(
      selectedLimit,
      1,
      setHistory,
      setProcessing,
      setStillHistory,
      sortingInfo.column_name,
      sortingInfo.order_by,
      search
    );
  }, [selectedLimit, search]);
  return (
    <>
      <div className="page-wrap">
        <LaunchpadSidebar />
        <div className="page-main-content">
          <div className="container-fluid">
            <div className="section-top-wrap mb-25 inner-section-margin-top">
              <div className="profle-are-top">
                <h2 className="section-top-title">{t("ICO Token")}</h2>
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
  return {
    props: {},
  };
};
export default Profile;
