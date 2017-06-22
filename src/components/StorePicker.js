import React from 'react';

class StorePicker extends React.Component {
	render(){
		// NEVER put comments on the top level
		// Render will only return the top level element
		return  (
			<form className="store-selector">
				{ /* This is comment in JSX */}
				<h2>Please enter a Store</h2>
				<input type="text" required placeholder="Store Name" />
				<button type="submit">Visit Store</button>
			</form>
		);
	}
}

export default StorePicker;