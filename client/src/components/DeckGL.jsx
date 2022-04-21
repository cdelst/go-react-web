import React from "react";
import DeckGL from "@deck.gl/react";
import { GridLayer } from "@deck.gl/aggregation-layers";
import { StaticMap } from "react-map-gl";
import { MapView } from "@deck.gl/core";
import "../css/deckGl.css";

const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_API_KEY;

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0,
};

export function DeckGLComponent({ coordinateList }) {
  const layer = new GridLayer({
    id: "new-grid-layer",
    coordinateList,
    pickable: true,
    extruded: true,
    cellSize: 200,
    elevationScale: 4,
    getPosition: coordinateList,
  });

  return (
    <DeckGL
      viewState={INITIAL_VIEW_STATE}
      layers={[layer]}
      getTooltip={({ object }) =>
        object && `${object.position.join(", ")}\nCount: ${object.count}`
      }
    >
      <MapView id="map" controller={true}>
        <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
      </MapView>
    </DeckGL>
  );
}
