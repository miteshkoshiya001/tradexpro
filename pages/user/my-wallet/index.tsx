import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import type { GetServerSideProps, NextPage } from "next";
import { toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { TiArrowRepeat } from "react-icons/ti";

import {
  HiOutlineBanknotes,
  HiOutlinePresentationChartLine,
} from "react-icons/hi2";

import {
  SearchObjectArrayFuesJS,
  WalletListApiAction,
} from "state/actions/wallet";
import Loading from "components/common/SectionLoading";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { TradeList } from "components/TradeList";
import { appDashboardDataWithoutPair } from "service/exchange";
import Footer from "components/common/footer";
import CustomDataTable from "components/Datatable";
import WalletOverviewSidebar from "layout/WalletOverviewSidebar";
import WalletOverviewHeader from "components/wallet-overview/WalletOverviewHeader";
const MyWallet: NextPage = () => {
  const { t } = useTranslation("common");
  const { settings } = useSelector((state: RootState) => state.common);
  const [search, setSearch] = useState<any>("");
  const [walletList, setWalletList] = useState<any>([]);
  const [selectedPerPage, setSelectedPerPage] = useState("15");
  const [Changeable, setChangeable] = useState<any[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const [allData, setAllData] = useState<any>();
  const [tradeList, setTradeList]: any = useState();
  const [coinList, setCoinList]: any = useState([]);
  const [selectedLimit, setSelectedLimit] = useState<any>("10");

  const columns = [
    {
      Header: t("Asset"),

      Cell: ({ row }: any) => (
        <div className="asset d-flex align-items-center gap-10">
          <div>
            <img
              className="asset-icon"
              src={row.original.coin_icon || "/bitcoin.png"}
              alt=""
              width={35}
              height={35}
            />
          </div>
          <div>
            <p className="asset-name">{row.original?.coin_type}</p>
            <p className="asset-name">{row.original?.name}</p>
          </div>
        </div>
      ),
    },

    {
      Header: t("On Order"),
      Cell: ({ row }: any) => (
        <div className="blance-text">
          <span
            className="blance market incree border-0 p-0"
            style={{ color: "#10c75c" }}
          >
            {row?.original?.on_order}
          </span>
          <span className="usd">
            ({settings?.currency_symbol}
            {parseFloat(row?.original?.on_order_usd).toFixed(8)})
          </span>
        </div>
      ),
    },
    {
      Header: t("Available Balance"),
      Cell: ({ row }: any) => (
        <div className="blance-text">
          <span className="blance">
            {parseFloat(row?.original?.balance).toFixed(8)}
          </span>
          <span className="usd">
            ({settings?.currency_symbol}
            {parseFloat(row?.original?.available_balance_usd).toFixed(8)})
          </span>
        </div>
      ),
    },
    {
      Header: t("Total Balance"),
      Cell: ({ row }: any) => (
        <div className="blance-text">
          <span className="blance">
            {/* @ts-ignore */}
            {parseFloat(
              // @ts-ignore
              Number(row?.original?.balance) + Number(row?.original?.on_order)
            ).toFixed(8)}
          </span>
          <span className="usd">
            ({settings?.currency_symbol}
            {parseFloat(row?.original?.total_balance_usd).toFixed(8)})
          </span>
        </div>
      ),
    },
    {
      Header: t("Action"),
      Cell: ({ row }: any) => (
        <div className="active-link">
          <ul>
            {row?.original.is_deposit === 1 && (
              <Link href={setDepositCryptoOrFiatUrl(row?.original)}>
                <li className="toolTip relative cursor-pointer" title="Deposit">
                  <HiOutlineBanknotes size={25} />
                </li>
              </Link>
            )}
            {row?.original.is_withdrawal === 1 && (
              <Link href={setWithdrawCryptoOrFiatUrl(row?.original)}>
                <li
                  className="toolTip relative cursor-pointer"
                  title="Withdraw"
                >
                  <IoWalletOutline size={25} />
                </li>
              </Link>
            )}

            <li
              className="toolTip trade-li cursor-pointer"
              title="Trade"
              onClick={() =>
                handleActive(tradeList ? null : row?.original?.id + 1)
              }
            >
              <HiOutlinePresentationChartLine size={25} />
              {tradeList === row?.original?.id + 1 && (
                <div className="trade-select">
                  <TradeList coinList={coinList.pairs} />
                </div>
              )}
            </li>
            {parseInt(settings?.swap_status) === 1 &&
              (Changeable.length >= 2 ? (
                <Link href={`/user/swap-coin?coin_id=${row?.original.id}`}>
                  <li className="toolTip relative cursor-pointer" title="swap">
                    <TiArrowRepeat size={25} />
                  </li>
                </Link>
              ) : (
                <li
                  className="toolTip relative cursor-pointer"
                  title="swap"
                  onClick={() => {
                    toast.error("Two coins are required to swap");
                  }}
                >
                  <TiArrowRepeat size={25} />
                </li>
              ))}
          </ul>
        </div>
      ),
    },
  ];

  const handleActive = (index: any) => {
    if (index === tradeList) {
      setTradeList(index);
    } else {
      setTradeList(index);
    }
  };

  const getWalletLists = async (url: string) => {
    const response: any = await WalletListApiAction(url, setProcessing);
    setWalletList(response?.wallets);
    setChangeable(response?.wallets?.data);
    setAllData(response);
  };

  const LinkTopaginationString = async (link: any) => {
    if (link.url === null) return;
    if (link.label === walletList.current_page.toString()) return;
    const splitLink = link.url.split("api");
    const response: any = await WalletListApiAction(
      splitLink[1] + "&per_page=" + selectedLimit + "&search=" + search,
      setProcessing
    );
    setWalletList(response?.wallets);
    setChangeable(response?.wallets?.data);
  };

  const coinListApi = async () => {
    const coinList = await appDashboardDataWithoutPair();
    setCoinList(coinList);
  };

  useEffect(() => {
    coinListApi();
    getWalletLists(
      `/wallet-list?page=1&per_page=${selectedLimit}&search=${search}`
    );
    return () => {
      setWalletList(null);
    };
  }, [search, selectedLimit]);

  const setDepositCryptoOrFiatUrl = (item: any) => {
    if (item.currency_type == 1) {
      return `/user/my-wallet/deposit?type=deposit&coin_id=${item.id}`;
    }
    return `/user/fiat/deposit?type=deposit&coin_id=${item.id}&currency=${item.coin_type}`;
  };
  const setWithdrawCryptoOrFiatUrl = (item: any) => {
    if (item.currency_type == 1) {
      return `/user/my-wallet/withdraw?type=withdraw&coin_id=${item.id}`;
    }
    return `/user/fiat/withdraw?type=withdraw&coin_id=${item.id}&currency=${item.coin_type}`;
  };
  return (
    <>
      {/* <div className="page-wrap">
        <div className="page-main-content container-fluid">
          <div className="section-top-wrap mb-25 inner-section-margin-top">
            <div className="overview-area">
              <div className="overview-left">
                <h2 className="section-top-title">{t("Overview")}</h2>
                <h4 className="blance-title">{t("Total balance")}</h4>
                <h4 className="blance">
                  {allData?.total ? parseFloat(allData?.total).toFixed(8) : 0}
                  {""} {settings?.currency}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="page-wrap">
        <WalletOverviewSidebar />
        <div className="page-main-content pt-0">
          <div className="container-fluid">
            <WalletOverviewHeader title={`Spot Wallet`} />
            <div className="row bg-card-primary-clr">
              <div className="col-md-12">
                <div className="">
                  <div
                    className="py-5"
                    style={{ borderBottom: "1px solid var(--border-color)" }}
                  >
                    <div>
                      <h6>Total Balance</h6>
                      <div className="pt-3">
                        <div>
                          <h3>
                            {allData?.total
                              ? parseFloat(allData?.total).toFixed(8)
                              : 0}
                            {""} {settings?.currency}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="asset-balances-area cstm-loader-area">
                    <div className="asset-balances-left">
                      <div className="section-wrapper px-0">
                        <div className="">
                          <CustomDataTable
                            columns={columns}
                            data={Changeable}
                            selectedLimit={selectedLimit}
                            setSelectedLimit={setSelectedLimit}
                            search={search}
                            setSearch={setSearch}
                            processing={processing}
                            verticalAlignData={`middle`}
                          />
                          <div
                            className="pagination-wrapper"
                            id="assetBalances_paginate"
                          >
                            <span>
                              {walletList?.links?.map(
                                (link: any, index: number) =>
                                  link.label === "&laquo; Previous" ? (
                                    <a
                                      className="paginate-button"
                                      onClick={() =>
                                        LinkTopaginationString(link)
                                      }
                                      key={index}
                                    >
                                      <i className="fa fa-angle-left"></i>
                                    </a>
                                  ) : link.label === "Next &raquo;" ? (
                                    <a
                                      className="paginate-button"
                                      onClick={() =>
                                        LinkTopaginationString(link)
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
                                        LinkTopaginationString(link)
                                      }
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
