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
import DemoTradeNavbar from "components/common/Navbar/DemoTradeNavbar";
import FaucetModal from "components/demo-trade/FaucetModal";
import request from "lib/request";
import { useIsDemotradeFeatureEnable } from "hooks/useIsDemotradeFeatureEnable";
import SectionLoading from "components/common/SectionLoading";
const MyWallet: NextPage = () => {
  const { t } = useTranslation("common");
  const { settings } = useSelector((state: RootState) => state.common);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  const [walletList, setWalletList] = useState<any>([]);
  const [selectedItemForFaucet, setSelectedItemForFaucet] = useState<any>({});
  const [Changeable, setChangeable] = useState<any[]>([]);
  const [processing, setProcessing] = useState<boolean>(false);
  const [allData, setAllData] = useState<any>();
  const isDemotradeEnable = useIsDemotradeFeatureEnable();
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
      splitLink[1] + "&per_page=15",
      setProcessing
    );
    setWalletList(response?.wallets);
    setChangeable(response?.wallets?.data);
  };

  useEffect(() => {
    if (!isDemotradeEnable) return;
    getWalletLists("/demo/wallet-list?page=1&per_page=15");
    return () => {
      setWalletList(null);
    };
  }, [isDemotradeEnable]);

  const faucetHandler = (item: any) => {
    setSelectedItemForFaucet(item);
    setIsModalOpen(true);
  };

  const addFaucetHandler = async (coin_type: any) => {
    const { data } = await request.post(`/demo/get-wallet-balance`, {
      coin_type: coin_type,
    });

    if (!data.success) {
      toast.error(data.message);
      setIsModalOpen(false);
      return;
    }
    toast.success(data.message);
    getWalletLists("/demo/wallet-list?page=1&per_page=15");
    setIsModalOpen(false);
  };
  if (!isDemotradeEnable) {
    return <SectionLoading />;
  }
  return (
    <>
      <DemoTradeNavbar settings={settings} isLoggedIn={isLoggedIn} />
      <div className="page-wrap" style={{ marginTop: "90px" }}>
        <div className="page-main-content container-fluid">
          <div className="section-top-wrap mb-25">
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
      </div>
      <div className="page-wrap">
        <div className="page-main-content">
          <div className="">
            <div className="asset-balances-area cstm-loader-area">
              <div className="asset-balances-left">
                <div className="section-wrapper ">
                  <div className="">
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
                              onChange={async (e) => {
                                await getWalletLists(
                                  "/wallet-list?page=1&per_page=" +
                                    e.target.value
                                );
                              }}
                            >
                              <option value="15">15</option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                            </select>
                          </label>
                        </div>
                        <div id="table_filter" className="dataTables_filter">
                          <label>
                            {t("Search")}:
                            <input
                              type="search"
                              className="data_table_input"
                              placeholder=""
                              aria-controls="table"
                              onChange={(e) =>
                                SearchObjectArrayFuesJS(
                                  walletList,
                                  setChangeable,
                                  e.target.value
                                )
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    {processing ? (
                      <Loading />
                    ) : (
                      <div className="table-responsive walletTableScroll">
                        <table
                          id="assetBalances"
                          className="table table-borderless secendary-table asset-balances-table"
                        >
                          <thead>
                            <tr>
                              <th scope="col">{t("Asset")}</th>
                              <th scope="col">{t("Symbol")}</th>
                              <th scope="col">{t("On Order")}</th>
                              <th scope="col">{t("Available Balance")}</th>
                              <th scope="col">{t("Total Balance")}</th>
                              <th scope="col">{t("Action")}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Changeable?.map((item: any, index: number) => (
                              <tr id="" key={index}>
                                <td>
                                  <div className="asset">
                                    <img
                                      className="asset-icon"
                                      src={item.coin_icon || "/bitcoin.png"}
                                      alt=""
                                    />
                                    <span className="asset-name">
                                      {item?.name}
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <span className="symbol">
                                    {item?.coin_type}
                                  </span>
                                </td>
                                <td>
                                  <div className="blance-text mt-2">
                                    <span className="blance market incree">
                                      {item?.on_order}
                                    </span>
                                    <span className="usd">
                                      ({settings?.currency_symbol}
                                      {parseFloat(item?.on_order_usd).toFixed(
                                        8
                                      )}
                                      )
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <div className="blance-text">
                                    <span className="blance">
                                      {parseFloat(item?.balance).toFixed(8)}
                                    </span>
                                    <span className="usd">
                                      ({settings?.currency_symbol}
                                      {parseFloat(
                                        item?.available_balance_usd
                                      ).toFixed(8)}
                                      )
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <div className="blance-text">
                                    <span className="blance">
                                      {/* @ts-ignore */}
                                      {parseFloat(
                                        // @ts-ignore
                                        Number(item?.balance) +
                                          Number(item?.on_order)
                                      ).toFixed(8)}
                                    </span>
                                    <span className="usd">
                                      ({settings?.currency_symbol}
                                      {parseFloat(
                                        item?.total_balance_usd
                                      ).toFixed(8)}
                                      )
                                    </span>
                                  </div>
                                </td>
                                <td>
                                  <span
                                    className="text-primary-color"
                                    onClick={() => faucetHandler(item)}
                                  >
                                    {t("Faucet")}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                    <div
                      className="pagination-wrapper"
                      id="assetBalances_paginate"
                    >
                      <span>
                        {walletList?.links?.map((link: any, index: number) =>
                          link.label === "&laquo; Previous" ? (
                            <a
                              className="paginate-button"
                              onClick={() => LinkTopaginationString(link)}
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <FaucetModal
          setIsModalOpen={setIsModalOpen}
          selectedItemForFaucet={selectedItemForFaucet}
          addFaucetHandler={addFaucetHandler}
        />
      )}
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "demo-trade/user/my-wallet");
  return {
    props: {},
  };
};

export default MyWallet;
