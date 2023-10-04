import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSelector } from "react-redux";
import { RootState } from "state/store";

const SectionLoading = () => {
  const [logo, setLogo] = useState<any>();
  const [enableLogoAnimate, setEnableLogoAnimate] = useState<any>();
  const { settings } = useSelector((state: RootState) => state.common);

  useEffect(() => {
    setLogo(localStorage.getItem("animateLogo"));
    setEnableLogoAnimate(localStorage.getItem("animateEnable"));
  }, []);

  return (
    <>
      {enableLogoAnimate == 2 ? (
        <div className="loading-image-container">
          {logo ? (
            <span className="loading-image">
              <img
                src={logo || ""}
                width={150}
                className="img-fluid cp-user-logo-large"
                alt=""
              />
            </span>
          ) : (
            <span className="loader"></span>
          )}
        </div>
      ) : (
        <div className="loadingContainer container">
          <span className="loader"></span>
        </div>
      )}
    </>
  );
};

export default SectionLoading;
