import { jsonConfig } from "../utils/apiUtils"
import apiClient from "../utils/axios"

export const addTask = async (form: FormData) => {
    const response = await apiClient.post('/task/add-task', form, jsonConfig)
    return response.data
}

export const fetchTasks = async () => {
    const response = await apiClient.get('/task/fetch-all-tasks')
    return response.data
}

export const deleteTask = async (id: string) => {
    const response = await apiClient.delete(`/task/delete-task/${id}`)
    return response.data
}