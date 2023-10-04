import { CUstomSelect } from "components/common/CUstomSelect";
import { useEffect, useState } from "react";
import { HiRefresh } from "react-icons/hi";

export const P2pFilter = ({ filters, setFilters, settings }: any) => {
  const [currency, setCurrency] = useState([]);
  const [country, setCountry] = useState([]);
  const [payment, setPayment] = useState([]);

  const handleCurrency = (e: any) => {
    setFilters({ ...filters, currency: e.value });
  };
  const handleCountry = (e: any) => {
    setFilters({ ...filters, country: e.value });
  };
  const handlePayment = (e: any) => {
    setFilters({ ...filters, payment_method: e.value });
  };
  useEffect(() => {
    let currency: any = [];
    currency.push({
      value: "all",
      label: "All",
    });
    let country: any = [];
    country.push({
      value: "all",
      label: "All",
    });
    let payment: any = [];
    payment.push({
      value: "all",
      label: "All",
    });
    settings?.currency?.map((item: any) =>
      currency.push({
        value: item.currency_code,
        label: item.currency_code,
      })
    );
    settings?.country?.map((item: any) =>
      country.push({
        value: item.key,
        label: item.value,
      })
    );
    settings?.payment_method?.map((item: any) =>
      payment.push({
        value: item?.uid,
        label: item?.name,
      })
    );
    setCurrency(currency);
    setCountry(country);
    setPayment(payment);
  }, [settings]);
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-3">
          <label>Amount</label>
          <div className="P2psearchBox position-relative">
            <input
              type="text"
              placeholder="Enter amount EUR"
              value={filters.amount}
              onChange={(e) => {
                setFilters({
                  ...filters,
                  amount: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group p2pSelectFilter">
            <label> Fiat</label>
            <CUstomSelect options={currency} handleFunction={handleCurrency} />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group p2pSelectFilter">
            <label> Payment</label>
            <CUstomSelect options={payment} handleFunction={handlePayment} />
          </div>
        </div>
        <div className="col-md-3">
          <div className="form-group p2pSelectFilter">
            <label>Available Region(s)</label>
            <CUstomSelect options={country} handleFunction={handleCountry} />
          </div>
        </div>
      </div>
    </div>
  );
};
