import axios from "axios"
const app = axios.create({
    baseURL: process.env.BASE_URL
})

const http = {
    get: app.get,
    post: app.post,
    put: app.put,
    delete: app.delete
}

export default http