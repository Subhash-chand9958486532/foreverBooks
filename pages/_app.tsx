import '@/styles/globals.css';
import '@/styles/css/all.css';
import '@/styles/css/animate.css';
import '@/styles/css/fonts.css';
import '@/styles/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Store from './componets/store'

import type { AppProps } from 'next/app'
export default function App({ Component, pageProps }: AppProps) {
  return <Store><Component {...pageProps} /></Store>
}
