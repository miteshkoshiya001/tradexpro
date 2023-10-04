import { NoItemFound } from "components/NoItemFound/NoItemFound";
import ImageComponent from "components/common/ImageComponent";
import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
type item = {
  banner: string;
  uid: string;
};

export default function ThemedGiftCardSection({ giftCards }: any) {
  const { t } = useTranslation();
  const {isLoggedIn } = useSelector(
    (state: RootState) => state.user
  );
  return (
    <div className="py-80">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="d-flex justify-content-between">
              <div>
                <h3>{t("Themed Gift Cards")}</h3>
                <small>{t("Send a crypto gift card for any occasion")}</small>
              </div>
              <div>
                <Link href={`/gift-cards/theme-cards`}>
                  <a className="d-flex align-items-center">
                    <span className="inline-block pr-2">
                      {t("View All Cards")}
                    </span>
                    <span className="gift-card-arrow">
                      <BsArrowRight />
                    </span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {giftCards?.length > 0 ? (
          <>
            <div className="row mt-3">
              {giftCards.map((item: item, index: number) => (
                <div className="col-lg-3 col-md-4 col-6 my-1" key={index}>
                  <Link href={isLoggedIn ? `/gift-cards/buy/${item.uid}`: '/signin' }>
                    <a>
                      <ImageComponent
                        src={item.banner || "/demo_gift_banner.png"}
                        height={300}
                      />
                    </a>
                  </Link>
                </div>
              ))}
            </div>
            <div className="row mt-4">
              <div className="col-md-12">
                <div className="d-flex justify-content-center align-items-center">
                  <Link href={`/gift-cards/theme-cards`}>
                    <a className="gift-btn bg-primary-color border-primary-color">
                      {t("View More Theme Gift Cards")} <BsArrowRight />{" "}
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="mt-4">
            <NoItemFound />
          </div>
        )}
      </div>
    </div>
  );
}
