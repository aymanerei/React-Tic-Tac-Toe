import React from "react";

class Clock extends React.Component {
	constructor(props) {
		super(props);
		this.state = { date: new Date() };
	}

	componentDidMount() {
		this.timerID = setInterval(() => this.tick(), 1000);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	tick() {
		this.setState({
			date: new Date(),
		});
	}

	render() {
		return (
			<div className="text-center text-secondary mt-5">
				<h1>Hello World !</h1>
				<h2>It's {this.state.date.toLocaleTimeString()}.</h2>
			</div>
		);
	}
}

export default Clock;
