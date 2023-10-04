import { CUstomSelect } from "components/common/CUstomSelect";
import request from "lib/request";
import useTranslation from "next-translate/useTranslation";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { sendGiftCardApi } from "service/gift-cards";

const options = [
  { value: 1, label: "Email" },
  { value: 2, label: "Phone" },
];

export default function SendCryptoCardModal({
  setIsSendCryptoCardModalOpen,
  giftCardData,
}: any) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [massage, setMassage] = useState("");
  const handleCryptoType = (event: any) => {
    setActiveType(event);
  };

  const handleGiftCardSubmit = async () => {
    if (activeType.value == 1 && !email) {
      toast.error("Email Is Required");
      return;
    }
    if (activeType.value == 2 && !phone) {
      toast.error("Phone Is Required");
      return;
    }

    let url = `/gift-card/send-gift-card?send_by=${activeType.value}&to_email=${email}&card_uid=${giftCardData.uid}&message=${massage}`;
    if (activeType.value == 2) {
      url = `/gift-card/send-gift-card?send_by=${activeType.value}&to_phone=${phone}&card_uid=${giftCardData.uid}&message=${massage}`;
    }
    const data  = await sendGiftCardApi(url);

    if (!data.success) {
      toast.error(data.message);
      return;
    }
    toast.success(data.message);
    setIsSendCryptoCardModalOpen(false);
  };

  const [activeType, setActiveType] = useState<any>({});
  return (
    <div id="demo-modal" className="gift-card-modal">
      <div className="gift-card-modal__content p-5 send-crypto-w">
        <h2>Send Crpto Gift Card</h2>

        <div className="row my-5">
          <div className="col-12">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Select Type
              </label>
              <CUstomSelect
                options={options}
                handleFunction={handleCryptoType}
              />
            </div>
          </div>
        </div>

        {Object.keys(activeType).length !== 0 && (
          <div className="row">
            <div className="col-12">
              <div className="form-group">
                <label htmlFor="exampleFormControlInput1">
                  {activeType.label}
                </label>
                {activeType.value == 1 ? (
                  <input
                    type="email"
                    className="form-control h-40"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  <input
                    type="text"
                    className="form-control h-40"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleFormControlTextarea1">Massage</label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows={6}
                  value={massage}
                  onChange={(e) => setMassage(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        )}
        {Object.keys(activeType).length !== 0 && (
          <div className="text-right">
            <button
              type="button"
              className="btn bg-primary-color capitalize"
              onClick={handleGiftCardSubmit}
            >
              {t("Send")}
            </button>
          </div>
        )}

        <a
          href="#"
          className="gift-card-modal__close text-45"
          onClick={() => setIsSendCryptoCardModalOpen(false)}
        >
          &times;
        </a>
      </div>
    </div>
  );
}
