import {
  PHASE_SORT_BY_FEATURED,
  PHASE_SORT_BY_FUTURE,
  PHASE_SORT_BY_RECENT,
} from "helpers/core-constants";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";

export const SingleHero = ({ type }: any) => {
  const { t } = useTranslation("common");
  return (
    <>
      <div className="launchPadSingleHero">
        <div className="container launchPadSingleHeroFlex">
          <Link href={"/ico"}>
            <div className="launchPadSingleHeroTitle">
              <i className="fa-solid fa-chevron-left"></i>
              <h2>Homepage</h2>
            </div>
          </Link>

          {/* <Link href={"/launchpad"}>
            <div className="launchPadSingleHeroright">
              <h2>Launchpool</h2>
              <i className="fa-solid fa-chevron-right"></i>
            </div>
          </Link> */}
        </div>
      </div>

      <div className="launchPadSingleSectionTitle">
        <div className="container ">
          <h2>
            {t(
              `${
                PHASE_SORT_BY_FEATURED === parseInt(type)
                  ? "Featured"
                  : PHASE_SORT_BY_RECENT === parseInt(type)
                  ? "Ongoing"
                  : PHASE_SORT_BY_FUTURE === parseInt(type)
                  ? "Upcoming"
                  : ""
              } List`
            )}
          </h2>
          <p>{t("A token launch platform for transformative projects.")}</p>
        </div>
      </div>
    </>
  );
};
