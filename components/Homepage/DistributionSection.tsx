import ImageComponent from "components/common/ImageComponent";
import useTranslation from "next-translate/useTranslation";
import React from "react";

const DistributionSection = ({ landing }: any) => {
  const { t } = useTranslation("common");
  return (
    <div>
      {" "}
      {parseInt(landing.landing_fourth_section_status) === 1 &&
        parseInt(landing.download_link_display_type) === 1 && (
          <section className="trade-anywhere-area sectiob-bg">
            <div className="container">
              <div className="section-title">
                <h2 className="title">{landing?.trade_anywhere_title}</h2>
              </div>
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="trade-anywhere-left text-center">
                    <img
                      className="trend-image"
                      src={landing?.trade_anywhere_left_img}
                      alt="trade-imge"
                    />

                    {/* <ImageComponent
                      className="trend-image"
                      src={landing?.trade_anywhere_left_img}
                      height={300}
                    /> */}
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
                            <a href={landing?.api_link} className="item-link">
                              <img className="icon" src="/api.png" alt="api" />
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
    </div>
  );
};

export default DistributionSection;
