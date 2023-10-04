import React, { useEffect } from "react";

export default function SelectWithdrawl({
  setSelectedMethod,
  depositInfo,
  selectedMethod,
}: any) {
  useEffect(() => {
    if (!depositInfo || depositInfo?.length === 0) return;
    setSelectedMethod({
      method: depositInfo[0] && depositInfo[0].payment_method,
      method_id: depositInfo[0] && depositInfo[0].id,
    });
  }, [depositInfo]);

  return (
    <div className="d-flex mt-3">
      {depositInfo?.map((payment: any, index: number) => (
        <div
          key={index}
          className={
            selectedMethod.method === payment.payment_method
              ? "select-deposit-method-item-active"
              : "select-deposit-method-item"
          }
          onClick={() => {
            setSelectedMethod({
              method: payment.payment_method,
              method_id: payment?.id,
            });
          }}
        >
          {payment.title}
        </div>
      ))}
    </div>
  );
}
