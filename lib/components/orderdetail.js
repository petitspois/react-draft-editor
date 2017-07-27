import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router'
import { setTitle, $post } from '../js/utils'
import { ORDER_DETAIL, CANCEL_ORDER, LINK } from '../constants/api'
import moment from 'moment'

class OrderDetail extends Component{

    state = {
        orderDetail:{}
    }

    static contextTypes = {
        showConfirm: PropTypes.func,
    }

    componentDidMount(){
        setTitle('订单详情')
        this.orderDetail();   
    }


    orderDetail = () => {
        $post(ORDER_DETAIL, {id: this.props.location.query.id}).then(ret=>{
            if(ret.code == 100){
                this.setState({orderDetail: ret.result})
            }
        })
    }

    jumpExpress = () => {
        this.props.router.push('/express?id='+this.props.location.query.id)
    }

    orderStatus = (status) => {
        let orderStatus = '';
        switch(status){
            case 0:
                orderStatus = '等待确认';
                break;
            case 1:
                orderStatus = '已取消';
                break;
            case 2:
                orderStatus = '等待发货';
                break;
            case 3:
                orderStatus = '已经发货';
                break;
            case 4:
                orderStatus = '已经签收';
                break;
            case 5:
                orderStatus = '已经退货';
                break;
        }
        return orderStatus;
    }

    cancelOrder = () => {
       
        this.context.showConfirm('确定取消订单？', '', () => {
            $post(CANCEL_ORDER, {id:this.state.orderDetail.id}).then(ret=>{
                if(ret.code == 100){
                    this.orderDetail();
                    return;
                }
            })
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
        let { orderDetail } = this.state;
        let express = orderDetail && orderDetail.express || {};
        return (
            <div className="order order-detai">
               <div style={{display: !express.id || orderDetail.status == 1 ? 'none' : 'block'}} className="express-status" onClick={this.jumpExpress}>
                   <h4>{this.switchStatus(express.result && express.result.state)}</h4>
                   <p>{express.result && express.result.data && express.result.data[0]['ftime']}</p>
                   <i className="icon">&#xe624;</i>
               </div>
               <div className="address">
                   <p>
                       <b>{orderDetail.recipients}</b>&nbsp;&nbsp;
                       <i>{orderDetail.cellphone}</i>
                   </p>
                   <p style={{paddingBottom:'0.2rem', borderBottom:'1px solid #e1e2e3'}}>{orderDetail.province}{orderDetail.city}{orderDetail.country || ''}{orderDetail.address}</p>
                   <div className="remark">
                       <h4>备注信息</h4>
                       <p>{orderDetail.otherInfo|| '无'}</p>
                   </div>
               </div>
               <div className="order-list" style={{marginTop:'0.26666666666666666rem'}}>
                    <div className="order-each">
                        <div className="order-each-title">
                            <h4 style={{display:'inline'}}>订单信息</h4>
                            <div className="status" style={{float:'right', color:'#ff4200'}}>{this.orderStatus(orderDetail.status)}</div>
                        </div>
                        <div className="order-each-content">
                            <a href={LINK+orderDetail.productId}>
                            <span>
                                <img style={{width:'2.026666666666667rem', height:'2.026666666666667rem'}} src={orderDetail.product && orderDetail.product.cpsImg152x152} alt=""/>
                                <div className="order-each-content-title">
                                    <h4><b style={{color:'#333'}}>
                                            {!!orderDetail.productName && orderDetail.productName.split(' ')[0]}
                                        </b> <span style={{color:'#333'}}>x{orderDetail.number}</span></h4>
                                </div>
                                <p>
                                    {
                                        !!orderDetail.productName && orderDetail.productName.split(' ').slice(1).map((val, indx)=>{
                                            return (
                                                indx%2==1 && <b key={indx}>{val}</b>
                                            )
                                        })
                                    }
                                </p>
                                <div className="price">
                                    <i>¥ {orderDetail.product && orderDetail.product.promotionPriceStr}</i>
                                    {orderDetail.product && orderDetail.product.priceStr !=0 &&  <span>¥ {orderDetail.product && orderDetail.product.priceStr}</span>}
                                </div>
                            </span>
                            </a>
                        </div>
                        <div className="order-each-footer">
                            <span style={{float:'left', lineHeight:"0.9333333333333333rem"}}>实付款</span>
                            <h4>
                                ¥{orderDetail.priceStr}
                            </h4>
                            {orderDetail.status == 0 && <a href="javascript:;" onClick={this.cancelOrder}>取消订单</a>}
                        </div>
                    </div>
                </div>
                <div className="order-code">
                    <p><b>订单状态：</b>{this.orderStatus(orderDetail.status)}</p>
                    <p><b>订单编号：</b>{orderDetail.orderNum}</p>
                    <p><b>下单时间：</b>{moment(orderDetail.createTime).format('YYYY-MM-DD HH:mm:ss')}</p>
                </div>
            </div>
        )
    }
}

export default withRouter(OrderDetail);