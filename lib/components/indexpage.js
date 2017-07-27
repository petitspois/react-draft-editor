import React, { Component } from 'react'
import { Link, withRouter } from 'react-router'
import { setTitle, $post } from '../js/utils'
import  { SHOP_LIST, LINK } from '../constants/api'
import Nav from './nav'

class IndexPage extends Component{

    constructor(props){
        super(props)
    }

    state = {
        shop:{},
        shopBanner:[],
        shopMenu:[],
    }

    componentDidMount() {
        localStorage.shopId= this.props.params.id || '10008';
        $post(SHOP_LIST, {shopId: this.props.params.id}).then((ret)=>{
            if(ret.code != 100)return;
            this.setState({shop: ret.result.shop, shopBanner: ret.result.shopBanner, shopMenu:ret.result.shopMenu}, () => {
                setTitle(this.state.shop.name || '');
                if(this.state.shopBanner.length<2)return;
                new Swiper ('.swiper-container-first', {
                    loop: true,
                    grabCursor: true,
                    paginationClickable: true,
                    autoplay: 2000,
                    pagination: '.swiper-pagination'
                })
            })
        })
    }

    jumpChannel= (channelId) => {
        this.props.router.push('/channel/'+channelId)
    }

    render(){
        let { shopBanner, shopMenu } = this.state;
        return (
            <div className="index-page">
                <div className="swiper">
                        <div className="swiper-container-first">
                            <div className="swiper-wrapper">
                                {
                                    shopBanner.map((item, index) => {
                                        return (
                                            <div key={index} className="swiper-slide">
                                                {
                                                    !!item.type ?
                                                    <Link to={'/channel/'+item.objId}><img src={item.img} alt=""/></Link>:
                                                    <a href={LINK+item.objId }><img src={item.img} /></a>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                    <div className="swiper-footer">
                        <ul>
                            <li>
                                <i className="icon">&#xe611;</i>
                                全国顺丰包邮</li>
                            <li>
                                <i className="icon">&#xe611;</i>
                                货到付款</li>
                            <li>
                                <i className="icon">&#xe611;</i>
                                七天无理由退换货</li>
                        </ul>
                    </div>
                    <div className="channel">
                        {
                            shopMenu.map((item, index) => {
                                return (
                                    item.productList.length ?  <div key={index} className="channel-each">
                                        <h4 className="channel-title" onClick={this.jumpChannel.bind(this, item.id)}>{item.name}<i className="icon">&#xe60b;</i></h4>
                                        <ul>
                                            {
                                                item.productList.map((value, indx)=>{
                                                    return (
                                                        <li key={indx}>
                                                            <a href={LINK+value.productId}><img src={value.product && value.product.cpsImg372x372} alt=""/></a>
                                                            <p>{value.advertiserPlan.name}</p>
                                                            <div className="price">
                                                                <div className="price-left">
                                                                    <p>￥{value.advertiserPlan.priceStr}</p>
                                                                    <span>已售{value.advertiserPlan.saleNum}件</span>
                                                                </div>
                                                                <div className="price-right">
                                                                    <a href={LINK+value.productId}>抢购</a>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                            
                                            {item.productList.length%2 ?  <li className="more" onClick={this.jumpChannel.bind(this, item.id)}>查看更多</li> : ''}
                                        </ul>
                                        <div className="split-bar" style={{height:'0.2rem', background:'#f2f2f2'}}></div>
                                    </div>
                                    :''
                                )
                            })
                        }
                        
                    </div>
                    <Nav></Nav>
            </div>
        )
    }
}


export default withRouter(IndexPage)
