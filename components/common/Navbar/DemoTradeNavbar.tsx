import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BsBarChartLine, BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { BiLineChart, BiShapeCircle } from "react-icons/bi";
import { BiMoney } from "react-icons/bi";
import { FaPeopleArrows, FaQq, FaTradeFederation } from "react-icons/fa";
import { BiNetworkChart } from "react-icons/bi";
import { RiLuggageDepositLine, RiUserSettingsLine } from "react-icons/ri";
import { IoCardSharp, IoLanguageSharp } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { HiOutlineDocumentReport } from "react-icons/hi";

import { BiWalletAlt } from "react-icons/bi";
import { RiCalendarEventLine } from "react-icons/ri";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "state/store";
import { notification, notificationSeen } from "service/notification";
import useTranslation from "next-translate/useTranslation";
import OutsideClickHandler from "react-outside-click-handler";
import UnAuthNav from "../unAuthNav";
import {
  checkDashboardThemeSettings,
  checkThemeState,
  darkModeToggle,
} from "helpers/functions";
import NotificationDropdown from "./notification-dropdown";
import { setNotificationData } from "state/reducer/user";
import { IoMdGlobe } from "react-icons/io";
import {
  REFERRAL_TYPE_DEPOSIT,
  REFERRAL_TYPE_TRADE,
} from "helpers/core-constants";
import { MdOutlineSwapHorizontalCircle, MdTransform } from "react-icons/md";
import { GiBuyCard, GiSellCard, GiTrade } from "react-icons/gi";
import { GoStop } from "react-icons/go";
import { AiFillGift, AiOutlineClose, AiOutlineDeliveredProcedure } from "react-icons/ai";
import DemoNotificationDropdown from "./DemoNotificationDropdown";

