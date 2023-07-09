import axios from "axios";
import authHeader from "./auth-header";


const API_URL = "/posts";

const getAllPublicPosts = () => {
  return axios.get(API_URL + "/public");
};

const getAllProductsPosts = () => {
  return axios.get(API_URL + "/products", { headers: authHeader() });
};

const getAllCompaniesPosts = () => {
  return axios.get(API_URL + "/companies", { headers: authHeader() });
};






const postService = {
  getAllPublicPosts,
  getAllProductsPosts,
  getAllCompaniesPosts,
};

export default postService;
