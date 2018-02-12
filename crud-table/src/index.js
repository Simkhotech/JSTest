import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import items from './JSTest.json'

ReactDOM.render(<App items={items}/>, document.getElementById('root'));