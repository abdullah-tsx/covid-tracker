import React from 'react';
import {Card, CardContent, Typography} from "@mui/material";
import './Infobox.css';
import numeral from "numeral";

const Infobox = ({title, cases, total, onClick, isActive, isRed}) => {
    return (
        <Card className={`infobox ${isActive && 'infoBox--selected'} ${isRed && 'infoBox--red'}`} onClick={onClick}>
            <CardContent>
                <Typography color="textSecondary">{title}</Typography>
                <h2 className={`infobox__cases ${!isRed && 'infoBox__cases--green'}`}>+{numeral(cases).format("0.0a")}</h2>
                <Typography className="infobox__total" color="textSecondary">Total:
                    +{numeral(total).format("0.0a")}</Typography>
            </CardContent>
        </Card>
    );
};

export default Infobox;