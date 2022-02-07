import React from 'react';
import numeral from 'numeral'
import './Table.css';

const Table = ({countries}) => {

    const sortedCountries = countries.sort((a, b) => b.cases - a.cases);

    return (<>
            <h3 className="table__header">Live Cases By Country</h3>
            <div className="table__container">
                <table className="table">
                    <tbody>
                    {sortedCountries.map(({country, cases}) => (
                        <tr key={country}>
                            <td>{country}</td>
                            <td>
                                <strong>{numeral(cases).format("0,0")}</strong>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Table;