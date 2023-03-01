
import axios from "axios";

const BASEURL = "http://localhost:8000"; // Adjust to port where backend is running

const routes = {
    getServerStatus: `${BASEURL}/`,
    getDataFromPandas: `${BASEURL}/getDataFromPandas`,
    getDataFromRedis: `${BASEURL}/getDataFromRedis`,
}

export const getServerStatus = async () => {
    const result = await axios(routes.getServerStatus, {});
    const { message } = result.data;
    return message
}
export const getData = async (query: string) => {
    const result = await axios(routes.getDataFromPandas, { params: { query } });
    const { data } = result;
    return data
}