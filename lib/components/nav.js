import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'

class Nav extends Component{
    render(){
        let shopId = localStorage.shopId == 'undefined' ? 10008 : localStorage.shopId;
        return (
            <div className="fiexd-nav">
                <ul>
                    <li>
                        <IndexLink to={`/shop/${shopId}`} activeClassName="nav-active">
                            <i className="icon">&#xe606;</i>
                            <p>首页</p>
                        </IndexLink>
                    </li>
                    <li>
                        <Link to="/book" activeClassName="nav-active">
                            <i className="icon">&#xe605;</i>
                            <p>所有商品</p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/profile" activeClassName="nav-active">
                            <i className="icon">&#xe607;</i>
                            <p>我的</p>
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Nav;