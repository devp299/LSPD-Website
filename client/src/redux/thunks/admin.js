import { createAsyncThunk } from "@reduxjs/toolkit";
// import {server} from "../../constants/config";
import axios from "axios";

const adminLogin = createAsyncThunk("admin/login", async (secretKey) => {
    try {
        const config = {
            withCredentials: true,
            headers: {
                "Content-Type": "application/json",
            },
        };
    
        const {data} = await axios.post(`http://localhost:3000/api/v1/admin/verify`,{secretKey},config);
    
        return data.message;
    } catch (error) {
        throw error.response.data.message;
    }
});

const getAdmin = createAsyncThunk("admin/getAdmin", async () => {
    try {
        const {data} = await axios.get(`http://localhost:3000/api/v1/admin/`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('lspd-admin-token')}`
            },
            withCredentials: true
        });
    
        return data.admin;
    } catch (error) {
        throw error.response.data.message;
    }
});

const adminLogout = createAsyncThunk("admin/logout", async () => {
    try {
        const {data} = await axios.get(`http://localhost:3000/api/v1/admin/logout`,{
            withCredentials: true
        });
    
        return data.message;
    } catch (error) {
        throw error.response.data.message;
    }
});

export { adminLogin, getAdmin,adminLogout };