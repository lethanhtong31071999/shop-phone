import axiosClient from "../axiosClient";

const phoneTypesApi = {
  async getAll() {
    const url = "/phoneTypes";
    return await axiosClient.get(url);
  },
};

export default phoneTypesApi;
