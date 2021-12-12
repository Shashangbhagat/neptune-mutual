import React from 'react';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NeptuneImage from '../assets/images/neptune-mutual.png';
import SwapIcon from '../assets/images/swap.png';
import styles from '../styles/Converter.module.css'

export default function Conveter () {
  return (
    <div className={styles.converterContainer}>
      <div className={styles.neptuneImageContainer}>
        <Image src={NeptuneImage} />
      </div>
      <div className={styles.converterForm}>
        <div className={styles.heading}>
          Crypto Converter
        </div>
        <div>
          <div className={styles.label}>NEP</div>
          <TextField 
            placeholder='0.00' 
            fullWidth
            type="number"
            InputProps={{classes: {input: styles.input}, inputMode: 'numeric' }}
          />
        </div>
        <div className={styles.swapIconContianer}>
          <Image src={SwapIcon} height={30} width={30} />
        </div>
        <div>
          <div className={styles.label}>BUSD</div>
          <TextField 
            placeholder='0.00' 
            fullWidth
            type="number"
            InputProps={{classes: {input: styles.input}, inputMode: 'numeric' }}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button variant="text" className={styles.button}>
            Check Wallet Details
          </Button>
        </div>
      </div>
    </div>
  )
}
