import axios from "axios";

export default async function handler(req, res) {

    const {data} = await axios.get('https://crypto-api-x0sina.vercel.app/data/currencies-ticker?include-transparency=true&interval=1d&labels=0&limit=100&quote-currency=USD&start=1')
    return res.send(data)
}