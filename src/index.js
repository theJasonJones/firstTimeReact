// Base React Files
import React from 'react';
import { render } from 'react-dom';
//import ReactDom from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

// Import CSS
import './css/style.css';


// To use a component, export the module
// Import custom React components
import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';

const Root = () => {
	return (
		<BrowserRouter>
			<div>
				<Match exactly pattern="/" component={StorePicker} />
				<Match exactly pattern="/store/:storeId" component={App} />
				<Miss component={NotFound} />
			</div>
		</BrowserRouter>
	);
}

// Put the component on the page
render(<Root/>, document.querySelector('#main'));
