import { NoItemFound } from "components/NoItemFound/NoItemFound";
import P2PGiftCardHeader from "components/P2P/p2p-gift-card/p2p-gift-card-header/P2PGiftCardHeader";
import P2PGiftCardNavbar from "components/P2P/p2p-gift-card/p2p-gift-card-navbar/P2PGiftCardNavbar";
import { CUstomSelect } from "components/common/CUstomSelect";
import ImageComponent from "components/common/ImageComponent";
import SectionLoading from "components/common/SectionLoading";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import { getP2PGiftCardOrderListsApi } from "service/p2pGiftCards";

const options = [
  { value: "all", label: "All" },
  { value: 0, label: "Time Expierd " },
  { value: 1, label: "Escrow" },
  { value: 2, label: "Payment Done" },
  { value: 3, label: "Transfer Done" },
  { value: 5, label: "Disputed" },
  { value: 4, label: "Canceled" },
  { value: 6, label: "Refunded By Admin" },
  { value: 7, label: "Released By Admin" },
];

const limit = 10;
export default function Index() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<any>({});
  const [selectStatus, setSelectStatus] = useState(options[0]);

  useEffect(() => {
    getP2PGiftCardLists(limit, 1, selectStatus.value);
  }, [selectStatus]);

  const getP2PGiftCardLists = async (limit: any, page: any, status: any) => {
    setLoading(true);

    const data = await getP2PGiftCardOrderListsApi(limit, page, status);
    setLoading(false);
    if (!data.success) {
      toast.error(data.message);
      return;
    }
    setOrders(data.data);
  };

  const handlePageClick = (event: any) => {
    getP2PGiftCardLists(limit, event.selected + 1, selectStatus.value);
  };
  return (
    <section>
      {/* second nav */}
      <P2PGiftCardNavbar />

      <P2PGiftCardHeader title={"Order Lists"} />
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
            {orders?.data?.length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Order Id</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Price</th>
                    <th scope="col">Status</th>
                    <th scope="col">Operation</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.data?.map((item: any, index: number) => (
                    <tr className="tableRow" key={index}>
                      <td>{item.order_id}</td>
                      <td>
                        {parseFloat(item.amount)}{" "}
                        {item?.p_gift_card?.gift_card?.coin_type}
                      </td>
                      <td>
                        {parseFloat(item.price)} {item.currency_type}
                      </td>
                      <td>{item.status_name}</td>
                      <td>
                        <Link href={`/p2p/gift-card/ads/buy/${item.uid}`}>
                          <a className="tableButton">Details</a>
                        </Link>
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
            pageCount={Math.ceil(orders.total / limit)}
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