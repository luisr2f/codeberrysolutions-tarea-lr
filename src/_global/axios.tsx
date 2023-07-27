import axios from 'axios'

import { personalToken } from './constant'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${personalToken}`
  // config.headers['Access-Control-Allow-Origin'] = '*'
  // config.headers['Content-Type'] = 'text/plain'

  return config
})

axiosInstance.defaults.baseURL = process.env.REACT_APP_BASE_URL

export default axiosInstance
