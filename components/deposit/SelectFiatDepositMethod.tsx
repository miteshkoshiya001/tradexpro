import React from "react";

const SelectFiatDepositMethod = ({
  setSelectedMethods,
  methods,
  selectedMethods,
}: any) => {
  return (
    <div className="select-method">
      {methods?.map((payment: any, index: number) => (
        <div
          className={
            selectedMethods.method === payment.payment_method
              ? "select-deposit-method-item-active px-3"
              : "select-deposit-method-item px-3"
          }
          key={index}
          onClick={() => {
            setSelectedMethods({
              method: payment.payment_method,
              method_id: methods?.find(
                (info: any) =>
                  parseInt(info.payment_method) ===
                  parseInt(payment.payment_method)
              ).id,
            });
          }}
        >
          {payment.title}
        </div>
      ))}
    </div>
  );
};

export default SelectFiatDepositMethod;
