import {
  FcSettings,
  FcApproval,
  FcPortraitMode,
  FcNeutralTrading,
} from "react-icons/fc";

export const P2pAdvantage = ({ data }: any) => {
 
  return (
    <div className="container mt-5 pt-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h3 className="pb-2">Advantage of P2P Exchange</h3>
          {data?.p2p_advantage_1_heading && (
            <div className="advantageList d-flex align-items-center pt-5">
              <img src={data?.p2p_advantage_1_icon} height={50} width={50} />
              <div className="pl-3">
                <h5 className="pb-1">{data?.p2p_advantage_1_heading}</h5>
                <p>{data?.p2p_advantage_1_des}</p>
              </div>
            </div>
          )}
          {data?.p2p_advantage_2_heading && (
            <div className="advantageList d-flex align-items-center pt-5">
              <img src={data?.p2p_advantage_2_icon} height={50} width={50} />
              <div className="pl-3">
                <h5 className="pb-1">{data?.p2p_advantage_2_heading}</h5>
                <p>{data?.p2p_advantage_2_des}</p>
              </div>
            </div>
          )}
          {data?.p2p_advantage_3_heading && (
            <div className="advantageList d-flex align-items-center pt-5">
              <img src={data?.p2p_advantage_3_icon} height={50} width={50} />
              <div className="pl-3">
                <h5 className="pb-1">{data?.p2p_advantage_3_heading}</h5>
                <p>{data?.p2p_advantage_3_des}</p>
              </div>
            </div>
          )}
          {data?.p2p_advantage_4_heading && (
            <div className="advantageList d-flex align-items-center pt-5">
              <img src={data?.p2p_advantage_4_icon} height={50} width={50} />
              <div className="pl-3">
                <h5 className="pb-1">{data?.p2p_advantage_4_heading}</h5>
                <p>{data?.p2p_advantage_4_des}</p>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-6">
          <div className="text-center pt-3 pt-md-0 p2pExchangeImg">
            <img src={data?.p2p_advantage_right_image} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};
