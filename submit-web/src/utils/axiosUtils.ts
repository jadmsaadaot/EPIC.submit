import { AppConfig } from '@/config'
import axios from 'axios'

const client = axios.create({ baseURL: AppConfig.apiUrl })

export const request = ({ ...options }) => {
  // client.defaults.headers.common.Authorization = `Bearer token`

  const onSuccess = (response: unknown) => response
  const onError = (error: unknown) => {
    // optionaly catch errors and add additional logging here
    return error
  }

  return client(options).then(onSuccess).catch(onError)
}
