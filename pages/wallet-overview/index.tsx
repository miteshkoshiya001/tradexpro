import type { GetServerSideProps, NextPage } from "next";
import { BiShapeCircle } from "react-icons/bi";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import useTranslation from "next-translate/useTranslation";
import Footer from "components/common/footer";
import { FaPeopleArrows } from "react-icons/fa";
import { AiOutlineUpload, AiOutlineDownload } from "react-icons/ai";
import moment from "moment";
import WalletOverviewSidebar from "layout/WalletOverviewSidebar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getWalletOverviewDataApi } from "service/wallet-overview";
import SectionLoading from "components/common/SectionLoading";
import WalletOverviewHeader from "components/wallet-overview/WalletOverviewHeader";
import { RootState } from "state/store";
import { useSelector } from "react-redux";
const WalletOverview: NextPage = () => {
  const { t } = useTranslation("common");
  const { settings } = useSelector((state: RootState) => state.common);

  const [coinType, setCoinType] = useState("");

  const [walletOverviewData, setWalletOverviewData] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getWalletOverviewData();
  }, [coinType]);

  const getWalletOverviewData = async () => {
    setLoading(true);
    const response = await getWalletOverviewDataApi(coinType);
    if (!response.success) {
      setLoading(false);
      return;
    }
    console.log("response", response);
    setWalletOverviewData(response.data);
    setLoading(false);
  };

  return (
    <>
      <div className="page-wrap">
        <WalletOverviewSidebar />
        <div className="page-main-content pt-0">
          <div className="container-fluid">
            <WalletOverviewHeader title={`Wallet Overview`} />
            {loading ? (
              <SectionLoading />
            ) : (
              Object.keys(walletOverviewData).length > 0 && (
                <div
                  className="row py-3"
                  style={{ background: "var(--card-background-color)" }}
                >
                  <div className="col-md-7">
                    <div
                      className="py-3"
                      style={{ borderBottom: "1px solid var(--border-color)" }}
                    >
                      <div>
                        <h6>Estimated Balance</h6>
                        <div className="pt-3 d-flex align-items-center gap-10">
                          <div
                            style={{
                              borderBottom: "2px dotted var(--border-color)",
                              display: "inline-block",
                            }}
                          >
                            <h3>
                              {`${walletOverviewData?.total ?? "0.00000000"} ${
                                walletOverviewData?.selected_coin ?? "NA"
                              } `}{" "}
                            </h3>
                          </div>
                          {walletOverviewData?.coins?.length > 0 && (
                            <div className="dropdown">
                              <button
                                className="dropdown-toggle wallet-overview-dropdown-btn"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              ></button>
                              <div
                                className="dropdown-menu shadow bg-main-clr"
                                style={{ minWidth: "4rem" }}
                                aria-labelledby="dropdownMenuButton"
                              >
                                {walletOverviewData?.coins.map(
                                  (item: any, index: any) => (
                                    <div
                                      className="dropdown-item px-1 cursor-pointer text-primary wallet-dropdown-item"
                                      key={index}
                                      onClick={() => setCoinType(item)}
                                    >
                                      {item}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                        <p>
                          {/* {settings?.currency_symbol} */}$
                          {`${
                            walletOverviewData?.total_usd
                              ? parseFloat(
                                  walletOverviewData?.total_usd
                                ).toFixed(2)
                              : "0.00"
                          }`}
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="py-3">
                        <h6>My Asstes</h6>
                      </div>
                      {/* <div className="my-3 d-flex align-items-center gap-10">
                    <div className="wallet-assets-btn wallet-assets-btn-active ">
                      Wallet View
                    </div>

                    <div className="wallet-assets-btn">Coin View</div>
                  </div> */}

                      <div className="my-3">
                        <table className="table table-hover wallet-overview-table">
                          <thead>
                            <tr>
                              <th className="p-2 border-0">Wallet</th>
                              <th className="p-2 border-0 text-right">
                                Amount
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="p-2 align-middle">
                                <Link href="/user/my-wallet">
                                  <div className="d-flex align-items-center gap-10 cursor-pointer">
                                    <BiShapeCircle size={18} />
                                    <span>{t("Spot")}</span>
                                  </div>
                                </Link>
                              </td>
                              <td className="p-2 text-right align-middle">
                                <div>
                                  <span className="d-block">
                                    {`${
                                      walletOverviewData?.spot_wallet
                                        ? parseFloat(
                                            walletOverviewData?.spot_wallet
                                          ).toFixed(8)
                                        : "0.0000000"
                                    } `}{" "}
                                    {`${
                                      walletOverviewData?.selected_coin ?? "NA"
                                    }`}
                                  </span>
                                  <small>
                                    {/* {settings?.currency_symbol} */}$
                                    {`${
                                      walletOverviewData?.spot_wallet_usd
                                        ? parseFloat(
                                            walletOverviewData?.spot_wallet_usd
                                          ).toFixed(2)
                                        : "0.00"
                                    }`}
                                  </small>
                                </div>
                              </td>
                            </tr>

                            {Number(settings?.enable_future_trade) === 1 && (
                              <tr>
                                <td className="p-2 align-middle">
                                  <Link href="/futures/wallet-list">
                                    <div className="d-flex align-items-center gap-10 cursor-pointer">
                                      <BiShapeCircle size={18} />
                                      <span>{t("Futures")}</span>
                                    </div>
                                  </Link>
                                </td>
                                <td className="p-2 text-right align-middle">
                                  <div>
                                    <span className="d-block">
                                      {`${
                                        walletOverviewData?.future_wallet
                                          ? parseFloat(
                                              walletOverviewData?.spot_wallet
                                            ).toFixed(8)
                                          : "0.0000000"
                                      } `}{" "}
                                      {`${
                                        walletOverviewData?.selected_coin ??
                                        "NA"
                                      }`}
                                    </span>
                                    <small>
                                      {/* {settings?.currency_symbol} */}$
                                      {`${
                                        walletOverviewData?.future_wallet_usd
                                          ? parseFloat(
                                              walletOverviewData?.future_wallet_usd
                                            ).toFixed(2)
                                          : "0.00"
                                      }`}
                                    </small>
                                  </div>
                                </td>
                              </tr>
                            )}
                            {parseInt(settings?.p2p_module) === 1 && (
                              <tr>
                                <td className="p-2 align-middle">
                                  <Link href="/p2p/p2p-wallet">
                                    <div className="d-flex align-items-center gap-10 cursor-pointer">
                                      <FaPeopleArrows size={18} />
                                      <span>{t("P2P")}</span>
                                    </div>
                                  </Link>
                                </td>
                                <td className="p-2 text-right align-middle">
                                  <div>
                                    <span className="d-block">
                                      {`${
                                        walletOverviewData?.p2p_wallet
                                          ? parseFloat(
                                              walletOverviewData?.p2p_wallet
                                            ).toFixed(8)
                                          : "0.0000000"
                                      } `}{" "}
                                      {`${
                                        walletOverviewData?.selected_coin ??
                                        "NA"
                                      }`}
                                    </span>
                                    <small>
                                      {/* {settings?.currency_symbol} */}$
                                      {`${
                                        walletOverviewData?.p2p_wallet_usd
                                          ? parseFloat(
                                              walletOverviewData?.p2p_wallet_usd
                                            ).toFixed(2)
                                          : "0.00"
                                      }`}
                                    </small>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="offset-md-1 col-md-4">
                    <div className="py-3">
                      <div style={{ overflow: "hidden", borderRadius: "10px" }}>
                        <img
                          className="w-full"
                          height={150}
                          src={`${walletOverviewData?.banner} `}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="py-3">
                      <div className="mt-3 mb-3 px-2 d-flex justify-content-between align-items-center gap-10">
                        <h6>Recent Transactions</h6>
                        <Link href="/user/transaction-history">
                          <div className="text-12 bg-main-clr py-1 px-3 rounded cursor-pointer">
                            <span>{t("View All")}</span>
                          </div>
                        </Link>
                      </div>
                      <div>
                        <table className="table">
                          <thead></thead>
                          <tbody>
                            {/* for withdraw */}
                            {walletOverviewData?.withdraw?.length > 0 &&
                              walletOverviewData?.withdraw.map(
                                (item: any, index: any) => (
                                  <tr key={index}>
                                    <td className="p-2 align-middle">
                                      <div className="d-flex gap-10 align-items-center">
                                        <div
                                          className="d-flex justify-content-center align-items-center bg-main-clr rounded"
                                          style={{
                                            width: "36px",
                                            height: "36px",
                                          }}
                                        >
                                          <AiOutlineUpload size={16} />
                                        </div>
                                        <div>
                                          <span className="d-block">
                                            Withdraw
                                          </span>
                                          <small>
                                            {moment(item.created_at).format(
                                              "YYYY-MM-DD  hh:mm:ss"
                                            )}
                                          </small>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-2 text-right align-middle">
                                      <div>
                                        <span className="d-block">
                                          -{parseFloat(item?.amount).toFixed(8)}{" "}
                                          {item?.coin_type}
                                        </span>
                                        <small>
                                          <span
                                            style={{
                                              display: "inline-block",
                                              width: "5px",
                                              height: "5px",
                                              background: "green",
                                              borderRadius: "50%",
                                              marginBottom: "1px",
                                            }}
                                          ></span>{" "}
                                          Completed
                                        </small>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              )}
                            {/* for deposit */}
                            {walletOverviewData?.deposit?.length > 0 &&
                              walletOverviewData?.deposit.map(
                                (item: any, index: any) => (
                                  <tr key={index}>
                                    <td className="p-2 align-middle">
                                      <div className="d-flex gap-10 align-items-center">
                                        <div
                                          className="d-flex justify-content-center align-items-center bg-main-clr rounded"
                                          style={{
                                            width: "36px",
                                            height: "36px",
                                          }}
                                        >
                                          <AiOutlineDownload size={16} />
                                        </div>
                                        <div>
                                          <span className="d-block">
                                            Deposit
                                          </span>
                                          <small>
                                            {moment(item.created_at).format(
                                              "YYYY-MM-DD  hh:mm:ss"
                                            )}
                                          </small>
                                        </div>
                                      </div>
                                    </td>
                                    <td className="p-2 text-right align-middle">
                                      <div>
                                        <span className="d-block">
                                          +{parseFloat(item?.amount).toFixed(8)}{" "}
                                          {item?.coin_type}
                                        </span>
                                        <small>
                                          <span
                                            style={{
                                              display: "inline-block",
                                              width: "5px",
                                              height: "5px",
                                              background: "green",
                                              borderRadius: "50%",
                                              marginBottom: "1px",
                                            }}
                                          ></span>{" "}
                                          Completed
                                        </small>
                                      </div>
                                    </td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/wallet-overview");

  return {
    props: {},
  };
};

export default WalletOverview;
