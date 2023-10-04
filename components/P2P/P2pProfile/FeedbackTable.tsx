import { NoItemFound } from "components/NoItemFound/NoItemFound";
import { useState } from "react";
import { GoPlus } from "react-icons/go";

export const FeedbackTable = ({ details }: any) => {
  const [active, setActive] = useState(0);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="paymentMethodBox mt-4 rounded shadow-sm">
            <div className="row">
              <div className="col-12">
                <ul className="d-flex p2pTabList py-3 tableRow userProfileBg px-4">
                  <li>
                    <a
                      className={`${active === 0 && "p2pOrderTabListActive"}`}
                      onClick={() => {
                        setActive(0);
                      }}
                    >
                      All
                    </a>
                  </li>
                  <li>
                    <a
                      className={`${active === 1 && "p2pOrderTabListActive"}`}
                      onClick={() => {
                        setActive(1);
                      }}
                    >
                      Positive
                    </a>
                  </li>
                  <li>
                    <a
                      className={`${active === 2 && "p2pOrderTabListActive"}`}
                      onClick={() => {
                        setActive(2);
                      }}
                    >
                      Negative
                    </a>
                  </li>
                </ul>
                {active === 0 && (
                  <>
                    {details?.feedback_list?.length === 0 && (
                      <NoItemFound msg="No review found" />
                    )}
                    <div className="p-4 row">
                      {details?.feedback_list?.map(
                        (list: any) =>
                          list.feedback && (
                            <div className=" col-sm-12 col-md-6 mt-3">
                              <div className="single-feedback">
                                <div className="d-flex gap-10 align-items-center justify-content-between mb-3">
                                  <div className="d-flex gap-10 align-items-center">
                                    <img
                                      src={list?.user_img}
                                      width={30}
                                      height={30}
                                      className="rounded-circle"
                                      alt=""
                                    />
                                    <p>{list?.user_name}</p>
                                  </div>
                                  {parseInt(list.feedback_type) === 1 ? (
                                    <p>
                                      <span className="feedback-status positive">
                                        Positive
                                      </span>
                                    </p>
                                  ) : (
                                    <p>
                                      <span className="feedback-status negetive">
                                        Negetive
                                      </span>
                                    </p>
                                  )}
                                </div>
                                <p>{list?.feedback}</p>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </>
                )}
                {active === 1 && (
                  <>
                    {details?.positive_feedback_list?.length === 0 && (
                      <NoItemFound msg="No review found" />
                    )}
                    <div className="p-4 row">
                      {details?.feedback_list?.map(
                        (list: any) =>
                          list.feedback && (
                            <div className=" col-sm-12 col-md-6 mt-3">
                              <div className="single-feedback">
                                <div className="d-flex gap-10 align-items-center justify-content-between mb-3">
                                  <div className="d-flex gap-10 align-items-center">
                                    <img
                                      src={list?.user_img}
                                      width={30}
                                      height={30}
                                      className="rounded-circle"
                                      alt=""
                                    />
                                    <p>{list?.user_name}</p>
                                  </div>
                                  <p>
                                    <span className="feedback-status positive">
                                      Positive
                                    </span>
                                  </p>
                                </div>
                                <p>{list?.feedback}</p>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </>
                )}
                {active === 2 && (
                  <>
                    {details?.negative_feedback_list?.length === 0 && (
                      <NoItemFound msg="No review found" />
                    )}
                    <div className="p-4 row">
                      {details?.feedback_list?.map(
                        (list: any) =>
                          list.feedback && (
                            <div className=" col-sm-12 col-md-6 mt-3">
                              <div className="single-feedback">
                                <div className="d-flex gap-10 align-items-center justify-content-between mb-3">
                                  <div className="d-flex gap-10 align-items-center">
                                    <img
                                      src={list?.user_img}
                                      width={30}
                                      height={30}
                                      className="rounded-circle"
                                      alt=""
                                    />
                                    <p>{list?.user_name}</p>
                                  </div>

                                  <p>
                                    <span className="feedback-status negetive">
                                      Negetive
                                    </span>
                                  </p>
                                </div>
                                <p>{list?.feedback}</p>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
