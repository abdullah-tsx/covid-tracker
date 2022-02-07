import React from 'react';
import {FormControl, MenuItem, Select} from "@mui/material";

const Dropdown = ({selectedCountry, onChangeSelectedCountry, countries}) => {


    return (
        <FormControl className="app_dropdown">
            <Select variant={"outlined"} value={selectedCountry} onChange={onChangeSelectedCountry}>
                <MenuItem value="all">Worldwide</MenuItem>
                {countries.map((country) => {
                    return <MenuItem value={country.countryInfo.iso2}
                                     key={country.countryInfo._id || Math.random()}
                    >
                        {country.country}
                    </MenuItem>
                })}
            </Select>
        </FormControl>
    );
};

export default Dropdown;