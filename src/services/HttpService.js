import axios from "axios"
const app = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? 'http://localhost:3000/api' : 'https://next-crypto-tau.vercel.app/api'
})

const http = {
    get: app.get,
    post: app.post,
    put: app.put,
    delete: app.delete
}

export default http