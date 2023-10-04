import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { BsFillFileEarmarkImageFill } from "react-icons/bs";

export const SupportChat = ({
  sendMessage,
  setMessage,
  setFile,
  message,
  col,
}: any): JSX.Element => {
  // const messagesEndRef = useRef(null);

  const { user } = useSelector((state: RootState) => state.user);
  const scrollToBottom = () => {
    let container: any = document.querySelector("#conversations_list");
    container.scrollTop = container.scrollHeight;

    //@ts-ignore
    // messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const { supportChat: conversationDetails } = useSelector(
    (state: RootState) => state.user
  );
  useEffect(() => {
    scrollToBottom();
  }, [conversationDetails]);
  return (
    <div className={col ? col : "col-lg-8"}>
      <div className="chat_box rounded" id="conversations_list">
        <div className="chat_list">
          <div className="d-block pb-5" id="append_conversation">
            {conversationDetails?.map((chat: any) =>
              chat?.user?.id === user.id || chat?.user_id === user.id ? (
                <div className="col-md-8 ml-auto chat_layout_right">
                  <div className="d-flex justify-content-end my-2">
                    {chat?.message && (
                      <small
                        className="chat_text mr-1"
                        dangerouslySetInnerHTML={{
                          __html: chat?.message,
                        }}
                      ></small>
                    )}

                    <div>
                      <img
                        className="chat_img ml-1"
                        src={chat?.user?.photo}
                        alt=""
                      />
                    </div>
                  </div>
                  {chat?.conversation_attachment[0]?.file_link &&
                    chat?.conversation_attachment.map((image: any) =>
                      image.file_type === "img" ? (
                        <a
                          href={image?.file_link}
                          target="_blank"
                          rel="noreferrer"
                          className="send_image mb-2"
                        >
                          <img
                            height={100}
                            className="rounded"
                            src={image?.file_link}
                          />
                        </a>
                      ) : (
                        <a
                          href={image?.file_link}
                          target="_blank"
                          rel="noreferrer"
                          className="send_image"
                        >
                          Download file
                        </a>
                      )
                    )}
                </div>
              ) : (
                <div className="col-md-8 chat_layout_left">
                  <div className="d-flex justify-content-between my-2">
                    <div>
                      <img
                        className="chat_img"
                        src={chat?.user?.photo}
                        alt=""
                      />
                    </div>
                    {chat?.message && (
                      <small
                        className="chat_text mr-1"
                        dangerouslySetInnerHTML={{
                          __html: chat?.message,
                        }}
                      ></small>
                    )}
                  </div>
                  {chat?.conversation_attachment[0]?.file_link &&
                    chat?.conversation_attachment.map((image: any) =>
                      image.file_type === "img" ? (
                        <a
                          href={image?.file_link}
                          target="_blank"
                          rel="noreferrer"
                          className="send_image"
                        >
                          <img
                            height={100}
                            className="rounded mb-2"
                            src={image?.file_link}
                          />
                        </a>
                      ) : (
                        <a
                          href={image?.file_link}
                          target="_blank"
                          rel="noreferrer"
                          className="send_image"
                        >
                          Download file
                        </a>
                      )
                    )}
                </div>
              )
            )}
          </div>
        </div>
        {/* <span ref={messagesEndRef}></span> */}
      </div>

      <div className=" mt-4">
        <div>
          <form
            onSubmit={sendMessage}
            className="d-flex gap-2 align-items-center"
          >
            <input
              type="text"
              className="w-100 px-2 rounded py-2 message_bg"
              id="send-message-box"
              name="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="message"
            />

            <div className="input-group chat_file_upload mx-1">
              <div className="custom-file ">
                <input
                  type="file"
                  className="custom-file-input "
                  id="inputGroupFile01"
                  onChange={(e: any) => {
                    setFile(e.target.files[0]);
                  }}
                />
                <label className="massage_img">
                  <BsFillFileEarmarkImageFill />
                </label>
              </div>
            </div>
            <button className="rounded chat_btn" type="submit">
              send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
