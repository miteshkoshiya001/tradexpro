import Link from "next/link";
import React, { useEffect, useState } from "react";

const OfferRow = ({ offers, item, isLoggedIn }: any) => {
  const [selectedDays, setSelectedDays] = useState(0);
  const [selectedData, setSelectedData] = useState<any>();
  useEffect(() => {
    setSelectedData(offers?.offer_list[item][0]);
  }, []);
  return (
    <tr className="tableRow">
      <td>
        <div className="tableImg d-flex align-items-center">
          <img src={selectedData?.coin_icon} alt="" />
          <h5>{item}</h5>
        </div>
      </td>

      <td>
        <h6 className="">
          {selectedData?.minimum_investment} {item}
        </h6>
      </td>
      <td>
        <h6 className="">{selectedData?.offer_percentage}%</h6>
      </td>

      <td>
        <div className="d-flex align-items-center">
          {offers?.offer_list[item]?.map((offer: any, index: any) => (
            <div
              className={
                selectedDays === index ? "StakingDaysActive" : "StakingDays"
              }
              key={index}
              onClick={() => {
                setSelectedDays(index);
                setSelectedData(offer);
              }}
            >
              {offer?.period} Days
            </div>
          ))}
        </div>
      </td>
      <td>
        {isLoggedIn && (
          <Link href={`/staking/locked-staking/${item}/${selectedData?.uid}`}>
            <button className="tableButton">Stake now</button>
          </Link>
        )}
      </td>
    </tr>
  );
};

export default OfferRow;
