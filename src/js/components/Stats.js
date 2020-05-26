import React from "react";
import PropTypes from "prop-types";

const Stats = ({ stats }) => {
	return (
		<div
			className={
				stats.currentRound == 0 ? "row disabled-e" : "row white-fg"
			}
		>
			<div className="col-md-4 text-center">
				<h2>{"Round:"}</h2>
				<p className="display-3">{stats.currentRound}</p>
			</div>
			<div className="col-md-4 text-center">
				<p className="display-3">{stats.secondsLeft}</p>
				<h5>{"seconds left"}</h5>
			</div>
			<div className="col-md-4 text-center">
				<p>{stats.roundsLeft + " rounds left."}</p>
				<h5>{"Winners:"}</h5>
				{stats.winners.map(winner => {
					return (
						<p key={winner.id}>
							<strong>{winner.name}</strong>
						</p>
					);
				})}
			</div>
		</div>
	);
};

export default Stats;

Stats.propTypes = {
	stats: PropTypes.object
};
