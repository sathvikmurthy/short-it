import React from "react";
import Link from 'next/link';
import Image from 'next/image';
import styles from "../styles/Nav.module.css";
import { useRecoilState } from 'recoil';
import { useEffect, useState, useRef } from "react";
import { userNameState, userEmailState, userLogoState, isLogState, topLoadState } from "../stores/store";
import GitHubIcon from "../media/github-icon.svg";
import LoadingBar from 'react-top-loading-bar';
import Dropdown from "./Dropdown";
import Tooltip from '@material-ui/core/Tooltip';
import { authe } from "../utils/firebase";
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const StyledAvatar = withStyles({
	root: {
		width: '30px',
		height: '30px',
	}
})(Avatar);

function Nav() {

	const [topLoad, setTopLoad] = useRecoilState(topLoadState);

	const [userEmail, setUserEmail] = useRecoilState(userEmailState);
	const [userName, setUserName] = useRecoilState(userNameState);
	const [userLogo, setUserLogo] = useRecoilState(userLogoState);
	const [isLog, setIsLog] = useRecoilState(isLogState);

	const [isUser, setIsUser] = useState(false);

	const [isDrop, setIsDrop] = useState(false);

	const logOut = async () => {
		setTopLoad(true);

		await authe.signOut().then(() => {
			localStorage.removeItem('userEmail');
			localStorage.removeItem('userLogo');
			localStorage.removeItem('userName');
			localStorage.setItem('isLog', "false");

			setUserEmail("");
			setUserLogo("");
			setUserName("");

			setTopLoad(false);
			setIsDrop(false);
		}).catch((error) => {
			alert(error);
		})	
	};

	useEffect(() => {
		if(localStorage.getItem('isLog') === "true") {
			setUserEmail(localStorage.getItem('userEmail'));
			setUserLogo(localStorage.getItem('userLogo'));
			setUserName(localStorage.getItem('userName'));
		} else {
			
		}
	}, [userEmail, userName, userLogo]);

	useEffect(() => {
		if(userEmail) {
			setIsUser(true);
		} else {
			setIsUser(false);
		}
	}, [userEmail]);

	const ref = useRef(null)

	useEffect(() => {
		if(topLoad === true) {
			ref.current.continuousStart();
		} else {
			if(topLoad === false) {
				ref.current.complete();
			}
		}
	}, [topLoad]);

	return (
		<nav className={styles.nav}>
			<LoadingBar color='#ba54f5' ref={ref} />

			<div title="Short-It" className={styles.nav__leftmenu}>
				<Link href="/" >SHORT-IT</Link>
			</div>

			<div className={styles.nav__rightmenu}>

				<ul>
					<Tooltip title="Open Source" arrow><button onClick={() => window.open("https://github.com/notsathvik/short-it")} className={styles.nav__github}><Image src={GitHubIcon} alt="Github" /></button></Tooltip>
				</ul>

				{isUser ? 
					(<button onClick={() => setIsDrop(!isDrop)} className={styles.nav__logobtn} ><StyledAvatar src={userLogo} alt={userName}/></button>) 
				: 
					(<Link href="/login"><button className={styles.nav__login}>Login</button></Link>)
				}
			</div>

			{isDrop ? (<Dropdown logout={logOut} name={userName} />) : (<></>)} 
		</nav>
	)
}

export default Nav;