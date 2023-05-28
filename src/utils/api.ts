import axios from "axios"

const api_client = axios.create({
    baseURL: "http://localhost:5000/api", // Replace with your actual base URL
    withCredentials: true,
})

const api_user = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
})

api_user.interceptors.response.use(
    async (config) => {
        return config
    },
    (error) => {
        console.log(error.response.data)
        if (error.response?.data?.tokenError) {
            api_client.get("/auth/refresh")
        }
    }
)

export { api_client, api_user }
