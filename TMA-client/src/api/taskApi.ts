import { jsonConfig } from "../utils/apiUtils"
import apiClient from "../utils/axios"

export const addTask = async (form: FormData) => {
    const response = await apiClient.post('/task/add-task', form, jsonConfig)
    return response.data
}

export const fetchTasks = async ({ sort, query }: any) => {

    const response = await apiClient.get(`/task/fetch-all-tasks/${sort}${query ? `?search=${query}` : ''}`)
    return response.data
}

export const deleteTask = async (id: string) => {
    const response = await apiClient.delete(`/task/delete-task/${id}`)
    return response.data
}

export const editTask = async ({ formData, id }: any) => {
    const response = await apiClient.put(`/task/edit-task/${id}`, formData, jsonConfig)
    return response.data
}