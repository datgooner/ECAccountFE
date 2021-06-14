import axiosClient from "./axiosClient";

const accountApi = {
  getAccountList: () => {
    const url = "/account";
    return axiosClient.get(url);
  },
  exportAccountList: () => {
    const url = "/account/export";
    const config = { responseType: "blob" };
    return axiosClient.get(url, config);
  },
  getTechnologyList: () => {
    const url = "/technology";
    return axiosClient.get(url);
  },
  getJobRankList: () => {
    const url = "/jobrank";
    return axiosClient.get(url);
  },
  getStatusList: () => {
    const url = "/status";
    return axiosClient.get(url);
  },
  updateAccountByID: (id, payload) => {
    const url = `/account/update/${id}`;
    return axiosClient.put(url, payload);
  },
  deleteAccountByID: (id) => {
    const url = `/account/delete/${id}`;
    return axiosClient.delete(url);
  },
  
};

export default accountApi;
