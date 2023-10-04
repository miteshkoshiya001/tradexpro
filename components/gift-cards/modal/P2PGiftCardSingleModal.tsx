import ImageComponent from "components/common/ImageComponent";
import request from "lib/request";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { BsGiftFill } from "react-icons/bs";

export default function P2PGiftCardSingleModal({
  setIsModalOpen,
  giftCardData,
}: any) {
  const { t } = useTranslation();

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
            </div>
          </div>
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
