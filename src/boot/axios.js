import axios from 'axios'
const axiosInstance = axios.create({
  baseURL: 'https://gvckc9pr-3000.asse.devtunnels.ms'
})
export default ({ Vue }) => {
  Vue.prototype.$axios = axiosInstance
}
export { axiosInstance }
