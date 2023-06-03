import axios from "axios"

let domain = ""

if (import.meta.env.DEV) {
    domain = "http://localhost:5000"
}

const api_client = axios.create({
    baseURL: domain + "/api",
    withCredentials: true,
})

const api_user = axios.create({
    baseURL: domain + "/api",
    withCredentials: true,
})

/* api_user.interceptors.response.use( */
/*     async (config) => { */
/*         return config */
/*     }, */
/*     (error) => { */
/*         console.log(error.data) */
/*         api_client.get("/auth/refresh") */
/*     } */
/* ) */

export { api_client, api_user }
