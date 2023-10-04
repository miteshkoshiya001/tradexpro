import React, { useState } from "react";
import moment from "moment";
import useTranslation from "next-translate/useTranslation";
import FiatHistoryModal from "components/gift-cards/modal/FiatHistoryModal";
export default function FiatTableForDeposit({
  data
}: any) {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState<any>(false);
  const [modalItem, setModalItem] = useState<any>({});
  return (
    <div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col" className="p-2 border-bottom font-bold">
              Created At
            </th>
            <th scope="col" className="p-2 border-bottom font-bold">
              Payment Method
            </th>
            <th scope="col" className="p-2 border-bottom font-bold">
              Payment Title
            </th>
            <th scope="col" className="p-2 border-bottom font-bold">
              Coin
            </th>
            <th scope="col" className="p-2 border-bottom font-bold">
              Amount
            </th>
            <th scope="col" className="p-2 border-bottom font-bold">
              Bank Recept
            </th>
            <th scope="col" className="p-2 border-bottom font-bold">
              Status
            </th>
            <th scope="col" className="p-2 border-bottom font-bold">
              Note
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any, index: any) => (
            <tr key={index}>
              <td className="p-2 border-bottom text-14">
                {moment(item.created_at).format("DD MMM YYYY")}
              </td>
              <td className="p-2 border-bottom text-14">{item.payment_type}</td>
              <td className="p-2 border-bottom text-14">
                {item.payment_title}
              </td>
              <td className="p-2 border-bottom text-14">{item.coin_type}</td>
              <td className="p-2 border-bottom text-14">{item.amount}</td>
              <td className="p-2 border-bottom text-14 cursor-pointer">
                {item.bank_recipt ? (
                  <span
                    onClick={() => {
                      setIsModalOpen(true);
                      setModalItem({
                        isBankRecipt: true,
                        title: "Bank Recipt",
                        img_link: item.bank_recipt,
                      });
                    }}
                  >
                    Receipt
                  </span>
                ): "N/A"}
              </td>
              <td className="p-2 border-bottom text-14 text-primary-color">
                {item.status}
              </td>
              <td className="p-2 border-bottom text-14 cursor-pointer">
                {item.note ? (
                  <span
                    onClick={() => {
                      setIsModalOpen(true);
                      setModalItem({
                        isBankRecipt: false,
                        title: "Note",
                        note: item.note,
                      });
                    }}
                  >
                    Note
                  </span>
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <FiatHistoryModal
          setIsModalOpen={setIsModalOpen}
          modalItem={modalItem}
        />
      )}
    </div>
  );
}
