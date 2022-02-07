import React from 'react';
import {Card, CardContent, Typography} from "@mui/material";

const Infobox = ({title, cases, total}) => {
    return (
        <Card className="infobox">
            <CardContent>
                <Typography color="textSecondary">{title}</Typography>
                <h2 className="infobox__cases">{cases}</h2>
                <Typography className="infobox__total" color="textSecondary">Total: {total}</Typography>
            </CardContent>
        </Card>
    );
};

export default Infobox;