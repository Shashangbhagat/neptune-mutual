import Head from 'next/head'
import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Conveter from '../components/Converter'

const Home: NextPage = () =>  {
  return (
    <div className={styles.container}>
      <Head>
        <title>Neptune Mutual</title>
      </Head>

      <main className={styles.main}>
        <Conveter />
      </main>
    </div>
  )
}

export default Home;
