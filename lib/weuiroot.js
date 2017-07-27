import React from 'react'

import { Router, Route, IndexRoute} from 'react-router';


import Page from './components/page'
import Home from './pages/home/index';
import Button from './pages/button/index';
import Cell from './pages/cell/index';
import Toast from './pages/toast/index';
import Dialog from './pages/dialog/index';
import Progress from './pages/progress/index';
import Msg from './pages/msg/index';
import Article from './pages/article/index';
import ActionSheet from './pages/actionsheet/index';
import Icons from './pages/icons/index';
import Panel from './pages/panel/index';
import Tab from './pages/tab/index';
import NavBar from './pages/tab/navbar';
import NavBar2 from './pages/tab/navbar_auto';
import TabBar from './pages/tab/tabbar';
import TabBar2 from './pages/tab/tabbar_auto';
import SearchBar from './pages/searchbar/index';

class App extends React.Component {
        render() {
                return (
                    <div
                        component="div"
                        transitionName="page"
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                        style={{height: '100%'}}
                    >
                            {React.cloneElement(this.props.children, {
                                    key: this.props.location.pathname
                            })}
                    </div>
                );
        }
}


export default function routerConfig(){
    return (
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="button" component={Button}/>
            <Route path="cell" component={Cell}/>
            <Route path="toast" component={Toast}/>
            <Route path="dialog" component={Dialog}/>
            <Route path="progress" component={Progress}/>
            <Route path="msg" component={Msg}/>
            <Route path="article" component={Article}/>
            <Route path="actionsheet" component={ActionSheet}/>
            <Route path="icons" component={Icons}/>
            <Route path="panel" component={Panel}/>
            <Route path="tab" component={Tab}/>
            <Route path="navbar" component={NavBar}/>
            <Route path="navbar2" component={NavBar2}/>
            <Route path="tabbar" component={TabBar}/>
            <Route path="tabbar2" component={TabBar2}/>
            <Route path="searchbar" component={SearchBar}/>
        </Route>
    )
}
