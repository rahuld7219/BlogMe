import axios from "axios";

const axiosInstance = process.env.NODE_ENV === "production" ? (
    axios.create({
        baseURL: "https://blog-mee.herokuapp.com/api",
    })
) : (
    axios.create()
);

export default axiosInstance;