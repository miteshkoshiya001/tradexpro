import { url } from "inspector";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { BsArrowRight } from "react-icons/bs";

export default function SecondBannerSection({
  second_header,
  second_description,
  second_banner,
}: {
  second_header: string;
  second_description: string;
  second_banner: string;
}) {
  const { t } = useTranslation();
  return (
    <div className="bg-card-primary-color py-80" style={{backgroundImage: `url(${second_banner})` }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <h1 className="text-45 text-capitalize font-bold gift-font-color">
              {t(second_header)}
            </h1>
            <p className="my-3 gift-font-color font-medium text-16">
              {t(second_description)}
            </p>
            {/* <button className="gift-btn bg-primary-color border-primary-color mt-40">
              {t("Learn More")} <BsArrowRight />{" "}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
