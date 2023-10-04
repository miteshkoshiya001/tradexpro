import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoIosEye } from "react-icons/io";

export const UserProfileHeader = () => {
  return (
    <div className="container">
      <div className="row py-4 align-items-center tableRow">
        <div className="col-md-6">
          <div className="tableImg d-flex align-items-center">
            <img
              className="userProfileImg"
              src="https://api-tradex.nftarttoken.xyz/images/avatars/yellow-hat.png"
              alt=""
            />
            <h6 className="ml-2">Chirik34</h6>
            <span className="badge badge-secondary px-2 ml-2 mr-5 py-2">
              Verified User
            </span>
            <a href="" className="text-warning">
              <b>Block</b>
            </a>
            <a href="" className="text-warning ml-4">
              <b>Report</b>
            </a>
          </div>
          <div className="ml-5 pl-2 d-flex align-items-center userVerified">
            <p>Joined on N/A</p>
            <p className="ml-2">Deposit 0.00</p>
          </div>
          <div className="ml-5 pl-2 d-flex align-items-center pt-1 userVerified">
            <p>
              Email <BsFillCheckCircleFill />
            </p>
            <p>
              SMS <BsFillCheckCircleFill />
            </p>
            <p>
              KYC <BsFillCheckCircleFill />
            </p>
          </div>
        </div>
        <div className="col-md-6 mt-4 mt-md-0 d-flex justify-content-md-end justify-content-start">
          <div>
            <p>Positive Feedback</p>
            <div className="pt-3 d-flex align-items-center">
              <h5>100% (2)</h5>
              <div className="d-flex align-items-center ml-3 ml-sm-5 mr-3">
                <p>Positive</p>
                <span className=" badge-info px-2 ml-2 h4 mb-0 rounded">2</span>
              </div>
              <div className="d-flex align-items-center">
                <p>Negative</p>
                <span className=" badge-danger px-2 ml-2 h4 mb-0 rounded">
                  0
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
