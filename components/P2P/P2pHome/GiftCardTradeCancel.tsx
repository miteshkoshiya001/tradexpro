import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { giftCardOrderCancelAction } from "state/actions/p2p";

const GiftCardTradeCancel = ({ uid }: any) => {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [reason, setReason] = useState("");
  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog" role="document">
        <form method="post">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {t("Reason")}
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
            <div className="modal-body px-2 py-4">
              <div className="row">
                <div className="col-12">
                  <p>{t("Reason to cancel the order")}</p>
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
                className="btn btn-primary"
                data-dismiss="modal"
                disabled={!reason}
                onClick={() => {
                  giftCardOrderCancelAction(uid, reason, router);
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

export default GiftCardTradeCancel;
