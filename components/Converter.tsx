import React from 'react';
import Image from 'next/image';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import NeptuneImage from '../assets/images/neptune-mutual.png';
import SwapIcon from '../assets/images/swap.png';
import styles from '../styles/Converter.module.css'

interface IProps {
  openWalletDetails: () => void,
}

export default function Conveter (props: IProps) {
  const numberRule = new RegExp(/^\d*\.?\d{0,2}$/)
  const conversionRate = 3;
  
  const [nep, setNep] = React.useState<string>('');
  const [busd, setBusd] = React.useState<string>('');

  const handleNepChange = (e: any) => {
    if (e.target.value && !numberRule.test(e.target.value)) return
    setNep(e.target.value)
    if (!e.target.value) {
      setBusd('');
      return;
    }
    const totalBusd = Number(e.target.value) * conversionRate;
    setBusd(totalBusd.toFixed(2));
  }

  const handleBusdChange = (e: any) => {
    if (e.target.value && !numberRule.test(e.target.value)) return
    setBusd(e.target.value)
    if (!e.target.value) {
      setNep('')
      return
    }
    const totalNep = Number(e.target.value) / conversionRate;
    setNep(totalNep.toFixed(2))
  }

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
            value={nep}
            onChange={handleNepChange}
            type="text"
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
            value={busd}
            onChange={handleBusdChange}
            type="text"
            InputProps={{classes: {input: styles.input}, inputMode: 'numeric' }}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button
            variant="text"
            className={styles.button}
            onClick={props.openWalletDetails}
          >
            Check Wallet Details
          </Button>
        </div>
      </div>
    </div>
  )
}
