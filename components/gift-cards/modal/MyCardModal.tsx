import ImageComponent from "components/common/ImageComponent";
import request from "lib/request";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { BsGiftFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { getRedeemCodeApi, giftCardUpdateApi } from "service/gift-cards";

export default function MyCardModal({
  setIsModalOpen,
  giftCardData,
  sendCryptoCardModalHandler,
  modalFunc,
  isHome,
}: any) {
  const { t } = useTranslation();
  const [redeemCode, setRedeemCode] = useState("");
  const changeStatusGiftCard = async () => {
    let buyDetails: any = {
      card_uid: giftCardData.uid,
      lock: giftCardData._lock == 1 ? 0 : 1,
    };
    if (isHome) {
      buyDetails = {
        card_uid: giftCardData.uid,
        lock: giftCardData._lock == 1 ? 0 : 1,
        from: "home",
      };
    }
    const data = await giftCardUpdateApi(buyDetails);
    if (data.success) {
      toast.success(data.message);
      setIsModalOpen(false);
      if (isHome) {
        modalFunc(data.data.my_cards);
        return;
      }
      modalFunc();
    } else {
      toast.error(data.message);
      setIsModalOpen(false);
    }
  };

  const seeRedeemCodeHandler = async () => {
    let userPass = prompt("Please enter password");
    if (userPass === null) return;

    const data = await getRedeemCodeApi(giftCardData.uid, userPass);

    if (!data.success) {
      toast.error(data.message);
      setRedeemCode("");
      return;
    }
    toast.success(data.message);
    setRedeemCode(data.data.redeem_code);
  };
  return (
    <div id="demo-modal" className="gift-card-modal">
      <div className="gift-card-modal__content p-5">
        <h2>{t(`Gift Card Details`)}</h2>

        <div className="row my-5">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="">
              <div className="relative">
                <ImageComponent
                  src={giftCardData?.banner?.image || "/demo_gift_banner.png"}
                  height={300}
                />{" "}
                <div>
                  <div className="d-flex gap-10 buy-absolute-btn">
                    <BsGiftFill size={22} />
                    <h4>{`${parseFloat(giftCardData?.amount)} ${
                      giftCardData?.coin_type
                    }`}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12 my-card-modal-margin">
            <h3 className="mb-3">{t(giftCardData?.banner?.title)}</h3>
            <h5 className="font-normal">
              {t(giftCardData?.banner?.sub_title)}
            </h5>
            <div className="mt-3">
              <p>
                <strong>{t(`Coin Type:`)} </strong> {t(giftCardData?.coin_type)}
              </p>
              <p>
                <strong>{t(`Category:`)} </strong>{" "}
                {t(giftCardData?.banner?.category?.name)}
              </p>
              {giftCardData?.lock && (
                <p>
                  <strong>{t(`Lock:`)} </strong> {t(giftCardData?.lock)}
                </p>
              )}

              {giftCardData?.wallet_type && (
                <p>
                  <strong>{t(`Wallet Type:`)} </strong>{" "}
                  {t(giftCardData?.wallet_type)}
                </p>
              )}

              <p>
                <strong>{t(`Status:`)} </strong>{" "}
                {t(giftCardData?.status ?? "Active")}
              </p>
              <div className="d-flex align-items-center gap-10">
                <p>
                  <strong>{t(`Redeem Code:`)} </strong>
                </p>
                {redeemCode !== "" ? (
                  <>
                    <b>{redeemCode}</b>
                    <span
                      className="btn bg-primary-color capitalize p-1"
                      onClick={() => {
                        navigator.clipboard.writeText(redeemCode);
                        toast.success("Successfully copied");
                      }}
                    >
                      {t("Copy Code")}
                    </span>
                  </>
                ) : (
                  <span
                    className="btn bg-primary-color capitalize p-1"
                    onClick={seeRedeemCodeHandler}
                  >
                    {t("See Code")}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="text-right">
          {Number(giftCardData.lock_status) === 1 && (
            <button
              type="button"
              className="btn bg-primary-color capitalize mr-4"
              onClick={changeStatusGiftCard}
            >
              {Number(giftCardData._lock) === 0 ? t("Locked") : t("Unlocked")}
            </button>
          )}
          {giftCardData._status == 1 && (
            <button
              type="button"
              className="btn bg-primary-color capitalize my-card-modal-btn"
              onClick={sendCryptoCardModalHandler}
            >
              {t("Send crypto gift card")}
            </button>
          )}
        </div>

        <span
          className="gift-card-modal__close text-45 pointer"
          onClick={() => setIsModalOpen(false)}
        >
          &times;
        </span>
      </div>
    </div>
  );
}
