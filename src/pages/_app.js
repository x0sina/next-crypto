import WebSocketProvider from '@/context/WebSocketProvider'
import '@/styles/globals.css'
import { Be_Vietnam_Pro } from '@next/font/google'

const be_vietnam_pro  = Be_Vietnam_Pro ({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={be_vietnam_pro.className}>
      <WebSocketProvider>
        <Component {...pageProps} />
      </WebSocketProvider>
    </main>
  )
}
