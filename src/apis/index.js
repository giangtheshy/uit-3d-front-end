import axios from "./axios";
axios.defaults.withCredentials = true;

export const getAllData = () => axios.get("/");
export const getBlockData = (block) => axios.get(`/${block}`);
export const addData = (data) => axios.post("/", data);
