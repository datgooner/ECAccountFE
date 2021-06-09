import axiosClient from "./axiosClient";

const authApi = {
  login: (payload) => {
    const url = "/auth/login";
    return axiosClient.post(url, payload);
  },
  logout: () => {
    const url = "/auth/logout";
    return axiosClient.post(url);
  },
};

export default authApi;
