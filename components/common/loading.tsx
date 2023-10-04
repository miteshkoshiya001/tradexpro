import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "state/store";

const Loading = () => {
  const { t } = useTranslation("common");
  const [logo, setLogo] = useState<any>();
  const [enableLogoAnimate, setEnableLogoAnimate] = useState<any>();
  useEffect(() => {
    setLogo(localStorage.getItem("animateLogo"));
    setEnableLogoAnimate(localStorage.getItem("animateEnable"));
  }, []);

  return (
    <>
      {enableLogoAnimate == 2 ? (
        <div className="preloder-area">
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
        <div className="preloder-area">
          <span className="loader"></span>
        </div>
      )}
    </>
  );
};

export default Loading;
