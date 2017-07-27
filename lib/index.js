 import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import routerConfig from './root'



import fiexible from './js/utils/fiexible'
import FastClick from './js/utils/fastclick'
FastClick.attach(document.body);


const env = process.env.NODE_ENV || 'development';
// if(env === 'development')var vConsole = require('vconsole/dist/vconsole.min.js');
fiexible();

render(
    <Router history={browserHistory}>
        {routerConfig()}
    </Router>,
    document.querySelector('#root')
)
