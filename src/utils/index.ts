import axios from "axios"

export const instance = axios.create({
    baseURL: import.meta.env.VITE_AUTH_SERVICE_URL,
    headers: {
        "Content-Type": "application/json",
    },
})
