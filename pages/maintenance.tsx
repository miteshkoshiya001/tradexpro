import React from "react";
import { GetServerSideProps } from "next";
import { commomSettings } from "service/landing-page";
import useTranslation from "next-translate/useTranslation";
import { redirect } from "next/dist/server/api-utils";

const Maintenance = ({ data }: any) => {
  const { t } = useTranslation("common");
  return (
    <div
      className="maintenance-mode"
      style={{
        background: `${
          data?.data?.maintenance_mode_img
            ? `url(${data?.data?.maintenance_mode_img})`
            : "url('/maintenance.jpg')"
        }`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="maintenance-content">
        <div>
          <h2>
            {data?.data?.maintenance_mode_title
              ? data?.data?.maintenance_mode_title
              : t(
                  "Tradexpro Exchange is temporarily unavailable due to maintenance"
                )}
          </h2>
          <p>
            {data?.data?.maintenance_mode_text
              ? data?.data?.maintenance_mode_text
              : "We are working hard to make it the best friendly exchange website. Please check back later. We apologize for any inconvenience"}
          </p>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { data } = await commomSettings();
  if (parseInt(data?.maintenance_mode_status) === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: { data },
  };
};
export default Maintenance;
