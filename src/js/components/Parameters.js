import React from "react";
import PropTypes from "prop-types";
import { InputGroup, FormControl } from "react-bootstrap";

const Parameters = ({ parameters, setParameters, currentRound }) => {
	return (
		<React.Fragment>
			{Object.keys(parameters).map((key, index) => {
				return (
					<InputGroup key={index} className="mb-3">
						<InputGroup.Prepend>
							<InputGroup.Text id="basic-addon3">
								{key}
							</InputGroup.Text>
						</InputGroup.Prepend>
						<FormControl
							id={key}
							disabled={currentRound != 0}
							aria-describedby={key}
							value={parameters[key]}
							onChange={e => {
								setParameters({
									...parameters,
									[key]: e.target.value
								});
							}}
						/>
					</InputGroup>
				);
			})}
		</React.Fragment>
	);
};

export default Parameters;

Parameters.propTypes = {
	parameters: PropTypes.object,
	setParameters: PropTypes.func,
	currentRound: PropTypes.number
};
