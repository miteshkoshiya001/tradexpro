import Link from "next/link";
import React, { useState } from "react";
import { GoPlus } from "react-icons/go";
import {
  deletePaymentMethodsAction,
  getPaymentMethodsAction,
} from "state/actions/p2p";

export const PaymentTable = () => {
  const [sortingInfo, setSortingInfo] = useState<any>({
    column_name: "created_at",
    order_by: "desc",
  });
  const [processing, setProcessing] = useState<boolean>(false);
  const [history, setHistory] = useState<any>([]);
  const [stillHistory, setStillHistory] = useState<any>([]);
  const LinkTopaginationString = (page: any) => {
    const url = page.url.split("?")[1];
    const number = url.split("=")[1];
    getPaymentMethodsAction(
      10,
      parseInt(number),
      setHistory,
      setProcessing,
      setStillHistory
    );
  };
  const getReport = async () => {
    getPaymentMethodsAction(10, 1, setHistory, setProcessing, setStillHistory);
  };
  React.useEffect(() => {
    getReport();
    return () => {
      setHistory([]);
    };
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <ul className="d-flex p2pTabList py-3 tableRow">
            <li>
              <a className="p2pOrderTabListActive" href="">
                P2P Payment Methods
              </a>
            </li>
          </ul>
        </div>
        <div className="col-12">
          <div className="paymentMethodBox p-4 mt-3 rounded shadow-sm">
            <div className="row d-flex align-items-center justify-content-between">
              <div className="col-md-7">
                <h5>P2P Payment Methods</h5>
              </div>
              <div className="col-md-5 text-right">
                <Link href={"/p2p/add-payment-method"}>
                  <button className="orderFilterNoButton border-0 text-warning shadow-sm rounded px-3 ml-0 ml-md-4 mt-4 mt-md-0 ">
                    <GoPlus className="mr-2" /> Add a payment method
                  </button>
                </Link>
              </div>
              <div className="col-12 ">
                <div className="paymentMethodSubBox rounded mt-4">
                  {history.map((item: any, index: any) => (
                    <div
                      className="userProfileBg px-3 py-2 my-3 d-flex align-items-center justify-content-between"
                      key={index}
                    >
                      <div className="paymentBox d-flex align-items-center border-0">
                        <div></div>
                        {item?.admin_pamynt_method?.name}
                      </div>
                      <div>
                        <Link
                          href={
                            "/p2p/add-payment-method?edit=true&uid=" + item?.uid
                          }
                          className="paymentBox border-0"
                        >
                          <b>Edit</b>
                        </Link>
                        <a
                          onClick={() => {
                            deletePaymentMethodsAction(
                              10,
                              1,
                              setHistory,
                              setProcessing,
                              setStillHistory,
                              item?.uid
                            );
                          }}
                          className="paymentBox border-0 ml-4"
                        >
                          <b>Delete</b>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
