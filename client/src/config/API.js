import axios from "axios";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/"
    : "http://hosted-solution.com/";

export default axios.create({
  baseURL,
  responseType: "json",
});
