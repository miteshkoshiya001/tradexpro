import { NoItemFound } from "components/NoItemFound/NoItemFound";
import P2PGiftCardHeader from "components/P2P/p2p-gift-card/p2p-gift-card-header/P2PGiftCardHeader";
import P2PGiftCardNavbar from "components/P2P/p2p-gift-card/p2p-gift-card-navbar/P2PGiftCardNavbar";
import { CUstomSelect } from "components/common/CUstomSelect";
import ImageComponent from "components/common/ImageComponent";
import SectionLoading from "components/common/SectionLoading";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import moment from "moment";
import { GetServerSideProps } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import {
  getMyGiftCardAdsListsApi,
  handleAdsDeleteApi,
} from "service/p2pGiftCards";

const limit = 10;
const options = [
  { value: "all", label: "All" },
  { value: 0, label: "Deactive" },
  { value: 1, label: "Active" },
  { value: 2, label: "Success" },
  { value: 3, label: "Canceled" },
  { value: 4, label: "Ongoing" },
];

export default function Index() {
  const [loading, setLoading] = useState(false);
  const [myCards, setMyCards] = useState<any>({});
  const [selectStatus, setSelectStatus] = useState(options[0]);
  const router = useRouter();

  useEffect(() => {
    getMyGiftCardAdsLists(limit, 1, selectStatus.value);
  }, [selectStatus]);

  const getMyGiftCardAdsLists = async (limit: any, page: any, status: any) => {
    setLoading(true);

    const data = await getMyGiftCardAdsListsApi(limit, page, status);
    setLoading(false);
    if (!data.success) {
      toast.error(data.message);
      return;
    }
    setMyCards(data.data);
  };

  const handlePageClick = (event: any) => {
    getMyGiftCardAdsLists(limit, event.selected + 1, selectStatus.value);
  };

  const handleAdsDelete = async (ads_id: any) => {
    const confirm = window.confirm("Are you sure you want to proceed?");
    if (!confirm) return;
    const data = await handleAdsDeleteApi(ads_id);
    if (!data.success) {
      toast.error(data.message);
      return;
    }
    toast.success(data.message);
    getMyGiftCardAdsLists(limit, 1, selectStatus.value);
  };
  const handleAdsEdit = (ads_uid: any) => {
    router.push(`/p2p/gift-card/edit-ads/${ads_uid}`);
  };

  return (
    <section>
      {/* second nav */}
      <P2PGiftCardNavbar />

      <P2PGiftCardHeader title={"My Gift Card Ads"} />
      {/* item part */}

      <div className="container">
        <div className="col-md-3">
          <div className="form-group p2pSelectFilter">
            <label> Payment Type</label>
            <CUstomSelect
              options={options}
              handleFunction={setSelectStatus}
              defaultValue={options[0]}
            />
          </div>
        </div>
        {loading ? (
          <SectionLoading />
        ) : (
          <div className="table-responsive mt-5">
            {myCards?.data?.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Price</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created At</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myCards?.data?.map((item: any, index: number) => (
                    <tr className="tableRow" key={index}>
                      <td>
                        {parseFloat(item.price).toFixed(8)} {item.currency_type}
                      </td>
                      <td>
                        {parseFloat(item.amount).toFixed(8)}{" "}
                        {item.gift_card.coin_type}
                      </td>
                      <td>{item.status_name}</td>
                      <td>{moment(item?.created_at).calendar()}</td>

                      <td>
                        {(item.status == 1 || item.status == 0) && (
                          <>
                            <button
                              className="tableButton p2p-gift-card-adds-margin-bottom p2p-gift-card-adds-margin-right"
                              onClick={() => handleAdsEdit(item.uid)}
                            >
                              Edit
                            </button>
                            <button
                              className="tableButton bg-card-primary-color"
                              onClick={() => handleAdsDelete(item.id)}
                            >
                              Delete
                            </button>
                          </>
                        )}
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
    </section>
  );
}
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/p2p/gift-card");
  return {
    props: {},
  };
};
