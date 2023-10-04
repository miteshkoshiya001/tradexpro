import { CUstomSelect } from "components/common/CUstomSelect";
import { AMOUNT, AMOUNT_PRICE, BUY, SELL } from "helpers/core-constants";
import { useRouter } from "next/router";
import BackButton from "components/P2P/BackButton";
import { useEffect, useState } from "react";
import { TfiHandPointRight } from "react-icons/tfi";
import { toast } from "react-toastify";
import { getAvailableBalance } from "service/p2p";
import { placeP2POrderAction } from "state/actions/p2p";
import useTranslation from "next-translate/useTranslation";

export const BuyFrom = ({
  details,
  rate,
  setRate,
  getRate,
  lastChanged,
  setlastChanged,
  ads_type,
  ads_id,
}: any) => {
  const router = useRouter();
  const [paymentMethods, setPaymethods] = useState([]);
  const { t } = useTranslation("common");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();
  const getAvailableBalanceAction = async () => {
    const response = await getAvailableBalance(
      parseInt(ads_type) === BUY ? SELL : BUY,
      details?.ads?.coin_type,
      details?.ads?.uid
    );
    if (response.success) {
      //  setAmount({
      //    ...Amount,
      //    amount: response?.data?.balance,
      //  });
      setRate({ ...rate, amount: parseFloat(response?.data?.balance) });
      getRate(parseFloat(response?.data?.balance), null);
      setlastChanged(AMOUNT);
    } else {
      toast.error(response?.message);
    }
  };
  const handlePayment = (e: any) => {
    setSelectedPaymentMethod(e.value);
  };
  useEffect(() => {
    let PaymentMethods: any = [];
    details?.payment_methods?.map((item: any) =>
      PaymentMethods.push({
        value: item.uid,
        label: item?.admin_pamynt_method?.name,
      })
    );
    setPaymethods(PaymentMethods);
  }, [details]);
  return (
    <div className="col-12 p-5 boxShadow mt-5 mb-5">
      <div className="mt-3 mb-3">
        <BackButton />
      </div>
      <h1 className="ny-3">{t("Details")}</h1>
      <div className=" p-4 rounded">
        <div className="row">
          <div className="col-md-6">
            <div className="tableImg d-flex align-items-center">
              <img
                src="https://api-tradex.nftarttoken.xyz/images/avatars/yellow-hat.png"
                alt=""
              />
              <h5>
                {details?.ads?.user?.first_name} {details?.ads?.user?.last_name}
              </h5>
              <p className="px-3">{details?.orders} orders</p>
              <p>
                {details?.completion}% {t("completion")}
              </p>
            </div>
            <div className="row pt-4">
              <div className="col-lg-6">
                <div className="d-flex align-items-center">
                  <p>Price</p>
                  <h6 className="pl-3 text-warning">
                    {parseFloat(details?.price)} {details?.ads?.currency}
                  </h6>
                </div>
                <div className="d-flex align-items-center">
                  <p>(t{"Payment Time Limit"})</p>
                  <h6 className="pl-3">
                    {details?.ads?.payment_times} {t("Minutes")}
                  </h6>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="d-flex align-items-center">
                  <p>{t("Available")}</p>
                  <h6 className="pl-3">
                    {parseFloat(details?.available)} {details?.ads?.coin_type}
                  </h6>
                </div>
                <div className="d-flex align-items-center">
                  {/* <p>Payments</p> */}
                  {/* {details.payment_methods.map((payment: any) => (
                    <span className="badge badge-light ml-3 text-warning">
                      {payment}
                    </span>
                  ))} */}
                </div>
              </div>
              <div className="col-12">
                <div className="pt-5">
                  <h5>{t("Terms and Conditions")}</h5>
                  <div className="d-flex align-items-center p2pTerms pt-3">
                    <TfiHandPointRight />
                    <p>
                      {t("Include popular icons in your React projects easily")}
                    </p>
                  </div>
                  <div className="d-flex align-items-center p2pTerms pt-3">
                    <TfiHandPointRight />
                    <p>
                      Include popular icons in your React projects easily with
                      react-icons.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form
            className="col-md-6"
            onSubmit={async (e) => {
              e.preventDefault();
              if (!selectedPaymentMethod) {
                toast.error("Please select a payment method");
                return;
              }
              if (!lastChanged) {
                toast.error("Field cannot be 0, please enter a value");
                return;
              }
              placeP2POrderAction(
                parseInt(ads_type),
                ads_id,
                selectedPaymentMethod,
                lastChanged === AMOUNT_PRICE ? rate.amount_price : rate.amount,
                lastChanged,
                router
              );
              // if (response.success) {
              // }
            }}
          >
            <div>
              <label>
                {parseInt(ads_type) === BUY
                  ? "I want to pay"
                  : "I will receive"}
              </label>
              <div className="P2psearchBox position-relative">
                <input
                  type="text"
                  value={rate?.amount_price}
                  placeholder="233.0555 - 24.24240"
                  onChange={(e) => {
                    setRate({
                      ...rate,
                      amount_price: parseFloat(e.target.value),
                    });
                    getRate(null, parseFloat(e.target.value));
                    setlastChanged(AMOUNT_PRICE);
                  }}
                />
                <p className="limitBalance my-2">
                  Min price {details?.ads?.minimum_trade_size}{" "}
                  {details?.ads?.currency}- Max price{" "}
                  {details?.ads?.maximum_trade_size} {details?.ads?.currency}
                </p>
                <button>
                  <span className="ml-3 text-muted">
                    {details?.ads?.currency}
                  </span>
                </button>
              </div>
              <label className="pt-3">
                {parseInt(ads_type) === BUY
                  ? "I will receive"
                  : "I want to sell"}
              </label>
              <div className="P2psearchBox position-relative">
                <input
                  type="text"
                  placeholder="0.00"
                  value={rate?.amount}
                  onChange={(e) => {
                    setRate({ ...rate, amount: parseFloat(e.target.value) });
                    getRate(parseFloat(e.target.value), null);
                    setlastChanged(AMOUNT);
                  }}
                />
                <button>
                  <span className="ml-3 text-muted">
                    {details?.ads?.coin_type}
                  </span>
                </button>
              </div>
              <div className="adFromPriceInecDecButton mt-3">
                <button
                  className=" py-2"
                  type="button"
                  onClick={getAvailableBalanceAction}
                >
                  Get all balance
                </button>
              </div>
              <label className="pt-3">Select payment method</label>

              <CUstomSelect
                options={paymentMethods}
                handleFunction={handlePayment}
              />
              <div className="mt-3 d-flex justify-content-center">
                <button className="primary-btn-outline w-100 " type="submit">
                  {parseInt(ads_type) === BUY ? "Buy" : "Sell"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
