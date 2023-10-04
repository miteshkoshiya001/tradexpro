import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { disputeProcessGiftCard } from "service/p2p";
import { p2pOrderCancelAction } from "state/actions/p2p";

const TradeDisputeGift = ({ uid }: any) => {
  const { t } = useTranslation("common");
  const [doc, setDoc] = useState<any>(null);
  const inputRef = useRef(null);
  const router = useRouter();
  const [reasonSubject, setReasonSubject] = useState("");
  const [reason, setReason] = useState("");
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
  const disputeAction = async () => {
    const formData = new FormData();
    formData.append("gift_card_order_id", uid);
    formData.append("reason_subject", reasonSubject);
    formData.append("reason_details", reason);
    if (doc) formData.append("image", doc);
    const response = await disputeProcessGiftCard(formData);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div
      className="modal fade"
      id="exampleModal1"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModal1Label"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <form method="post">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModal1Label">
                {t("Dispute")}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col-12">
                  <div className="">
                    <span className="file-lable">{t("Select document")}</span>
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
                <div className=" col-12 P2psearchBox position-relative">
                  <p>{t("Subject")}</p>

                  <input
                    type="text"
                    placeholder="Subject"
                    value={reasonSubject}
                    onChange={(e) => {
                      setReasonSubject(e.target.value);
                    }}
                  />
                </div>
                <div className="col-12">
                  <p>{t("Reason to dispute the order")}</p>
                  <textarea
                    placeholder={t("Reason")}
                    className="form-control"
                    name="reason"
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="primary-btn"
                data-dismiss="modal"
                disabled={!reason}
                onClick={() => {
                  disputeAction();
                }}
              >
                {t("Submit")}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TradeDisputeGift;
