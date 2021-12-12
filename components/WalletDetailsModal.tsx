import Dialog from '@mui/material/Dialog'
import React from 'react';
import Button from '@mui/material/Button'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import { useWeb3React } from '@web3-react/core'
import { InjectedConnector } from '@web3-react/injected-connector'
import CloseIcon from '../assets/images/close.png'
import styles from '../styles/WalletDetails.module.css'
import Image from 'next/image'

interface IProps {
	open: boolean,
	handleClose: () => void,
}

const INJECTED = new InjectedConnector({
  supportedChainIds: [56, 97]
});

const WalletDetailsModal = (props: IProps) => {
	const { activate, account, library, deactivate, chainId } = useWeb3React();
	const [connected, setConnected] = React.useState<boolean>(false);
	const [balance, setBalance] = React.useState<number>(null);

	const handleDisconnectClick = async () => {
		try {
			await deactivate();
			setConnected(false);
		} catch(e) {
			console.log(e);
		}
	}

	const handleConnectClick = async () => {
		try{
			await activate(INJECTED);
			setConnected(true);
		} catch(e) {
			console.log(e);
		}
	}

	React.useEffect(() => {
		const getBalance = async () => {
			if (!library) {
				setBalance(null)
			} else {
				const result: number = await library.eth.getBalance(account);
				setBalance(result);
			}
		}
		getBalance()
	}, [account, library]);

	return (
		<Dialog
			onClose={props.handleClose}
			aria-labelledby="customized-dialog-title"
			open={props.open}
			maxWidth="xs"
			fullWidth
		>
			<DialogTitle className={styles.dialogTitle}>
				<div>Modal title</div>
				<IconButton onClick={props.handleClose}>
					<Image
						src={CloseIcon} 
						height={10} 
						width={10}
						alt="close"
					/>
				</IconButton>
			</DialogTitle>
			<DialogContent>
				{connected ? (
					<>
						<div className={styles.tableRow}>
							<div>KEY</div>
							<div>VALUE</div>
						</div>
						<div className={styles.tableRow}>
							<div>Account</div>
							<div className={styles.account}>
								{account ? 
									`${account.substring(0, 4)}...${account.substring(account.length - 4, account.length)}` :
									null
								}
							</div>
						</div>
						<div className={styles.tableRow}>
							<div>Chain Id</div>
							<div>{chainId}</div>
						</div>
						<div className={styles.tableRow}>
							<div>Balance</div>
							<div>
								{(balance / 1000000000000000000).toFixed(2)}
							</div>
						</div>
						<div className={styles.walletDetails}>
							Wallet Details
						</div>
					</>
				) : (
					<div className={styles.notConnected}>
						Wallet not connected. 
						Please click to &apos;Connect Now&apos; button below.
					</div>
				)}
			</DialogContent>
			<DialogActions>
					{connected ? (
						<Button
							variant="contained"
							color="error"
							className={styles.disconnectButton} 
							onClick={handleDisconnectClick}
						>
							Disconnect
						</Button>
					) : (
						<>
							<div className={styles.bottomButtonContainer}>
									<Button
										variant="contained"
										className={styles.bottomButton} 
										onClick={handleConnectClick}
									>
										Connect Now
									</Button>
									</div>
							<div className={styles.bottomButtonContainer}>
								<Button 
									className={styles.cancelButton} 
									onClick={props.handleClose}
								>
									Cancel
								</Button>
							</div>
						</>
					)}
			</DialogActions>
		</Dialog>
	)
}

export default WalletDetailsModal;
