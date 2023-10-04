import Footer from "components/common/footer";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { TradeSteps } from "components/P2P/Trade/AddPostStep";
import { SupportChat } from "components/Support/support-chat";
import {
  getGiftCardDetailsAction,
  payNowGiftCardOrderAction,
  PaymentConfirmGiftCardOrderAction,
  submitTradeFeedback,
  giftCardOrderFeedbackAction,
} from "state/actions/p2p";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { formateData } from "common";
import useTranslation from "next-translate/useTranslation";
import {
  BUY,
  NEGATIVE,
  POSITIVE,
  SELL,
  TRADE_STATUS_CANCELED,
  TRADE_STATUS_CANCELED_TIME_EXPIRED,
  TRADE_STATUS_ESCROW,
  TRADE_STATUS_PAYMENT_DONE,
  TRADE_STATUS_REFUNDED_BY_ADMIN,
  TRADE_STATUS_RELEASED_BY_ADMIN,
  TRADE_STATUS_TRANSFER_DONE,
} from "helpers/core-constants";
import Timer from "components/P2P/P2pHome/Timer";
import SectionLoading from "components/common/SectionLoading";

import { TradeChat } from "components/P2P/Trade/trade-chat";
import { sendMessageGift, sendMessageTrade } from "service/p2p";
import { useDispatch, useSelector } from "react-redux";
import { setP2pDetailsOrder, setTradeChat } from "state/reducer/user";
import { RootState } from "state/store";
import { GetServerSideProps } from "next";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { NoItemFound } from "components/NoItemFound/NoItemFound";
import { P2pTopBar } from "components/P2P/P2pHome/TopBar";
import BackButton from "components/P2P/BackButton";
import GiftCardTradeCancel from "components/P2P/P2pHome/GiftCardTradeCancel";
import P2PGiftCardNavbar from "components/P2P/p2p-gift-card/p2p-gift-card-navbar/P2PGiftCardNavbar";
import P2PGiftCardHeader from "components/P2P/p2p-gift-card/p2p-gift-card-header/P2PGiftCardHeader";
import TradeDisputeGift from "components/P2P/P2pHome/TradeDisputeGift";
import { toast } from "react-toastify";

let socketCall = 0;

