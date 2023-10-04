import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";

const NotLoggedin = () => {
  const { t } = useTranslation("common");
  return (
    <div className="notLoggedin">
      <Link href="/signin">
        <span className="colorTheme mr-2">{t("Login")} </span>
      </Link>
      <span className="text-primary">{t("or")} </span>

      <Link href="/signup">
        <span className="colorTheme ml-2 mr-2"> {t("Sign up")}</span>
      </Link>
      <span className="text-primary">{t("to trade")}</span>
      
    </div>
  );
};

export default NotLoggedin;
