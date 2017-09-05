/**
 * Created by lengye on 2017/9/1.
 */
import React from 'react'
import {render} from 'react-dom'
import {Router,Route,hashHistory,IndexRoute} from 'react-router'
import App from './js/App'
import NewsUser from './js/news_user'
import NewsMain from './js/news_main'
import NewsDefault from './js/news_default'
import './pc.css'


render((
    <Router history={hashHistory}>
        <Route path='/' component={App}>
            <IndexRoute component={NewsDefault}>default</IndexRoute>
            {/*<Route path="/news_main/:uniquekey/:type" component={NewsMain}>新闻主体</Route>*/}
            <Route path="/news_main/:uniquekey" component={NewsMain}>新闻主体</Route>
            <Route path="/news_user" component={NewsUser}>NewsUser</Route>
        </Route>
    </Router>
),document.getElementById('root'))