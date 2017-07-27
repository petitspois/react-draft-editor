import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { setTitle, $post } from '../js/utils'
import { EXPRESS } from '../constants/api'

class Express extends Component{

    state = {
        express:{}
    }

    componentDidMount(){
        setTitle('物流信息')
    }

    componentDidMount(){
        $post(EXPRESS, {id:this.props.location.query.id}).then(ret=>{
            if(ret.code ==100){
                this.setState({express: ret.result})
            }
        })
    }

    switchStatus = (status) => {
        let st = '';
        switch(status){
            case '0':
             st = '在途中';
             break;
            case '1':
            st = '已揽收';
             break;
            case '2':
            st = '疑难';
             break;
            case '3':
            st = '已签收';
             break;
             case '4':
            st = '退签';
             break;
             case "5":
            st = '同城派送中';
             break;
             case '6':
            st = '退回';
             break;
             case '7':
            st = '转单';
             break;
        }
        return st;
    }

    render(){
        let { express } = this.state;
        let expressData = express.express || {};
        let expressResult = expressData.result || {};
        let expressResultData = expressResult.data || [];
        let order = express.order || {};
        return (
            <div className="express">
                <div className="express-title">
                    <img src={express && express.imgUrl} alt="" />
                    <p><b>物流状态</b><i style={{marginLeft:'0.26666666666666666rem', color:'#00aa04'}}>{expressResult.state && this.switchStatus(expressResult.state)}</i></p>
                    <p><b>物流公司：</b><i>{expressData.comName}</i></p>
                    <p><b>运单编号：</b><i>{expressData.nu}</i></p>
                </div>
                {/*<div className="expresser">
                    <a href="">
                        <img style={{width:'0.9866666666666667rem', height:'0.9866666666666667rem'}} src="/lib/images/expresser-ava.png" alt=""/>
                        <span>
                            <h6 style={{color:'#888'}}>派送员</h6>
                            <h6 style={{color:'#333'}}>Jonny</h6>
                        </span>
                        <i className="icon">&#xe624;</i>
                        <i className="icon tel">&#xe6d5;</i>
                    </a>
                </div>*/}
                <div className="express-line">
                    <ul>
                        {
                            !!expressResultData.length ? expressResultData.map((item, index)=>{
                                return (
                                    <li key={index}>
                                        <div className="line-content">
                                            <p>{item.context}</p>
                                            <p>{item.ftime}</p>
                                        </div>
                                    </li>
                                )
                            }):
                            <span>暂无快递信息</span>
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Express;