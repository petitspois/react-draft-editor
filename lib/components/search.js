import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'

class Search extends Component{

    state = {
        searchContent:'',
        empty:false,
    }


    componentDidUpdate(){
        if(this.props.visible.isAuto)this.nameInput.focus();
    }

    setSearchContent = (e) => {
        this.props.childSetName(e.target.value)
    }

    historyList = () => {
        let list = JSON.parse(localStorage.historyList || '[]');
        if(!this.props.name)return;
        list.unshift(this.props.name);
        localStorage.historyList = JSON.stringify(list.slice(0, 5));
        this.setState({empty: false})
    }

    emptyHistory = () => {
        this.setState({empty: true})
        localStorage.historyList = '';
    }

    searchHistory = (name) => {
        this.props.childSetName(name, ()=>{
            this.props.goToSearch();
        });
    }

    render(){
        let { visible, close, goToSearch, name } = this.props;
        return (
            <div style={visible} className="search-page">
                <div className="search-component">
                    <span onClick={close}><i className="icon">&#xe617;</i></span>
                    <i className="icon">&#xe616;</i>
                    <input ref={(input) => { this.nameInput=input}} value={name} type="text"  onChange={this.setSearchContent} placeholder="搜索商城内商品" />
                    <a href="javascript:;" onClick={()=>{this.historyList();goToSearch()}}>搜索</a>
                </div>

                <div className="search-content">
                    <div className="search-storage history-search">
                        <div className="storage-title">
                            <h4>历史搜索</h4>
                            <span onClick={this.emptyHistory}>
                                <i className="icon">&#xe613;</i>
                                 清空
                            </span>
                        </div>
                        <ul>
                            {
                                !this.state.empty && localStorage.historyList && JSON.parse(localStorage.historyList).map((item, index)=>{
                                    return <li onClick={this.searchHistory.bind(this, item)} key={index}>{item}</li>
                                })
                            }
                        </ul>
                    </div>

                    {/*<div style={{marginTop: '0.5333333333333333rem'}}className="search-storage history-search">
                        <div className="storage-title">
                            <h4>热门搜索</h4>
                            <span>
                                <i className="icon">&#xe609;</i>
                                 换一批
                            </span>
                        </div>
                        <ul>
                            <li>豆豆鞋</li>
                            <li>dd</li>
                            <li>dd</li>
                            <li>dd</li>
                            <li>dd</li>
                        </ul>
                    </div>*/}
                </div>

            </div>
        )
    }
}

export default Search;