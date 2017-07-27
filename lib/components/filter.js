import React, { Component } from 'react'
import { setTitle, $post } from '../js/utils'
import { Link, IndexLink } from 'react-router'
import { CATEGORY_LIST } from '../constants/api'


class Filter extends Component{

    state = {
        categoryList:[],
        categoryChildren:[],
        current:0,
    }

    componentDidMount(){
        setTitle('筛选')
        $post(CATEGORY_LIST).then(ret=>{
            if(ret.code != 100)return;
            this.setState({categoryList: ret.result, categoryChildren: ret.result[0].childCategoryList || []});
        })
    }


    tabs = (index) => {
        this.setState({current:index, categoryChildren: this.state.categoryList[index].childCategoryList || []})
    }

    setName = name => {
        this.props.childSetName(this.state.categoryList[this.state.current].name+'-'+name, ()=>{
            this.props.close();
            this.props.goToSearch();
        });
        
    }

    render(){
        let { visible, close, goToSearch, searchContent, childSetName } = this.props;
        let { categoryList, current, categoryChildren,  } = this.state;
        return (
            <div style={visible} className="filter">
                <div className="filter-left">
                    <ul>
                        {
                            categoryList.map((item, index)=>{
                                return (
                                    <li className={current==index? 'active' : ''} key={index} onClick={this.tabs.bind(this, index)}>{item.name}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="filter-right">
                    <div className="filter-right-title">
                        <h4>{categoryList[current] && categoryList[current]['name']}</h4>
                    </div>
                    <ul>
                            
                            {
                                categoryChildren.map((item, index)=>{
                                    return (
                                        <li key={index} onClick={this.setName.bind(this, item.name)}>
                                            {item.icon ? <img src={item.icon} alt=""/> : <div className="cate-nothing"></div>}
                                            <span style={{color: searchContent == item.name ? '#ff4200' : ''}}>{item.name}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <a href="javascript:;" onClick={close} >返回</a>
                </div>
            </div>
        )
    }
}

export default Filter;