import type { GetServerSideProps, NextPage } from "next";

import * as React from "react";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import {
  getUserCoinForSwapAction,
  getRateAction,
  swapCoinAction,
} from "state/actions/swap";
import { parseCookies } from "nookies";
import { getRateSsr } from "service/swap";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import SmallLoading from "components/common/smallLoading";
import Footer from "components/common/footer";
import { AiOutlineSwap, AiFillWallet } from "react-icons/ai";
import { toast } from "react-toastify";
const SwapCoin: NextPage = ({
  walletLists,
  wallet_rate,
  convert_rate,
  ssrRate,
  from_wallet,
  to_wallet,
  from_wallet_details,
  to_wallet_details,
}: any) => {
  const { t } = useTranslation("common");

  const [loading, setLoading] = React.useState(false);
  let tempfromSelected;
  let temptoSelected;
  const [fromSelected, setFromSelected] = React.useState<any>({
    amount: 0,
    selected: null,
    coin_id: null,
    balamce: 0,
  });
  const [toSelected, setToSelected] = React.useState<any>({
    amount: 0,
    selected: null,
    coin_id: null,
    balamce: 0,
  });
  const [rate, setRate] = React.useState<any>({
    wallet_rate: 0,
    convert_rate: 0,
    rate: 0,
    from_wallet: null,
    to_wallet: null,
  });
  const swapSelected = () => {
    // Swap 'fromSelected' and 'toSelected' directly without using temporary variables
    setFromSelected((prevFromSelected: any) => ({
      ...prevFromSelected,
      amount: toSelected.amount,
      selected: toSelected.selected,
      coin_id: toSelected.coin_id,
      balamce: toSelected.balamce,
    }));

    setToSelected((prevToSelected: any) => ({
      ...prevToSelected,
      amount: fromSelected.amount,
      selected: fromSelected.selected,
      coin_id: fromSelected.coin_id,
      balamce: fromSelected.balamce,
    }));
  };
  const convertCoin = async (amount: any, from_id: any, to_id: any) => {
    setLoading(true);
    const data = await getRateAction(from_id, to_id, amount, setRate);
    setLoading(false);
    return data;
  };

  React.useEffect(() => {
    setToSelected({
      ...toSelected,
      amount: rate.convert_rate,
    });
  }, [rate]);
  React.useEffect(() => {
    setFromSelected({
      amount: 1,
      selected: from_wallet_details?.coin_type,
      coin_id: from_wallet_details?.id,
      balamce: from_wallet_details?.balance,
    });
    setToSelected({
      amount: wallet_rate,
      selected: to_wallet_details?.coin_type,
      coin_id: to_wallet_details?.id,
      balamce: to_wallet_details?.balance,
    });
    setRate({
      wallet_rate: wallet_rate,
      convert_rate: convert_rate,
      rate: ssrRate,
      from_wallet: from_wallet,
      to_wallet: to_wallet,
    });
  }, []);

  return (
    <>
      <div className="page-wrap">
        <div className="page-left-sidebar">
          <div className="sidebar-top">
            <ul className="left-menu">
              <li>
                <Link href={`/user/my-wallet`}>
                  <div>
                    <AiFillWallet />
                    <a>{t("My wallet")}</a>
                  </div>
                </Link>
              </li>
              <li className="active">
                <Link href={`/user/swap-coin`}>
                  <div>
                    <AiOutlineSwap />
                    <a>{t("Swap Coin")}</a>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="page-main-content">
          <div className="container-fluid">
            <div className="section-top-wrap mb-25">
              <div className="overview-area">
                <div className="overview-left">
                  <h2 className="section-top-title">{t("Swap Coin")}</h2>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="section-wrapper">
                  <div className="swap-area">
                    <div className="swap-area-top">
                      <div className="form-group">
                        <div className="swap-wrap">
                          <div className="swap-wrap-top">
                            <label>{t("From")}</label>
                            <span className="available">
                              Available :{" "}
                              {parseFloat(fromSelected.balamce).toFixed(8)}{" "}
                              {fromSelected.selected}
                            </span>
                          </div>
                          <div className="swap-input-wrap">
                            <div className="form-amount">
                              <input
                                type="text"
                                className="form-control border-0"
                                id="amount-one"
                                value={fromSelected ? fromSelected.amount : ""}
                                placeholder={t("Please enter 10 -2400000")}
                                onChange={(e) => {
                                  if (Number(e.target.value) < 0) {
                                    return;
                                  }
                                  if (!e.target.value) {
                                    setFromSelected({
                                      ...fromSelected,
                                      amount: 0,
                                    });
                                    convertCoin(
                                      0,
                                      fromSelected.coin_id,
                                      toSelected.coin_id
                                    ).then((data) => {
                                      setToSelected({
                                        ...toSelected,
                                        coin_id: data?.to_wallet?.id,
                                        selected: data?.to_wallet?.coin_type,
                                        balamce: data?.to_wallet?.balance,
                                        amount: data?.convert_rate,
                                      });
                                    });
                                    return;
                                  }
                                  setFromSelected({
                                    ...fromSelected,
                                    amount: e.target.value,
                                  });
                                  convertCoin(
                                    e.target.value,
                                    fromSelected.coin_id,
                                    toSelected.coin_id
                                  ).then((data) => {
                                    setToSelected({
                                      ...toSelected,
                                      coin_id: data?.to_wallet?.id,
                                      selected: data?.to_wallet?.coin_type,
                                      balamce: data?.to_wallet?.balance,
                                      amount: data?.convert_rate,
                                    });
                                  });
                                }}
                              />
                            </div>
                            <div className="cp-select-area">
                              <select
                                className=" form-control border-0 swapSelect"
                                id="currency-one"
                                onChange={(e: any) => {
                                  setFromSelected({
                                    ...fromSelected,
                                    coin_id: e.target.value,
                                    selected: walletLists.find(
                                      (wallet: any) =>
                                        parseInt(wallet.id) ===
                                        parseInt(e.target.value)
                                    ).coin_type,
                                  });
                                  convertCoin(
                                    fromSelected.amount,
                                    e.target.value,
                                    toSelected.coin_id
                                  ).then((data) => {
                                    setToSelected({
                                      ...toSelected,
                                      coin_id: data?.to_wallet?.id,
                                      selected: data?.to_wallet?.coin_type,
                                      balamce: data?.to_wallet?.balance,
                                      amount: data?.convert_rate,
                                    });
                                  });
                                }}
                              >
                                <option value="" selected disabled hidden>
                                  {fromSelected.selected
                                    ? fromSelected.selected
                                    : "Select"}
                                </option>
                                {walletLists?.map(
                                  (item: any, index: number) => (
                                    <option
                                      key={index}
                                      value={item.id}
                                      selected={fromSelected.coin_id == item.id}
                                    >
                                      {item.coin_type}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="swap-button-area text-center">
                        <button
                          id="swap"
                          className="swap-button"
                          onClick={async () => {
                            setLoading(true);
                            await swapSelected();
                            await getRateAction(
                              toSelected.coin_id,
                              fromSelected.coin_id,
                              toSelected.amount,
                              setRate
                            );
                            setLoading(false);
                          }}
                        >
                          <i className="fa fa-refresh" />
                        </button>
                      </div>
                      <div className="form-group">
                        <div className="swap-wrap">
                          <div className="swap-wrap-top">
                            <label>{t("To")}</label>
                            <span className="available">
                              Available :{" "}
                              {parseFloat(toSelected.balamce).toFixed(8)}
                              {toSelected.selected}
                            </span>
                          </div>
                          <div className="swap-input-wrap">
                            <div className="form-amount">
                              <input
                                type="text"
                                className="form-control border-0"
                                id="amount-two"
                                value={toSelected.amount}
                                placeholder={t("Please enter 0 - 65")}
                                disabled
                              />
                            </div>
                            <div className="cp-select-area">
                              <select
                                className="form-control border-0 swapSelect"
                                id="currency-two"
                                onChange={(e) => {
                                  convertCoin(
                                    fromSelected.amount,
                                    fromSelected.coin_id,
                                    e.target.value
                                  ).then((data) => {
                                    setToSelected({
                                      ...toSelected,
                                      coin_id: data?.to_wallet?.id,
                                      selected: data?.to_wallet?.coin_type,
                                      balamce: data?.to_wallet?.balance,
                                      amount: data?.convert_rate,
                                    });
                                  });
                                }}
                              >
                                <option value="" selected disabled hidden>
                                  {toSelected.selected
                                    ? toSelected.selected
                                    : "Select"}
                                </option>
                                {walletLists?.map(
                                  (item: any, index: number) => (
                                    <option
                                      key={index}
                                      value={item.id}
                                      selected={toSelected.coin_id == item.id}
                                    >
                                      {item.coin_type}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {!loading ? (
                      <div className="swap-area-middle">
                        <ul>
                          <li>
                            <span>{t("Price")}</span>

                            <span id="rate">
                              1 {rate.from_wallet} ={" "}
                              {rate.rate ? rate.rate : "0"} {rate.to_wallet}
                            </span>
                          </li>
                          <li>
                            <span>{t("You will get")}</span>

                            <span className="spend">
                              {parseFloat(rate.convert_rate)} {rate.to_wallet}
                            </span>
                          </li>
                        </ul>
                      </div>
                    ) : (
                      <SmallLoading />
                    )}

                    <div className="swap-area-bottom">
                      <button
                        className="primary-btn-outline"
                        disabled={
                          !fromSelected.amount ||
                          !fromSelected.coin_id ||
                          !toSelected.amount ||
                          !toSelected.coin_id
                        }
                        data-toggle="modal"
                        data-target="#exampleModal"
                      >
                        {t("convert")}
                      </button>

                      <div
                        className="modal fade"
                        id="exampleModal"
                        role="dialog"
                        aria-labelledby="exampleModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="exampleModalLabel"
                              >
                                {t("Are You sure?")}
                              </h5>
                            </div>

                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                              >
                                {t("No")}
                              </button>
                              <button
                                type="button"
                                className="btn btn-success"
                                onClick={() => {
                                  swapCoinAction(
                                    fromSelected.amount,
                                    fromSelected.coin_id,
                                    toSelected.coin_id,
                                    setLoading
                                  );
                                }}
                                data-dismiss="modal"
                              >
                                {t("Yes")}
                              </button>
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
      </div>

      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/swap-history");
  const cookies = parseCookies(ctx);
  const walletLists = await getUserCoinForSwapAction(null, ctx);
  if (walletLists === false) {
    return {
      redirect: {
        destination: "/user/my-wallet",
        permanent: false,
      },
    };
  }
  let data;
  if (ctx.query.coin_id) {
    data = await getRateSsr(
      ctx.query.coin_id,
      walletLists[1].id,
      1,
      cookies.token
    );
  } else {
    data = await getRateSsr(
      walletLists[0].id,
      walletLists[1].id,
      1,
      cookies.token
    );
  }

  if (data.success === false) {
    return {
      redirect: {
        destination: "/user/my-wallet",
        permanent: false,
      },
    };
  }

  const { wallet_rate, convert_rate, rate, from_wallet, to_wallet } = data;

  return {
    props: {
      walletLists,
      convert_rate,
      ssrRate: rate,
      from_wallet: from_wallet?.coin_type,
      to_wallet: to_wallet?.coin_type,
      from_wallet_details: from_wallet,
      to_wallet_details: to_wallet,
      wallet_rate,
    },
  };
};

export default SwapCoin;
