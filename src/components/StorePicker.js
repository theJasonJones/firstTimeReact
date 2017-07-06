
import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
	// This allows us to use 'this' in goToStore
	// Good for multiple elements
	// constructor(){
	// 	super();
	// 	this.goToStore = this.goToStore.bind(this);
	// }

	goToStore(event){
		event.preventDefault();
		
		// Grab text from input box
		const storeID = this.storeInput.value;
		
		// Redirect to store
		this.context.router.transitionTo(`/store/${storeID}`);
	}

	render(){
		// NEVER put comments on the top level
		// Render will only return the top level element
		return  (
			<form className="store-selector" onSubmit={this.goToStore.bind(this)}>
				{ /* This is comment in JSX */}
				<h2>Please enter a Store</h2>
				<input type="text" required placeholder="Store Name" defaultValue={ getFunName() } ref={(input) => { this.storeInput = input }} />
				<button type="submit">Visit Store</button>
			</form>
		);
	}
}

// Make React Router available to Store Picker
StorePicker.contextTypes = {
	router : React.PropTypes.object
}

export default StorePicker;