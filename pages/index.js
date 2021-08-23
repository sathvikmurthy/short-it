import Head from 'next/head'
import styles from "../styles/Home.module.css";
import HomeComponent from "../components/HomeComponent";

export default function Home() {
  return (
    <div className={styles.App}>
      <Head>
        <title>Short-It - Free URL Shortener</title>
        <meta name="description" content="Free URL shortener to create perfect URLs. Short-It helps you create shortlinks in just a couple of seconds." />
        <meta name="keywords" content="Url Shortener, Url, Free Url shortener, Bitly, Google Url Shortener" />
        <meta name="copyright" content="Short-It" />
        <meta name="language" content="EN" />
      </Head>

      <HomeComponent />

    </div>
  )
}
