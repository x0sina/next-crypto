import axios from "axios";

export default async function handler(req, res) {
    const { query } = req
    const symbol = query.currencySlug.split('-')[0].toUpperCase()

    const { data } = await axios.get(`https://crypto-api-x0sina.vercel.app/data/currencies-ticker?filter=any&interval=${query.interval || '1d'}&quote-currency=${query.currency || 'USD'}&symbols=${symbol}`)
    return res.send(data)
}