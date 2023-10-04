import type { GetServerSideProps, NextPage } from "next";
import Slider from "react-slick";
import Link from "next/link";
import {
  landingPage,
  customPage,
  commomSettings,
  landingPageSlug,
} from "service/landing-page";
import useTranslation from "next-translate/useTranslation";
import Navbar from "components/common/Navbar";
import { GetUserInfoByTokenServer } from "service/user";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Footer from "components/common/footer";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { SEO } from "components/SEO";
import UnAuthNav from "components/common/unAuthNav";
const Home: NextPage = ({
  landing,
  bannerListdata,
  announcementListdata,
  featureListdata,
  asset_coin_pairs,
  hourly_coin_pairs,
  latest_coin_pairs,
  loggedin,
  landing_banner_image,
  customSettings,
}: any) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const { logo } = useSelector((state: RootState) => state.user);
  const { settings: common } = useSelector((state: RootState) => state.common);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    //@ts-ignore
    window.$crisp = [];
    //@ts-ignore
    // window.CRISP_WEBSITE_ID = process.env.NEXT_PUBLIC_CRISP_ID;
    window.CRISP_WEBSITE_ID = common.live_chat_key;
    // live_chat_key
    (function () {
      //@ts-ignore
      if (common.live_chat_status == "1") {
        var d = document;
        var s = d.createElement("script");
        s.src = "https://client.crisp.chat/l.js";
        //@ts-ignore
        s.async = 1;
        d.getElementsByTagName("head")[0].appendChild(s);
      }
    })();
  }, [common.live_chat_status]);

  return (
    <SEO seoData={customSettings}>
      <div>
        <div>
          {loggedin ? <Navbar /> : <UnAuthNav  />}
          {landing?.page_builder_landing === true ? (
            <div className="custom-page-container container">
              <div
                dangerouslySetInnerHTML={{
                  // __html: clean(details.description),
                  __html: landing?.page_builder_landing_data,
                }}
              ></div>
            </div>
          ) : (
            <>
              {parseInt(landing?.landing_first_section_status) === 1 && (
                <section className="hero-banner-area">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-6">
                        <h1 className="banner-title">
                          {landing?.landing_title ||
                            t("Buy & Sell Instantly And Hold Cryptocurrency")}
                        </h1>
                        <p className="banner-content">
                          {landing?.landing_description ||
                            t(
                              "Tradexpro exchange is such a marketplace where people can trade directly with each other"
                            )}
                        </p>
                        {!loggedin && (
                          <a
                            href={
                              router.locale !== "en"
                                ? `/${router.locale}/signup`
                                : "/signup"
                            }
                            className="primary-btn"
                          >
                            {t("Register Now")}
                          </a>
                        )}
                      </div>
                      <div className="col-md-6 ">
                        <img
                          src={
                            landing_banner_image ||
                            "/undraw_crypto_flowers_re_dyqo.svg.svg"
                          }
                        />
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {bannerListdata.length > 0 &&
                parseInt(landing?.landing_second_section_status) === 1 && (
                  <section className="about-area">
                    <div className="container">
                      <Slider {...settings}>
                        {bannerListdata?.map((item: any, index: number) => (
                          <div className="single-banner" key={index}>
                            <Link href={`/banner/${item.slug}`}>
                              <img
                                src={item.image}
                                alt="about-image-phone"
                                className="slider-image-class"
                              />
                            </Link>
                          </div>
                        ))}
                      </Slider>
                      <div className="about-info">
                        {announcementListdata?.map(
                          (item: any, index: number) => (
                            <div className="single-info" key={index}>
                              <p>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  className="mirror css-1w66k1s"
                                >
                                  <path
                                    d="M12.867 18.47l5.13-.94L15.517 4l-5.18.95-3.25 3.94-4.85.89.5 2.71-1.97.36.36 1.97 1.97-.36.44 2.42 1.97-.36.79 4.28 1.97-.36-.79-4.28.98-.18 4.41 2.49zm-5.76-4.28l-1.97.36-.58-3.17 3.61-.66 3.25-3.92 2.5-.46 1.76 9.59-2.46.45-4.4-2.51-1.71.32zM22.871 8.792l-2.99.55.362 1.967 2.99-.55-.362-1.967zM19.937 13.183l-1.135 1.647 2.503 1.725 1.135-1.646-2.503-1.726zM19.006 4.052l-1.725 2.503 1.646 1.135 1.726-2.503-1.647-1.135z"
                                    fill="currentColor"
                                  />
                                </svg>
                                {item.title}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </section>
                )}
              {parseInt(landing.landing_third_section_status) === 1 && (
                <section className="market-trend-area">
                  <div className="container">
                    <div className="section-title">
                      <h2 className="title">
                        {landing?.market_trend_title || t("Market Trend")}
                      </h2>
                    </div>
                    <div className="exchange-tab-menu">
                      <ul
                        className="nav nav-tabs"
                        id="exchangeTab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <a
                            className="nav-link active"
                            id="CoreAssets-tab"
                            data-toggle="tab"
                            href="#CoreAssets"
                            role="tab"
                            aria-controls="CoreAssets"
                            aria-selected="true"
                          >
                            {t("Core Assets")}
                          </a>
                        </li>
                        <li className="nav-item" role="presentation">
                          <a
                            className="nav-link"
                            id="Gainers-tab"
                            data-toggle="tab"
                            href="#Gainers"
                            role="tab"
                            aria-controls="Gainers"
                            aria-selected="false"
                          >
                            {t("24H Gainers")}
                          </a>
                        </li>
                        <li className="nav-item" role="presentation">
                          <a
                            className="nav-link"
                            id="Listings-tab"
                            data-toggle="tab"
                            href="#Listings"
                            role="tab"
                            aria-controls="Listings"
                            aria-selected="false"
                          >
                            {t("New Listings")}
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="tab-content" id="exchangeTabContent">
                      <div
                        className="tab-pane fade show active"
                        id="CoreAssets"
                        role="tabpanel"
                        aria-labelledby="CoreAssets-tab"
                      >
                        <div className="exchange-volume-table">
                          <div className="table-responsive">
                            <div
                              id="DataTables_Table_0_wrapper"
                              className="dataTables_wrapper no-footer"
                            >
                              <table
                                className="table table-borderless dataTable no-footer"
                                id="DataTables_Table_0"
                                role="grid"
                                aria-describedby="DataTables_Table_0_info"
                              >
                                <thead>
                                  <tr role="row">
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "137.516px" }}
                                    >
                                      {t("Market")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "81.2812px" }}
                                    >
                                      {t("Price")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "193.797px" }}
                                    >
                                      {t("Change (24h)")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "182.297px" }}
                                    >
                                      {t("Chart")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "207.766px" }}
                                    >
                                      {t("Volume")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "127.344px" }}
                                    >
                                      {t("Actions")}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {asset_coin_pairs?.map(
                                    (item: any, index: number) => (
                                      <tr
                                        role="row"
                                        className="odd"
                                        key={index}
                                      >
                                        <td className="d-flex">
                                          <img
                                            className="icon mr-3"
                                            src={
                                              item?.coin_icon || "/bitcoin.png"
                                            }
                                            alt="coin"
                                            width="25px"
                                            height="25px"
                                          />
                                          <a className="cellMarket" href="#">
                                            <div className="marketSymbols">
                                              <span className="quoteSymbol">
                                                {item?.child_coin_name}
                                              </span>
                                              <span className="baseSymbol">
                                                /{item?.parent_coin_name}
                                              </span>
                                            </div>
                                          </a>
                                        </td>
                                        <td className="text-black">
                                          {item.last_price}
                                        </td>
                                        <td>
                                          <span
                                            className={`changePos  ${
                                              parseFloat(item.price_change) >= 0
                                                ? "text-success"
                                                : "text-danger"
                                            } `}
                                          >
                                            {item.price_change}%
                                          </span>
                                        </td>
                                        <td>
                                          {item.price_change >= 0 ? (
                                            <img
                                              src="/chart-image-1.png"
                                              alt="chart-image"
                                            />
                                          ) : (
                                            <img
                                              src="/chart-image-2.png"
                                              alt="chart-image"
                                            />
                                          )}
                                        </td>
                                        <td className="text-black">
                                          {item.volume} {item.parent_coin_name}
                                        </td>
                                        <td
                                          onClick={async () => {
                                            await localStorage.setItem(
                                              "base_coin_id",
                                              item?.parent_coin_id
                                            );
                                            await localStorage.setItem(
                                              "trade_coin_id",
                                              item?.child_coin_id
                                            );
                                            await localStorage.setItem(
                                              "current_pair",
                                              item?.child_coin_name +
                                                "_" +
                                                item?.parent_coin_name
                                            );
                                          }}
                                        >
                                          <a
                                            href={
                                              router.locale !== "en"
                                                ? `/${router.locale}/exchange/dashboard`
                                                : "/exchange/dashboard"
                                            }
                                            className="btnTrade btn-link"
                                          >
                                            {t("Trade")}
                                          </a>
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
                      <div
                        className="tab-pane fade"
                        id="Gainers"
                        role="tabpanel"
                        aria-labelledby="Gainers-tab"
                      >
                        <div className="exchange-volume-table">
                          <div className="table-responsive">
                            <div
                              id="DataTables_Table_1_wrapper"
                              className="dataTables_wrapper no-footer"
                            >
                              <table
                                className="table table-borderless dataTable no-footer"
                                id="DataTables_Table_1"
                                role="grid"
                                aria-describedby="DataTables_Table_1_info"
                              >
                                <thead>
                                  <tr role="row">
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "0px" }}
                                    >
                                      {t("Market")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "0px" }}
                                    >
                                      {t("Price")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "0px" }}
                                    >
                                      {t("Change (24h)")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "0px" }}
                                    >
                                      {t("Chart")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "0px" }}
                                    >
                                      {t("Volume")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "0px" }}
                                    >
                                      {t("Actions")}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {hourly_coin_pairs?.map(
                                    (item: any, index: number) => (
                                      <tr
                                        role="row"
                                        className="odd"
                                        key={index}
                                      >
                                        <td className="d-flex">
                                          <img
                                            className="icon mr-3"
                                            src={
                                              item?.coin_icon || "/bitcoin.png"
                                            }
                                            alt="coin"
                                            width="25px"
                                            height="25px"
                                          />
                                          <a className="cellMarket" href="#">
                                            <div className="marketSymbols">
                                              <span className="quoteSymbol">
                                                {item?.child_coin_name}
                                              </span>
                                              <span className="baseSymbol">
                                                /{item?.parent_coin_name}
                                              </span>
                                            </div>
                                          </a>
                                        </td>
                                        <td className="text-black">
                                          {item.last_price}
                                        </td>
                                        <td>
                                          <span
                                            className={`changePos  ${
                                              parseFloat(item.price_change) >= 0
                                                ? "text-success"
                                                : "text-danger"
                                            } `}
                                          >
                                            {item.price_change}%
                                          </span>
                                        </td>
                                        <td>
                                          {item.price_change >= 0 ? (
                                            <img
                                              src="/chart-image-1.png"
                                              alt="chart-image"
                                            />
                                          ) : (
                                            <img
                                              src="/chart-image-2.png"
                                              alt="chart-image"
                                            />
                                          )}
                                        </td>
                                        <td className="text-black">
                                          {item.volume} {item.parent_coin_name}
                                        </td>
                                        <td
                                          onClick={async () => {
                                            await localStorage.setItem(
                                              "base_coin_id",
                                              item?.parent_coin_id
                                            );
                                            await localStorage.setItem(
                                              "trade_coin_id",
                                              item?.child_coin_id
                                            );
                                            await localStorage.setItem(
                                              "current_pair",
                                              item?.child_coin_name +
                                                "_" +
                                                item?.parent_coin_name
                                            );
                                          }}
                                        >
                                          <a
                                            href="/exchange/dashboard"
                                            className="btnTrade btn-link"
                                          >
                                            {t("Trade")}
                                          </a>
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
                      <div
                        className="tab-pane fade"
                        id="Listings"
                        role="tabpanel"
                        aria-labelledby="Listings-tab"
                      >
                        <div className="exchange-volume-table">
                          <div className="table-responsive">
                            <div
                              id="DataTables_Table_2_wrapper"
                              className="dataTables_wrapper no-footer"
                            >
                              <table
                                className="table table-borderless dataTable no-footer"
                                id="DataTables_Table_2"
                                role="grid"
                                aria-describedby="DataTables_Table_2_info"
                              >
                                <thead>
                                  <tr role="row">
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "0px" }}
                                    >
                                      {t("Market")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "0px" }}
                                    >
                                      {t("Price")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "0px" }}
                                    >
                                      {t("Change (24h)")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "0px" }}
                                    >
                                      {t("Chart")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "0px" }}
                                    >
                                      {t("Volume")}
                                    </th>
                                    <th
                                      scope="col"
                                      className="sorting_disabled"
                                      rowSpan={1}
                                      colSpan={1}
                                      style={{ width: "0px" }}
                                    >
                                      {t("Actions")}
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {latest_coin_pairs?.map(
                                    (item: any, index: number) => (
                                      <tr
                                        role="row"
                                        className="odd"
                                        key={index}
                                      >
                                        <td className="d-flex">
                                          <img
                                            className="icon mr-3"
                                            src={
                                              item?.coin_icon || "/bitcoin.png"
                                            }
                                            alt="coin"
                                            width="25px"
                                            height="25px"
                                          />
                                          <a className="cellMarket" href="#">
                                            <div className="marketSymbols">
                                              <span className="quoteSymbol">
                                                {item?.child_coin_name}
                                              </span>
                                              <span className="baseSymbol">
                                                /{item?.parent_coin_name}
                                              </span>
                                            </div>
                                          </a>
                                        </td>
                                        <td className="text-black">
                                          {item.last_price}
                                        </td>
                                        <td>
                                          <span
                                            className={`changePos  ${
                                              parseFloat(item.price_change) >= 0
                                                ? "text-success"
                                                : "text-danger"
                                            } `}
                                          >
                                            {item.price_change}%
                                          </span>
                                        </td>
                                        <td>
                                          {item.price_change >= 0 ? (
                                            <img
                                              src="/chart-image-1.png"
                                              alt="chart-image"
                                            />
                                          ) : (
                                            <img
                                              src="/chart-image-2.png"
                                              alt="chart-image"
                                            />
                                          )}
                                        </td>
                                        <td className="text-black">
                                          {item.volume} {item.parent_coin_name}
                                        </td>
                                        <td
                                          onClick={async () => {
                                            await localStorage.setItem(
                                              "base_coin_id",
                                              item?.parent_coin_id
                                            );
                                            await localStorage.setItem(
                                              "trade_coin_id",
                                              item?.child_coin_id
                                            );
                                            await localStorage.setItem(
                                              "current_pair",
                                              item?.child_coin_name +
                                                "_" +
                                                item?.parent_coin_name
                                            );
                                          }}
                                        >
                                          <a
                                            href="/exchange/dashboard"
                                            className="btnTrade btn-link"
                                          >
                                            {t("Trade")}
                                          </a>
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
                    </div>
                  </div>
                </section>
              )}
              {parseInt(landing.landing_fourth_section_status) === 1 &&
                parseInt(landing.download_link_display_type) === 1 && (
                  <section className="trade-anywhere-area sectiob-bg">
                    <div className="container">
                      <div className="section-title">
                        <h2 className="title">
                          {landing?.trade_anywhere_title}
                        </h2>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-lg-6">
                          <div className="trade-anywhere-left">
                            <img
                              className="trend-image"
                              src={landing?.trade_anywhere_left_img}
                              alt="trade-imge"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="trade-anywhere-right">
                            <div className="avable-items">
                              <ul className="item-lsit">
                                {landing?.apple_store_link && (
                                  <li className="single-item">
                                    <a
                                      href={landing?.apple_store_link}
                                      className="item-link"
                                    >
                                      <img
                                        className="icon"
                                        src="/apple-logo.png"
                                        alt="apple-logo"
                                      />
                                      <span>{t("App Store")}</span>
                                    </a>
                                  </li>
                                )}

                                {landing?.google_store_link && (
                                  <li className="single-item">
                                    <a href="#" className="item-link">
                                      <img
                                        className="icon"
                                        src="/google-play.png"
                                        alt="google-play"
                                      />
                                      <span>{t("Google Play")}</span>
                                    </a>
                                  </li>
                                )}

                                {landing?.macos_store_link && (
                                  <li className="single-item">
                                    <a
                                      href={landing?.macos_store_link}
                                      className="item-link"
                                    >
                                      <img
                                        className="icon"
                                        src="/command-symbol.png"
                                        alt="command-symbol"
                                      />
                                      <span>{t("MacOS")}</span>
                                    </a>
                                  </li>
                                )}

                                {landing?.windows_store_link && (
                                  <li className="single-item">
                                    <a
                                      href={landing?.windows_store_link}
                                      className="item-link"
                                    >
                                      <img
                                        className="icon"
                                        src="/windows.png"
                                        alt="windows"
                                      />
                                      <span>{t("Windows")}</span>
                                    </a>
                                  </li>
                                )}

                                {landing?.windows_store_link && (
                                  <li className="single-item">
                                    <a
                                      href={landing?.windows_store_link}
                                      className="item-link"
                                    >
                                      <img
                                        className="icon"
                                        src="/linux.png"
                                        alt="linux"
                                      />
                                      <span>{t("Linux")}</span>
                                    </a>
                                  </li>
                                )}

                                {landing?.api_link && (
                                  <li className="single-item">
                                    <a
                                      href={landing?.api_link}
                                      className="item-link"
                                    >
                                      <img
                                        className="icon"
                                        src="/api.png"
                                        alt="api"
                                      />
                                      <span>{t("API")}</span>
                                    </a>
                                  </li>
                                )}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              {parseInt(landing.landing_fourth_section_status) === 1 &&
                parseInt(landing.download_link_display_type) === 2 && (
                  <section className="trade-anywhere-area">
                    <div className="container">
                      <div className="section-title">
                        <h2 className="title">
                          {" "}
                          {landing?.trade_anywhere_title}{" "}
                        </h2>
                      </div>
                      <div className="row align-items-center">
                        <div className="col-lg-6">
                          <div className="trade-anywhere-left">
                            <img
                              src={landing?.trade_anywhere_left_img}
                              alt="integration"
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="trade-anywhere-right">
                            <h2 className="subtitle">
                              {landing?.download_link_title}{" "}
                            </h2>
                            <p>{landing?.download_link_description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>
                )}
              {parseInt(landing.landing_fifth_section_status) === 1 && (
                <section className="trade-anywhere-area">
                  <div className="container">
                    <div className="section-title">
                      <h2 className="title"> {landing?.secure_trade_title} </h2>
                    </div>
                    <div className="row align-items-center">
                      <div className="col-lg-6">
                        <div className="trade-anywhere-left">
                          <img
                            src={landing?.secure_trade_left_img}
                            alt="integration"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="trade-anywhere-right">
                          <h2 className="subtitle">
                            {" "}
                            {landing?.customization_title}{" "}
                          </h2>
                          <p>{landing?.customization_details}</p>
                          <a href="/exchange/dashboard" className="primary-btn">
                            {t("Know More")}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {/* Trade. Anywhere. area end here  */}
              {/* Get in touch. area start here  */}
              {parseInt(landing.landing_sixth_section_status) === 1 && (
                <section className="get-touch-area">
                  <div className="container">
                    <div className="section-title">
                      <h2 className="title">
                        {landing?.landing_feature_title}
                      </h2>
                    </div>

                    <div className="row">
                      {featureListdata?.map((feature: any, index: any) => (
                        <div className="col-lg-3 col-md-6" key={index}>
                          <a href="#" className="single-card">
                            <img
                              className="card-icon"
                              src={feature.feature_icon}
                              alt="icon"
                            />
                            <h3 className="card-title">
                              {feature?.feature_title}
                            </h3>
                            <p className="card-content">
                              {feature?.description}
                            </p>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}

              {/* Get in touch. area end here  */}
              {/* Start trading area start here  */}
              {parseInt(landing?.landing_seventh_section_status) === 1 && (
                <section className="start-trading-area">
                  <div className="container">
                    <div className="section-title text-center">
                      <h2 className="title">{t("Start trading now")}</h2>
                    </div>
                    <div className="trading-button text-center">
                      {!loggedin && (
                        <Link href="/signup">
                          <a className="primary-btn mr-5">{t("Sign Up")}</a>
                        </Link>
                      )}
                      <a
                        href={
                          router.locale !== "en"
                            ? `/${router.locale}/exchange/dashboard`
                            : "/exchange/dashboard"
                        }
                      >
                        <a className="primary-btn">{t("Trade Now")}</a>
                      </a>
                    </div>
                  </div>
                </section>
              )}
            </>
          )}

          {/* Start trading area end here  */}
          {/* footer area start here */}
          <Footer />
          <a
            id="scrollUp"
            href="#top"
            style={{ position: "fixed", zIndex: 2147483647, display: "none" }}
          >
            <i className="fa fa-angle-up" />
          </a>
          <div id="vanillatoasts-container" />
        </div>
      </div>
    </SEO>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { data } = await landingPageSlug(ctx.locale, ctx.params.slug);
  const cookies = parseCookies(ctx);
  const { data: customSettings } = await commomSettings();

  return {
    props: {
      landing: data,
      bannerListdata: data?.banner_list ? data?.banner_list : null,
      announcementListdata: data?.announcement_list
        ? data?.announcement_list
        : null,
      featureListdata: data?.feature_list ? data?.feature_list : null,
      asset_coin_pairs: data?.asset_coin_pairs ? data?.asset_coin_pairs : null,
      hourly_coin_pairs: data?.hourly_coin_pairs
        ? data?.hourly_coin_pairs
        : null,
      latest_coin_pairs: data?.latest_coin_pairs
        ? data?.latest_coin_pairs
        : null,
      loggedin: cookies.token ? true : false,
      landing_banner_image: data?.landing_banner_image
        ? data?.landing_banner_image
        : null,
      customSettings: customSettings,
    },
  };
};
export default Home;
