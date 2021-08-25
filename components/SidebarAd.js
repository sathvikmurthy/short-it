import React from "react";

export default function SidebarAd({ iframesrc }) {
	return(
		<div style={{ color: '#ba54f5', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
			<iframe src={iframesrc} width="120" height="600" scrolling="no" border="0" marginWidth="0" frameBorder="0"></iframe>
		</div>
	)
}