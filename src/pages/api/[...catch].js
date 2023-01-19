import { createProxyMiddleware } from "http-proxy-middleware"; 

const proxy = createProxyMiddleware({
    target: process.env.BACKEND_URL,
    secure: false,
    pathRewrite: { "^/api/" : "/"},
    changeOrigin: true
});

export default function handler(req, res) {
    proxy(req, res, (err) => {
        if (err) {
            throw err;
        }
        throw new Error(
            `Request '${req.url}' is not proxied! We should never reach here!`
        );
    });
}