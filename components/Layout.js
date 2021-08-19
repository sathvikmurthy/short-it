import React from "react";
import Nav from "./Nav";
import Footer from "./Footer";
import styles from "../styles/Layout.module.css";

export default function Layout({ children }) {
	return (
		<div className={styles.layout}>
			<Nav />
			{children}
			<Footer />
		</div>
	)
}