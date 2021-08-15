import axios from "axios";
import { backendUrl } from "./constant";

export const axiosDelete = async (path, id) => {
  const res = await axios.delete(`${backendUrl}/${path}/${id}`);
  return res;
};
