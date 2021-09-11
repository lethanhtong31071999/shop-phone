import axiosClient from "api/axiosClient";

const phoneApi = {
  async getAll(params = {}) {
    // Truyen category
    // categoryId = 0
    params["categoriesId"] = 0;
    const url = `/products`;
    return await axiosClient.get(url, {
      params: params,
    });
  },
};

export default phoneApi;
