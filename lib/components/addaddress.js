import React, { Component } from 'react'
import { setTitle, $post  } from '../js/utils'
import { Link, withRouter } from 'react-router'
import { ADD_ADDRESS, GET_ADDRESS_DETAIL } from '../constants/api'
import Nav from './nav'
import { CityPicker } from 'react-pickers'
import CityData from '../js/utils/citydata'


class Settings extends Component{

    state = {
        showAddressPicker:false,
        defaultStatus: false,
        city: [],
        cityCode:[],
        consigneeName:'',
        cellphone:'',
        address:'',
        region:'',
        province:'',
        cityData:'',
    }

    componentDidMount(){
        setTitle('添加收货地址')
        if(this.props.location.query.id){
            $post(GET_ADDRESS_DETAIL, {id: this.props.location.query.id}).then(ret=>{
                if(ret.code == 100){
                    this.setState({
                        consigneeName: ret.result.consigneeName,
                        cellphone:ret.result.cellphone,
                        address:ret.result.address,
                        region: ret.result.region,
                        province:ret.result.province,
                        cityData:ret.result.city,
                        defaultStatus:ret.result.defaultStatus
                    })
                }
            })
        }
    }

    setDefault = () => {
        this.setState({defaultStatus: !this.state.defaultStatus})
    }

    getCityData = (ret) => {
        this.setState({province: ret[0].text, cityData:ret[1].text, region:ret[2].text})
    }

    cl = () => {
        this.setState({showAddressPicker: false})
    }

    showAddress = () => {
        this.setState({showAddressPicker: true})
    }

    setAddressList = (type, e) => {
        switch(type){
            case 1:
                this.setState({consigneeName: e.target.value})
                break;
            case 2:
                this.setState({cellphone: e.target.value})
                break;
            case 3:
                this.setState({address: e.target.value})
                break;
        }
    }


    saveAddress = () => {
        let { consigneeName, cellphone, region, province, cityData, address, defaultStatus } = this.state;
        if(!consigneeName){
            alert('请填写收货人');
            return;
        }
        if(!/^[1][34587]\d{9}$/g.test(cellphone)){
            alert('请填写正确的联系方式');
            return;
        }
        if(!region){
            alert('请填所在地区');
            return;
        }
        if(!address){
            alert('请填详细街道');
            return;
        }
        let data = {
            consigneeName,  
            cellphone,
            region,
            city:cityData,
            province,
            address,
            defaultStatus: defaultStatus ? 1 : 0
        };
        if(this.props.location.query.id)data.id=this.props.location.query.id;
        $post(ADD_ADDRESS, data).then(ret=>{
            if(ret.code == 100){
                this.props.router.replace('/address')
            }
        })
    }

    render(){
        return (
            <div className="addaddress">
                <div className="formitem">
                    <label htmlFor="">收货人：</label>
                    <input type="text" onChange={this.setAddressList.bind(this, 1)} value={this.state.consigneeName}/>
                </div>
                <div className="formitem">
                    <label htmlFor="">联系方式：</label>
                    <input type="text" onChange={this.setAddressList.bind(this, 2)} value={this.state.cellphone}/>
                </div>
                <div className="formitem" onClick={this.showAddress}>
                    <label htmlFor="">所在地区：</label>
                    <span>{this.state.province} {this.state.cityData} {this.state.region}  </span>
                    <i className="icon">&#xe60c;</i>
                </div>
                <div className="formitem">
                    <label htmlFor="">详细街道：</label>
                    <input type="text" placeholder="街道、楼牌号等" value={this.state.address} onChange={this.setAddressList.bind(this, 3)}/>
                </div>
                <div className="formitem" style={{marginTop:'0.26666666666666666rem'}}>
                    <label htmlFor="">设为默认地址</label>
                    <span className="radio">
                        <div className="radio-each" onClick={this.setDefault}>
                            {!!this.state.defaultStatus && <i className="icon">&#xe61a;</i>}
                            {!this.state.defaultStatus && <i className="icon active">&#xe61b;</i>}
                        </div>
                    </span>
                </div>
                <div style={{marginTop:'100px', width:'70%'}} href="javascript:;" className="button" onClick={this.saveAddress}>保存</div>
                <CityPicker setData={ CityData } visible={ this.state.showAddressPicker } getData={ this.getCityData } layer={3} confirm={ this.cl } cancel={ this.cl }/>
            </div>
        )
    }
}

export default withRouter(Settings);