const Trading = () => {
  const { t } = useTranslation("common");
  const inputRef = useRef(null);
  const { p2pDetails: details } = useSelector((state: RootState) => state.user);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [doc, setDoc] = useState(null);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<any>();
  const [feedbackType, setfeedbackType] = useState<any>(POSITIVE);
  const [step, setStep] = useState(0);
  const dispatch = useDispatch();
  const router = useRouter();
  const { uid }: any = router.query;
  const sendMessage = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("gift_card_order_id", details?.order?.id);
    message && formData.append("message", message);
    file?.name && formData.append("file", file);
    setMessage("");
    setFile(null);
    await sendMessageGift(formData);
  };
  async function listenMessages() {
    //@ts-ignore
    window.Pusher = Pusher;
    //@ts-ignore
    window.Echo = new Echo({
      broadcaster: "pusher",
      key: "test",
      wsHost: process.env.NEXT_PUBLIC_HOST_SOCKET,
      wsPort: process.env.NEXT_PUBLIC_WSS_PORT
        ? process.env.NEXT_PUBLIC_WSS_PORT
        : 6006,
      wssPort: 443,
      forceTLS: false,
      cluster: "mt1",
      disableStats: true,
      enabledTransports: ["ws", "wss"],
    });
    //@ts-ignore
    window.Echo.channel(
      `Order-Status-${localStorage.getItem("user_id")}-${uid}`
    ).listen(".OrderStatus", (e: any) => {
      dispatch(setP2pDetailsOrder(e.order));
    });
    //@ts-ignore
    window.Echo.channel(
      `New-Message-${localStorage.getItem("user_id")}-${uid}`
    ).listen(".Conversation", (e: any) => {
      dispatch(setTradeChat(e.data));
    });
    // channel: New - Message - { user_id } - { order_uid };
    // event: Conversation;
  }
  useEffect(() => {
    if (socketCall === 0 && uid) {
      listenMessages();
    }
    socketCall = 1;
  }, [socketCall, uid]);
  useEffect(() => {
    uid && getDetails();
  }, [uid]);
  const getDetails = () => {
    getGiftCardDetailsAction(uid.toString(), setStep, setLoading, dispatch);
  };
  const handleFileChange = (event: any) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    event;
    if (fileObj.size > 2 * 1024 * 1024) {
      toast.error(t("File size must be less than 2MB"));
      return;
    }
    setDoc(event.target.files[0]);
  };
  const handleClick = () => {
    // 👇️ open file input box on click of other element
    //@ts-ignore
    inputRef.current.click();
  };
  if (loading) {
    return (
      <div className="container w-100 h-100">
        <SectionLoading />
      </div>
    );
  }
  // if (details === null) {
  //   return (
  //     <div className="container w-100 h-100">
  //       <NoItemFound />
  //     </div>
  //   );
  // }
  return (
    <>
      <P2PGiftCardNavbar />
      <P2PGiftCardHeader title={`Gift Card Trade`} />
      <div className="my-trade-container mt-0">
        <div className="boxShadow p-4 mb-3">
          <BackButton />
          <div className="py-4">
            {details?.user_type === BUY && (
              <h1>
                {"Buy"} {details?.order?.coin_type} from{" "}
                {details?.user_seller?.nickname}
              </h1>
            )}

            {details?.user_type === SELL && (
              <h1>
                {"Sell"} {details?.order?.coin_type} to{" "}
                {details?.user_buyer?.nickname}
              </h1>
            )}
          </div>
          <div className="mb-3">
            <span className="mr-1">Order number</span>:{" "}
            <span className="badge badge-warning ">
              {details?.order?.order_id}
            </span>
          </div>
          <div className="mb-3">
            <span className="mr-1">Time Created</span>:{" "}
            <span className="badge badge-warning ">
              {formateData(details?.order?.created_at)}
            </span>
          </div>
          {/* order.status */}
          {details?.order < 4 && (
            <TradeSteps step={step} order={details?.order} />
          )}
          <div className="">
            <h4 className="mb-3">Confirm order info </h4>
            <div className="order-info ">
              <div className="">
                <p>Amount</p>
                <h4 className="">
                  {" "}
                  {parseFloat(details?.order?.amount).toFixed(8)}{" "}
                  {details?.order?.p_gift_card?.gift_card?.coin_type}
                </h4>
              </div>
              <div className="">
                <p>Price</p>
                <h4 className="">
                  {" "}
                  {parseFloat(details?.order?.price).toFixed(8)}{" "}
                  {details?.order?.currency_type}
                </h4>
              </div>
            </div>
          </div>
          {parseInt(details?.order?.is_reported) !== 0 && (
            <div className="boxShadow p-5 text-center mt-3">
              <h4 className="mb-3">Seller created dispute against order</h4>
            </div>
          )}
          {parseInt(details?.order?.status) === TRADE_STATUS_CANCELED && (
            <div className="boxShadow p-5 text-center mt-3">
              <h4 className="mb-3">Trade canceled</h4>
            </div>
          )}
          {parseInt(details?.order?.status) ===
            TRADE_STATUS_CANCELED_TIME_EXPIRED &&
            parseInt(details?.order?.is_reported) === 0 && (
              <div className="boxShadow p-5 text-center mt-3">
                <h4 className="mb-3">Trade time expired</h4>
              </div>
            )}
          {parseInt(details?.order?.status) ===
            TRADE_STATUS_REFUNDED_BY_ADMIN &&
            parseInt(details?.order?.is_reported) === 0 && (
              <div className="boxShadow p-5 text-center mt-3">
                <h4 className="mb-3">
                  Trade payment hasbeen refunded by admin
                </h4>
              </div>
            )}
          {parseInt(details?.order?.status) ===
            TRADE_STATUS_RELEASED_BY_ADMIN &&
            parseInt(details?.order?.is_reported) === 0 && (
              <div className="boxShadow p-5 text-center mt-3">
                <h4 className="mb-3">Trade hasbeen released by admin</h4>
              </div>
            )}
          {parseInt(details?.order?.is_reported) === 0 && (
            <>
              {details?.order?.status === TRADE_STATUS_ESCROW && (
                <>
                  {details.user_type === BUY && (
                    <>
                      {/* <div className="mt-4 badge badge-warning p-2">
                        Transfer the fund to the seller account provided below
                      </div> */}
                      <div>
                        {details?.payment_methods?.username && (
                          <div className="mb-3 mt-3">
                            <span className="mr-1">Account Name</span>:{" "}
                            <span className="badge badge-warning ">
                              {details?.payment_methods?.username}
                            </span>
                          </div>
                        )}
                        {details?.payment_methods?.admin_pamynt_method
                          ?.name && (
                          <div className="mb-3 mt-3">
                            <span className="mr-1">Payment Method Name</span>:{" "}
                            <span className="badge badge-warning ">
                              {
                                details?.payment_methods?.admin_pamynt_method
                                  ?.name
                              }
                            </span>
                          </div>
                        )}
                        {details?.payment_methods?.bank_name && (
                          <div className="mb-3">
                            <span className="mr-1">Bank Name</span>:{" "}
                            <span className="badge badge-warning ">
                              {details?.payment_methods?.bank_name}
                            </span>
                          </div>
                        )}
                        {details?.payment_methods?.bank_account_number && (
                          <div className="mb-3">
                            <span className="mr-1">Bank Account Number</span>
                            <span className="badge badge-warning ">
                              {details?.payment_methods?.bank_account_number}
                            </span>
                          </div>
                        )}
                        {details?.payment_methods?.card_number && (
                          <div className="mb-3">
                            <span className="mr-1">Card Number</span>
                            <span className="badge badge-warning ">
                              {details?.payment_methods?.card_number}
                            </span>
                          </div>
                        )}
                        {details?.payment_methods?.mobile_account_number && (
                          <div className="mb-3">
                            <span className="mr-1">Mobile Number</span>
                            <span className="badge badge-warning ">
                              {details?.payment_methods?.mobile_account_number}
                            </span>
                          </div>
                        )}
                      </div>
                      {details?.due_minute && (
                        <Timer
                          // endTime={details?.order?.payment_expired_time}
                          // current_time={details?.current_time}
                          getDetails={getDetails}
                          seconds={details?.due_minute}
                        />
                      )}
                      {details.order.payment_currency_type === 1 && (
                        <div className="swap-wrap mt-5">
                          <div className="">
                            <span className="file-lable">
                              {t("Select document")}
                            </span>
                          </div>
                          <div className="file-upload-wrapper">
                            {/* @ts-ignore */}
                            <label htmlFor="upload-photo" onClick={handleClick}>
                              {/* @ts-ignore */}
                              {doc ? doc.name : t("Browse")}
                            </label>
                            <input
                              style={{ display: "none" }}
                              ref={inputRef}
                              type="file"
                              onChange={handleFileChange}
                            />
                          </div>
                        </div>
                      )}

                      <button
                        className="btn nimmu-user-sibmit-button mt-3"
                        disabled={
                          details.order.payment_currency_type === 1 && !doc
                        }
                        onClick={() => {
                          payNowGiftCardOrderAction(
                            details?.order?.id,
                            doc,
                            setStep
                          );
                        }}
                      >
                        Pay and notify seller
                      </button>
                      <a
                        data-toggle="modal"
                        data-target="#exampleModal"
                        onClick={() => {}}
                      >
                        <button className="btn nimmu-user-sibmit-button mt-3">
                          Cancel
                        </button>
                      </a>
                      <GiftCardTradeCancel uid={details?.order?.id} />
                    </>
                  )}
                  {details.user_type === SELL && (
                    <div className="boxShadow p-5 text-center mt-3">
                      <h4 className="mb-3">Waiting for payment</h4>
                    </div>
                  )}
                </>
              )}
              {details?.order?.status === TRADE_STATUS_PAYMENT_DONE && (
                <>
                  {details.user_type === BUY && (
                    <>
                      <div className="boxShadow p-5 text-center mt-3">
                        <h4 className="mb-3">Waiting for releasing order</h4>
                      </div>
                      {parseInt(details?.order?.is_reported) === 0 && (
                        <a
                          data-toggle="modal"
                          data-target="#exampleModal1"
                          onClick={() => {}}
                        >
                          <button
                            disabled={parseInt(details?.order?.is_queue) === 1}
                            className="btn nimmu-user-sibmit-button mt-3"
                            onClick={() => {}}
                          >
                            Dispute
                          </button>
                        </a>
                      )}
                      <TradeDisputeGift uid={details?.order?.id} />
                    </>
                  )}

                  {details.user_type === SELL && (
                    <>
                      <button
                        className="btn nimmu-user-sibmit-button mt-3"
                        // disabled={parseInt(details?.order?.is_queue) === 1}
                        onClick={() => {
                          PaymentConfirmGiftCardOrderAction(
                            details?.order?.id,
                            dispatch
                          );
                        }}
                      >
                        Release
                      </button>
                      {parseInt(details?.order?.is_reported) === 0 && (
                        <a
                          data-toggle="modal"
                          data-target="#exampleModal1"
                          onClick={() => {}}
                        >
                          <button
                            // disabled={
                            //   parseInt(details?.order?.is_queue) === 1
                            // }
                            className="btn nimmu-user-sibmit-button mt-3"
                            onClick={() => {}}
                          >
                            Dispute
                          </button>
                        </a>
                      )}

                      <TradeDisputeGift uid={details?.order?.id} />
                    </>
                  )}
                </>
              )}
              {details?.order?.status === TRADE_STATUS_TRANSFER_DONE && (
                <>
                  {details.user_type === BUY && (
                    <>
                      <div className="boxShadow p-5 text-center mt-3">
                        <h4 className="mb-3">Trade completed</h4>
                      </div>
                      {details?.order?.feedback && (
                        <>
                          <div>
                            <label className="mt-3">
                              <b>Feedback Type:</b>
                              {details?.order?.feedback?.feedback_type === 1
                                ? "Positive"
                                : "Negative"}
                            </label>
                          </div>
                          <div>
                            <label className="mb-3">
                              <b>Seller Feedback:</b>
                              {details?.order?.feedback?.feedback}
                            </label>
                          </div>
                        </>
                      )}
                      {details?.order?.buyer_feedback_type !== 1 && (
                        <div className="row">
                          <div className="col-md-12 mt-3">
                            <label> Submit review about seller</label>
                            <div className="P2psearchBox position-relative">
                              <textarea
                                value={feedback}
                                onChange={(e) => {
                                  setFeedback(e.target.value);
                                }}
                                className=""
                                placeholder=""
                              ></textarea>
                            </div>
                            <>
                              <label>Review type</label>

                              <div className="select-method">
                                <div
                                  className={`${
                                    feedbackType === POSITIVE &&
                                    "select-method-item-active"
                                  } select-method-item mr-0 mr-md-3`}
                                  onClick={() => {
                                    setfeedbackType(POSITIVE);
                                  }}
                                >
                                  Positive
                                </div>
                                <div
                                  className={`${
                                    feedbackType === NEGATIVE &&
                                    "select-method-item-active"
                                  } select-method-item mr-0 mr-md-3`}
                                  onClick={() => {
                                    setfeedbackType(NEGATIVE);
                                  }}
                                >
                                  Negative
                                </div>
                              </div>
                            </>
                          </div>
                          <button
                            className="btn nimmu-user-sibmit-button mt-3"
                            onClick={() => {
                              giftCardOrderFeedbackAction(
                                details?.order?.uid,
                                feedbackType,
                                feedback
                              );
                            }}
                          >
                            Submit review
                          </button>
                        </div>
                      )}
                    </>
                  )}
                  {details.user_type === SELL && (
                    <>
                      <div className="boxShadow p-5 text-center mt-3">
                        <h4 className="mb-3">Trade completed</h4>
                      </div>

                      {details?.order?.feedback && (
                        <>
                          <div>
                            <label className="mt-3">
                              <b>Feedback Type:</b>
                              {details?.order?.feedback?.feedback_type === 1
                                ? "Positive"
                                : "Negative"}
                            </label>
                          </div>
                          <div>
                            <label className="mb-3">
                              <b>Buyer Feedback:</b>
                              {details?.order?.feedback?.feedback}
                            </label>
                          </div>
                        </>
                      )}
                      {details?.order?.seller_feedback_type !== 1 && (
                        <div className="row">
                          <div className="col-md-12 mt-3">
                            <label>Submit review about buyer</label>
                            <div className="P2psearchBox position-relative">
                              <textarea
                                value={feedback}
                                onChange={(e) => {
                                  setFeedback(e.target.value);
                                }}
                                className=""
                                placeholder=""
                              ></textarea>
                            </div>
                            <label>Review type</label>

                            <div className="select-method">
                              <div
                                className={`${
                                  feedbackType === POSITIVE &&
                                  "select-method-item-active"
                                } select-method-item mr-0 mr-md-3`}
                                onClick={() => {
                                  setfeedbackType(POSITIVE);
                                }}
                              >
                                Positive
                              </div>
                              <div
                                className={`${
                                  feedbackType === NEGATIVE &&
                                  "select-method-item-active"
                                } select-method-item mr-0 mr-md-3`}
                                onClick={() => {
                                  setfeedbackType(NEGATIVE);
                                }}
                              >
                                Negative
                              </div>
                            </div>
                          </div>
                          <button
                            className="btn nimmu-user-sibmit-button mt-3"
                            onClick={() => {
                              giftCardOrderFeedbackAction(
                                details?.order?.uid,
                                feedbackType,
                                feedback
                              );
                            }}
                          >
                            Submit review
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </div>
        <div className="">
          <TradeChat
            col="col-lg-12"
            details={details}
            sendMessage={sendMessage}
            setMessage={setMessage}
            setFile={setFile}
            message={message}
          />
        </div>
      </div>

      <Footer />
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/p2p/gift-card");
  return {
    props: {},
  };
};
export default Trading;
