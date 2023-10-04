import BackButton from "components/P2P/BackButton";
import P2PGiftCardHeader from "components/P2P/p2p-gift-card/p2p-gift-card-header/P2PGiftCardHeader";
import P2PGiftCardNavbar from "components/P2P/p2p-gift-card/p2p-gift-card-navbar/P2PGiftCardNavbar";
import { CUstomSelect } from "components/common/CUstomSelect";
import ImageComponent from "components/common/ImageComponent";
import SectionLoading from "components/common/SectionLoading";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { BsGiftFill } from "react-icons/bs";
import { TfiHandPointRight } from "react-icons/tfi";
import { toast } from "react-toastify";
import {
  buyP2PGiftCardAdsApi,
  getGiftCardAdsDetailsForBuyApi,
} from "service/p2pGiftCards";

const options = [{ value: 1, label: "Payment 1" }];

export default function Index() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [adsDetails, setAdsDetails] = useState<any>({});
  const [selectedPayment, setSelectedPayment] = useState<any>({});
  const { t } = useTranslation();
  useEffect(() => {
    getGiftCardAdsDetailsForBuy();
  }, []);

  const getGiftCardAdsDetailsForBuy = async () => {
    setLoading(true);
    const data = await getGiftCardAdsDetailsForBuyApi(router?.query?.uid);
    setLoading(false);

    if (!data.success) {
      toast.error(data.message);
      return;
    }

    setAdsDetails(data.data);
  };

  const buyGiftCardHandler = async () => {
    if (
      Number(adsDetails?.payment_currency_type) === 1 &&
      Object.keys(selectedPayment).length === 0
    ) {
      toast.error("Select Payment Method");
      return;
    }
    let params: any = {
      gift_card_id: adsDetails?.id,
    };
    if (Number(adsDetails?.payment_currency_type) === 1) {
      params = {
        gift_card_id: adsDetails?.id,
        payment_method_uid: selectedPayment?.value,
      };
    }
    const data = await buyP2PGiftCardAdsApi(params);
    if (!data.success) {
      toast.error(data.message);
      return;
    }
    toast.success(data.message);
    router.push(`/p2p/gift-card/ads/buy/${data?.data?.order_uid}`);
  };

  return (
    <section>
      <P2PGiftCardNavbar />

      <P2PGiftCardHeader title={"Gift Card Add Details"} />
      <div className="container">
        <div className="row p-5 boxShadow mt-5 mb-5">
          <div className="col-12">
            <div className="mt-3 mb-3">
              <BackButton />
            </div>
            <h1 className="ny-3">{t("Details")}</h1>
          </div>
          {loading ? (
            <SectionLoading />
          ) : (
            <>
              <div className="col-md-6 col-12 ">
                <div className=" py-4 rounded">
                  <div className="tableImg d-flex align-items-center">
                    <img
                      src="https://api-tradex.nftarttoken.xyz/images/avatars/yellow-hat.png"
                      alt=""
                    />
                    <h5>
                      {adsDetails?.user?.first_name}{" "}
                      {adsDetails?.user?.last_name}
                    </h5>
                  </div>
                  <div className="row pt-4">
                    <div className="col-12">
                      <div className="gift-card-banner-section-bottom-border">
                        <div className="relative">
                          <ImageComponent
                            src={
                              adsDetails?.gift_card?.banner?.banner ||
                              "/demo_gift_banner.png"
                            }
                            height={300}
                          />{" "}
                          <div>
                            <div className="d-flex gap-10 buy-absolute-btn">
                              <BsGiftFill size={22} />
                              <h4>{`${parseFloat(
                                adsDetails?.gift_card?.amount
                              )} ${adsDetails?.gift_card?.coin_type}`}</h4>
                            </div>
                          </div>
                        </div>
                        <div className="mt-5 mb-4">
                          <h3 className="mb-3">
                            {adsDetails?.gift_card?.banner?.title}
                          </h3>
                          <h5 className="font-normal">
                            {adsDetails?.gift_card?.banner?.sub_title}
                          </h5>
                        </div>
                      </div>
                      <div className="d-flex align-items-center">
                        <p>Price</p>
                        <h6 className="pl-3 text-warning">
                          {parseFloat(adsDetails?.price)}{" "}
                          {adsDetails?.currency_type}
                        </h6>
                      </div>
                      <div className="d-flex align-items-center">
                        <p>{t("Available")}</p>
                        <h6 className="pl-3">
                          {parseFloat(adsDetails?.gift_card?.amount)}{" "}
                          {adsDetails?.gift_card?.coin_type}
                        </h6>
                      </div>
                      <div className="d-flex align-items-center">
                        <p>({t("Payment Time Limit")})</p>
                        <h6 className="pl-3">
                          {adsDetails?.time_limit} {t("Minutes")}
                        </h6>
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="pt-5">
                        <h5>{t("Terms and Conditions")}</h5>
                        <div className="d-flex align-items-center p2pTerms pt-3">
                          <TfiHandPointRight />
                          <p>{adsDetails?.terms_condition}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {Number(adsDetails?.payment_currency_type === 1) ? (
                <div className="col-md-6 col-12 mt-4">
                  <div>
                    <label className="pt-3">Select payment method</label>

                    <CUstomSelect
                      options={adsDetails?.payment_methods}
                      handleFunction={setSelectedPayment}
                    />
                  </div>
                </div>
              ) : null}

              <div className="col-12">
                <div className="mt-3">
                  <button
                    className="primary-btn-outline"
                    onClick={buyGiftCardHandler}
                  >
                    Buy
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/p2p/gift-card");
  return {
    props: {},
  };
};
