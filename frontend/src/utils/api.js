import axios from "axios";
import {SERVERLINK} from "../constants/index.js";


const api = axios.create({
    baseURL : SERVERLINK,
    withCredentials : true,
})

api.defaults.withCredentials = true;

export default api;