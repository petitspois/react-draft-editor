import React, { Component } from 'react'
import { setTitle, $post } from '../js/utils'
import { Link, withRouter } from 'react-router'
import { GET_PROFILE, UPDATE_SETTINGS } from '../constants/api'
import Nav from './nav'
import { CityPicker, DatePicker } from 'react-pickers'

class Settings extends Component{

    state = {
        sex: 1,
        showDatePicker:false,
        date:'',
        profileData:{}
    }

    componentDidMount(){
        setTitle('设置')
        $post(GET_PROFILE).then(ret=>{
            if(ret.code == 105){
                this.props.router.replace('/signin')
            }
            if(ret.code != 100)return;
            let data = ret.result;
            let birthday = new Date(data.birthday);
            data.birthday = birthday.getFullYear()+'-'+(birthday.getMonth()+1)+'-'+birthday.getDate();
            this.setState({profileData: data})
        })
    }


    sex = (sex) => {
        let profileData = this.state.profileData;
        profileData.sex = sex;
        this.setState({profileData})
    }

    showDatePicker = () => {
        this.setState({showDatePicker:true})
    }

    getData = (date) => {
        let profileData = this.state.profileData;
        profileData.birthday = date;
        this.setState({profileData})
    }

    closeDate = () => {
        this.setState({showDatePicker:false})
    }

    uploader = () => {
        let oFiles = document.getElementById('avatar').files;
        let formData = new FormData();
        formData.append('imgFile', oFiles['0'])
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            alert("上传成功！");
        }
        formData.append('imgLength', '1024')
        xhr.open("POST", "/api/upload.do", true);
        xhr.send(formData);
    }

    changeNickName = (e) => {
        let profileData = this.state.profileData;
        profileData.nickname = e.target.value;
        this.setState({profileData})
    }


    saveSettings = () => {
        let {profileData} = this.state;
        if(!profileData.nickname){
            alert('请填写昵称')
            return;
        }
        if(!profileData.birthday){
            alert('请选择生日')
            return;
        }
        $post(UPDATE_SETTINGS,{
            nickname:profileData.nickname,
            birthday:profileData.birthday,
            sex:profileData.sex
        }).then(ret=>{
            if(ret.code !=100){
                alert(ret.resultDes)
                return;
            }
            this.props.router.push('/profile');
        })
    }

    render(){
        let {profileData} = this.state;
        return (
            <div className="settings">
                <div className="group-list">
                    <div className="group-each">
                        <h4>头像</h4>
                        <i className="icon arrow"></i>
                        <img style={{position:'relative', marginRight: '0.26666666666666666rem', top:'0.2rem', borderRadius:'50%',display:'inline-block', width:'1.2rem', height:'1.2rem', float:'right'}} src='/lib/images/avatar.png' alt=""/>
                        {/*<input onChange={this.uploader} id="avatar" type="file" accept="image/png,image/jpg" style={{position:'absolute', height:'1.2rem', opacity:0}}/>*/}
                    </div>

                    <div className="group-each">
                        <h4>昵称</h4>
                        <input onChange={this.changeNickName} value={profileData.nickname || ''} style={{position:'relative',display:'inline-block', textAlign:'right',top:'0.26666666666666666rem',border:'none',float:'right',width:'50%',height:'1.2rem'}} type="text"/>
                    </div>

                    <div className="group-each">
                        <h4>性别</h4>
                        <span className="radio">
                            <div className="radio-each" onClick={this.sex.bind(this, 0)}>
                                {profileData.sex !== 0 && <i className="icon">&#xe61a;</i>}
                                {profileData.sex == 0 && <i className="icon active">&#xe61b;</i>}
                                男
                            </div>
                            <div className="radio-each" onClick={this.sex.bind(this, 1)}>
                                {profileData.sex !== 1 && <i className="icon">&#xe61a;</i>}
                                {profileData.sex == 1 && <i className="icon active">&#xe61b;</i>}
                                女
                            </div>
                        </span>
                    </div>

                </div>
                <div style={{marginTop:'0.4rem'}} className="group-list">
                    <div className="group-each" onClick={this.showDatePicker}>
                        <h4>生日</h4>
                        <i className="icon arrow">&#xe60c;</i>
                        <span className="tel" style={{float:'right', marginRight:'0.26666666666666666rem', color:'#999'}}>{profileData.birthday}</span>
                    </div>

                    <div className="group-each">
                        <h4>手机号</h4>
                        <span className="tel" style={{float:'right', color:'#999'}}>{profileData.cellphone} <b style={{marginLeft:'10px', color:'green'}}>已绑定</b></span>
                    </div>
                </div>
                <div className="button" style={{marginTop:'0.9333333333333333rem'}} onClick={this.saveSettings}>保存</div>
                <DatePicker confirm={ this.closeDate } cancel={ this.closeDate } getData={this.getData} visible={ this.state.showDatePicker } options={{"type":"date", "beginYear":1950,"endYear":2017}} />
            </div>
        )
    }
}

export default withRouter(Settings);