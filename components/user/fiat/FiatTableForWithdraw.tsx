import React, { useState } from "react";
import moment from "moment";
import useTranslation from "next-translate/useTranslation";
import FiatHistoryModal from "components/gift-cards/modal/FiatHistoryModal";
export default function FiatTableForWithdraw({ data }: any) {
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
              Bank
            </th>
            <th scope="col" className="p-2 border-bottom font-bold">
              Currency
            </th>
            <th scope="col" className="p-2 border-bottom font-bold">
              Amount
            </th>
            <th scope="col" className="p-2 border-bottom font-bold">
              Fees
            </th>
            <th scope="col" className="p-2 border-bottom font-bold">
              Bank Recept
            </th>
            <th scope="col" className="p-2 border-bottom font-bold">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any, index: any) => (
            <tr key={index}>
              <td className="p-2 border-bottom text-14">
                {moment(item.created_at).format("DD MMM YYYY")}
              </td>
              <td className="p-2 border-bottom text-14">{item.bank_title}</td>
              <td className="p-2 border-bottom text-14">{item.coin_type}</td>
              <td className="p-2 border-bottom text-14">{item.amount}</td>
              <td className="p-2 border-bottom text-14">{item.fees}</td>
              <td className="p-2 border-bottom text-14 cursor-pointer">
                {item.receipt ? (
                  <span
                    onClick={() => {
                      setIsModalOpen(true);
                      setModalItem({
                        isBankRecipt: true,
                        title: "Bank Recipt",
                        img_link: item.receipt,
                      });
                    }}
                  >
                    Receipt
                  </span>
                ) : (
                  "N/A"
                )}
              </td>
              <td className="p-2 border-bottom text-14 text-primary-color">
                {item.status}
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
