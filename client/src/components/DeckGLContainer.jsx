import React, { useEffect, useState } from "react";
import { DeckGLComponent } from "./DeckGL";

const API = process.env.PORT === '3000' ?  'http://localhost:3000' : 'https://cdelst-website-2.herokuapp.com/';


const DeckGLContainer = () => {
  const [coordinateList, setCoordinatesList] = useState([[]]);

  async function getCoordinates() {
    let response = await fetch(API + "api/query");
    return await response.json();
  }

  useEffect(() => {
    // This is cached in the back end
    getCoordinates().then((data) => {
      setCoordinatesList(data["coordinates"]);
    });
  }, [coordinateList]);

  return <DeckGLComponent coordinateList={coordinateList} />;
};

export default DeckGLContainer;
