import Axios from 'axios'
import Cookies from 'js-cookie'

Axios.defaults.timeout = 30000

export const apiClient = Axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'X-CSRFToken': Cookies.get('csrftoken'),
  },
  withCredentials: true,
})

export enum StatusCodes {
  FAILED_DEPENDENCY = 424,
}
