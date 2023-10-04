import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "state/store";
import { BsFillFileEarmarkImageFill, BsX } from "react-icons/bs";

export const TradeChat = ({
  sendMessage,
  setMessage,
  setFile,
  clearFile,
  message,
  col,
}: any) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const { user } = useSelector((state: RootState) => state.user);
  const scrollToBottom = () => {
    let container: any = document.querySelector("#conversations_list");
    container.scrollTop = container.scrollHeight;
  };
  const { tradeChat: conversationDetails } = useSelector(
    (state: RootState) => state.user
  );
  useEffect(() => {
    scrollToBottom();
  }, [conversationDetails]);

  const handleClearFile = () => {
    setFile(null);
    setImagePreview(null);
  };

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
                  {chat?.file_path && (
                    <a
                      href={chat?.file_path}
                      target="_blank"
                      rel="noreferrer"
                      className="send_image"
                    >
                      <img
                        height={100}
                        className="rounded mb-2"
                        src={chat?.file_path}
                      />
                    </a>
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
                  {chat?.file_path && (
                    <a
                      href={chat?.file_path}
                      target="_blank"
                      rel="noreferrer"
                      className="send_image"
                    >
                      <img
                        height={100}
                        className="rounded mb-2"
                        src={chat?.file_path}
                      />
                    </a>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="image_preview_container">
          {imagePreview && (
            <div className="image_preview">
              <img src={imagePreview} alt="Preview" />
              <button className="clear_button" onClick={handleClearFile}>
                <BsX />
              </button>
            </div>
          )}
        </div>
        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(e);
              setImagePreview(null);
            }}
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
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  id="inputGroupFile01"
                  onChange={(e: any) => {
                    setFile(e.target.files[0]);

                    const reader = new FileReader();
                    reader.onload = (event) => {
                      setImagePreview(event.target?.result as string);
                    };
                    reader.readAsDataURL(e.target.files[0]);
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