const DemoTradeNavbar = ({
  settings,
  isLoggedIn,
  ThemeColor,
  setThemeColor,
  showSettings = false,
  layout,
  setLayout,
}: any) => {
  const { isLoading, user, logo, notificationData } = useSelector(
    (state: RootState) => state.user
  );
  const [theme, setTheme] = useState(0);
  const dispatch = useDispatch();
  const { navbar } = settings;
  const { t } = useTranslation("common");
  const [active, setActive] = useState(false);
  const [languageActive, setLanguageActive] = useState(false);
  const router = useRouter();
  const getNotifications = async () => {
    const data = await notification();
    dispatch(setNotificationData(data.data.data));
  };
  useEffect(() => {
    showSettings &&
      checkDashboardThemeSettings(setThemeColor, ThemeColor, setLayout);
  }, []);
  const seen = async () => {
    let arr: any = [];

    notificationData.map((notification: any) => {
      arr.push(notification.id);
    });
    notificationSeen(arr).then((data: any) => {
      dispatch(setNotificationData([]));
    });
  };
  useEffect(() => {
    checkThemeState(setTheme, dispatch);
    isLoggedIn && getNotifications();
  }, [isLoggedIn]);
  useEffect(() => {
    if (router.locale === "ar") {
      document.body.classList.add("rtl-style");
    } else {
      document.body.classList.remove("rtl-style");
    }
  }, [router.locale]);

  return (
    <>
      {isLoggedIn && (
        <>
          <div className="cp-user-top-bar position-fixed">
            <div className="container-fluid">
              <div className="d-flex align-items-center justify-content-between">
                <div
                  className="d-flex align-items-center"
                  style={{ gap: "20px" }}
                >
                  <div className="cp-user-logo">
                    <Link href="/">
                      <a href="">
                        <img
                          src={logo || ""}
                          className="img-fluid cp-user-logo-large"
                          alt=""
                        />
                      </a>
                    </Link>
                  </div>

                  <nav className="main-menu">
                    <ul>
                      <Link
                        href={isLoggedIn === true ? "/demo-trade" : "/signin"}
                      >
                        <li
                          className={
                            router.pathname == "/demo-trade"
                              ? "cp-user-active-page"
                              : ""
                          }
                        >
                          <a href="#">
                            <span className="cp-user-icon">
                              <BiWalletAlt />
                            </span>
                            <span className="cp-user-name">
                              {t("Exchange")}
                            </span>
                          </a>
                        </li>
                      </Link>

                      <Link
                        href={
                          isLoggedIn === true
                            ? "/demo-trade/user/my-wallet"
                            : "/signin"
                        }
                      >
                        <li
                          className={
                            router.pathname == "/demo-trade/user/my-wallet"
                              ? "cp-user-active-page"
                              : router.pathname == "/demo-trade/user/swap-coin"
                              ? "cp-user-active-page"
                              : ""
                          }
                        >
                          <a href="">
                            <span className="cp-user-icon">
                              <BiWalletAlt />
                            </span>
                            <span className="cp-user-name">
                              {navbar?.wallet?.name
                                ? navbar?.wallet?.name
                                : t("Wallet")}
                            </span>
                          </a>
                        </li>
                      </Link>
                    </ul>
                  </nav>
                </div>

                <DemoNotificationDropdown
                  isLoggedIn={isLoggedIn}
                  notificationData={notificationData}
                  seen={seen}
                  user={user}
                  theme={theme}
                  settings={settings}
                  setTheme={setTheme}
                  setActive={setActive}
                  active={active}
                  showSettings={showSettings}
                  setThemeColor={setThemeColor}
                  ThemeColor={ThemeColor}
                  layout={layout}
                  setLayout={setLayout}
                  setLanguageActive={setLanguageActive}
                />
              </div>
            </div>
          </div>
          <OutsideClickHandler onOutsideClick={() => setActive(false)}>
            <div className={`cp-user-sidebar w-full ${active ? "active" : ""}`}>
              <div className="cp-user-sidebar-menu cp-user-sidebar-menu-mobile scrollbar-inner">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <div className="navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                      <li className="text-right">
                        <span onClick={() => setActive(false)}>
                          <AiOutlineClose size={20} />
                        </span>
                      </li>

                      <Link
                        href={isLoggedIn === true ? "/demo-trade" : "/signin"}
                      >
                        <li
                          className={
                            router.pathname == "/demo-trade"
                              ? "active-navbar nav-item"
                              : "nav-item"
                          }
                        >
                          <a
                            href="#"
                            className="nav-link text-primary-color-two"
                            onClick={() => setActive(false)}
                          >
                            <div className="d-flex align-items-center gap-5">
                              <span>
                                <BsBarChartLine />
                              </span>
                              <span className="line-h-19">{t("Exchange")}</span>
                            </div>
                          </a>
                        </li>
                      </Link>
                      <Link
                        href={
                          isLoggedIn === true
                            ? "/demo-trade/user/my-wallet"
                            : "/signin"
                        }
                      >
                        <li
                          className={
                            router.pathname == "/demo-trade/user/my-wallet"
                              ? "active-navbar nav-item"
                              : "nav-item"
                          }
                        >
                          <a
                            href="#"
                            className="nav-link text-primary-color-two"
                            onClick={() => setActive(false)}
                          >
                            <div className="d-flex align-items-center gap-5">
                              <span>
                                <BiWalletAlt />
                              </span>
                              <span className="line-h-19">{t("Wallet")}</span>
                            </div>
                          </a>
                        </li>
                      </Link>
                      <Link
                        href={
                          isLoggedIn === true
                            ? "/exchange/dashboard"
                            : "/signin"
                        }
                      >
                        <li className={"nav-item"}>
                          <a
                            href="#"
                            className="nav-link text-primary-color-two"
                            onClick={() => setActive(false)}
                          >
                            <div className="d-flex align-items-center gap-5">
                              <span>
                                <AiOutlineDeliveredProcedure />
                              </span>
                              <span className="line-h-19"> {t("Back To Live")}</span>
                            </div>
                           
                          </a>
                        </li>
                      </Link>
                      <li>
                        <div className="d-flex gap-10 align-items-center justify-content-between py-3">
                          <div className="d-flex align-items-center gap-5">
                            <span>
                              <FiSettings size={16} />
                            </span>
                            <p className="text-16 text-primary-color-two line-h-19">
                              Theme
                            </p>
                          </div>
                          <label className="gift-card-buy-switch mb-0">
                            <input
                              type="checkbox"
                              onClick={() => {
                                darkModeToggle(settings, setTheme, dispatch);
                              }}
                              checked={theme === 0}
                            />
                            <span className="gift-card-buy-slider gift-card-buy"></span>
                          </label>
                        </div>
                      </li>
                      <li className={"nav-item"}>
                        <div className="d-flex gap-5 align-items-center py-3">
                          <span
                            className=""
                            onClick={() => {
                              setLanguageActive(true);
                              setActive(false);
                            }}
                          >
                            <IoMdGlobe size={20} />
                          </span>
                          <span
                            className="text-primary-color-two text-16"
                            style={{ lineHeight: "19px" }}
                            onClick={() => {
                              setLanguageActive(true);
                              setActive(false);
                            }}
                          >
                            {
                              settings?.LanguageList?.find(
                                (item: any) => item.key === router.locale
                              ).name
                            }
                          </span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </OutsideClickHandler>
          {languageActive && (
            <div
              className={`cp-user-sidebar w-full ${
                languageActive ? "active" : ""
              }`}
            >
              <div className="cp-user-sidebar-menu cp-user-sidebar-menu-mobile scrollbar-inner">
                <nav className="navbar navbar-expand-lg navbar-light">
                  <div className="navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                      <li className="text-right">
                        <span onClick={() => setLanguageActive(false)}>
                          <AiOutlineClose size={20} />
                        </span>
                      </li>
                      {settings?.LanguageList?.map((item: any, index: any) => (
                        <li
                          className={
                            item.key === router.locale
                              ? "active-navbar nav-item"
                              : "nav-item"
                          }
                          key={index}
                          onClick={() => setLanguageActive(false)}
                        >
                          <Link href={router.asPath} locale={item.key}>
                            <a className="nav-link text-primary-color-two">
                              {item.name}
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default DemoTradeNavbar;
