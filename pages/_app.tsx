import { AppProps } from "next/app";

import { wrapper } from "../store";

import '../styles/globals.scss';
import '../styles/HomePageStyles/HomePage-styles.scss';
import '../styles/AboutPageStyles/AboutPage-styles.scss';
import '../styles/MovieDetailPageStyles/MovieDetailPage-styles.scss';
import '../styles/NavbarStyles/Navbar-styles.scss';
import '../styles/ScrollToTopStyles/ScrollToTop-styles.scss';
import '../styles/ModalDownloadStyles/ModalDownload-styles.scss';

import 'bootstrap/dist/css/bootstrap.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default wrapper.withRedux(MyApp)
