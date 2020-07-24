import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import Parameters from "../components/Parameters";
import Stats from "../components/Stats";
import Players from "../components/Players";
import useInterval from "../components/useInterval";

const Contest = (props) => {
	const [playing, setPlaying] = useState(false);
	const [newPlayer, setNewPlayer] = useState("");
	const [parameters, setParameters] = useState({
		rounds: 1,
		winners: 1,
		pointsPerRound: 1,
		secondsForRound: 60,
	});
	const [stats, setStats] = useState({
		currentRound: 0,
		secondsLeft: 0,
		roundsLeft: 0,
		winners: [],
		status: "planning",
	});
	const [players, setPlayers] = useState([]);
	const createGame = useCallback(() => {
		setStats({
			currentRound: 1,
			secondsLeft: parseInt(parameters.secondsForRound),
			roundsLeft: parseInt(parameters.rounds) - 1,
			winners: [],
			status: "created",
		});
	}, [parameters]);
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
	const addPointToPlayer = useCallback(
		(playerId) => {
			if (stats.status != "ended") {
				setPlaying(false);
				let updatedPlayers = players.map((player, index) => {
					if (player.id == playerId) {
						return {
							...player,
							points:
								parseInt(player.points) +
								parseInt(parameters.pointsPerRound),
						};
					} else {
						return player;
					}
				});
				setPlayers(updatedPlayers);
				let orderedPlayers = updatedPlayers.sort(comparePoints);
				let winners = [];
				for (let place = 0; place < parameters.winners; place++) {
					winners.push(orderedPlayers[place]);
				}
				if (stats.roundsLeft == 0) {
					setStats({
						...stats,
						winners: winners,
						status: "ended",
					});
				} else {
					setStats({
						...stats,
						currentRound: stats.currentRound + 1,
						secondsLeft: parseInt(parameters.secondsForRound),
						roundsLeft: stats.roundsLeft - 1,
						winners: winners,
					});
				}
			}
		},
		[players, stats, parameters]
	);
	useInterval(
		() => {
			if (stats.secondsLeft == 0) {
				setPlaying(false);
			} else {
				setStats({
					...stats,
					secondsLeft: stats.secondsLeft - 1,
				});
			}
		},
		playing ? 1000 : null
	);
	const startOver = useCallback(() => {
		let updatedPlayers = players.map((player, index) => {
			return {
				...player,
				points: 0,
			};
		});
		setPlayers(updatedPlayers);
		setStats({
			currentRound: 0,
			secondsLeft: 0,
			roundsLeft: 0,
			winners: [],
			status: "planning",
		});
	}, [players]);
	return (
		<div className="container pt-3">
			<div className="row">
				{stats.currentRound == 0 ? (
					<div className="col-md-4 p-3">
						<Parameters
							parameters={parameters}
							setParameters={setParameters}
							currentRound={stats.currentRound}
						/>
					</div>
				) : (
					<div className="col-md-8 p-3 align-self-center">
						<Stats stats={stats} />
					</div>
				)}
			</div>
			<div className="row">
				{stats.status == "planning" && (
					<React.Fragment>
						<Form
							id="newPlayer"
							className="col-md-4"
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								setPlayers([
									...players,
									{
										id: players.length + 1,
										name: newPlayer,
										points: 0,
									},
								]);
								setNewPlayer("");
							}}
						>
							<Form.Group>
								<Form.Control
									disabled={stats.currentRound != 0}
									type="input"
									placeholder="Name"
									value={newPlayer}
									onChange={(e) =>
										setNewPlayer(e.target.value)
									}
								/>
							</Form.Group>
						</Form>
						<div className="col-md-4 col-6 d-flex align-items-end justify-content-md-start justify-content-center">
							<Button
								form="newPlayer"
								className="mb-3"
								disabled={stats.currentRound != 0}
								type="submit"
								variant="primary"
							>
								{"Add player!"}
							</Button>
						</div>
					</React.Fragment>
				)}
				<div className="col-md-4 col-6 d-flex align-items-end justify-content-center ml-auto">
					{stats.currentRound == 0 ? (
						<Button
							className="mb-3"
							type="button"
							variant="success"
							onClick={(e) => createGame(e)}
						>
							{"Start game!"}
						</Button>
					) : (
						<React.Fragment>
							{stats.status == "ended" ? (
								<Button
									className="mb-3 mx-2"
									type="button"
									variant="primary"
									onClick={(e) => startOver()}
								>
									{"Start over"}
								</Button>
							) : (
								<Button
									className="mb-3 mx-2"
									type="button"
									variant="success"
									disabled={stats.secondsLeft == 0}
									onClick={(e) => {
										if (playing) {
											setPlaying(false);
											// stopTimer(e);
										} else {
											setPlaying(true);
										}
									}}
								>
									{playing ? "Stop timer" : "Start timer"}
								</Button>
							)}
						</React.Fragment>
					)}
				</div>
			</div>
			<div className="row">
				<Players
					players={players}
					setPlayer={setPlayers}
					playing={playing}
					currentRound={stats.currentRound}
					status={stats.status}
					clickHandler={addPointToPlayer}
				/>
			</div>
			<div className="row justify-content-end pr-3">
				<Link to="/" replace>
					<Button variant="primary">{"Go home!"}</Button>
				</Link>
			</div>
		</div>
	);
};

export default Contest;
