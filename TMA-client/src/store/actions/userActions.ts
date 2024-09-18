import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonConfig } from "../../utils/apiUtils";
import apiClient from "../../utils/axios";


export const signupAction = createAsyncThunk("user/signup", async (form: any) => {
    try {
        const response = await apiClient.post('/user/signup', form, jsonConfig);
        return response.data;
    } catch (error: any) {
        throw new Error(error)
    }
});