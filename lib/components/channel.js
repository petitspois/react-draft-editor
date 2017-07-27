import React, { Component } from 'react'
import { Link, withRouter } from 'react-router'
import { setTitle, $post } from '../js/utils'
import  { CHANNEL_SHOPLIST, LINK } from '../constants/api'
import classNames from 'classnames'
import Nav from './nav'

class Channel extends Component{

    constructor(props){
        super(props)
        this.current = 1;
    }

    state = {
        loadName:'',
        channelData:{},
        channelRecord:[],
        orderByField:'',
        sort:'',
        sortPrice:'',
        active:0,
    }

    componentDidMount(){
        this.loadShoplist(this.props.params.channelId, localStorage.shopId, 1)
        window.onscroll= () => {
            var sHeight=document.documentElement.scrollTop||document.body.scrollTop;//滚动高度
            var wHeight=document.documentElement.clientHeight;//window 
            var dHeight=document.documentElement.offsetHeight;//整个文档高度
            if(dHeight-(sHeight+wHeight)<200)
            {
                this.loadmore();                
            }
        }
    }

    loadShoplist = (menuId, shopId, index, orderByField, sort, size) => {
        if(this.state.channelData.pages < index){
            this.setState({loadName:'没有更多了'})
            return;
        };
        this.setState({loadName:'加载中...'})
        let data = {
            menuId:menuId,
            shopId: shopId,
            index: index
        }
        if(orderByField){
            data.orderByField = orderByField;
            data.sort = sort;
        }
        if(size)data.size = size;
        $post(CHANNEL_SHOPLIST, data).then(ret=>{
            if(ret.code != 100)return;
            this.setState({channelData:ret.result.menuProductList, channelRecord: index==1 ? ret.result.menuProductList.records : this.state.channelRecord.slice().concat(ret.result.menuProductList.records)}, () => {
                setTitle(ret.result.menu.name || '所有商品')
                this.setState({loadName:''})
            });
        })
    }

    sortNum = () => {
        this.current = 1;
        this.setState({active:1, sortPrice:'',sort: this.state.sort === '' ? 0 : !this.state.sort*1, orderByField:'saleNum'}, ()=>{
            this.loadShoplist(this.props.params.channelId, localStorage.shopId, 1, 'saleNum', this.state.sort)
        })
    }

    sortPriceFn = () => {
        this.current = 1;
        this.setState({active:2, sort:'', sortPrice: this.state.sortPrice ? 0:1 , orderByField:'price'}, ()=>{
            console.log(this.state.sortPrice);
            this.loadShoplist(this.props.params.channelId, localStorage.shopId, 1, 'price', this.state.sortPrice)
        })
    }

    loadmore = () => {
       this.loadShoplist(this.props.params.channelId, localStorage.shopId, ++this.current, this.state.orderByField, this.state.sort == ''? this.state.sortPrice : this.state.sort)
    }

    synthesis = () => {
        this.current = 1;
        this.setState({active:0, sort:'', sortPrice: '', orderByField:''});    
        this.loadShoplist(this.props.params.channelId, localStorage.shopId, 1)
    }

    render(){
        let { channelData } = this.state;
        return (
            <div className="all-shops">
                <div className="sort-bar">
                    <ul>
                        <li style={{color: this.state.active ==0 && '#ff4200', width:'33.3333%'}}  onClick={this.synthesis}>综合</li>
                        <li style={{width:'33.3333%'}} onClick={this.sortNum}>
                            <span style={{color: this.state.active ==1 && '#ff4200'}}>销量</span>
                            <span className="sort-btn">
                                <i className={this.state.sort === 1 ? "icon active" : "icon"}>&#xe65d;</i>
                                <i className={this.state.sort === 0 ? "icon active" : "icon"}>&#xe65e;</i>
                            </span>
                        </li>
                        <li style={{width:'33.3333%'}} onClick={this.sortPriceFn}>
                            <span style={{color: this.state.active ==2 && '#ff4200'}}>价格</span>
                            <span className="sort-btn">
                                <i className={this.state.sortPrice === 1 ? "icon active" : "icon"}>&#xe65d;</i>
                                <i className={this.state.sortPrice === 0 ? "icon active" : "icon"}>&#xe65e;</i>
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="allshop-each">
                <ul>
                    {
                        this.state.channelRecord.map((item, index)=>{
                            return (
                                <li key={index}>
                                    <a href={LINK+item.productId}><img src={item.product && item.product.cpsImg372x372} alt=""/></a>
                                    <p>{item.advertiserPlan.name}</p>
                                    <div className="price">
                                        <div className="price-left">
                                            <p>￥{item.advertiserPlan.priceStr}</p>
                                            <span>已售{item.advertiserPlan.saleNum}件</span>
                                        </div>
                                        <div className="price-right">
                                            <a href={LINK+item.productId}>抢购</a>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
                <a href="javascript:;" onClick={this.loadmore}>{this.state.loadName}</a>
            </div>
                <Nav></Nav>
            </div>
        )
    }
}


export default withRouter(Channel);
