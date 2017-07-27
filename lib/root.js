import React from 'react'

import { Route, IndexRoute, IndexRedirect } from 'react-router'

import App from './components/app'
import IndexPage from './components/indexpage'
import AllShops from './components/allshops'
import Search from './components/search'
import Filter from './components/filter'
import SignIn from './components/signin'
import Profile from './components/profile'
import Settings from './components/settings'
import Order from './components/order'
import OrderDetail from './components/orderdetail'
import Channel from './components/channel'
import Express from './components/express'
import Address from './components/address'
import AddAddress from './components/addaddress'


const isSign = (nextState, replace, callback) => {
    $post(IS_SIGN).then(ret => {
        if(ret.code == 200){
            if(!ret.data.type){
                replace('/main');
            }else{
                replace('/receiving');
            }
        }
        callback()
    })
    // callback()
}


export default function routerConfig(){
    return (
        <Route path="/" component={App} >
            <IndexRedirect to="/shop/10008" />
            <Route  path="/shop/:id" component={ IndexPage } />
            <Route  path="/book" component={ AllShops } />
            <Route  path="/search" component={ Search } />
            <Route  path="/filter" component={ Filter } />
            <Route  path="/signin" component={ SignIn } />
            <Route  path="/profile" component={ Profile } />
            <Route  path="/settings" component={ Settings } />
            <Route  path="/order" component={ Order } />
            <Route  path="/orderdetail" component={ OrderDetail } />
            <Route  path="/channel/:channelId" component={ Channel } />
            <Route  path="/express" component={ Express } />
            <Route  path="/address" component={ Address } />
            <Route  path="/addaddress" component={ AddAddress } />
        </Route>
    )
}
