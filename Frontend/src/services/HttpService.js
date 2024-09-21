import axios from "axios";
import { BECKEND_URL } from "../Constants";


export const HttpService = axios.create({
    baseURL: BECKEND_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});