import axios from "../helper/api";

export const getCountriesData = async () => {
    const response = await axios.get('/countries');
    return response.data;
}