import { CUstomSelect } from "components/common/CUstomSelect";
import ImageComponent from "components/common/ImageComponent";
import MyCardModal from "components/gift-cards/modal/MyCardModal";
import SendCryptoCardModal from "components/gift-cards/modal/SendCryptoCardModal";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Footer from "components/common/footer";
import { NoItemFound } from "components/NoItemFound/NoItemFound";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import SectionLoading from "components/common/SectionLoading";
import { getMyCardPageData, getMyCards } from "state/actions/giftCards";

const options = [
  { value: "all", label: "All" },
  { value: "1", label: "Active" },
  { value: "2", label: "Redeemed" },
  { value: "3", label: "Transfared" },
  { value: "4", label: "Trading" },
  { value: "5", label: "Locked" },
];
const limit = 9;
export default function Index() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [myCards, setMyCards] = useState<any>({});
  const [pageData, setPageData] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [giftCardData, setGiftCardData] = useState({});
  const [activeStatus, setActiveStatus] = useState("all");
  const [isSendCryptoCardModalOpen, setIsSendCryptoCardModalOpen] =
    useState(false);

  useEffect(() => {
    getMyCardPageData(setPageData);
    getMyCards("all", limit, 1, setLoading, setMyCards);
  }, []);

  const myCardHandle = (cardData: any) => {
    setGiftCardData(cardData);
    setIsModalOpen(true);
  };

  const sendCryptoCardModalHandler = () => {
    setIsSendCryptoCardModalOpen(true);
    setIsModalOpen(false);
  };

  const handleStatus = (event: any) => {
    if (activeStatus === event.value) return;
    getMyCards(event.value, limit, 1, setLoading, setMyCards);
    setActiveStatus(event.value);
  };

  const handlePageClick = (event: any) => {
    getMyCards(activeStatus, limit, event.selected + 1, setLoading, setMyCards);
  };

  const handleModalData = () => {
    getMyCards(activeStatus, limit, 1, setLoading, setMyCards);
  };

  return (
    <section>
      {/* gift card banner start */}
      <div className="bg-card-primary-color py-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 d-flex align-items-center justify-content-center">
              <div>
                <h1 className="text-45 text-capitalize font-bold gift-font-color">
                  {t(pageData?.header || "My Cards")}
                </h1>
                <p className="my-3 gift-font-color font-medium text-16">
                  {t(
                    pageData?.description ||
                      "Tradexpro exchange is such a marketplace where people can trade directly with each other"
                  )}
                </p>
              </div>
            </div>
            <div className="col-lg-6 grid">
              <ImageComponent
                src={pageData?.banner || "/demo_gift_banner.png"}
                height={300}
              />{" "}
            </div>
          </div>
        </div>
      </div>
      {/* gift card banner end */}

      {/* Themed Gift Cards start */}
      <div className="py-80">
        <div className="container">
          <div className="row">
            <div className="col-lg-9 col-md-9 col-12">
              <div>
                <h3>{t(`My Cards`)}</h3>
                <small>{t(`Send a crypto gift card for any occasion`)}</small>
              </div>
            </div>

            <div className="col-lg-3 col-md-3 col-12">
              <div className="d-flex align-items-center gap-10 border px-2 rounded ">
                <span>
                  <b>{t(`Status:`)}</b>{" "}
                </span>
                <CUstomSelect
                  options={options}
                  classname={"themed-category-select-section w-full"}
                  handleFunction={handleStatus}
                  defaultValue={options[0]}
                />
              </div>
            </div>
          </div>
          {loading ? (
            <SectionLoading />
          ) : myCards?.data?.length > 0 ? (
            <>
              <div className="row mt-3">
                {myCards?.data?.map((item: any, index: number) => (
                  <div className="col-lg-4 my-3 pointer" key={index}>
                    <div
                      className="single-card h-full"
                      onClick={() => myCardHandle(item)}
                    >
                      <ImageComponent
                        src={item.banner.image || "/demo_gift_banner.png"}
                        height={300}
                      />
                      <div className="mt-4">
                        <h4>{t(item.banner.title)}</h4>
                        <p>{t(item.banner.sub_title)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mt-4">
              <NoItemFound />
            </div>
          )}
        </div>
        <div className="row justify-content-center mt-5">
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(myCards.total / limit)}
            previousLabel="<"
            renderOnZeroPageCount={null}
            className={`d-flex align-items-center justify-content-center`}
            pageLinkClassName={`paginate-number`}
            activeLinkClassName={`active-paginate-cls`}
            previousLinkClassName={`text-primary-color text-25 mr-2`}
            nextLinkClassName={`text-primary-color text-25 ml-2`}
          />
        </div>
      </div>

      {/* Themed Gift Cards end */}
      {isModalOpen && (
        <MyCardModal
          giftCardData={giftCardData}
          setIsModalOpen={setIsModalOpen}
          sendCryptoCardModalHandler={sendCryptoCardModalHandler}
          modalFunc={handleModalData}
          isHome={false}
        />
      )}
      {isSendCryptoCardModalOpen && (
        <SendCryptoCardModal
          setIsSendCryptoCardModalOpen={setIsSendCryptoCardModalOpen}
          giftCardData={giftCardData}
        />
      )}
      <Footer />
    </section>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/gift-cards");

  return {
    props: {},
  };
};
