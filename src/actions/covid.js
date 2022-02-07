import axios from "../helper/api";

export const getCovidData = async (countryCode) => {
    const response = await axios.get(countryCode === 'all' ? '/all' : `/countries/${countryCode}`);
    return response.data;
}