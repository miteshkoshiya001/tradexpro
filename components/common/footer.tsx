import { CUSTOM_PAGE_LINK_PAGE } from "helpers/core-constants";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "state/store";

const Footer = () => {
  const { t } = useTranslation("common");
  const { settings } = useSelector((state: RootState) => state.common);
  const { isLoggedIn, customPageData, logo,socialData, copyright_text } =
    useSelector((state: RootState) => state.user);

  return (
    <>
      {customPageData && socialData && copyright_text && (
        <footer className="footer-area pt--70">
          <div className="footer-top">
            <div className="container">
              <div className="row">
                <div className="col-lg-2 col-md-6 col-sm-6 mb-30">
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
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 mb-30">
                  <div className="single-wedgets text-widget">
                    <div className="widget-title">
                      <h4>{t("About Us")}</h4>
                    </div>
                    <div className="widget-inner">
                      <ul>
                        {parseInt(settings?.blog_news_module) === 1 && (
                          <li>
                            <Link href={"/blog"}>{t("Blog")}</Link>
                          </li>
                        )}

                        <li>
                          <Link href={"/staking"}>{t("Staking")}</Link>
                        </li>

                        {parseInt(settings?.knowledgebase_support_module) ===
                          1 && (
                          <li>
                            <Link
                              href={
                                isLoggedIn === true ? "/support" : "/signin"
                              }
                            >
                              {t("Support")}
                            </Link>
                          </li>
                        )}
                        {parseInt(settings?.knowledgebase_support_module) ===
                          1 && (
                          <li>
                            <Link href={"/knowledgebase"}>
                              {t("Knowledgebase")}
                            </Link>
                          </li>
                        )}
                        {parseInt(settings?.blog_news_module) === 1 && (
                          <li>
                            <Link href={"/news"}>{t("News")}</Link>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-2 col-md-6 col-sm-6 mb-30">
                  <div className="single-wedgets text-widget">
                    <div className="widget-title">
                      <h4>
                        {customPageData?.custom_page_list[0]?.name
                          ? customPageData?.custom_page_list[0]?.name
                          : t("Products")}
                      </h4>
                    </div>
                    <div className="widget-inner">
                      <ul>
                        {customPageData?.links?.map(
                          (item: any) =>
                            item.type === 1 && (
                              <li>
                                {item.page_type === CUSTOM_PAGE_LINK_PAGE ? (
                                  <Link href={"/page-details/" + item.key}>
                                    {item.title}
                                  </Link>
                                ) : (
                                  <a
                                    href={item.page_link}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {item.title}
                                  </a>
                                )}
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="col-lg-2 col-md-6 col-sm-6 mb-30">
                  <div className="single-wedgets text-widget">
                    <div className="widget-title">
                      <h4>
                        {customPageData?.custom_page_list[1]?.name
                          ? customPageData?.custom_page_list[1]?.name
                          : t("Service")}
                      </h4>
                    </div>
                    <div className="widget-inner">
                      <ul>
                        {customPageData?.links?.map(
                          (item: any) =>
                            item.type === 2 && (
                              <li>
                                {item.page_type === CUSTOM_PAGE_LINK_PAGE ? (
                                  <Link href={"/page-details/" + item.key}>
                                    {item.title}
                                  </Link>
                                ) : (
                                  <a
                                    href={item.page_link}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {item.title}
                                  </a>
                                )}
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6 mb-30">
                  <div className="single-wedgets text-widget">
                    <div className="widget-title">
                      <h4>
                        {customPageData?.custom_page_list[2]?.name
                          ? customPageData?.custom_page_list[2]?.name
                          : t("Support")}
                      </h4>
                    </div>
                    <div className="widget-inner">
                      <ul>
                        {customPageData?.links?.map(
                          (item: any) =>
                            item.type === 3 && (
                              <li>
                                {item.page_type === CUSTOM_PAGE_LINK_PAGE ? (
                                  <Link href={"/page-details/" + item.key}>
                                    {item.title}
                                  </Link>
                                ) : (
                                  <a
                                    href={item.page_link}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    {item.title}
                                  </a>
                                )}
                              </li>
                            )
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 col-md-6 col-sm-6">
                  <div className="single-wedgets social-link">
                    <div className="widget-title">
                      <h4>
                        {customPageData?.custom_page_list[3]?.name
                          ? customPageData?.custom_page_list[3]?.name
                          : t("Community")}
                      </h4>
                    </div>
                    <div className="widget-inner">
                      <ul className="d-flex flex-wrap align-items-center">
                        {socialData?.map((social: any, index: any) => (
                          <li key={index}>
                            <a
                              href={social.media_link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <img
                                src={social.media_icon}
                                alt={social.media_title}
                                width={18}
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="container">
              <div className="footer-bottom-wrap">
                <div className="row align-items-center">
                  <div className="col-md-12">
                    <div className="copyright-area text-center text-md-center">
                      <p>
                        {(copyright_text && copyright_text) ||
                          t("Copyright@2022")}{" "}
                        <a href="">{settings?.app_title ?? t("TradexPro")}</a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
