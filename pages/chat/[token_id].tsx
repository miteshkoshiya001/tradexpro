import Footer from "components/common/footer";
import { SSRAuthCheck } from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import useTranslation from "next-translate/useTranslation";
import React, { useEffect, useState, useRef } from "react";
import { customPage, landingPage } from "service/landing-page";
import { TiDelete } from "react-icons/ti";
import { useRouter } from "next/router";
import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { SendChantByTokenAction } from "state/actions/launchpad";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "state/store";
import { date } from "yup";
import { setChatico, seticoChat } from "state/reducer/user";
import { ChatHistoryByTokenId } from "service/launchpad";
import moment from "moment";
let socketCall = 0;

export const Chat = () => {
  const { t } = useTranslation("common");
  const dispatch = useDispatch();
  const messagesEndRef = useRef(null);
  const [file, setFile] = useState<any>();
  const [sendFile, setSendFile] = useState();
  const [adminList, setAdminList] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState();
  const [message, setMessage] = useState("");
  const { user, icoChat } = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const getDataHistory = async () => {
    if (router.query.token_id) {
      const response = await ChatHistoryByTokenId(
        router.query.token_id,
        selectedAdmin
      );
      dispatch(seticoChat(response?.data?.conversation_list));
      setAdminList(response?.data?.admin_list);
      if (!selectedAdmin) setSelectedAdmin(response?.data?.admin_list[0].id);
      return response;
    }
  };
  useEffect(() => {
    getDataHistory();
  }, [router.query.token_id, selectedAdmin]);
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
      `New-Message-${localStorage.getItem("user_id")}-${router.query.token_id}`
    ).listen(".Conversation", (e: any) => {
      dispatch(setChatico(e.data));
    });
  }

  useEffect(() => {
    if (socketCall === 0) {
      listenMessages();
    }
    socketCall = 1;
  });
  const scrollToBottom = () => {
    //@ts-ignore
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [icoChat]);
  return (
    <>
      <div className="page-wrap">
        <div className="page-main-content container-fluid">
          {/* <div className="container-fluid"> */}
          <div className="section-top-wrap mb-25">
            <div className="overview-area">
              <div className="overview-left">
                <h2 className="section-top-title">{t("Chat")}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="page-wrap">
        <div className="page-main-content">
          <div className="container-fluid">
            <form
              onSubmit={(e: any) => {
                e.preventDefault();
                SendChantByTokenAction(
                  router.query.token_id,
                  sendFile,
                  message,
                  setMessage,
                  setSendFile,
                  setFile,
                  selectedAdmin
                );
              }}>
              <div className="asset-balances-area cstm-loader-area">
                <div className="asset-balances-left">
                  <div className="section-wrapper border-0">
                    <div className="live-chat rounded mx-auto border-bottom-0 w-full">
                      <div className="chat-inner">
                        <div className="chat-header">
                          {/* <img
                          className="chat-avatar"
                          height={45}
                          width={45}
                          src="https://tradexpro-app.cdibrandstudio.com/assets/img/avater.png"
                          alt=""
                        /> */}
                          {/* <div className="chart-header-title">
                          <p className="chat-name">Admin</p> */}
                          {/* <p className="chat-status ofline online">Offline</p> */}
                          {/* <p className="chat-last-seen">
                            Last seen 2 months ago
                          </p> */}
                          {/* </div> */}
                          <div className="w-100 cp-select-area">
                            <select
                              name="coin_currency"
                              className={`ico-input-box`}
                              required
                              onChange={(e: any) => {
                                setSelectedAdmin(e.target.value);
                              }}>
                              <option value="">{t("Select admin")}</option>
                              {adminList.map((admin: any, index: any) => (
                                <option
                                  key={index}
                                  selected={selectedAdmin === admin.id}
                                  value={admin.id}>
                                  {admin?.first_name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div className="chat-body">
                          {icoChat?.map((chat: any) => (
                            <>
                              <div
                                className={
                                  chat.sender_id === user.id
                                    ? "chat-right"
                                    : "chat-left"
                                }>
                                <>
                                  <img
                                    className="chat-list-avatar"
                                    height={35}
                                    width={35}
                                    src={
                                      chat.sender_id === user.id
                                        ? chat?.sender_img
                                        : chat?.receiver_img
                                    }
                                    alt=""
                                  />
                                  {chat?.message && (
                                    <div className="chart-header-title">
                                      <p className="chat-details">
                                        {chat?.message}
                                      </p>
                                      <p className="chat-last-seen ml-3">
                                        {moment(chat?.created_at).calendar()}
                                      </p>
                                    </div>
                                  )}
                                </>
                              </div>
                              {chat?.file_path && (
                                <img
                                  className="image-chatBox chart-header-title"
                                  height={65}
                                  width={105}
                                  src={chat.file_path}
                                  alt=""
                                />
                              )}
                            </>
                          ))}
                          <span ref={messagesEndRef}></span>
                        </div>
                        {file && (
                          <div className="chat-upload-image">
                            <div
                              onClick={() => setFile(null)}
                              className="image-close">
                              <TiDelete size={25} color="red" />
                            </div>
                            <img
                              className="upload-preview-img"
                              src={file}
                              alt="--"
                            />
                          </div>
                        )}

                        <div className="chat-submit-bottom">
                          <div className="image-upload">
                            <label className="upload-file-btn press-enter">
                              <span className="fa fa-paperclip press-enter mx-1"></span>
                              <input
                                onChange={(e: any) => {
                                  setFile(
                                    URL.createObjectURL(e.target.files[0])
                                  );
                                  setSendFile(e.target.files[0]);
                                }}
                                id="msgFile"
                                type="file"
                                className="upload-attachment press-enter"
                                name="file"
                                accept="image/*, .txt, .rar, .zip"
                              />
                            </label>
                          </div>
                          <div className="chat-input-box">
                            <input
                              type="text"
                              className="chatInput border-0"
                              placeholder="Type here . . . "
                              value={message}
                              onChange={(e: any) => {
                                setMessage(e.target.value);
                              }}
                            />
                          </div>

                          <div className="submit-button ml-2">
                            <button
                              className="chat-button"
                              type="submit"
                              disabled={sendFile || message ? false : true}>
                              {t("Send")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/chat");
  return {
    props: {},
  };
};
export default Chat;
