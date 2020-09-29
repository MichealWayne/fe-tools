/**
 * /src/js/index.js -> index.html
 */

import 'moo-css-base/mobile.less'
import '@/less/index.less'
import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter} from 'react-router-dom'
import '@/ijijin-view/install'
import Index from './Index.tsx'

_.getResources(['ijijinProtocol', 'ijijinAjax', 'ijijinStat'], () => {
        ReactDOM.render(
            <HashRouter>
                <Index/>
            </HashRouter>, document.getElementById('app'))
})