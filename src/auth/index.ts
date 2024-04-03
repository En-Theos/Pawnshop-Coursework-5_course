import axios from "axios";

const axiosAuth = axios.create({
    withCredentials: true,
    baseURL: "http://localhost:3001/user"
})

axiosAuth.interceptors.request.use(
    (config) => {
        config.headers.Authorization = window.localStorage.getItem("token") || ""
        return config
    });

axiosAuth.interceptors.response.use(
    (config) => {
        return config
    },
    async (error) => {
        const originalRequest = error.config;

        if (error.response.status == 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;

            try {
                const response = await axios.get('http://localhost:3001/user/refresh', {withCredentials: true});
                window.localStorage.setItem("token", "Beaer " + response.data.accessToken);
                return axiosAuth.request(originalRequest);
            } catch (e) {
                return Promise.reject("logaut");
            }
        }

        throw error;
    }
)

export default axiosAuth