import { NoItemFound } from "components/NoItemFound/NoItemFound";
import SectionLoading from "components/common/SectionLoading";
import FiatDeposit from "components/user/fiat/deposit/FiatDeposit";
import FiatWithdraw from "components/user/fiat/deposit/FiatWithdraw";
import {
  SSRAuthCheck,
  pageAvailabilityCheck,
} from "middlewares/ssr-authentication-check";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { submitFiatWalletDepositApi } from "service/fiat-wallet";

let check = false;
export default function Index() {
  const [fiatType, setfiatType] = useState<any>("");
  const router = useRouter();
  useEffect(() => {
    if (!router.isReady) return;
    if (
      router?.query?.PAYMENT_AMOUNT &&
      router?.query?.PAYMENT_BATCH_NUM &&
      router?.query?.PAYMENT_UNITS &&
      !check
    ) {
      convertCurrency();
      check = true;
      return;
    }

    if (router?.query?.type) {
      setfiatType(router?.query?.type);
    }
    if (
      (!router?.query?.PAYMENT_AMOUNT ||
        !router?.query?.PAYMENT_BATCH_NUM ||
        !router?.query?.PAYMENT_UNITS) &&
      !router?.query?.type
    ) {
      router.push("/user/my-wallet");
      return;
    }
  }, [router.isReady]);

  const convertCurrency = async () => {
    const payment_method_id = localStorage.getItem(
      "perfect_money_payment_method_id_for_fiat_wallet"
    );
    const amount = router?.query?.PAYMENT_AMOUNT;
    const currency = router?.query?.PAYMENT_UNITS;
    const payment_batch = router?.query?.PAYMENT_BATCH_NUM;

    const formData: any = new FormData();

    formData.append("payment_method_id", payment_method_id);
    formData.append("amount", amount);
    formData.append("currency", currency);
    formData.append("payment_batch", payment_batch);
    const res = await submitFiatWalletDepositApi(formData);
    if (res.success) {
      toast.success(res.message);
      router.push("/user/wallet-history?type=deposit");
      return;
    } else {
      toast.error(res.message);
    }
  };

  if (fiatType === "") return <SectionLoading />;
  else if (fiatType === "deposit")
    return (
      <FiatDeposit
        currency_type={router?.query?.currency}
        wallet_id={router?.query?.coin_id}
      />
    );
  else if (fiatType === "withdraw")
    return <FiatWithdraw currency_type={router?.query?.currency} />;
  else return <NoItemFound />;
}

export const getServerSideProps: GetServerSideProps = async (ctx: any) => {
  await SSRAuthCheck(ctx, "/user/profile");
  const cookies = parseCookies(ctx);
  const commonRes = await pageAvailabilityCheck();

  if (parseInt(commonRes.currency_deposit_status) !== 1) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
