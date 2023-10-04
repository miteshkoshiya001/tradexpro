import BankDetails from "components/deposit/bankDetails";
import useTranslation from "next-translate/useTranslation";
import React from "react";

export default function WithdrawlHistoryModal({ close, item }: any) {
  const { t } = useTranslation();
  return (
    <div id="demo-modal" className="gift-card-modal">
      <div
        className="gift-card-modal__content p-5"
        style={{ width: "auto", minWidth: "75%" }}
      >
        <h2>{t(`Payment Details`)}</h2>

        <div className="row my-5">
          <div className="col-lg-12">
            {item?.bank_id == 0 ? (
              <p className="fiat-withdrawal-history-modal-box ">{item?.payment_info}</p>
            ) : (
              <>
                <BankDetails bankInfo={item?.bank} />
              </>
            )}
          </div>
        </div>

        <span
          className="gift-card-modal__close text-45 pointer"
          onClick={close}
        >
          &times;
        </span>
      </div>
    </div>
  );
}
