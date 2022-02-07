import './App.css';
import Dropdown from "./components/Dropdown";
import Infobox from "./components/Infobox";
import Map from "./components/Map";
import {Card, CardContent} from "@mui/material";
import {useEffect, useState} from "react";
import {getCovidData} from "./actions/covid";
import {getCountriesData} from "./actions/countries";
import Table from "./components/Table";
import LineGraph from "./components/LineGraph";
import LineChart from "./components/LineChart";

const App = () => {
    const [selectedCountry, setSelectedCountry] = useState('all');
    const [covidData, setCovidData] = useState({});
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        (async () => {
            const countriesList = await getCountriesData();

            setCountries(countriesList);
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const response = await getCovidData(selectedCountry);
            setCovidData(response);
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
                    <Infobox title="Covid Cases" cases={covidData?.todayCases} total={covidData?.cases}/>
                    <Infobox title="Recovered" cases={covidData?.todayRecovered} total={covidData?.recovered}/>
                    <Infobox title="Deaths" cases={covidData?.todayDeaths} total={covidData?.deaths}/>
                </div>
                <Map/>
                <LineGraph/>
            </div>
            <Card className="app__right">
                <CardContent>
                    <div className="app__information">
                        <Table countries={countries}/>
                        <LineGraph/>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default App;
