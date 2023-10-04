import { NoItemFound } from "components/NoItemFound/NoItemFound";
import P2PGiftCardHeader from "components/P2P/p2p-gift-card/p2p-gift-card-header/P2PGiftCardHeader";
import P2PGiftCardNavbar from "components/P2P/p2p-gift-card/p2p-gift-card-navbar/P2PGiftCardNavbar";
import ImageComponent from "components/common/ImageComponent";
import SectionLoading from "components/common/SectionLoading";
import MyCardModal from "components/gift-cards/modal/MyCardModal";
import P2PGiftCardSingleModal from "components/gift-cards/modal/P2PGiftCardSingleModal";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { getP2PGiftCardListsApi } from "service/p2pGiftCards";

const limit = 10;
export default function Index() {
  const [loading, setLoading] = useState(false);
  const [myCards, setMyCards] = useState<any>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [giftCardData, setGiftCardData] = useState({});
  useEffect(() => {
    getP2PGiftCardLists(limit, 1);
  }, []);

  const getP2PGiftCardLists = async (limit: any, page: any) => {
    setLoading(true);

    const data = await getP2PGiftCardListsApi(limit, page);
    setLoading(false);
    if (!data.success) {
      toast.error(data.message);
      return;
    }
    setMyCards(data.data);
  };

  const handlePageClick = (event: any) => {
    getP2PGiftCardLists(limit, event.selected + 1);
  };

  const myCardHandle = (cardData: any) => {
    setGiftCardData(cardData);
    setIsModalOpen(true);
  };


  return (
    <section>
      {/* second nav */}
      <P2PGiftCardNavbar />

      <P2PGiftCardHeader title={"Gift Card Lists"} />
      {/* item part */}

      <div className="container">
        {loading ? (
          <SectionLoading />
        ) : (
          <div className="table-responsive mt-5">
            {myCards?.data?.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Image</th>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myCards?.data?.map((item: any, index: number) => (
                    <tr className="tableRow" key={index}>
                      <td>
                        <ImageComponent
                          src={item.banner.image || "/demo_gift_banner.png"}
                          height={200}
                        />
                      </td>
                      <td>{item.banner.title}</td>
                      <td>
                        {parseFloat(item.amount).toFixed(8)} {item.coin_type}
                      </td>
                      <td>
                        <Link href={`/p2p/gift-card/create-ads/${item.id}`}>
                          <a className="tableButton p2p-gift-card-adds-margin-right">
                            Create Ads
                          </a>
                        </Link>

                        <span className="tableButton pointer" onClick={() => myCardHandle(item)}>Details</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="my-5">
                <NoItemFound />
              </div>
            )}
          </div>
        )}
        <div className="row justify-content-center my-5">
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
      {isModalOpen && (
        <P2PGiftCardSingleModal
          giftCardData={giftCardData}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </section>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/p2p/gift-card");
  return {
    props: {},
  };
};
