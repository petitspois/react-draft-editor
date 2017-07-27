import React, { Component } from 'react'
import { Link, withRouter } from 'react-router'
import { ALL_SHOPS, LINK } from '../constants/api'
import { setTitle, $post } from '../js/utils'
import Nav from './nav'
import Search from './search'
import Filter from './filter'

class AllShops extends Component{

    constructor(props){
        super(props)
        this.current = 1;
    }

    state = {
        loadName: '',
        allData:{},
        allDataRecord:[],
        orderByField:'',
        sort:0,
        sortPrice:'',
        name:'',
        onoff:false,
        searchContent:'',
        isSearchPage:{
            'transform':'translate3d(100%,0,0)',
            'WebkitTransform':'translate3d(100%,0,0)',
        },
        isFilterPage:{
            'transform':'translate3d(100%,0,0)',
            'WebkitTransform':'translate3d(100%,0,0)',
        },
        searchVal:'',
        active:1,
        isAuto:false,
    }

    componentDidMount(){
        setTitle('所有商品')
        this.setState({
            orderByField:'saleNum',
            sort:0,
        }, () => {
            this.current = 0;
            this.loadmore();                
        })
        window.onscroll= () => {
            var sHeight=document.documentElement.scrollTop||document.body.scrollTop;//滚动高度
            var wHeight=document.documentElement.clientHeight;//window 
            var dHeight=document.documentElement.offsetHeight;//整个文档高度
            if(dHeight-(sHeight+wHeight)<300)
            {
                this.loadmore();                
            }
        }
    }

    search = () => {
        console.log(this.refs.search.value);
    }

    jumpSearch = () => {
        document.documentElement.className='sift-move';
        this.setState({isSearchPage:{
            'transform':'translate3d(0,0,0)',
            'WebkitTransform':'translate3d(0,0,0)',
             isAuto:true,
        }})
    }

    closeSearch = () => {
        document.documentElement.className='';
        this.setState({isSearchPage:{
            'transform':'translate3d(100%, 0, 0)',
            'WebkitTransform':'translate3d(100%, 0, 0)',
             isAuto:false,
        }})
    }

    closeFilter = () => {
        document.documentElement.className='';
        this.setState({isFilterPage:{
            'transform':'translate3d(100%, 0, 0)',
            'WebkitTransform':'translate3d(100%, 0, 0)',
        }})
    }

    childSetName = (name, fn) => {
        this.setState({name}, fn);
    }

    jumpFilter = () => {
        document.documentElement.className='sift-move';
        this.setState({isFilterPage:{
            'transform':'translate3d(0,0,0)',
            'WebkitTransform':'translate3d(0,0,0)',
        }})
    }

    loadShoplist = (index, orderByField, sort, name, size=30) => {
        this.setState({loadName:'加载中...'})
        let data = {
            index: index
        }
        if(orderByField){
            data.orderByField = orderByField;
            data.sort = sort;
        }
        if(name)data.name=name;
        if(size)data.size = size;
        $post(ALL_SHOPS, data).then(ret=>{
            if(ret.code != 100)return;
            this.setState({onoff:false, allData:ret.result, allDataRecord: index==1 ? ret.result.records : this.state.allDataRecord.slice().concat(ret.result.records)}, () => {
                this.setState({loadName:''})
            });
        })
    }


    sortNum = () => {
        this.current = 1;
        this.setState({active:1,sortPrice:'',sort: this.state.sort === '' ? 0 : !this.state.sort*1 , orderByField:'saleNum'}, ()=>{
           this.loadShoplist(this.current, this.state.orderByField, this.state.sort, this.state.name)
        })
    }

    sortPriceFn = () =>{
        this.current = 1;
        this.setState({active:2, sort:'', sortPrice: this.state.sortPrice ? 0:1, orderByField:'price'}, ()=>{
           this.loadShoplist(this.current, this.state.orderByField, this.state.sortPrice, this.state.name)
        })
    }

    loadmore = () => {
        if(this.state.allData.pages < this.current+1){
            this.setState({loadName:'没有更多了'})
            return;
        };
        if(!this.state.onoff){
            this.setState({onoff: true}, () => {
               this.loadShoplist(++this.current, this.state.orderByField, this.state.sort === ''? this.state.sortPrice : this.state.sort, this.state.name)
            })
        }
    }

    synthesis = () => {
        this.current = 1;
        this.setState({active:0, sort:'', sortPrice: '', orderByField:'', name: ''});    
        this.loadShoplist(1)
    }

    goToSearchContent = () => {
        this.closeSearch();
        this.current = 1;
        this.setState({active:0})
        if(!this.state.name){
            this.synthesis()
            return;
        }
        this.setState({sort:'', sortPrice: '' , orderByField:''}, ()=>{
            this.loadShoplist(1, '', '', this.state.name);
        })
    }

    render(){
        return (
            <div className="all-shops">
                <div className="search">
                    <span className="search-inner" onClick={this.jumpSearch} >
                        <i className="icon" >&#xe616;</i>
                        <input ref="search" disabled type="text" placeholder="搜索商城内商品" value={this.state.name}/>
                    </span>
                </div>
                <div className="sort-bar">
                    <ul>
                        <li style={{color: this.state.active ==0 && '#ff4200'}} onClick={this.synthesis}>综合</li>
                        <li onClick={this.sortNum}>
                            <span style={{color: this.state.active ==1 && '#ff4200'}}>销量</span>
                            <span className="sort-btn">
                                <i className={this.state.sort === 1 ? "icon active" : "icon"}>&#xe65d;</i>
                                <i className={this.state.sort === 0 ? "icon active" : "icon"}>&#xe65e;</i>
                            </span>
                        </li>
                        <li onClick={this.sortPriceFn}>
                            <span style={{color: this.state.active ==2 && '#ff4200'}}>价格</span>
                            <span className="sort-btn">
                                <i className={this.state.sortPrice === 1 ? "icon active" : "icon"}>&#xe65d;</i>
                                <i className={this.state.sortPrice === 0 ? "icon active" : "icon"}>&#xe65e;</i>
                            </span>
                        </li>
                        <li onClick={this.jumpFilter}>筛选</li>
                    </ul>
                </div>
                <div className="allshop-each">
                <ul>
                    {
                        this.state.allDataRecord.map((item, index)=>{
                            return (
                                <li key={index}>
                                    <a href={LINK+item.productId}><img src={item.product && item.product.cpsImg372x372} alt=""/></a>
                                    <p>{item.name}</p>
                                    <div className="price">
                                        <div className="price-left">
                                            <p>￥{item.priceStr}</p>
                                            <span>已售{item.saleNum}件</span>
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
                    {this.state.allDataRecord.length ? <a href="javascript:;" onClick={this.loadmore}>{this.state.loadName}</a> : <p style={{textAlign:'center'}}>暂无内容</p>}
            </div>
                <Search childSetName={this.childSetName} name={this.state.name} goToSearch={this.goToSearchContent} close={this.closeSearch} visible={this.state.isSearchPage}></Search>
                <Filter childSetName={this.childSetName} searchContent={this.state.name} goToSearch={this.goToSearchContent} close={this.closeFilter} visible={this.state.isFilterPage}></Filter>
                <Nav></Nav>
            </div>
        )
    }
}


export default withRouter(AllShops);
