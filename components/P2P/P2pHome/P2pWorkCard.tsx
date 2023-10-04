export const P2pWorkCard = ({ discription, icon, title }: any) => {
  return (
    <div className="col-md-6 col-lg-4 mt-3 mt-lg-0">
      <div className="workCard px-4 py-5">
        <img src={icon} height={150} />
        <h4 className="py-4">{title}</h4>
        <p>{discription}</p>
      </div>
    </div>
  );
};
