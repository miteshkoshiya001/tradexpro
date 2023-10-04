import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { MdOutlineDomainVerification, MdPassword } from "react-icons/md";
import {
  AiTwotoneEdit,
  AiTwotonePhone,
  AiFillSecurityScan,
  AiOutlineBank,
} from "react-icons/ai";
import { BiSupport } from "react-icons/bi";

import { useRouter } from "next/router";
import { RootState } from "state/store";
import { useSelector } from "react-redux";
const ProfileSidebar = () => {
  const router = useRouter();
  const { t } = useTranslation("common");
  const { settings } = useSelector((state: RootState) => state.common);

  return (
    <div className="page-left-sidebar">
      <div className="sidebar-top">
        <ul className="left-menu">
          <Link href="/user/profile">
            <li className={router.pathname == "/user/profile" ? "active" : ""}>
              <CgProfile />
              <a href="/user/profile">{t("My Profile")}</a>
            </li>
          </Link>
          <Link href="/user/edit-profile">
            <li
              className={
                router.pathname == "/user/edit-profile" ? "active" : ""
              }
            >
              <AiTwotoneEdit />
              <a href="/user/edit-profile">{t("Edit Profile")}</a>
            </li>
          </Link>
          <Link href="/user/phone-verification">
            <li
              className={
                router.pathname == "/user/phone-verification" ? "active" : ""
              }
            >
              <AiTwotonePhone />
              <a href="/user/phone-verification">{t("Phone Verification")}</a>
            </li>
          </Link>
          <Link href="/user/security">
            <li className={router.pathname == "/user/security" ? "active" : ""}>
              <AiFillSecurityScan />
              <a href="/user/security-setting">{t("Security")}</a>
            </li>
          </Link>
          <Link href="/user/personal-verification">
            <li
              className={
                router.pathname == "/user/personal-verification" ? "active" : ""
              }
            >
              <MdOutlineDomainVerification />
              <a href="/user/profile-verification-list">
                {t("KYC Verification")}
              </a>
            </li>
          </Link>

          <Link href="/user/bank/list">
            <li
              className={router.pathname == "/user/bank/list" ? "active" : ""}
            >
              <AiOutlineBank />
              <a href="/user/bank/list">{t("Bank List")}</a>
            </li>
          </Link>

          <Link href="/user/change-password">
            <li
              className={
                router.pathname == "/user/change-password" ? "active" : ""
              }
            >
              <MdPassword />
              <a href="/user/change-password">{t("Change Password")}</a>
            </li>
          </Link>
          {parseInt(settings.knowledgebase_support_module) === 1 && (
            <Link href="/support">
              <li className={router.pathname == "/support" ? "active" : ""}>
                <BiSupport />
                <a href="/support">{t("Support")}</a>
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProfileSidebar;
