import ImageComponent from "components/common/ImageComponent";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import GiftCardModal from "../modal/GiftCardModal";
import request from "lib/request";
import { toast } from "react-toastify";
import SendCryptoCardModal from "../modal/SendCryptoCardModal";
import Link from "next/link";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { useRouter } from "next/router";
import {
  addGiftCardApi,
  checkGiftCardApi,
  redeemGiftCardApi,
} from "service/gift-cards";

export default function MainBannerSection({
  header,
  description,
  banner,
  gif_card_redeem_description,
  gif_card_add_card_description,
  gif_card_check_card_description,
}: any) {
  const router = useRouter();
  const [activeBtn, setActiveBtn] = useState("redeem");
  const [code, setCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [giftCardData, setGiftCardData] = useState({});
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  const handleGiftCard = async () => {
    if (!isLoggedIn) {
      router.push("/signin");
      return;
    }
    if (!code) return;
    const data = await checkGiftCardApi(code);
    if (!data.success) {
      setGiftCardData({});
      toast.error(data.message);
      return;
    }
    setGiftCardData(data.data);
    setIsModalOpen(true);
  };

  const handleGiftCardSubmit = () => {
    if (activeBtn === "add") {
      addGiftCardHandler();
      return;
    }
    redeemGiftCardHandler();
  };

  const addGiftCardHandler = async () => {
    const data = await addGiftCardApi(code);
    if (data.success) {
      setCode("");
      setIsModalOpen(false);
      toast.success(data.message);
      return;
    }
    toast.error(data.message);
    setIsModalOpen(false);
  };

  const redeemGiftCardHandler = async () => {
    const data = await redeemGiftCardApi(code);
    if (data.success) {
      toast.success(data.message);
      setCode("");
      setIsModalOpen(false);
      return;
    }
    toast.error(data.message);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-card-primary-color py-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <h1 className="text-45 text-capitalize font-bold gift-font-color">
                {t(header)}
              </h1>
              <p className="my-3 gift-font-color font-medium text-16">
                {t(description)}
              </p>
              <Link href={isLoggedIn ? `/gift-cards/my-cards` : "/signin"}>
                <a className="gift-btn d-inline-block">
                  {t("Send a crypto gift card")} <BsArrowRight />{" "}
                </a>
              </Link>
              <div className="gift-inner-card my-5 gift-font-color">
                <div className="gift-inner-card-btns">
                  <span
                    className={`pointer btn w-none ${
                      activeBtn === "redeem" ? " bg-primary-gift" : "block"
                    }`}
                    onClick={() => {
                      setActiveBtn("redeem");
                      setCode("");
                    }}
                  >
                    {t("Redeem to crypto")}{" "}
                  </span>
                  <span
                    className={`btn w-none pointer ${
                      activeBtn === "add" ? " bg-primary-gift" : "block"
                    }`}
                    onClick={() => {
                      setActiveBtn("add");
                      setCode("");
                    }}
                  >
                    {t("Add Card")}
                  </span>
                  <span
                    className={`pointer btn w-none ${
                      activeBtn === "check" ? " bg-primary-gift" : "block"
                    }`}
                    onClick={() => {
                      setActiveBtn("check");
                      setCode("");
                    }}
                  >
                    {t("Check Card")}
                  </span>
                </div>
                <div className="gift-inner-card-input-section">
                  <div className="w-full">
                    <label className="gift-font-color">
                      {t(`Redemption Code`)}
                    </label>
                    <input
                      type="text"
                      className="gift-inner-card-input"
                      onChange={(e) => setCode(e.target.value)}
                      value={code}
                    />
                  </div>
                  <button
                    className={`gift-btn capitalize ${
                      !code && "cursor-not-allowed"
                    }`}
                    data-toggle="modal"
                    data-target="#giftCardModal"
                    disabled={code ? false : true}
                    onClick={handleGiftCard}
                  >
                    {t(activeBtn)}
                  </button>
                </div>
                <p className="gift-font-color line-16 my-3 text-12">
                  {activeBtn === "redeem" && gif_card_redeem_description}
                  {activeBtn === "add" && gif_card_add_card_description}
                  {activeBtn === "check" && gif_card_check_card_description}
                </p>
              </div>
            </div>
            <div className="col-lg-6 grid">
              <ImageComponent
                src={banner || "/demo_gift_banner.png"}
                height={300}
              />{" "}
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <GiftCardModal
          activeBtn={activeBtn}
          setIsModalOpen={setIsModalOpen}
          giftCardData={giftCardData}
          handleGiftCardSubmit={handleGiftCardSubmit}
        />
      )}
    </>
  );
}
