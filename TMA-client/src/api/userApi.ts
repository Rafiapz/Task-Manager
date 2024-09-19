import apiClient from "../utils/axios"

export const fetchUser = async () => {
    try {
        const response = await apiClient.get('/user/fetch-user')
        return response.data
    } catch (error) {
        throw new Error('Failed to fetch user')
    }
}

export const logout = async () => {
    try {
        const response = await apiClient.get('/user/logout')
        return response.data
    } catch (error) {
        throw new Error('Failed to logout')
    }
}

