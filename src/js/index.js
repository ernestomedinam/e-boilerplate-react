import React from "react";
import ReactDOM from "react-dom";
import Layout from "./Layout";
import "../sass/styles.scss";

ReactDOM.render(<Layout />, document.getElementById("root"));

// if (module.hot) {
// 	module.hot.accept("./Layout.js", () => {
// 		const NextLayoutContainer = require("./Layout.js").default;
// 		ReactDOM.render(
// 			<NextLayoutContainer />,
// 			document.getElementById("root")
// 		);
// 	});
// }
