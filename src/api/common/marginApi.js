import axiosClient from "../axios.Client";

export const marginApi = {
  create(data) {
    const url = "/margin/create";
    return axiosClient.post(url, data);
  },

  getAll(data) {
    const url = "/margin/getAll";
    return axiosClient.get(url, data);
  },

  update(data) {
    const url = `/margin/update/${data.id}`;
    return axiosClient.put(url, data);
  },

  delete(data) {
    const url = `/margin/delete/${data.id}`;
    return axiosClient.put(url, data);
  },
};
