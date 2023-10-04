import { AiFillInfoCircle } from "react-icons/ai";

export const UserTaskCard = () => {
  const UserTaskCardList = [
    {
      title: "All Trades",
      value: "2 Time(s)",
      buy: 1,
      sell: 0,
    },
    {
      title: "30d Trades",
      value: "2 Time(s)",
    },
    {
      title: "30d Completion Rate",
      value: "66.67 %",
    },
    {
      title: "Avg. Relese Time",
      value: "0 Minute(s)",
    },
    {
      title: "All Trades",
      value: "1.98 Minute(s)",
    },
  ];
  return (
    <div className="container">
      <div className="row">
        {UserTaskCardList.map((item, index) => (
          <div className="col-lg col-md-3 col-sm-6 col-12 mt-4" key={index}>
            <div className="p-3 paymentMethodSubBox userVerified text-center h-100">
              <p>
                {item.title} <AiFillInfoCircle className="text-muted ml-1" />
              </p>
              <h6 className="py-3">{item.value}</h6>
              {item.buy || item.sell ? (
                <small className="text-success">
                  Buy {item.buy} /{" "}
                  <span className="text-danger">Sell {item.sell}</span>
                </small>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
