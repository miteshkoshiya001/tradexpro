import { CUstomSelect } from "components/common/CUstomSelect";
import { useEffect, useState } from "react";
import { BsQuestionSquareFill } from "react-icons/bs";

export const AddPostTwo = ({
  setAddStep,
  selectedAsset,
  data,
  selectedPayment,
  setSelectedPayment,
  selectedPaymentTime,
  setSelectedPaymentTime,
  amount,
  selectedCurrency,
  setAmount,
  getAvailableBalanceAction,
}: any) => {
  const [PaymentOption, setPaymentOption] = useState([]);
  const [PaymentTime, setPaymentTime] = useState([]);
  const [minError, setMinError] = useState("");
  const [maxError, setMaxError] = useState("");
  const [limit, setLimit] = useState<any>({
    minimum_price: 0,
    maximum_price: 0,
  });
  useEffect(() => {
    const value = data?.data?.assets.find(
      (item: any) => (item.coin_type = selectedAsset?.value)
    );
    setLimit({
      minimum_price: value.minimum_price,
      maximum_price: value.maximum_price,
    });
  }, [data?.data?.assets, selectedAsset?.value]);
  const handlePayment = (e: any) => {
    setSelectedPayment(e);
  };
  const handlePaymentTime = (e: any) => {
    setSelectedPaymentTime(e);
  };
  useEffect(() => {
    let payment_method: any = [];
    let payment_time: any = [];
    data?.data?.payment_method?.map((asset: any) => {
      const obj = {
        value: asset.uid,
        label: asset?.admin_pamynt_method?.name,
      };
      payment_method.push(obj);
    });
    data?.data?.payment_time?.map((asset: any) => {
      const obj = {
        value: asset.uid,
        label: asset.time.toString(),
      };
      payment_time.push(obj);
    });
    setPaymentOption(payment_method);
    setPaymentTime(payment_time);
  }, [data.data.payment_method, data.data.payment_time]);

  return (
    <div className="col-12 mt-4">
      <div className="buySellAddBox px-5 py-5 rounded">
        <div className="row">
          <div className="col-12 mt-4">
            <div className="row">
              <div className="col-md-6 col-lg-6 col-12">
                <label className="d-block">Payment Method</label>

                <div className="col-12 p-0">
                  <CUstomSelect
                    options={PaymentOption}
                    isSearchable={true}
                    isMulti={true}
                    placeholder="Add"
                    handleFunction={handlePayment}
                    defaultValue={selectedPayment}
                  />
                </div>
                <small>Select up to 5 payment methods</small>
              </div>
              <div className="col-md-6 col-lg-6 col-12">
                <label>Payment Time Limit</label>
                <div className="col-12 p-0">
                  <CUstomSelect
                    options={PaymentTime}
                    isSearchable={false}
                    placeholder="Select payment time"
                    handleFunction={handlePaymentTime}
                    defaultValue={selectedPaymentTime}
                  />
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-12">
                <label> Order Limit:</label>
                <div className="P2psearchBox position-relative">
                  <input
                    type="number"
                    placeholder="Min limit"
                    value={amount.min_limit}
                    onChange={(e) => {
                      setAmount({
                        ...amount,
                        min_limit: e.target.value,
                      });
                    }}
                  />
                  {minError && <span className="text-danger">{minError}</span>}
                  <button>
                    <span className="ml-3 text-muted">
                      {selectedCurrency?.value}
                    </span>
                  </button>
                </div>
              </div>
              <div className="col-md-6 col-lg-6 col-12">
                <label></label>
                <div className="P2psearchBox position-relative mt-2">
                  <input
                    type="text"
                    placeholder="Max limit"
                    value={amount.max_limit}
                    onChange={(e) => {
                      setAmount({
                        ...amount,
                        max_limit: e.target.value,
                      });
                    }}
                  />
                  {maxError && <span className="text-danger">{maxError}</span>}

                  <button>
                    <span className="ml-3 text-muted">
                      {selectedCurrency?.value}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-6 col-12 mt-1">
            <label> Total Amount:</label>
            <div className="P2psearchBox position-relative">
              <input
                type="number"
                placeholder="0.00"
                value={amount.amount}
                onChange={(e) => {
                  setAmount({
                    ...amount,
                    amount: e.target.value,
                  });
                }}
              />
              <button>
                <span className="ml-3 text-muted">{selectedAsset?.value}</span>
              </button>
            </div>
            <div className="adFromPriceInecDecButton mt-3">
              <button className=" py-2" onClick={getAvailableBalanceAction}>
                Get all balance
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="addPostNextButton mt-3" style={{justifyContent: 'end'}}>
        
        <div>
          <button onClick={() => setAddStep("stepOne")} className=" py-2">
            Previous
          </button>
          {selectedPayment.length > 0 && (
            <button
              onClick={() => setAddStep("stepThree")}
              className=" py-2 buySellBoxActive ml-2"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
