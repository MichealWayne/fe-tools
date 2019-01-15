import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import {HashRouter} from 'react-router-dom';
import 'ijijin_builder/stylebuild/lib/mobile.less';


ReactDOM.render(
    <HashRouter>
        <App/>
    </HashRouter>, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
