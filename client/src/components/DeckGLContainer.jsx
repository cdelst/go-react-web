import React, { useEffect, useState } from "react";
import { DeckGLComponent } from "./DeckGL";

const DeckGLContainer = () => {
  const [coordinateList, setCoordinatesList] = useState([[]]);

  async function getCoordinates() {
    let response = await fetch("api/query");
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
