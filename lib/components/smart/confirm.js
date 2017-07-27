import React from 'react'
import PropTypes from 'prop-types';



class Confirm extends React.Component {

    static defaultProps = {
        visible: false,
        title: '',
        content:''
    };

    static contextTypes = {
        hideConfirm: PropTypes.func,
        executioncb: PropTypes.func
    }

    confirm(){
        this.context.executioncb()
    }

    cancel(){
        this.context.hideConfirm();
    }

    render () {
        return (
            <div
                className="weui_dialog_confirm"
                id="dialog1"
                style={{display: this.props.visible ? 'block' : 'none'}}>
                <div className="weui_mask" />
                <div className="weui_dialog">
                    <div  style={{display: this.props.title ? 'block' : 'none'}} className="weui_dialog_title">{  this.props.title }</div>
                    <div style={{padding: this.props.title ? '0.4rem 1.0666666666666667rem' : '0.7rem 1.0666666666666667rem'}}  className="weui_dialog_bd">{ this.props.content }</div>
                    <div className="weui_dialog_ft">
                        <a
                            href="javascript:;"
                            className="weui_btn_dialog primary" onClick={ this.confirm.bind(this) }>确定</a>
                        <a
                            href="javascript:;"
                            className="weui_btn_dialog default" onClick={ this.cancel.bind(this) }>取消</a>
                    </div>
                </div>
            </div>

        )
    }
}

export default Confirm;
