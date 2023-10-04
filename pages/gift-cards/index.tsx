import ImageComponent from "components/common/ImageComponent";
import Footer from "components/common/footer";
import GiftCardFaqLists from "components/gift-cards/faq/GiftCardFaqLists";
import GiftCardsFaq from "components/gift-cards/faq/GiftCardsFaq";
import MainBannerSection from "components/gift-cards/main-banner/MainBannerSection";
import MyCards from "components/gift-cards/my-cards/MyCards";
import SecondBannerSection from "components/gift-cards/second-banner/SecondBannerSection";
import ThemedGiftCardSection from "components/gift-cards/themed-gift-card/ThemedGiftCardSection";
import request from "lib/request";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import { parseCookies } from "nookies";
import React, { useState } from "react";
import { BsArrowRight } from "react-icons/bs";
import { GrFormAdd } from "react-icons/gr";
import { getGiftCardsData } from "service/gift-cards";

export default function Index({ giftCards }: any) {
  const {
    header,
    description,
    banner,
    second_header,
    second_description,
    second_banner,
    banners,
    my_cards,
    faq,
    gif_card_redeem_description,
    gif_card_add_card_description,
    gif_card_check_card_description
  } = giftCards || {};
  const { t } = useTranslation("common");
  const [myCards, setMyCards] = useState(my_cards);
  const hanldeMyCards = (cards: any) => {
    setMyCards(cards);
  }
  return (
    <section>
      {/* gift card banner start */}
      <MainBannerSection
        header={header}
        description={description}
        banner={banner}
        gif_card_redeem_description={gif_card_redeem_description}
        gif_card_add_card_description={gif_card_add_card_description}
        gif_card_check_card_description={gif_card_check_card_description}
      />
      {/* gift card banner end */}

      {/* Themed Gift Cards start */}
      <ThemedGiftCardSection giftCards={banners} />
      {/* Themed Gift Cards end */}

      {/* my gift card  start*/}
      <MyCards myCards={myCards} hanldeMyCards={hanldeMyCards}/>
      {/* my gift card  end*/}

      {/* feature section start*/}
      <SecondBannerSection
        second_header={second_header}
        second_description={second_description}
        second_banner={second_banner}
      />
      {/* feature section end*/}

      {/* faq section start*/}
      <GiftCardFaqLists faqLists={faq} />
      {/* faq section end*/}
      <Footer />
    </section>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  const cookies = parseCookies(ctx);
  const { data: giftCards } = await getGiftCardsData(cookies.token);
  return {
    props: {
      giftCards,
    },
  };
};
