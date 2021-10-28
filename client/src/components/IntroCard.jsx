import React from "react";
import "css/IntroCardContainer.css";

const IntroCard = () => {
  return (
    <div className="IntroContainer">
      <div className="IntroContainer-content">
        <div className="IntroContainer-content--intro">
          hi there! my name is
        </div>
        <div className="IntroContainer-content--name">case.</div>
        <div className="IntroContainer-content--occupation">
          <div>developer + student</div>
        </div>
      </div>
    </div>
  );
};

export default IntroCard;
