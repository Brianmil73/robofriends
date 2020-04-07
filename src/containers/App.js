import React, { Component} from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css';

class App extends Component {
	constructor() {
		super()
		this.state = {
			robots: [],
			searchfield: ''
		}
	}

componentDidMount() {
	fetch('https://jsonplaceholder.typicode.com/users') // fetch json file from url
		.then(response => response.json()) // convert json file to text
		.then(users => this.setState({ robots: users})); // set robots state to users
}

	onSearchChange = (event) => {
		this.setState({ searchfield: event.target.value })
		
	}

	render() {
		const { robots, searchfield } = this.state;
		const filteredRobots = this.state.robots.filter(robot =>{
			return robot.name.toLowerCase().includes(searchfield.toLowerCase())
		})
		// turnery if else, length of zero is false, then inverted to true
		return !robots.length ?  
		<h1>Loading...</h1> :
		(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange}/>
				<Scroll>
					<ErrorBoundary>
						<CardList robots={filteredRobots}/>
					</ErrorBoundary>
				</Scroll>
			</div>
		);
	}
}

export default App;