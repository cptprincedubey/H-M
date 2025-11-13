import { axiosInstance } from "../config/axiosInstance";

export const getProductByCategory = async (category) => {
  try {
    console.log("me call hua...");
    let res = await axiosInstance.get(`/products/${category}`);
    if (res) {
      return res.data;
    }
  } catch (error) {
    console.log("error in fetching ladies products", error);
  }
};
