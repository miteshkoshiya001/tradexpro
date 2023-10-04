import LaunchPad from "components/ico/LaunchPad";
import { SingleHero } from "components/ico/SingleHero";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getLaunchpadListPageAction } from "state/actions/launchpad";

export default function ViewAll() {
  const [launchpadList, setLaunchpadList]: any = useState([]);
  const router = useRouter();
  useEffect(() => {
    if (router.query.type) {
      getLaunchpadListPageAction(setLaunchpadList, router.query.type);
    }
  }, [router.query.type]);

  return (
    <div>
      <SingleHero type={router.query.type} />
      <div className="container">
        {launchpadList?.map((item: any, index: number) => (
          <LaunchPad data={item} key={index} />
        ))}
      </div>
    </div>
  );
}
