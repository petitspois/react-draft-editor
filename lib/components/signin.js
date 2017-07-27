import React, { Component } from 'react'
import { setTitle, $post } from '../js/utils'
import { withRouter } from 'react-router'
import { GET_CODE, SIGN_IN } from '../constants/api'


class SignIn extends Component{

    state ={
        firstGetState:false,
        countDown:1,
    }

    componentDidMount(){
        setTitle('登陆')
    }

    componentWillUnmount(){
        clearInterval(this._timeout)
    }

    countDown = () => {
        if(!/^[1][34587]\d{9}$/g.test(this.refs.tel.value)){
            alert('请输入正确的手机号码');
            return;
        }
        if(!this.state.firstGetState)this.setState({firstGetState:true})
        if(this.state.countDown<=1){
            clearInterval(this._timeout)
             this.setState({countDown:60});
             this._timeout = setInterval(() => {
                 if(1<this.state.countDown){
                     this.setState({countDown: --this.state.countDown})
                 }
             }, 1000)
             $post(GET_CODE, { 
                 cellPhone: this.refs.tel.value
             })
        };
    }

    signin = () => {
        $post(SIGN_IN, {
            userName: this.refs.tel.value,
            smsCode: this.refs.code.value
        }).then(ret=>{
            if(ret.code != 100){
                alert(ret.resultDes)
                return;
            }
            this.props.router.replace({pathname:'/profile'})
        })
    }

    render(){
        let { countDown } =  this.state;
        let timeText = this.state.countDown > 1 ? `重发（${countDown}）` : this.state.firstGetState ? '重新获取' : '获取验证码';
        return (
            <div className="sign-in">
                <img src="/lib/images/sign-bg.jpg" alt=""/>
                <div className="submit-sign">
                    <div className="tel">
                        <i className="icon">&#xe60e;</i>
                        <input type="tel" ref="tel" placeholder="请输入手机号码" />
                    </div>
                    <div className="pwd">
                        <i className="icon">&#xe60f;</i>
                        <input type="tel" ref="code" placeholder="请输入验证码" />
                        <a href="javascript:;" onClick={ this.countDown } style={{color: this.state.countDown > 1 && '#ddd'}}>{timeText}</a>
                    </div>
                    <a onClick={this.signin} style={{marginTop: '1.8666666666666667rem'}} href="javascript:;" className="button">登陆</a>
                </div>
            </div>
        )
    }
}

export default withRouter(SignIn);