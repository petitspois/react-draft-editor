import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Link, withRouter } from 'react-router'
import { setTitle, $post } from '../js/utils'
import { ADDRESS_LIST, SET_DEFAULT_ADDRESS, DEL_ADDRESS } from '../constants/api'



class Address extends Component{

    state = {
        isAddress: true,
        defaultAddress: true,
        addressList:[],
    }


    static contextTypes = {
        showConfirm: PropTypes.func,
    }

    componentDidMount(){
        setTitle('我的地址')
        this.refresh();
    }

    refresh = () => {
        $post(ADDRESS_LIST).then(ret=>{
            if(ret.code == 100){
                this.setState({addressList: ret.result})
            }
        })
    }

    setDefault = (id) => {
        $post(SET_DEFAULT_ADDRESS, {id}).then(ret=>{
            if(ret.code == 100){
                this.refresh();   
            }
        })
    }

    editAddress = (id) => {
        this.props.router.push('/addaddress?id='+id)
    }

    delAddress = (id) => {
        this.context.showConfirm('确定删除？', '', ()=>{
            $post(DEL_ADDRESS, {id}).then(ret=>{
                if(ret.code == 100){
                    this.refresh();
                }
            })
        })
    }

    render(){
        let {addressList} = this.state;
        return (
            <div className="address">
                <div className="address-list" style={{display: !addressList.length ? 'none' : 'block'}}>
                    {
                        addressList.map((item, index)=>{
                            return (
                                <div key={index}>
                                <div className="address-each">
                                    <div className="address-each-msg">
                                        <p>{item.consigneeName} {item.cellphone}</p>
                                        <span>{item.province}{item.city}{item.region}{item.address}</span>
                                    </div>
                                    <div className="address-each-ctrl">
                                        <div className="default-address" onClick={this.setDefault.bind(this, item.id)}>
                                            <span className="radio" style={{float:'none'}}>
                                                <div className="radio-each" style={{float:'none'}} >
                                                    {!!item.defaultStatus && <i className="icon">&#xe61a;</i>}
                                                    {!item.defaultStatus && <i className="icon active">&#xe61b;</i>}
                                                </div>
                                            </span>
                                            <label style={{marginLeft:'0.13333333333333333rem'}}>默认地址</label>
                                        </div>

                                        <span onClick={this.delAddress.bind(this, item.id)}>
                                            <i className="icon">&#xe613;</i>
                                            删除
                                        </span>
                                        <span onClick={this.editAddress.bind(this, item.id)}>
                                            <i className="icon">&#xe615;</i>
                                            编辑
                                        </span>
                                    </div>
                                </div>
                                <div style={{height:"0.26666666666666666rem", background:'#f2f2f2'}}></div>
                                </div>                                
                            )
                        })
                    }
                    
                </div>
                <div style={{display: addressList.length ? 'none' : 'block'}} className="address-nothing">
                    <img style={{width:'4.213333333333333rem', height:'3.6133333333333333rem'}}src="/lib/images/address-nothing.png" alt=""/>
                    <p>哎呀，您还没有收货地址</p>
                </div>
                <Link to="/addaddress"><i className="icon">&#xe610;</i>添加收货地址</Link>
            </div>
        )
    }
}

export default withRouter(Address);