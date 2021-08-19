import React from "react";
import styles from "../styles/Footer.module.css";

function Footer() {
	return (
	<footer className={styles.footer}>
		<span className={styles.footer__creator}>created with <a href="https://nextjs.org/" traget="_blank">Next.js</a> by <a href="https://github.com/notsathvik" target="_blank">@notsathvik</a> ¬</span>
		<span className={styles.footer__copyright}>©Copyright {new Date().getFullYear()}</span>
	</footer>
	)
}

export default Footer;