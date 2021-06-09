import axiosClient from "./axiosClient";

const chartApi = {
  genChart: () => {
    const url = "/account/genchart";
    return axiosClient.get(url);
  },
  
};

export default chartApi;
