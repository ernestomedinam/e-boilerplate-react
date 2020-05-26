import React from "react";
import PropTypes from "prop-types";
import { Table } from "react-bootstrap";

const Players = ({
	players,
	setPlayers,
	currentRound,
	playing,
	clickHandler = () => {}
}) => {
	const comparePoints = (a, b) => {
		const aPoints = a.points;
		const bPoints = b.points;
		let result = 0;
		if (aPoints > bPoints) {
			result = -1;
		} else if (aPoints < bPoints) {
			result = 1;
		}
		return result;
	};
	const orderedPlayers = players.sort(comparePoints);
	return (
		<React.Fragment>
			<div className="col">
				<Table striped bordered>
					<thead className="bg-white">
						<tr>
							<th>{"Id"}</th>
							<th>{"Name"}</th>
							<th>{"Points"}</th>
						</tr>
					</thead>
					<tbody className="white-fg">
						{orderedPlayers.map((player, index) => {
							return (
								<tr key={player.id}>
									<td>{player.id}</td>
									<td>{player.name}</td>
									<td className="d-flex justify-content-between">
										{player.points}
										<span
											className={
												currentRound != 0 && !playing
													? "mr-2 win-round enabled"
													: "mr-2 win-round"
											}
											onClick={e =>
												clickHandler(player.id)
											}
										></span>
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		</React.Fragment>
	);
};

export default Players;

Players.propTypes = {
	players: PropTypes.array,
	setPlayers: PropTypes.func,
	currentRound: PropTypes.number,
	playing: PropTypes.bool,
	clickHandler: PropTypes.func
};
