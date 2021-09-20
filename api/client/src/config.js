import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://blog-mee.herokuapp.com/api",
});

export default axiosInstance;