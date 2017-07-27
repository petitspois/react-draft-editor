import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router'
import { setTitle, $post } from '../js/utils'
import { ORDER_LIST, CANCEL_ORDER } from '../constants/api'
import moment from 'moment'
class Order extends Component{

    constructor(){
        super();
        this.current = 1;
        this.onoff = false;
    }

    static contextTypes = {
        showConfirm: PropTypes.func,
    }

    state = {
        orderList:{},
        orderListRecord:[],
        loadName:'',
        searchVal:'',
        nothing:false,
    }

    componentDidMount(){
        setTitle('我的订单')
        this.orderList(1);
        window.onscroll= () => {
            var sHeight=document.documentElement.scrollTop||document.body.scrollTop;//滚动高度
            var wHeight=document.documentElement.clientHeight;//window 
            var dHeight=document.documentElement.offsetHeight;//整个文档高度
            if(dHeight-(sHeight+wHeight)<200)
            {
                this.loadMore();                
            }
        }
    }

    orderList = (current, name) => {
        let data = {};
        data.index = current;
        if(name)data.name=name;
        this.setState({loadName: '加载中...'});
        $post(ORDER_LIST, data).then(ret=>{
            this.setState({loadName: ''});
            if(ret.code == 100){
                this.setState({orderList: ret.result, orderListRecord: current == 1 ?  ret.result.records : this.state.orderListRecord.concat(ret.result.records) })
                 if(!this.state.orderListRecord.length){
                    this.setState({nothing:true});
                }else{
                    this.setState({nothing:false});
                }
            }else if(ret.code == 105){
                this.props.router.replace('/signin')
            }
        })
    }

    loadMore = () => {
        if(this.state.orderList.pages <=this.current){
            this.setState({loadName: '暂无更多'});
            return};
        this.orderList(++this.current, this.state.searchVal)
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

    cancelOrder = (id) => {
        this.context.showConfirm('确定取消订单？', '', ()=>{
            $post(CANCEL_ORDER, {id}).then(ret=>{
                if(ret.code == 100){
                    this.orderList(1);
                    return;
                }
            })
        })
    }


    searchOrder = () => {
        let val = this.refs.searchVal.value;
        this.current=1;
        this.setState({searchVal: val}, ()=>{
            this.orderList(1, val)
        })
    }

    express = (id) => {
        this.props.router.push('/express?id='+id)
    }

    render(){
        let {orderList, orderListRecord} = this.state;
        return (
            <div className="search-page order">

                <div  className="search-component" >
                    <i className="icon" onClick={this.searchOrder}>&#xe616;</i>
                    <input type="text" ref="searchVal" style={{border:'none', background:'#e7e7ea'}} placeholder="输入产品名称查询订单信息" />
                    <a href="javascript:;" onClick={this.searchOrder}>查询</a>
                </div>
               

                <div  className="order-list">
                    {
                        orderListRecord.map((item, index)=>{
                            return (
                                <div key={index} className="order-each">
                                    <div className="order-each-title">
                                        下单时间：{moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}
                                    </div>
                                    <div className="order-each-content">
                                        <Link to={"/orderdetail?id="+item.id}>
                                            <img style={{width:'2.026666666666667rem', height:'2.026666666666667rem'}} src={item.product.cpsImg152x152} alt=""/>
                                            <div className="order-each-content-title">
                                                <h4 style={{color:'#333'}}><b>{!!item.productName && item.productName.split(' ')[0]}</b> <span>x{item.number}</span></h4>
                                            </div>
                                            <p>
                                                {
                                                    !!item.productName && item.productName.split(' ').slice(1).map((val, indx)=>{
                                                        return (
                                                            indx%2==1 && <b key={indx}>{val}</b>
                                                        )
                                                    })
                                                }
                                            </p>
                                            <div className="price">
                                                <i>¥ {item.price/100/item.number}</i>
                                                {/*{item.product.price !=0 &&  <span>¥ {item.price/item.number}</span>}*/}
                                                <div className="status">{this.orderStatus(item.status)}</div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="order-each-footer">
                                        <h4>
                                            共1件商品&nbsp;&nbsp;&nbsp;合计：¥{item.priceStr}
                                        </h4>
                                        {item.status ==0 && <a href="javascript:;" onClick={this.cancelOrder.bind(this, item.id)}>取消订单</a>}
                                        {(item.status == 3 || item.status == 4 || item.status == 5)  && <a href="javascript:;" onClick={this.express.bind(this, item.id)}>查看物流</a>}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {!!orderListRecord.length && <a href="javascript:;">{this.state.loadName}</a>}
                {this.state.nothing &&  <div className="order-nothing">
                    <img style={{width:'4.1866666666666665rem', height:'3.7066666666666666rem'}} src="/lib/images/order-nothing.png" alt=""/>
                    <p>您还没有相关订单</p>
                    <Link to={`/shop/${localStorage.shopId}`}><i className="icon">&#xe612;</i>去逛逛</Link>
                </div>}
            </div>
        )
    }
}

export default withRouter(Order);