import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export const SingleLaunchPad = ({ data }: any) => {
  const { t } = useTranslation("common");
  const [socialLink, setSocialLink] = useState<any>({});
  useEffect(() => {
    data?.social_link && setSocialLink(JSON.parse(data?.social_link));
  }, [data?.social_link]);
  return (
    <>
      <div className="container singleLaunch">
        <div className="singleLaunchPadHero">
          <div className="singleLaunchPadHeroFlex">
            <div className="">
              <img
                className="singleLaunchPadImg icoImage"
                src={data?.image ? data?.image : "/launchpad.png"}
                alt="---"
              />
            </div>
            <div className="">
              <div className="singleLaunchPadTitle">
                <h2>{data?.token_name}</h2>
                <div className="singleLaunchPadStatus">
                  <i className="fa-sharp fa-solid fa-circle-check"></i>
                  {/* <p> FINISHED</p> */}
                </div>
              </div>

              <div className="singleLaunchPadLinkList">
                <p>{data?.project_introduction}</p>
                <div className="linkLists">
                  {data?.website_link && (
                    <a
                      href={data?.website_link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <div>
                        <i className="fa-sharp fa-solid fa-link"></i>
                        <p>{t("Website")}</p>
                      </div>
                    </a>
                  )}
                  {data?.video_link && (
                    <a href={data?.video_link} target="_blank" rel="noreferrer">
                      <div>
                        <i className="fa-sharp fa-solid fa-link"></i>
                        <p>{t("Video Link")}</p>
                      </div>
                    </a>
                  )}
                </div>
              </div>
              <Link href={`/ico/payment/${data?.token_id}/${data?.id}`}>
                <a className="primary-btn mt-5 text-white">{t("Buy now")}</a>
              </Link>
            </div>
          </div>
        </div>

        <div className="launchCoinDetails">
          {/* <div>
            <p>{t("Type")}</p>
            <span>{t("Subscription")}</span>
          </div> */}

          <div>
            <p>{t("Sale Price")}</p>
            <span>{`1 ${data?.coin_type} = ${data?.coin_price} ${data?.coin_currency}`}</span>
          </div>
          <div>
            <p>{t("Tokens Offered")}</p>
            <span>{`${parseFloat(data?.total_token_supply)} `}{" "}
              {data?.coin_type}</span>
          </div>

          <div>
            <p>{t("Token Sold")}</p>
            <span>
              {data?.sold_phase_tokens ? data?.sold_phase_tokens : "0"}{" "}
              {data?.coin_type}
            </span>
          </div>
          <div>
            <p>{t("Token Available")}</p>
            <span>
              {parseFloat(data?.total_token_supply) -
                parseFloat(data?.sold_phase_tokens)}{" "}
              {data?.coin_type}
            </span>
          </div>
          <div>
            <p>{t("Participants")}</p>
            <span>{`${parseFloat(
              data?.total_participated ? data?.total_participated : 0
            )} `}</span>
          </div>
          <div>
            <p>{t("Base Coin")}</p>
            <span>{data?.base_coin}</span>
          </div>
          <div>
            <p>{t("Token Type")}</p>
            <span>{data?.network}</span>
          </div>
        </div>

        {/* <div className="subscriptionTimeLine">
          <h2>Subscription Timeline</h2>
          <div className="flexItem">
            <div>
              <div className="timeLineLists">
                <div className="timeLineIcon">
                  <i className="fa-sharp fa-solid fa-circle-check"></i>
                </div>
                <div>
                  <h5>BNB Holding Calculation Period</h5>
                  <span>2022-03-02 06:00</span>
                </div>
              </div>

              <div className="timeLineLists">
                <div className="timeLineIcon">
                  <i className="fa-sharp fa-solid fa-circle-check"></i>
                </div>
                <div>
                  <h5>Subscription Period</h5>
                  <span>2022-03-02 06:00</span>
                </div>
              </div>

              <div className="timeLineLists">
                <div className="timeLineIcon">
                  <i className="fa-sharp fa-solid fa-circle-check"></i>
                </div>
                <div>
                  <h5>Calculation Period</h5>
                  <span>2022-03-02 06:00</span>
                </div>
              </div>
              <div className="timeLineLists">
                <div className="">
                  <i className="fa-sharp fa-solid fa-circle-check active"></i>
                </div>
                <div>
                  <h5>Final Token Distribution</h5>
                  <span>2022-03-02 06:00</span>
                  <p>
                    The allocation calculation is complete. We will deduct the
                    corresponding BNB from your account based on your final GMT
                    allocation, which will be transferred to your spot account
                    along with your remaining BNB.
                  </p>
                  <div className="commintCoin">
                    <div className="text-center">
                      <i className="fa-sharp fa-solid fa-circle-info"></i>
                      <p>you did not commit any BNB for this session.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="launchPadHistory">
              <Link href={"/"}>
                <a>Launchpad History</a>
              </Link>
            </div>
          </div>
        </div> */}

        <div className="singleLaunchDetails">
          <div className="row">
            <div className="col-md-9 col-sm-12 col-12 contentDetails">
              <h3>{data?.token_name}</h3>
              <div>
                <h6>{data?.phase_title}</h6>
                <p>{data?.description}</p>
              </div>
              <div>
                <h6>{"Details Rule"}</h6>
                <p>{data?.details_rule}</p>
              </div>
              <div>
                {data?.ico_phase_additional_details.length > 0 && (
                  <h6>{t("Additional information")}</h6>
                )}

                <table className="table table-striped">
                  <tbody>
                    {data?.ico_phase_additional_details.map(
                      (item: any, index: any) => (
                        <tr key={index}>
                          <th scope="row">{item?.title}</th>
                          <td>{item.value}</td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-md-3 col-sm-12 col-12">
              <h5>Social Channels</h5>
              <div className="socialLinks">
                {/* JSON.parse(data?.social_link.Facebook) */}
                {/* {socialLink} */}
                {socialLink?.Facebook && (
                  <div className="socialList">
                    <i className="fa-brands fa-facebook"></i>
                    <a
                      href={socialLink?.Facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {"Facebook"}
                    </a>
                  </div>
                )}
                {socialLink?.Twitter && (
                  <div className="socialList">
                    <i className="fa-brands fa-twitter"></i>
                    <a
                      href={socialLink?.Twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {"Twitter"}
                    </a>
                  </div>
                )}
                {socialLink?.Linkedin && (
                  <div className="socialList">
                    <i className="fa-brands fa-linkedin"></i>
                    <a
                      href={socialLink?.Linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {"Linkedin"}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
