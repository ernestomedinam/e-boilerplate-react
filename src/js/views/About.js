import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

const About = props => {
	return (
		<Container className="text-center my-5">
			<h2 className="display-3">{"About us"}</h2>
			<p>{"Welcome to the place where we talk about us!"}</p>
			<Link to="/" replace>
				<Button variant="primary">{"Go home!"}</Button>
			</Link>
		</Container>
	);
};

export default About;
