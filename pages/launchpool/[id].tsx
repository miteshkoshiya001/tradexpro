import { Breadcrumb } from "components/Breadcrumb";
import { SingleLaunchPool } from "components/ico/SingleLaunchPool";
import React from "react";

export default function singleLaunchPoolPage() {
  return (
    <>
      <Breadcrumb leftButton={true} leftUrl="/launchpad" />
      <SingleLaunchPool />
    </>
  );
}
