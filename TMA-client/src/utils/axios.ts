import axios, { AxiosError } from "axios";


const BASE_URL = 'http://localhost:3500'


const apiClient = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

apiClient.interceptors.request.use((config: any) => {

    return config
},
    (error: AxiosError) => {

        return Promise.reject(error)
    }

)

apiClient.interceptors.response.use((response: any) => {

    return response
},
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

export default apiClient

