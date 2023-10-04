import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoIosEye } from "react-icons/io";

export const ProfileHeader = ({ details }: any) => {
  return (
    <div className="container">
      <div className="row py-4 tableRow align-items-center">
        <div className="col-md-6">
          <div className="tableImg d-flex align-items-center">
            <img
              src="https://api-tradex.nftarttoken.xyz/images/avatars/yellow-hat.png"
              alt=""
            />
            <h6 className="ml-2">
              {details?.user?.first_name} {details?.user?.last_name}
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
};
