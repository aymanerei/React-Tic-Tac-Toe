import React from "react";
import Board from "./Board";
import Clock from "./Clock";
import { calculateWinner, getLocation, initialState } from "../shared/shared";

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = initialState;
	}

	handleClick(i) {
		const history = this.state.history.slice(
			0,
			this.state.currentStepNumber + 1
		);
		const current = history[history.length - 1];
		const squares = current.squares.slice();

		if (calculateWinner(squares).winner || squares[i]) {
			return;
		}
		squares[i] = this.state.xIsNext ? "X" : "O";
		this.setState({
			history: history.concat([
				{
					squares,
					stepNumber: history.length,
					currentLocation: getLocation(i),
				},
			]),
			xIsNext: !this.state.xIsNext,
			currentStepNumber: history.length,
		});
	}

	jumpTo(step) {
		this.setState({
			currentStepNumber: step,
			xIsNext: step % 2 === 0,
		});
	}

	sortMoves() {
		this.setState({
			history: this.state.history.reverse(),
		});
	}

	reset() {
		this.setState(initialState);
	}

	render() {
		const history = this.state.history;
		const current = history[this.state.currentStepNumber];
		const { winner, winnerRow } = calculateWinner(current.squares);

		const moves = history.map((step, move) => {
			const currentLocation = step.currentLocation
				? `(${step.currentLocation})`
				: "";
			const desc = step.stepNumber
				? `Go to move #${step.stepNumber}`
				: "Go to game start";
			const classButton =
				move === this.state.currentStepNumber ? "btn-primary" : "btn-warning";

			return (
				<li key={move}>
					<button
						type="button"
						className={`btn ${classButton} button`}
						onClick={() => this.jumpTo(move)}
					>
						{`${desc} ${currentLocation}`}
					</button>
				</li>
			);
		});

		let status;
		let danger = "";
		if (winner) {
			status = `Winner : ${winner}`;
		} else if (history.length === 10) {
			status = "Draw. No one won.";
			danger = "text-danger text-uppercase fs-5 fw-bold font-monospace";
		} else {
			status = `Next player : ${this.state.xIsNext ? "X" : "O"}`;
		}

		return (
			<div className="container">
				<div>
					<Clock />
				</div>
				<div className="game d-flex justify-content-center mt-5">
					<div className="game-board">
						<Board
							squares={current.squares}
							winnerSquares={winnerRow}
							onClick={(i) => this.handleClick(i)}
						/>
					</div>
					<div className="game-info">
						<div
							className={`${danger} text-center alert alert-dark`}
							role="alert"
						>
							{status}
						</div>
						<button
							type="button"
							className="btn btn-secondary button"
							onClick={() => this.sortMoves()}
						>
							Sort moves
						</button>
						<button
							type="button"
							className="btn btn-danger button"
							onClick={() => this.reset()}
						>
							New game
						</button>
						<ol>{moves}</ol>
					</div>
				</div>
			</div>
		);
	}
}

export default Game;
