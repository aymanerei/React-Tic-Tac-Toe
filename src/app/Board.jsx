import React from "react";
import Square from "./Square";

class Board extends React.Component {
	createBoard() {
		const array = Array(3).fill(null);
		let number = 0;
		const board = array.map((value) => {
			let inside = array.map((value) => this.renderSquare(number++));
			return <div className="board-row">{inside}</div>;
		});

		return board;
	}

	renderSquare(i) {
		const winnerClass =
			this.props.winnerSquares &&
			(this.props.winnerSquares[0] === i ||
				this.props.winnerSquares[1] === i ||
				this.props.winnerSquares[2] === i)
				? "btn-green"
				: "";

		return (
			<Square
				winnerClass={winnerClass}
				value={this.props.squares[i]}
				onClick={() => this.props.onClick(i)}
			/>
		);
	}

	render() {
		return <div>{this.createBoard()}</div>;
	}
}

export default Board;
