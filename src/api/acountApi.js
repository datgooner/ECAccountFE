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
};

export default accountApi;
