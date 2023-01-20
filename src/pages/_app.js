import WebSocketProvider from '@/context/WebSocketProvider'
import '@/styles/globals.css'
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <WebSocketProvider>
        <Component {...pageProps} />
      </WebSocketProvider>
    </main>
  )
}
