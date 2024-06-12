import axios from "axios";

// 상황에 따라 주소 설정
const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;
const PROD_BACKEND = process.env.REACT_APP_PROD_BACKEND;
const BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY;

// 현재 환경에 맞는 베이스 URL 설정
const baseURL = LOCAL_BACKEND;

const api = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (request) => {
        const token = sessionStorage.getItem("token");
        if (token) {
            request.headers.authorization = `Bearer ${token}`;
        }
        return request;
    },
    (error) => {
        console.log("REQUEST ERROR", error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        const errorResponse = error.response
            ? error.response.data
            : error.message;
        console.log("RESPONSE ERROR", errorResponse);
        return Promise.reject(errorResponse);
    }
);

export default api;
