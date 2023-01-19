import WebSocketProvider from '@/context/WebSocketProvider'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <WebSocketProvider>
        <Component {...pageProps} />
      </WebSocketProvider>
    </>
  )
}
