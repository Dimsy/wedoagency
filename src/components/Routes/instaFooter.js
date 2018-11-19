import React from 'react';
import Instagram from '../Instagram';
import Footer from '../Footer';

export default function RouteInstaFooter(props){
    if (window.location.pathname === "/kids" ? "logoKidsBlock" : "logoBlock") return <Footer />;

	return (
		<div>
			<Instagram />
			<Footer />
		</div>
	)
}