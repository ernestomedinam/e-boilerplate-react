import React, { useState, useEffect } from "react";
import Home from "./views/Home";

const Layout = props => {
	const [viewIsReady, setViewIsReady] = useState(false);
	useEffect(() => {
		if (!viewIsReady) {
			// this is simulating children components mounting.
			setTimeout(() => {
				setViewIsReady(true);
			}, 2000);
		}
	}, []);
	return <React.Fragment>{viewIsReady ? <Home /> : <div className="view-loader"></div>}</React.Fragment>;
};

export default Layout;
