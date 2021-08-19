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

	const googleSignIn = () => {
		setTopLoad(true);

		authe.signInWithPopup(googleProvider)
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

	const githubSignIn = () => {
		setTopLoad(true);

		authe.signInWithPopup(githubProvider)
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

	useEffect(() => {
		if(localStorage.getItem('isLog') === "true") {
			Router.push("/");
		}
	}, [])

	return(
		<div className={styles.login}>
			<Head>
				<title>Short-It | Login</title>
			</Head>

			<span className={styles.login__heading}>Login with one of the social platforms below.</span>

			<button className={styles.login__google} onClick={googleSignIn}><Image src={GoogleIcon} /><span>SignIn with Google</span></button>
			<button className={styles.login__github} onClick={githubSignIn}><Image src={GithubIcon} /><span>SignIn with Github</span></button>

			{isError ? (<span className={styles.login__error}>{loginError}</span>) : (<></>) }
		</div>
	)
}