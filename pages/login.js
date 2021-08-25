import React from "react";
import Head from 'next/head'
import Image from 'next/image';
import styles from "../styles/Login.module.css";
import { authe, googleProvider, githubProvider } from "../utils/firebase";
import { useRecoilState } from 'recoil';
import { useEffect, useState } from "react";
import { userNameState, userEmailState, userLogoState, topLoadState } from "../stores/store";
import Router from 'next/router';
import GoogleIcon from "../media/google-icon-color.svg";
import GithubIcon from "../media/github-icon-color.svg";



export default function Login() {

	const [topLoad, setTopLoad] = useRecoilState(topLoadState);

	const [userEmail, setUserEmail] = useRecoilState(userEmailState);
	const [userName, setUserName] = useRecoilState(userNameState);
	const [userLogo, setUserLogo] = useRecoilState(userLogoState);

	const [loginError, setLoginError] = useState("");
	const [isError, setIsError] = useState(false);

	const googleSignIn = async () => {
		setTopLoad(true);

		await authe.signInWithPopup(googleProvider)
		.then((result) => {
			setUserEmail(result.user.bc.email);
			setUserLogo(result.user.photoURL);
			setUserName(result.user.bc.displayName);

			localStorage.setItem('userEmail', result.user.bc.email);
			localStorage.setItem('userLogo', result.user.photoURL);
			localStorage.setItem('userName', result.user.bc.displayName);
			localStorage.setItem('isLog', "true");

			setTopLoad(false);
			Router.push('/');
		}).catch((error) => {
			setLoginError(error.message);
			setIsError(true);
			setTopLoad(false);
		})
	}

	const githubSignIn = async () => {
		setTopLoad(true);

		await authe.signInWithPopup(githubProvider)
		.then((result) => {
			setUserEmail(result.user.bc.email);
			setUserLogo(result.user.photoURL);
			setUserName(result.user.bc.displayName);

			localStorage.setItem('userEmail', result.user.bc.email);
			localStorage.setItem('userLogo', result.user.photoURL);
			localStorage.setItem('userName', result.user.bc.displayName);
			localStorage.setItem('isLog', "true");

			setTopLoad(false);
			Router.push('/');
		}).catch((error) => {
			setLoginError(error.message);
			setIsError(true);
			setTopLoad(false);
		})
	}

	const adSrc = "//rcm-na.amazon-adsystem.com/e/cm?o=1&p=13&l=ur1&category=amz_music&banner=14TVPT2VMAVM946B7302&f=ifr&linkID=c1f0b716636458daf2c6b4b3c706ce7a&t=sathvik31-20&tracking_id=sathvik31-20"
	const mobileAdSrc = "//rcm-na.amazon-adsystem.com/e/cm?o=1&p=21&l=ur1&category=amz_music&banner=1Z5JPPFTA0DXHHK2CVR2&f=ifr&linkID=e2ee075db05c3ca02ccba9959644b273&t=sathvik31-20&tracking_id=sathvik31-20"

	useEffect(() => {
		if(localStorage.getItem('isLog') === "true") {
			Router.push("/");
		}
	}, [])

	return(
		<div className={styles.login}>
			<Head>
				<title>Short-It - Login</title>
				<meta name="description" content="Login to Short-It." />
				<meta name="keywords" content="Url Shortener, Url, Free Url shortener, Bitly, Google Url Shortener" />
				<meta name="copyright" content="Short-It" />
        		<meta name="language" content="EN" />
			</Head>

			<span className={styles.login__heading}>Login with one of the social platforms below.</span>

			<button className={styles.login__google} onClick={googleSignIn}><Image src={GoogleIcon} alt="Google" /><span>SignIn with Google</span></button>
			<button className={styles.login__github} onClick={githubSignIn}><Image src={GithubIcon} alt="Github" /><span>SignIn with Github</span></button>

			{isError ? (<span className={styles.login__error}>{loginError}</span>) : (<></>) }

			<LoginAds iframesrc={adSrc} adstyle={styles.login__ads} adwidth="468" adheight="60"/>

			<LoginAds iframesrc={mobileAdSrc} adstyle={styles.login__adsmobile} adwidth="125" adheight="125"/>
		</div>
	)

	function LoginAds({ iframesrc, className, adwidth, adheight, adstyle }) {
		return(
			<iframe className={adstyle} src={iframesrc} width={adwidth} height={adheight} scrolling="no" border="0" marginWidth="0" frameBorder="0"></iframe>
		)
	}
}

