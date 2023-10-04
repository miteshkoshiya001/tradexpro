import { InvesmentOrderTable } from "components/Staking/MyOrders";
import { StakingTopBar } from "components/Staking/common/TopBar";
import Footer from "components/common/footer";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import React from "react";
import { myOrderAction } from "state/actions/staking";

const myOrder = () => {
  return (
    <>
      <div className="">
        <div className="section-top-wrap mb-25">
          <div className="overview-area">
            <div className="overview-left">
              <h2 className="section-top-title">My Invesments</h2>
            </div>
          </div>
        </div>
      </div>
      <StakingTopBar />
      <InvesmentOrderTable actionFunction={myOrderAction} filter={true} />
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/staking");

  return {
    props: {},
  };
};
export default myOrder;
