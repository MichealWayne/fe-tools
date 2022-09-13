/**
 * /src/js/index.js -> index.html
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import 'moo-css-base/mobile.less';

import '@/less/index.less';
import Index from './Index.tsx';

ReactDOM.render(
  <HashRouter>
    <Index />
  </HashRouter>,
  document.getElementById('app')
);
