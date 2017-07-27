import React, { Component } from 'react'
import PropTypes from 'prop-types';
import 'react-pickers/lib/css/picker.css'
import '../sass/common.scss'
import Confirm from './smart/confirm'



export default class App extends Component{

    state ={
        confirm:{
            title: '',
            content:'',
            show:false,
            cb: () => {}
        }
    }

    static childContextTypes = {
        showConfirm: PropTypes.func,
        hideConfirm: PropTypes.func,
        executioncb: PropTypes.func
    }


    getChildContext(){
        return {
            showConfirm: this.showConfirm,
            hideConfirm: this.hideConfirm,
            executioncb: this.executioncb
        }
    }

    executioncb = () => {
        this.state.confirm.cb();
        this.hideConfirm();
    }

    showConfirm = (title, content, cb) => {
        this.setConfirm(title, content)
        this.setState({confirm: Object.assign({}, this.state.confirm, {show: true, cb: cb })})
    }

    hideConfirm = () => {
        this.setState({confirm: { show: false}});
    }

    setConfirm = (title, content, fn) => {
        console.log(content);
        let temp = this.state.confirm;
        title && (temp.title = title);
        !!content && (temp.content = content);
        console.log(temp);
        this.setState({confirm: temp})
    }


    render(){
        return (
            <div style={{ overflow:'hidden', margin:'0 auto', width:'10rem', height: 'inherit'}}>
                { this.props.children }
                <Confirm visible={ this.state.confirm.show } title={ this.state.confirm.title } content={ this.state.confirm.content }/>
            </div>
        )
    }
}
