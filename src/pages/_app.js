import WebSocketProvider from '@/context/WebSocketProvider'
import '@/styles/globals.css'
import { Be_Vietnam_Pro } from '@next/font/google'
import NProgress from 'nprogress';
import Router from 'next/router';
import 'nprogress/nprogress.css';
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const be_vietnam_pro = Be_Vietnam_Pro({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], variable: '--font' })

export default function App({ Component, pageProps }) {
  return (
    <WebSocketProvider>
      <main className={`${be_vietnam_pro.className} ${be_vietnam_pro.variable}`}>
        <Component {...pageProps} />
      </main>
    </WebSocketProvider>
  )
}
