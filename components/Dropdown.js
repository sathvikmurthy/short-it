import React from "react";
import styles from "../styles/Dropdown.module.css";
import ChevronRightIcon from "../media/chevron-right-icon.svg";
import LogoutIcon from "../media/log-out-icon.svg";
import Link from 'next/link';
import Image from 'next/image';

export default function DropDown(props) {
	return(
		<div className={styles.dropdown}>
			<div className={styles.dropdown__top}>
				<div className={styles.dropdown__topcontain}>
					<span className={styles.dropdown__titles}>Signed In as:</span>
					<span className={styles.dropdown__name}>{props.name}</span>
				</div>
			</div>
			<div className={styles.dropdown__bottom}>
				<Rows image={ChevronRightIcon} imgalt="Chevron"><Link className={styles.dropdown__titles} href="/">API</Link></Rows>
				<Rows click={() => window.open("mailto:short-it@7centmgmt.cf")} image={ChevronRightIcon} imgalt="Chevron"><a className={styles.dropdown__titles}>Contact Us</a></Rows>
				<Rows click={props.logout} image={LogoutIcon} imgalt="Logout"><span className={styles.dropdown__titles}>Logout</span></Rows>
			</div>
		</div>
	)

	function Rows({ children, image, click, imgalt }) {
		return(
			<div onClick={click} className={styles.rows}>
				<div className={styles.rows__container}>
					{children}
					<Image className={styles.rows__icons} src={image} alt={imgalt} />
				</div>
			</div>
		)
	}
}