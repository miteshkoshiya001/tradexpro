import { BuyFrom } from "./BuyFrom";
import { useState } from "react";
import Link from "next/link";
import { NoItemFound } from "components/NoItemFound/NoItemFound";
import { BUY } from "helpers/core-constants";
import { RootState } from "state/store";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

export const P2pDataTable = ({
  history,
  filters,
  isLoggedIn,
  action = true,
  payment = true,
  edit = false,
}: any) => {
  const router = useRouter();
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="table-responsive">
          {history?.length <= 0 || !history ? (
            <NoItemFound />
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Advertisers</th>
                  <th scope="col">Price</th>
                  <th scope="col">Limit/Available</th>
                  {payment === true && <th scope="col">Payment</th>}
                  {action === true && <th scope="col">Trade</th>}
                  {edit === true && <th scope="col">Edit</th>}
                </tr>
              </thead>
              <tbody>
                {history?.map((item: any, index: any) => (
                  <tr className="tableRow" key={index}>
                    <td>
                      <Link href={"/p2p/profile/" + item?.user_id}>
                        <div className="tableImg d-flex align-items-center">
                          <img src={item?.user?.photo} alt="" />
                          <h5>{item?.user?.nickname}</h5>
                        </div>
                      </Link>
                    </td>
                    <td className="d-flex">
                      <h5 className="mr-1">
                        {parseFloat(item?.price).toFixed(2)}
                      </h5>{" "}
                      {item?.currency}
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <small className="mr-2">Available</small>
                        <h6 className="limitBalance">
                          {item?.available} {item?.coin_type}
                        </h6>
                      </div>
                      <div className="d-flex align-items-center">
                        <small className="mr-2">Limit</small>
                        <h6 className="limitBalance">
                          {item?.minimum_trade_size} {item?.currency}-
                          {item?.maximum_trade_size} {item?.currency}
                        </h6>
                      </div>
                    </td>
                    {payment && (
                      <td>
                        {item?.payment_method_list?.map(
                          (payment: any, index: any) => (
                            <span
                              className="badge badge-light mr-2"
                              key={index}
                            >
                              {payment?.admin_pamynt_method?.name}
                            </span>
                          )
                        )}
                      </td>
                    )}

                    {action === true && (
                      <td>
                        {isLoggedIn === true && (
                          <Link
                            href={`/p2p/details/${item.uid}?adtype=${filters.type}`}
                          >
                            <button className="tableButton">
                              {filters.type === BUY ? "Buy" : "Sell"}{" "}
                              {item.coin_type}
                            </button>
                          </Link>
                        )}
                      </td>
                    )}
                    {edit === true && (
                      <td>
                        {isLoggedIn === true && (
                          // <Link
                          //   href={`/p2p/add-post?uid=${item.uid}&&ads_type=${filters.type}`}
                          // >
                          <button
                            onClick={async () => {
                              await router.push(
                                `/p2p/add-post?uid=${item.uid}&&ads_type=${filters.type}`
                              );
                              await router.reload();
                            }}
                            className="tableButton"
                          >
                            Edit
                          </button>
                          // </Link>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
