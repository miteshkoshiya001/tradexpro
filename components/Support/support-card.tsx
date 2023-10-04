export const SupportCard = ({ name, ticketNumber, icon_name }: any) => {
  return (
    <div className="col-sm-6 col-12 col-lg-3 mt-3 mt-lg-0">
      <div className="h-100">
        <div className="sub_title rounded">
          <div className="d-flex justify-content-center flex-column align-items-center py-3">
            <span className="card-top-icon mb-3">
              <i className={"fa " + icon_name} aria-hidden="true"></i>
            </span>
            <h3>{ticketNumber}</h3>
            <h5>{name}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};
