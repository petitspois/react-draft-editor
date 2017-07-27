import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { setTitle, $post } from '../js/utils'
import { Link, withRouter } from 'react-router'
import Nav from './nav'
import {GET_PROFILE, SIGN_OUT }  from '../constants/api'



class Profile extends Component{

    state = {
        profileData:{}
    }



    static contextTypes = {
        showConfirm: PropTypes.func,
    }

    componentDidMount(){
        setTitle('我的')
    }

    componentWillMount(){
        $post(GET_PROFILE).then(ret=>{
            if(ret.code == 105){
                this.props.router.replace('/signin')
            }
            if(ret.code != 100)return;
            this.setState({profileData: ret.result})
        })
    }

    settings = () => {
        this.props.router.push('/settings')
    }

    jumpAddress = () => {
        this.props.router.push('/address')
    }


    signOut = () => {
        this.context.showConfirm('确定退出当前账号？', '', ()=>{
            $post(SIGN_OUT).then(ret=>{
                if(ret.code == 100){
                    this.props.router.replace('/signin')
                }
            })
        })
    }

    render(){
        let { profileData } = this.state;
        return (
            <div className="profile">
                <div className="profile-edit">
                    <img style={{marginTop: '0.5333333333333333rem'}} src="/lib/images/avatar.png" alt=""/>
                    <p>{profileData.nickname || (profileData.userName || '').slice(-4)}
                        {profileData.sex == 0 && <i className="icon">&#xe61c;</i>}
                        {profileData.sex == 1 && <i style={{color:'deeppink'}} className="icon">&#xe61d;</i>}
                    </p>
                    <a href="javascript:;" onClick={this.settings}>编辑</a>
                </div>
                <div className="list-modal">
                    <i className="icon">&#xe608;</i>
                    <span>我的订单</span>
                    <i className="icon arrow">&#xe60c;</i>
                    <Link to="/order" className="look-all-order" href="javascript:;" style={{marginRight:'20px', color:'#999', float:'right'}}>查看全部订单</Link>
                </div>
                <div className="list-modal" onClick={this.jumpAddress}>
                    <i className="icon ">&#xe609;</i>
                    <span>地址管理</span>
                    <i className="icon arrow">&#xe60c;</i>
                </div>
                {/*<div className="list-modal">
                    <a href="tel:15158015800">
                        <i className="icon">&#xe60a;</i>
                        <span>客服热线：0571-88683650</span>
                        <i className="icon arrow">&#xe60c;</i>
                    </a>
                </div>*/}
                <div className="list-modal">
                    <a onClick={this.signOut} href="javascript:;" style={{color:'#aaa', display:'block', textAlign:'center'}}>退出当前账号</a>
                </div>
                <Nav></Nav>
            </div>
        )
    }
}

export default withRouter(Profile);