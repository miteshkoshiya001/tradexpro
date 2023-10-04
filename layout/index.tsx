import Navbar from "components/common/Navbar";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import {
  CommonLandingCustomSettings,
  commomSettings,
  customPage,
  landingPage,
} from "service/landing-page";
import ReactGA from "react-ga";
import { useEffect, useState } from "react";
import { GetUserInfoByTokenAction } from "state/actions/user";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { RootState } from "state/store";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import CookieAccept from "components/common/cookie-accept";
import Head from "next/head";
import {
  setCopyright_text,
  setCustomPageData,
  setLoading,
  setLogo,
  setOneNotification,
  setSocialData,
} from "state/reducer/user";
import { setSettings } from "state/reducer/common";
import Loading from "components/common/loading";
import { checkDarkMode, rootThemeCheck } from "helpers/functions";
async function listenMessages(dispatch: any) {
  //@ts-ignore
  window.Pusher = Pusher;
  //@ts-ignore
  window.Echo = new Echo({
    broadcaster: "pusher",
    key: "test",
    wsHost: process.env.NEXT_PUBLIC_HOST_SOCKET,
    wsPort: process.env.NEXT_PUBLIC_WSS_PORT
      ? process.env.NEXT_PUBLIC_WSS_PORT
      : 6006,
    wssPort: 443,
    forceTLS: false,
    cluster: "mt1",
    disableStats: true,
    enabledTransports: ["ws", "wss"],
  });
  //@ts-ignore
  window.Echo.channel(
    `usernotification_${localStorage.getItem("user_id")}`
  ).listen(".receive_notification", (e: any) => {
    //  dispatch(setChatico(e.data));
    dispatch(setOneNotification(e?.notification_details));
  });
}
let socketCall = 0;
const Index = ({ children }: any) => {
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [showterms, setShowTerms] = useState(false);
  const [metaData, setMetaData] = useState({
    app_title: "",
    copyright_text: "",
    exchange_url: "",
    favicon: "",
    login_logo: "",
    logo: "",
    maintenance_mode: "no",
  });
  const { isLoading, isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );
  const { settings } = useSelector((state: RootState) => state.common);

  const dispatch = useDispatch();
  const router = useRouter();
  const getCommonSettings = async () => {
    try {
      dispatch(setLoading(true));
      rootThemeCheck();
      const { data: CommonLanding } = await CommonLandingCustomSettings("en");

      dispatch(setLogo(CommonLanding?.common_settings.logo));
      localStorage.setItem("animateLogo", CommonLanding?.common_settings.logo);
      localStorage.setItem("animateEnable", CommonLanding?.common_settings.loading_animation);
      dispatch(setSettings(CommonLanding?.common_settings));
      dispatch(setCustomPageData(CommonLanding.custom_page_settings));
      dispatch(
        setCopyright_text(CommonLanding?.landing_settings?.copyright_text)
      );
      dispatch(setSocialData(CommonLanding.landing_settings.media_list));
      setMetaData(CommonLanding?.common_settings);
      checkDarkMode(CommonLanding?.common_settings, dispatch);
      ReactGA.initialize(
        CommonLanding?.common_settings?.google_analytics_tracking_id
      );
      ReactGA.pageview(window.location.pathname + window.location.search);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => {
    if (socketCall === 0) {
      listenMessages(dispatch);
    }
    socketCall = 1;
  });
  useEffect(() => {
    getCommonSettings();
  }, []);
  useEffect(() => {
    const path = router.pathname;
    if (
      path === "/signup" ||
      path === "/signin" ||
      path === "/exchange/dashboard" ||
      path === "/forgot-password" ||
      path === "/reset-password" ||
      path === "/g2f-verify" ||
      path === "/" ||
      path === "/verify-email" ||
      path === "user/notification" ||
      path === "/demo-trade" ||
      path === "/demo-trade/user/my-wallet"
    ) {
      setNavbarVisible(false);
    } else {
      setNavbarVisible(true);
    }
  }, [router.pathname]);
  const iUnderStand = () => {
    Cookies.set("terms", "yes");
    setShowTerms(false);
  };
  useEffect(() => {
    const token = Cookies.get("token");
    const terms = Cookies.get("terms");
    if (terms === "yes" && settings.cookie_status == "0") {
      setShowTerms(false);
    } else if (terms != "yes" && settings.cookie_status == "1") {
      setShowTerms(true);
    }
    if (token) {
      dispatch(GetUserInfoByTokenAction());
    }
  }, [isLoggedIn, settings.cookie_status]);
  return navbarVisible ? (
    <div>
      {isLoading && <Loading />}
      <Head>
        <title>{metaData?.app_title || process.env.NEXT_PUBLIC_APP_NAME}</title>
        <link
          rel="shortcut icon"
          href={metaData?.favicon || process.env.NEXT_PUBLIC_FAVICON}
        />
      </Head>
      <Navbar settings={settings} isLoggedIn={isLoggedIn} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="cp-user-main-wrapper">{children}</div>
      {showterms && <CookieAccept iUnderStand={iUnderStand} />}
    </div>
  ) : (
    <>
      <Head>
        <title>{metaData?.app_title || process.env.NEXT_PUBLIC_APP_NAME}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={settings?.seo_social_title} />
        <meta name="description" content={settings?.seo_meta_description} />
        <meta name="keywords" content={settings?.seo_meta_keywords} />
        <meta property="og:image" content={settings?.seo_image} />
        <link
          rel="shortcut icon"
          href={metaData?.favicon || process.env.NEXT_PUBLIC_FAVICON}
        />
      </Head>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div>{children}</div>
      {showterms && <CookieAccept iUnderStand={iUnderStand} />}
    </>
  );
};

export default Index;
