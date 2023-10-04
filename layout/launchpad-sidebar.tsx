import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { AiFillWallet } from "react-icons/ai";
import { useRouter } from "next/router";
import { FaWpforms } from "react-icons/fa";
import { GiToken } from "react-icons/gi";
import { BsCashCoin, BsClockHistory } from "react-icons/bs";
const LaunchpadSidebar = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  return (
    <div className="page-left-sidebar">
      <div className="sidebar-top">
        <ul className="left-menu">
          <Link href="/ico/applied-launchpad">
            <li
              className={
                router.pathname == "/ico/applied-launchpad" ? "active" : ""
              }
            >
              <FaWpforms />
              <a href="/ico/applied-launchpad">{t("applied launchpad")}</a>
            </li>
          </Link>
          <Link href="/ico/ico-tokens">
            <li
              className={router.pathname == "/ico/ico-tokens" ? "active" : ""}
            >
              <GiToken />
              <a href="/ico/ico-phase">{t("Ico Tokens")}</a>
            </li>
          </Link>
          <Link href="/ico/token-buy-history">
            <li
              className={
                router.pathname == "/ico/token-buy-history" ? "active" : ""
              }
            >
              <BsClockHistory />
              <a href="/ico/ico-phase">{t("Token Buy History")}</a>
            </li>
          </Link>
          <Link href="/ico/token-wallet">
            <li
              className={router.pathname == "/ico/token-wallet" ? "active" : ""}
            >
              <AiFillWallet />
              <a href="/ico/ico-phase">{t("Token Wallet")}</a>
            </li>
          </Link>
          <Link href="/ico/withdraw">
            <li className={router.pathname == "/ico/withdraw" ? "active" : ""}>
              <BsCashCoin />
              <a href="/ico/ico-phase">{t("Withdraw")}</a>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default LaunchpadSidebar;
