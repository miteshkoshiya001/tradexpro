import { SEND } from "helpers/core-constants";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { walletBalanceTransferFuture } from "service/futureTrade";
const WalletTransfer = () => {
  const router = useRouter();
  const [amount, setAmount] = useState(0);
  const { type, coin } = router.query;
  const getBalance = async () => {
    const response = await walletBalanceTransferFuture(type, coin, amount);
    if (response.success) {
      toast.success(response.message);
      router.push("/futures/wallet-list");
    } else {
      toast.error(response.message);
    }
  };
  return (
    <div className="container">
      <div className="boxShadow p-5 mt-5">
        {/* @ts-ignore */}
        <h1>{parseInt(type) === SEND ? "Send" : "Recieve"} Balance</h1>
        <div className="P2psearchBox position-relative mt-3">
          <input
            type="number"
            placeholder="Enter amount EUR"
            value={amount}
            onChange={(e) => {
              setAmount(parseFloat(e.target.value));
            }}
          />
        </div>{" "}
        <button className="primary-btn w-100 mt-3" onClick={getBalance}>
          exchange
        </button>
      </div>
    </div>
  );
};

export default WalletTransfer;
