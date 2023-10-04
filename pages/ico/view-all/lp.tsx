import LaunchPad from "components/ico/LaunchPad";
import Launchpool from "components/ico/Launchpool";
import { SingleHero } from "components/ico/SingleHero";
import React from "react";

export default function viewAll() {
  return (
    <div>
      <SingleHero />
      <div className="container">
        <Launchpool />
        <Launchpool />
        <Launchpool />
        <Launchpool />
        <Launchpool />
      </div>
    </div>
  );
}
