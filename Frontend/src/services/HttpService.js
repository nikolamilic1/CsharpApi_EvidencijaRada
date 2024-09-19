import axios from "axios";
import { BACKEND_URL } from "../Constants";


export const HttpService = axios.create({
    baseURL: BACKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});