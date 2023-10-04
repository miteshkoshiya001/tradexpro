import { P2pDataTable } from "../P2pHome/P2pDataTable";

export const UserDataTable = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="newsCategory">
            <ul>
              <li className="itemCatagory itemCatagoryactive">
                <b>Online Ads</b>
              </li>
              <li className="itemCatagory ">
                <b>Feedback (2)</b>
              </li>
            </ul>
          </div>
          <h5 className="mb-2 mt-4">Buy from the user</h5>
          <P2pDataTable />

          <h5 className="mb-2 mt-5">Buy from the user</h5>
          <P2pDataTable />
        </div>
      </div>
    </div>
  );
};
