import type { NextPage } from "next";
import DashboardNavbar from "components/common/dashboardNavbar";
import { useEffect, useState } from "react";

import Loading from "components/common/loading";
import SelectCurrency from "components/exchange/selectCurrency";
import CurrencyLevel from "components/exchange/currencyLevel";
import DashboardBody from "components/exchange/DashboardBody";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "state/store";
import {
  initialDashboardCallAction,
  initialDashboardCallActionWithToken,
  listenMessages,
} from "state/actions/exchange";
import { setCurrentPair } from "state/reducer/exchange";
import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import { formatCurrency } from "common";
import Navbar from "components/common/Navbar";
import { useRouter } from "next/router";
import { EXCHANGE_LAYOUT_ONE } from "helpers/core-constants";

const Dashboard: NextPage = () => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLoading, setisLoading] = useState(true);
  const [ThemeColor, setThemeColor] = useState({
    green: "#32d777",
    red: "#d63031",
    redGreenUpDown: 1,
    chooseColor: 1,
  });
  const [layout, setLayout] = useState(EXCHANGE_LAYOUT_ONE);
  const { isLoggedIn, user } = useSelector((state: RootState) => state.user);
  const { dashboard, currentPair } = useSelector(
    (state: RootState) => state.exchange
  );

  useEffect(() => {
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
  }, [isLoggedIn, router?.query?.coin_pair]);
  useEffect(() => {
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
  }, [dashboard?.order_data?.base_coin_id]);
  useEffect(() => {
    const delay = 3000; // 3 seconds in milliseconds

    const timeoutId = setTimeout(() => {
      dashboard?.order_data?.base_coin_id &&
        dashboard?.order_data?.trade_coin_id &&
        listenMessages(dispatch, user);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [
    dashboard?.order_data?.base_coin_id,
    dashboard?.order_data?.trade_coin_id,
    currentPair,
  ]);
  const { settings } = useSelector((state: RootState) => state.common);

  return (
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
        <Navbar
          settings={settings}
          isLoggedIn={isLoggedIn}
          ThemeColor={ThemeColor}
          setThemeColor={setThemeColor}
          showSettings={true}
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
                      <h6 id="n_title" /> <p id="n_date" /> <p id="n_notice" />
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
                    <div className="cxchange-summary-wrap mt-3 w-full">
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
                                <SelectCurrency />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="col-md-10">
                          {dashboard?.last_price_data && <CurrencyLevel />}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-12 col-12">
                    <DashboardBody ThemeColor={ThemeColor} layout={layout} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
