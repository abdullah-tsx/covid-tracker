import axios from "../helper/api";

export const getChartData = async (days) => {
    const response = await axios.get(`/historical/all?lastdays=${days}`);
    return response.data;
}