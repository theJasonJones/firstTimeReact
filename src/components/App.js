import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {
	constructor(){
		super();

		this.addFish = this.addFish.bind(this);
		this.loadSamples = this.loadSamples.bind(this);
		this.addToOrder = this.addToOrder.bind(this);
		this.updateFish = this.updateFish.bind(this);
		this.removeFish = this.removeFish.bind(this);
		this.removeFromOrder = this.removeFromOrder.bind(this);
		
		//Initial state
		this.state = {
			fishes: {},
			order: {}
		};
	}

	//this function runs right before the app is rendered
	componentWillMount(){
		// Add items from Firebase to the fishes section
		this.ref = base.syncState(`${this.props.params.storeId}/fishes`
			, { 
			context: this,
			state: 'fishes'
		});

		//check if there is an order in localStorage
		const localStorageRef = localStorage.getItem(`order-${ this.props.params.storeId }`);

		// update App order state
		if( localStorageRef ){
			this.setState({
				order: JSON.parse(localStorageRef)
			});
		}
	}

	// Removes store binding when the storeId changes
	componentWillUnmount(){
		base.removeBinding( this.ref );
	}

	// Runs right before render update
	componentWillUpdate( nextProps, nextState ){
		localStorage.setItem(`order-${ this.props.params.storeId }`, JSON.stringify(nextState.order) );
	}

	updateFish(key, updatedFish){
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({ fishes });
	}

	addFish( fish ){
		// Tip: when updating the state, make a copy first
		// Copy the current state (performance reasons)
		const fishes = {...this.state.fishes};
		
		//Add in new fish
		const timestamp = Date.now();
		fishes[`fish-${timestamp}`] = fish;

		//set state
		this.setState({ fishes });
	}

	removeFish(key){
		const fishes = {...this.state.fishes};
    fishes[key] = null;
    this.setState({ fishes });
	}

	loadSamples(){
		this.setState({
			fishes: sampleFishes
		})
	}

	addToOrder( key ){
		//copy state
		const order = {...this.state.order};

		// Update or add # of fish purchased
		order[key] = order[key] + 1 || 1;

		//update state
		this.setState({ order });
    }

    removeFromOrder( key ){
		//copy state
		const order = {...this.state.order};

		// Update or add # of fish purchased
		delete order[key];

		//update state
		this.setState({ order });
    }

	render(){
		return (
			<div className="catch-of-the-day">
				<div className="menu">
				    <Header tagline="Fresh Seafood Market" />
				    <ul className="list-of-fishes">
				    	{ 
				    		Object.keys(this.state.fishes).map( key => <Fish key={key} index={key} details={ this.state.fishes[key] } addToOrder={this.addToOrder} />) 
				    	}
				    </ul>
				</div>
				<Order 
				  fishes={this.state.fishes} 
				  order={this.state.order} 
				  params={ this.props.params } 
				  removeFromOrder={this.removeFromOrder}
				/>
				<Inventory 
				  addFish={ this.addFish } 
				  loadSamples={this.loadSamples} 
				  fishes={this.state.fishes} 
				  updateFish={this.updateFish} 
				  removeFish={this.removeFish}
				  storeId={this.props.params.storeId}
				 />
			</div>
		);
	}
}

App.propTypes = {
	params: React.PropTypes.object
};

export default App;