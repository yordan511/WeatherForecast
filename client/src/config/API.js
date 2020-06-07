import axios from "axios";

export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/"
    : "http://hosted-solution.com/";

export default axios.create({
  BASE_URL,
  responseType: "json",
});
