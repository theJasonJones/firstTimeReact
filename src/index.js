// Base React Files
import React from 'react';
import { render } from 'react-dom';
import ReactDom from 'react-dom';

// Import CSS
import './css/style.css';


// To use a component, export the module
// Import custom React components
import App from './components/App';
import StorePicker from './components/StorePicker';

// Put the component on the page
render(<App/>, document.querySelector('#main'));
