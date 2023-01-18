import axios from "axios";

export default async function handler(req, res) {
    const { query } = req

    const { data } = await axios.get(`https://crypto-api-x0sina.vercel.app/data/currencies-ticker?include-transparency=true&interval=${query.interval || '1d'}&labels=0&limit=${query.limit || 100}&quote-currency=${query.currency || 'USD'}&start=${query.start || 1}`)
    return res.send(data)
}