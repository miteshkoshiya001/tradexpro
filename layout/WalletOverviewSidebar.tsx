import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { MdDashboardCustomize, MdPassword } from "react-icons/md";
import { FaPeopleArrows } from "react-icons/fa";

import { BiSupport, BiShapeCircle } from "react-icons/bi";

import { useRouter } from "next/router";
import { RootState } from "state/store";
import { useSelector } from "react-redux";
const WalletOverviewSidebar = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { settings } = useSelector((state: RootState) => state.common);

  return (
    <div className="page-left-sidebar">
      <div className="sidebar-top">
        <ul className="left-menu">
          <Link href="/wallet-overview">
            <li
              className={router.pathname == "/wallet-overview" ? "active" : ""}
            >
              <MdDashboardCustomize />
              <a>{t("Overview")}</a>
            </li>
          </Link>
          <Link href="/user/my-wallet">
            <li
              className={router.pathname == "/user/my-wallet" ? "active" : ""}
            >
              <BiShapeCircle />
              <a>{t("Spot")}</a>
            </li>
          </Link>
          {Number(settings?.enable_future_trade) === 1 && (
            <Link href="/futures/wallet-list">
              <li
                className={
                  router.pathname == "/futures/wallet-list" ? "active" : ""
                }
              >
                <BiShapeCircle />
                <a>{t("Futures")}</a>
              </li>
            </Link>
          )}

          {parseInt(settings.p2p_module) === 1 && (
            <Link href="/p2p/p2p-wallet">
              <li
                className={router.pathname == "/p2p/p2p-wallet" ? "active" : ""}
              >
                <FaPeopleArrows />
                <a>{t("P2P")}</a>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default WalletOverviewSidebar;
