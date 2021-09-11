import axiosClient from "./axiosClient";

const productApi = {
  async get(id) {
    const url = `/products/${id}`;
    return axiosClient.get(url);
  },

  async getAll(params) {
    const url = `/products`;
    return axiosClient.get(url, {
      params: params,
    });
  },
};

export default productApi;
