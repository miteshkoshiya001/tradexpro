import useTranslation from "next-translate/useTranslation";
import React from "react";

export default function FiatHistoryModal({ setIsModalOpen, modalItem }: any) {
  const { t } = useTranslation();
  return (
    <div id="demo-modal" className="gift-card-modal">
      <div
        className="gift-card-modal__content p-5"
        style={{ width: "auto", minWidth: "50%" }}
      >
        <h2>{t(modalItem.title)}</h2>

        <div className="row my-5">
          <div className="col-lg-12">
            {modalItem.isBankRecipt ? (
              <div className="w-full text-center">
                <img style={{maxWidth: '600px', width: '100%'}} src={modalItem.img_link} alt="Bank Recipt" />
              </div>
            ) : (
              <p>{modalItem.note}</p>
            )}
          </div>
        </div>

        <span
          className="gift-card-modal__close text-45 pointer"
          onClick={() => setIsModalOpen(false)}
        >
          &times;
        </span>
      </div>
    </div>
  );
}
