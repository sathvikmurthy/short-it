import React from "react";
import { useState, useEffect } from "react";
import Nav from "./Nav";
import Image from 'next/image';
import Link from 'next/link';
import styles from "../styles/HomeComponent.module.css";
import Axios from "axios";
import { useRecoilState } from 'recoil';
import { userEmailState, topLoadState } from "../stores/store";
import CopyIcon from "../media/copy-icon.svg";
import CheckIcon from "../media/check-icon.svg";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import SidebarAd from "./SidebarAd";
import MobileAd from './MobileAd';

const StyledCircularProgress = withStyles({
	root: {
		color: 'white',
	}
})(CircularProgress);


export default function HomeComponent() {

	const [userEmail, setUserEmail] = useRecoilState(userEmailState);
	const [topLoad, setTopLoad] = useRecoilState(topLoadState);

	const [loginAlert, setLoginAlert] = useState(false);

	const [clientLink, setClientLink] = useState("");
	const [isSubmit, setIsSubmit] = useState(false);
	const [shortLoad, setShortLoad] = useState(false);

	const [serverLink, setServerLink] = useState("");
	const [outVis, setOutVis] = useState(true);

	const [isCopy, setIsCopy] = useState(false);
	const [isSnackbar, setIsSnackbar] = useState(false);
	const [snackText, setSnackText] = useState("");

	const postLinkData = {
		"longDynamicLink": `https://short-it.ml/?link=${clientLink}`,
   		"suffix": {
     		"option": "SHORT"
     	}	
	}


	// submitting link to get short link
	const linkSubmit = async (e) => {
		e.preventDefault();
		setShortLoad(true);
		setTopLoad(true);

		await Axios.post(`https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${process.env.NEXT_PUBLIC_FIREAPIKEY}`, postLinkData)
		.then((res) => {
			setServerLink(res.data.shortLink);
			setSnackText("Link Shortened!");
			setIsSnackbar(true);

			setTimeout(() => {
				setIsSnackbar(false);
			}, 3000);

			setShortLoad(false);
			setTopLoad(false);
		})
		.catch((error) => {
			setServerLink("Sorry there seems to be an error.");

			setShortLoad(false);
			setTopLoad(false);
		})
	}

	const copyLink = () => {
		setIsCopy(true);
		setSnackText("Short-It Link Copied!")
		setIsSnackbar(true);

		setTimeout(() => {
			setIsCopy(false);
			setIsSnackbar(false);
		}, 3000);
	}

	useEffect(() => {
		if(userEmail === "") {
			setLoginAlert(false);
		} else {
			setLoginAlert(true);
		}
	}, [userEmail]);

	useEffect(() => {
		if(clientLink) {
			setIsSubmit(false);
		} else {
			setIsSubmit(true);
		}
	}, [clientLink]);

	useEffect(() => {
		if(serverLink) {
			setOutVis(false);
		} else {
			setOutVis(true);
		}
	}, [serverLink]);

	return (
		<div className={styles.home}>
			<LoginAlert />

			<div className={styles.home__main}>
				<div className={styles.left__ads}>
					<SidebarAd iframesrc="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=11&l=ur1&category=amz_music&banner=11HN0GNZ493G4V6304R2&f=ifr&linkID=992e8be6a160281efd002317c3518985&t=sathvik31-20&tracking_id=sathvik31-20" />
				</div>

				<div className={styles.top__adsmobile}>
					<MobileAd iframesrc="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=288&l=ur1&category=amz_music&banner=14G0027M0PP7VXDEFBR2&f=ifr&linkID=9bf39778dd82c7eb266a5ee03e4dc690&t=sathvik31-20&tracking_id=sathvik31-20" />
				</div>

				<div className={styles.home__content}>
					<form className={styles.home__form} onSubmit={linkSubmit}>
						<input placeholder="Long URL" className={styles.home__linkinput} onChange={(e) => setClientLink(e.target.value)} type="url" />
						<button className={isSubmit ? (styles.home__linksubmitdisabled) : (styles.home__linksubmit)} disabled={isSubmit} type="submit">{shortLoad ? (<StyledCircularProgress size={20} thickness={5} />) : ("Short-It")}</button>
					</form>

					{outVis ? 
						(<></>)
						:
						(<div className={styles.home__shortlinkres}>
							<input readOnly type="text" value={serverLink} className={styles.home__shortlinkinput} />
							<Tooltip placement="bottom" arrow className={styles.home__copyshort} title={isCopy ? ("Copied") : ("Copy Link")}>
								<CopyToClipboard text={serverLink}>
									<button onClick={copyLink} className={styles.home__copyshort}>
										{isCopy ? (<Image src={CheckIcon} alt="Copied" />) : (<Image src={CopyIcon} alt="Copy" />)}
									</button>
								</CopyToClipboard>
							</Tooltip>
						</div>)
					}
				</div>

				<div className={styles.bottom__adsmobile}>
					<MobileAd iframesrc="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=288&l=ur1&category=amz_music&banner=0P340P7WYQ7P0BXDXG02&f=ifr&linkID=35adbdd02045713bf7ed7cd7a03f6f77&t=sathvik31-20&tracking_id=sathvik31-20" />
				</div>

				<div className={styles.right__ads}>
					<SidebarAd iframesrc="//rcm-na.amazon-adsystem.com/e/cm?o=1&p=29&l=ur1&category=amz_music&banner=0C9WS6QAWTBYST6G1XR2&f=ifr&linkID=c3d68ee8371da759bdbc0007a40c4927&t=sathvik31-20&tracking_id=sathvik31-20" />
				</div>
			</div>

			<Snackbar
        		anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        		message={snackText}
        		open={isSnackbar}
        		TransitionComponent={Slide}
      		/>
		</div>
	)


	function LoginAlert() {
		return (
			<>
			{loginAlert ? 
				(<></>)
				:
				(<div className={styles.home__loginmsg}>
					<span><Link href="/login">Login</Link> for free to remove ads.</span>
				</div>)
			}
			</>
		)
	}
}

export async function getServerSideProps() {

	console.log(process.env.DYNAMIC_KEY)

	return {
		props: {
			hello: 'world'
		}
	}
}