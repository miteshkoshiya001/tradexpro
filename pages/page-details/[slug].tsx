import { formateData } from "common";
import Footer from "components/common/footer";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import {
  CommonLandingCustomSettings,
  customPageWithSlug,
} from "service/landing-page";
import UnAuthNav from "components/common/unAuthNav";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import Navbar from "components/common/Navbar";
import { parseCookies } from "nookies";
const Bannerdetails = ({
  details,
  status,
  customPageData,
  socialData,
  copyright_text,
  customSettings,
  loggedin,
}: any) => {
  const { t } = useTranslation("common");
  const { user, logo } = useSelector((state: RootState) => state.user);

  if (status === false) {
    return (
      <div>
        {loggedin ? (
          <Navbar settings={customSettings} isLoggedIn={loggedin} />
        ) : (
          <UnAuthNav />
        )}
        <div className="notFound-container">
          {/* <h1 className="">404</h1> */}
          <img src="/not_found.svg" height={300} alt="" />
          <p className="">Content Not Found</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="container mb-5 mt-5">
        <div className="section-wrapper-withHtml ">
          <img src={details.image} />
          <h1 className="display-4 mt-3">{details.title}</h1>
          <p className="mt-2 mb-2">
            Last revised: {formateData(details.updated_at)}
          </p>
          <div
            dangerouslySetInnerHTML={{
              __html: details.description,
            }}
          ></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { slug } = ctx.query;

  let response: any;
  let CommonLanding;
  const cookies = parseCookies(ctx);
  try {
    const { data } = await customPageWithSlug(slug);
    response = data;
    const { data: Common } = await CommonLandingCustomSettings(ctx.locale);
    CommonLanding = Common;
  } catch (error) {}
  return {
    props: {
      details: response.data,
      status: response.success,
      customPageData: CommonLanding.custom_page_settings
        ? CommonLanding.custom_page_settings
        : null,
      socialData: CommonLanding.landing_settings.media_list
        ? CommonLanding.landing_settings.media_list
        : null,
      copyright_text: CommonLanding?.landing_settings?.copyright_text
        ? CommonLanding?.landing_settings?.copyright_text
        : null,
      customSettings: CommonLanding?.common_settings,
      loggedin: cookies.token ? true : false,
    },
  };
};
export default Bannerdetails;
