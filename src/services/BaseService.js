import axios from "axios";
import appConfig from "configs/app.config";
import { PERSIST_STORE_NAME } from "constants/app.constant";
import deepParseJson from "utils/deepParseJson";
import store from "../store";
import { onSignOutSuccess } from "../store/auth/sessionSlice";
// import { store } from '../store'

const unauthorizedCode = [401];

const BaseService = axios.create({
  timeout: 60000,
  baseURL: process.env.REACT_APP_BASE_URL,
});

BaseService.interceptors.request.use(
  (config) => {
    const rawPersistData = localStorage.getItem(PERSIST_STORE_NAME);
    const persistData = deepParseJson(rawPersistData);

    const accessToken = persistData?.auth?.session?.token;

    // const accessToken =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwicm9sZV9pZCI6MSwiaWF0IjoxNjkwOTY5Mzc3LCJleHAiOjE2OTM1NjEzNzd9.b-oHyxhoZbKe6P3tq7jdVx4YCl3-t0FgvAvLHnA3N3o"
    if (config?.url == "/api/wolooGuest/createClient" || config?.url ==  "/api/whms/clients/clientSignUp" || config?.url ==  "/api/wolooGuest/forgetPassword" || config?.url ==  "/api/wolooGuest/resetPassword") {
      config.headers["x-api-key"] = `k45GQj8FtKt0NR074UfFyvCEPAfJBzxY`;
    }

    if (accessToken) {
      config.headers["x-woloo-token"] = `${accessToken}`;

    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

BaseService.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response && unauthorizedCode.includes(response.status)) {
      store.dispatch(onSignOutSuccess());
    }

    return Promise.reject(error);
  }
);

export default BaseService;