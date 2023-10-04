import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "state/store";

const Hero = ({ data }: any) => {
  const { t } = useTranslation("common");
  const { isLoggedIn } = useSelector((state: RootState) => state.user);
  return (
    <section className="hero-banner-area-pool">
      <div className="row">
        <div className="col-md-5 mt-5">
          <h1 className="banner-title mb-2">{data?.launchpad_second_title}</h1>
          <p className="banner-content mb-2">
            {data?.launchpad_second_description}
          </p>
          {parseInt(data?.launchpad_apply_to_status) === 1 && (
            <Link href={isLoggedIn ? "/ico/apply" : "/signin"}>
              <button className="transparent_btn">
                {data?.launchpad_apply_to_button_text}
              </button>
            </Link>
          )}
        </div>
        <div className="col-md-7 text-center">
          <img src={data?.launchpad_main_image} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
