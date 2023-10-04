import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";
//@ts-ignore
import { PayPalButtonsComponentProps } from "@paypal/paypal-js/types/components/buttons";
import { useRouter } from "next/router";
import { TokenBuyIcoPaypalAction } from "state/actions/launchpad";

const paypalScriptOptions: PayPalScriptOptions = {
  //@ts-ignore
  "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_KEY,
  currency: "USD",
};
function Button({ credential, paymentData }: any) {
  const router = useRouter();
  const [{ isPending }] = usePayPalScriptReducer();
  const paypalbuttonTransactionProps: PayPalButtonsComponentProps = {
    style: { layout: "vertical" },
    createOrder(data: any, actions: any) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              value: parseInt(paymentData.token_total_price),
            },
          },
        ],
      });
    },
    onApprove(data: any, actions: any) {
      return actions.order.capture({}).then(async (details: any) => {
        const credentials = {
          payment_method: credential.payment_method_id,
          amount: credential.amount,
          currency: credential.currency,
          trx_id: data.facilitatorAccessToken,
          token_id: credential.token_id,
          phase_id: credential.phase_id,
        };
        if (data.facilitatorAccessToken) {
          const res = await TokenBuyIcoPaypalAction(credentials);
        }
      });
    },
  };
  return (
    <>
      {isPending ? <h2>Load Smart Payment Button...</h2> : null}
      <PayPalButtons {...paypalbuttonTransactionProps} />
    </>
  );
}
export default function PaypalButtons({ credential, setCredential,paymentData }: any) {
  return (
    <div className="paypal-container">
      <PayPalScriptProvider options={paypalScriptOptions}>
        <Button
          credential={credential}
          setCredential={setCredential}
          paymentData={paymentData}
        />
      </PayPalScriptProvider>
    </div>
  );
}
// data.token_total_price;