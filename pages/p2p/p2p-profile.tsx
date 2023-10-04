import Footer from "components/common/footer";
import { P2pTopBar } from "components/P2P/P2pHome/TopBar";
import { TradeDetails } from "components/P2P/P2pProfile/TradeDetails";
import { FeedbackTable } from "components/P2P/P2pProfile/FeedbackTable";
import { ProfileHeader } from "components/P2P/P2pProfile/ProfileHeader";
import { PaymentTable } from "components/P2P/P2pProfile/PaymentTable";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { userCenterAction } from "state/actions/p2p";
import SectionLoading from "components/common/SectionLoading";

const P2pProfile = () => {
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<any>();
  useEffect(() => {
    userCenterAction(setLoading, setDetails);
  }, []);
  return (
    <>
      {loading ? (
        <SectionLoading />
      ) : (
        <div className="mb-5">
          <div className="section-top-wrap mb-25">
            <div className="overview-area">
              <div className="overview-left">
                <h2 className="section-top-title">User center</h2>
              </div>
            </div>
          </div>
          <P2pTopBar />
          <ProfileHeader details={details} />
          <TradeDetails details={details} />
          <div className="userProfileBg mt-5 pb-5 pt-3">
            <PaymentTable />
            <FeedbackTable details={details} />
          </div>
        </div>
      )}

      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/p2p");

  return {
    props: {},
  };
};
export default P2pProfile;
