import Head from 'next/head'
import type { NextPage } from 'next'
import React from 'react';
import styles from '../styles/Home.module.css'
import Conveter from '../components/Converter'
import WalletDetailsModal from '../components/WalletDetailsModal';

const Home: NextPage = () =>  {
  const [showDetails, setWalletDetails] = React.useState<boolean>(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Neptune Mutual</title>
      </Head>

      <main className={styles.main}>
        <Conveter 
          openWalletDetails={
            () => {
              setWalletDetails(true)
            }
          } 
        />
      </main>
      <WalletDetailsModal 
        open={showDetails}
        handleClose={
          () => {
            setWalletDetails(false);
          }
        }
      />
    </div>
  )
}

export default Home;
