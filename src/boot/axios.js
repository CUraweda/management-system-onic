import axios from "axios";
const axiosInstance = axios.create({
  baseURL: 'https://api-prmn.curaweda.com:3000'
  // baseURL: 'https://wg3bg68h-3000.asse.devtunnels.ms'
  // baseURL: 'http://localhost:3000'
})
export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance;
};
export { axiosInstance };
