import Link from "next/link";
import React from "react";

export const Breadcrumb = ({
  leftButton,
  leftUrl,
  leftText,
  rightLink,
  rightText,
  rightButton,
}: any) => {
  return (
    <>
      <div className="launchPadSingleHero">
        <div className="container launchPadSingleHeroFlex">
          {leftButton && (
            <Link href={leftUrl ? leftUrl : "/"}>
              <div className="launchPadSingleHeroTitle">
                <i className="fa-solid fa-chevron-left"></i>
                <h2>{leftText ? leftText : "Home"}</h2>
              </div>
            </Link>
          )}

          {rightButton && (
            <Link href={rightLink ? rightLink : "/"}>
              <div className="launchPadSingleHeroright">
                <h2>{rightText ? rightText : "Text Here"}</h2>
                <i className="fa-solid fa-chevron-right"></i>
              </div>
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
