import { Breadcrumb } from "components/Breadcrumb";
import { SingleLaunchPad } from "components/ico/SingleLaunchPad";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getLaunchpadListDetailsAction } from "state/actions/launchpad";
import { GetServerSideProps } from "next";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { customPage, landingPage } from "service/landing-page";
import { parseCookies } from "nookies";
import Footer from "components/common/footer";
import SectionLoading from "components/common/SectionLoading";

export default function SingleLaunchPadPage({
  customPageData,
  socialData,
  copyright_text,
}: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [launchpadListDetails, setLaunchpadListDetails]: any = useState([]);
  useEffect(() => {
    getLaunchpadListDetailsAction(
      setLaunchpadListDetails,
      router.query.id,
      setLoading
    );
  }, []);

  return (
    <>
      {loading ? (
        <SectionLoading />
      ) : (
        <>
          <Breadcrumb leftButton={true} leftUrl="/ico" />
          <SingleLaunchPad data={launchpadListDetails?.data} />
          <Footer />
        </>
      )}
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/profile");
  const { id, edit } = ctx.query;
  return {
    props: {
      id: id,
      edit: edit ? edit : null,
    },
  };
};
