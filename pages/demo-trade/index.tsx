import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";

import Loading from "components/common/loading";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "state/store";
import {
  initialDashboardCallAction,
  initialDashboardCallActionWithToken,
  listenMessages,
} from "state/actions/demoExchange";
import { setCurrentPair } from "state/reducer/demoExchange";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { formatCurrency } from "common";
import Navbar from "components/common/Navbar";
import { useRouter } from "next/router";
import DemoSelectCurrency from "components/exchange/DemoSelectCurrency";
import DemoCurrencyLevel from "components/exchange/DemoCurrencyLevel";
import DemoDashboardBody from "components/exchange/DemoDashboardBody";
import { EXCHANGE_LAYOUT_ONE } from "helpers/core-constants";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import DemoTradeNavbar from "components/common/Navbar/DemoTradeNavbar";
import { useIsDemotradeFeatureEnable } from "hooks/useIsDemotradeFeatureEnable";
import SectionLoading from "components/common/SectionLoading";

const Dashboard: NextPage = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(true);
  const [layout, setLayout] = useState(EXCHANGE_LAYOUT_ONE);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
  const { settings } = useSelector((state: RootState) => state.common);

  const isDemotradeEnable = useIsDemotradeFeatureEnable();
  const { dashboard, currentPair } = useSelector(
    (state: RootState) => state.demoExchange
  );
  const [ThemeColor, setThemeColor] = useState({
    green: "#32d777",
    red: "#d63031",
    orderBookLayout: 1,
  });

  useEffect(() => {
    if (!isDemotradeEnable) {
      return;
    }
    // const pair = localStorage.getItem("current_pair");
    if (!router.isReady) return;

    if (router?.query?.coin_pair) {
      const pair_name = String(router?.query?.coin_pair);
      dispatch(setCurrentPair(pair_name));
      dispatch(
        initialDashboardCallAction(pair_name, dashboard, setisLoading, router)
      );
    } else {
      dispatch(
        initialDashboardCallAction(currentPair, dashboard, setisLoading, router)
      );
    }
  }, [isLoggedIn, router?.query?.coin_pair, isDemotradeEnable]);
  useEffect(() => {
    if (!isDemotradeEnable) {
      return;
    }
    if (
      dashboard?.order_data?.base_coin_id &&
      dashboard?.order_data?.trade_coin_id
    ) {
      dispatch(
        initialDashboardCallActionWithToken(
          currentPair,
          dashboard,
          setisLoading
        )
      );
    }
  }, [dashboard?.order_data?.base_coin_id, isDemotradeEnable]);
  useEffect(() => {
    if (!isDemotradeEnable) {
      return;
    }
    listenMessages(dispatch, user);
  }, [currentPair, isDemotradeEnable]);
  if (!isDemotradeEnable) {
    return <SectionLoading />;
  }
  return (
    <>
      <div className="container-dashboard">
        <div className="background-col">
          <Head>
            <title>
              {dashboard?.last_price_data?.length > 0
                ? formatCurrency(dashboard?.last_price_data[0]?.last_price)
                : 0.0}{" "}
              | {currentPair ? currentPair.replace("_", "") : "----"}
            </title>
          </Head>
          <DemoTradeNavbar
            settings={settings}
            isLoggedIn={isLoggedIn}
            ThemeColor={ThemeColor}
            setThemeColor={setThemeColor}
            showSettings={false}
            layout={layout}
            setLayout={setLayout}
          />
          {isLoading && <Loading />}
          <div className="mt-5"></div>
          <div className="cp-user-sidebar-area">
            <div
              className="scroll-wrapper cp-user-sidebar-menu scrollbar-inner"
              style={{ position: "relative" }}
            >
              <div
                className="cp-user-sidebar-menu scrollbar-inner scroll-content"
                style={{
                  height: "auto",
                  marginBottom: "0px",
                  marginRight: "0px",
                  maxHeight: "0px",
                }}
              ></div>
              <div className="scroll-element scroll-x">
                <div className="scroll-element_outer">
                  <div className="scroll-element_size" />
                  <div className="scroll-element_track" />
                  <div className="scroll-bar" />
                </div>
              </div>
              <div className="scroll-element scroll-y">
                <div className="scroll-element_outer">
                  <div className="scroll-element_size" />
                  <div className="scroll-element_track" />
                  <div className="scroll-bar" />
                </div>
              </div>
            </div>
          </div>
          <div
            id="notificationShow"
            tabIndex={-1}
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
            className="modal fade"
          >
            <div
              role="document"
              className="modal-dialog modal-lg modal-dialog-centered"
            >
              <div className="modal-content dark-modal">
                <div className="modal-header align-items-center">
                  <h5 id="exampleModalCenterTitle" className="modal-title">
                    {t("New Notifications")}
                  </h5>
                  <button
                    type="button"
                    data-dismiss="modal"
                    aria-label="Close"
                    className="close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="hm-form">
                    <div className="row">
                      <div className="col-12">
                        <h6 id="n_title" /> <p id="n_date" />{" "}
                        <p id="n_notice" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="cp-user-main-wrapper-dashboard">
            <div className="custom-container">
              <div
                role="alert"
                id="web_socket_notification"
                className="alert alert-success alert-dismissible fade show d-none"
              >
                <span id="socket_message" />
                <button
                  type="button"
                  data-dismiss="alert"
                  aria-label="Close"
                  className="close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div
                id="confirm-modal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
                className="modal fade"
              >
                <div
                  role="document"
                  className="modal-dialog modal-dialog-centered"
                >
                  <div className="modal-content">
                    <button
                      type="button"
                      data-dismiss="modal"
                      aria-label="Close"
                      className="close"
                    >
                      <img alt="" className="img-fluid" />
                    </button>
                    <div className="text-center">
                      <img
                        src="/add-pockaet-vector.svg"
                        alt=""
                        className="img-fluid img-vector"
                      />
                      <h3 id="confirm-title" />
                    </div>
                    <div className="modal-body">
                      <a
                        id="confirm-link"
                        className="btn btn-block cp-user-move-btn"
                      >
                        {t("Confirm")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="cp-user-custom-card exchange-area">
                <div id="dashboard">
                  <div className="row">
                    <div
                      className="col-xl-12 col-12 mt-4"
                      style={{ border: "1px solid rgb(126 126 126 / 20%)" }}
                    >
                      <div className="cxchange-summary-wrap mt-3">
                        <div className="row w-full">
                          <div className="col-md-2">
                            {currentPair && (
                              <div className="cxchange-summary-name">
                                <div className="summber-coin-type dropdown">
                                  <span
                                    className="coin-badge dropdown-toggle"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    {currentPair.replace(/_/g, "/")}
                                  </span>
                                  <DemoSelectCurrency />
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="col-md-10">
                            {dashboard?.last_price_data && (
                              <DemoCurrencyLevel />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-12 col-12">
                      <DemoDashboardBody
                        ThemeColor={ThemeColor}
                        layout={layout}
                      />
                    </div>
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
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "demo-trade");
  return {
    props: {},
  };
};
export default Dashboard;
