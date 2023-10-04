import SectionLoading from "components/common/SectionLoading";
import { PAYSTACK } from "helpers/core-constants";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  VerificationPaystackPayment,
  currencyDepositProcess,
} from "service/deposit";
import { submitFiatWalletDepositApi } from "service/fiat-wallet";
import { TokenBuyIcoPaystackAction } from "state/actions/launchpad";

const VerifyPaystack = () => {
  const [loading, setLoading] = useState(true);
  //http://localhost:3001/verify-paystack?phase_id=1&token_id=1&amount=33&payment_method=9&trxref=396c6jb4u7&reference=396c6jb4u7
  const router = useRouter();
  const {
    reference,
    trxref,
    wallet_id,
    amount,
    buy_history_id,
    walletAddress,
    payment_method,
    transaction_id,
    payment_method_id,
    api_type,
    crypto_type,
    coin_type,
  } = router.query;
  //localhost:3001/verify-paystack?buy_history_id=6&walletAddress=0x0d892bcb4f3B8b9Cacf3BF8ef45e74E0e38cae37&trxref=41thncdwci&reference=41thncdwci
  http: useEffect(() => {
    if (api_type == "ico") {
      TokenBuyIcoPaystackAction({
        walletAddress: walletAddress,
        buy_history_id: buy_history_id,
        reference: reference,
        transaction_id: trxref,
      });
    } else if (crypto_type == "2") {
      reference &&
        trxref &&
        VerificationPaystackPayment(reference).then((response: any) => {
          if (response.success) {
            submitFiatWalletDepositApi({
              transaction_id: trxref,
              payment_method_id: payment_method_id,
              wallet_id: wallet_id,
              amount: amount,
              currency: coin_type,
            }).then((currencyResponse: any) => {
              if (currencyResponse.success) {
                toast.success(currencyResponse.message);
              } else {
                toast.error(currencyResponse.message);
              }
            });
          } else {
            toast.error(response.message);
          }
          router.push("/user/wallet-history?type=deposit");
        });
    } else {
      reference &&
        trxref &&
        wallet_id &&
        amount &&
        VerificationPaystackPayment(reference).then((response: any) => {
          if (response.success) {
            //   toast.success(response.message);
            currencyDepositProcess({
              transaction_id: trxref,
              payment_method_id: "pay_stack",
              wallet_id: wallet_id,
              amount: amount,
            }).then((currencyResponse: any) => {
              if (currencyResponse.success) {
                toast.success(currencyResponse.message);
              } else {
                toast.error(currencyResponse.message);
              }
            });
          } else {
            toast.error(response.message);
          }
          router.push("/fiat-deposit");
        });
    }
  }, [reference]);
  return <div>{loading && <SectionLoading />}</div>;
};

export default VerifyPaystack;
