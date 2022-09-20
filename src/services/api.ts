import axios from "axios";


export const api = axios.create({
    baseURL: 'https://dtmoneyv1.netlify.app/api'
}) 