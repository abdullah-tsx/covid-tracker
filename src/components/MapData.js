import React from 'react';
import {Circle, Popup} from "react-leaflet";
import numeral from 'numeral';
import './MapData.css'

const MapData = ({data, casesType}) => {

    const casesTypeColors = {
        cases: {
            hex: "#CC1034",
            rgb: "rgb(204, 16, 52)",
            multiplier: 200,
        },
        recovered: {
            hex: "#7dd71d",
            rgb: "rgb(125, 215, 29)",
            multiplier: 200,
        },
        deaths: {
            hex: "#fb4443",
            rgb: "rgb(251, 68, 67)",
            multiplier: 800,
        },
    };

    return data.map((country) => {
        return (
            <Circle center={[country.countryInfo.lat, country.countryInfo.long]}
                    key={country.country}
                    fillOpacity={0.4}
                    color={casesTypeColors[casesType].hex}
                    filColor={casesTypeColors[casesType].hex}
                    radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
            >
                <Popup>
                    <div className="info__container">
                        <div className="info__flag">
                            <img src={country.countryInfo.flag} alt={`${country.country} Flag`}/>
                        </div>
                        <div className="info__name">{country.country}</div>
                        <div className="info__cases">Cases: {numeral(country.cases).format("0,0")}</div>
                        <div className="info__deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                        <div className="info__recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                    </div>
                </Popup>
            </Circle>
        );
    });
};

export default MapData;