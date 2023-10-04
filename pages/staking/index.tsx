import React, { useEffect, useState } from "react";
import { StakingTopBar } from "components/Staking/common/TopBar";
import OfferTable from "components/Staking/Home/OfferTable";
import FaqStaking from "components/Staking/Home/FaqStaking";
import Footer from "components/common/footer";
import { getOfferListAction } from "state/actions/staking";
import { GetServerSideProps } from "next";
import { LandingDetailsStaking } from "service/staking";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";

const Index = ({ data }: any) => {
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  const changeBackground = () => {
    const elements = document.getElementsByClassName("p2p_bg");

    // Loop through the elements and add the background image
    for (let i = 0; i < elements.length; i++) {
      //@ts-ignore
      elements[i].style.backgroundImage = `url('${data?.staking_landing_cover_image}')`;
    }
  };
  useEffect(() => {
    data?.staking_landing_cover_image && changeBackground();
  }, []);
  return (
    <>
      <div className="mb-5">
        <div className="p2p_bg">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <h2 className="text-white">{data?.staking_landing_title}</h2>
                <p className="text-white">
                  {data?.staking_landing_description}
                </p>
              </div>
            </div>
          </div>
        </div>
        {isLoggedIn && <StakingTopBar />}
        <OfferTable isLoggedIn={isLoggedIn} />
        <FaqStaking faq_list={data?.faq_list} />
      </div>
      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const { data } = await LandingDetailsStaking();
  return {
    props: {
      data: data,
    },
  };
};
export default Index;
