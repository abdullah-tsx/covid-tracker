import React, {useState} from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import './CasesMap.css';
import ChangeMapView from "./ChangeMapView";
import MapData from "./MapData";

function CasesMap({center, zoom, countries, casesType}) {
    return (
        <div className="map">
            <MapContainer>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                />
                <ChangeMapView center={center} zoom={zoom}/>
                {countries && <MapData data={countries} casesType={casesType}/>}
            </MapContainer>
        </div>
    );
}

export default CasesMap;