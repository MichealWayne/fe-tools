import React, {Component} from 'react';

import {Route, NavLink} from 'react-router-dom'
import HelloWorld from './views/HelloWorld/index' // hello world component

import './less/index.less'

class App extends Component {
    render() {
        return (
            <div className="m-app">
				<HelloWorld/>
			</div>
        );
    }
}

export default App;
