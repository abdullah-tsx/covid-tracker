import './App.css';
import Dropdown from "./components/Dropdown";
import Infobox from "./components/Infobox";
import CasesMap from "./components/CasesMap";
import {Card, CardContent} from "@mui/material";
import {useEffect, useReducer, useState} from "react";
import {getCovidData} from "./actions/covid";
import {getCountriesData} from "./actions/countries";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import "leaflet/dist/leaflet.css";
import {initialState, selectedCountryReducer} from "./reducer/selectedCountryData";


const App = () => {
    const [selectedCountry, setSelectedCountry] = useState('all');
    const [countries, setCountries] = useState([]);
    const [casesType, setCasesType] = useState('cases');
    const [state, updateData] = useReducer(selectedCountryReducer, initialState);

    useEffect(() => {
        (async () => {
            const countriesList = await getCountriesData();
            setCountries(countriesList);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const response = await getCovidData(selectedCountry);
            updateData({type: 'UPDATE', data: response});
        })();
    }, [selectedCountry]);

    const changeSelectedCountry = (event) => {
        setSelectedCountry(event.target.value);
    }

    return (
        <div className="app">
            <div className="app__left">
                <div className="app__header">
                    <h1>Covid Live Tracker</h1>
                    <Dropdown countries={countries} onChangeSelectedCountry={changeSelectedCountry}
                              selectedCountry={selectedCountry}/>
                </div>
                <div className="app__stats">
                    <Infobox title="Covid Cases" cases={state.covid.todayCases} total={state.covid.cases}
                             isActive={casesType === 'cases'}
                             isRed={true}
                             onClick={() => {
                                 setCasesType('cases')
                             }}/>
                    <Infobox title="Recovered" cases={state.covid.todayRecovered} total={state.covid.recovered}
                             isRed={false}
                             isActive={casesType === 'recovered'}
                             onClick={() => {
                                 setCasesType('recovered')
                             }}/>
                    <Infobox title="Deaths" cases={state.covid.todayDeaths} total={state.covid.deaths}
                             isActive={casesType === 'deaths'}
                             isRed={true}
                             onClick={() => {
                                 setCasesType('deaths')
                             }}/>
                </div>
                <CasesMap center={state.mapCenter} zoom={state.zoom} countries={countries} casesType={casesType}/>
            </div>
            <Card className="app__right">
                <CardContent>
                    <div className="app__information">
                        <Table countries={countries}/>
                        <LineGraph casesType={casesType}/>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
