import React from "react";
import "css/IntroCardContainer.css";
import { FaCode, FaGraduationCap, FaPlus } from "react-icons/fa";
import LocationVariable from "./LocationVariable";

const IntroCard = () => {
  return (
    <div className="IntroContainer">
      <div className="IntroContainer-content">
        <div className="IntroContainer-content--intro">
          hi there! my name is
        </div>
        <div className="IntroContainer-content--name">case.</div>
        <div>
          <LocationVariable
            icon={<FaCode className="LocationVariable-icon" />}
            value={"developer"}
          />{" "}
          <FaPlus className="IntroContainer-content--icon" />{" "}
          <LocationVariable
            icon={<FaGraduationCap className="LocationVariable-icon" />}
            value={"student"}
          />
        </div>
      </div>
    </div>
  );
};

export default IntroCard;
