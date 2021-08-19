import Head from 'next/head'
import styles from "../styles/Home.module.css";
import HomeComponent from "../components/HomeComponent";

export default function Home() {
  return (
    <div className={styles.App}>
      <Head>
        <title>Short-It</title>
        <meta name="description" content="Free Url Shortener" />
      </Head>

      <HomeComponent />

    </div>
  )
}
