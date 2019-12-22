import React, { Component } from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import { changeShowPay } from '@/redux/action'
import $ajax from '@/http'
import './Pay.scss'
import intl from 'react-intl-universal'

class Pay extends Component {
  state = {
    imgPath: "assets/img/pay/",
    showHasPayModal: false,
    order_number: ""
  }
  componentDidMount() { }
  aliPay = () => {
    this.setState({
      showHasPayModal: true
    })
    const { host, userInfo, commodity } = this.props;
    $ajax.post(`${host}pay/alipay/webPayment`, {
      id: userInfo.id,
      token: userInfo.token,
      product_id: commodity.purchaseId
    }).then(data => {
      console.log(data)
      const { alipayModel } = data;
      const div = document.createElement("div");
      div.innerHTML = alipayModel;
      document.body.appendChild(div);
      document.forms[0].acceptCharset = "utf-8";
      document.forms["alipaysubmit"].submit();
      document.forms.alipaysubmit.submit();
    })
  }
  weChat = () => {
    this.setState({
      showHasPayModal: true
    })
    const { host, userInfo, commodity } = this.props;
    $ajax.post(`${host}pay/wechat/h5/payment`, {
      id: userInfo.id,
      token: userInfo.token,
      product_id: commodity.purchaseId
    }).then(data => {
      console.log(data)
      window.location.href = data.webUrl;
      this.setState({
        order_number: data.order_number
      })
    })
  }
  queryOrder(orderid) {
    $ajax.post(`${this.props.host}pay/orderquery`, {
      order_id: orderid
    }).then(data => {
      if (data.status === 2) {
        message.success(intl.get('Pay.prompt'))
      }
    });
  }
  onCloseModal = () => {
    this.props.hidePay();
    this.setState({
      showHasPayModal: false
    })
  }
  paySuccess = () => {
    this.onCloseModal()
    this.queryOrder(this.state.order_number)
  }
  
  render() {
    const { imgPath } = this.state;
    const { hidePay } = this.props;
    return (<div className="pay shadow-fixed">
      {this.state.showHasPayModal ?
        // 是否支付成功弹窗
        <div>
          <img className="modal-close" src={require('@/assets/img/components/close.png')} alt="" onClick={this.onCloseModal} />
          <div className="line"></div>
          <div className="modal">
            {/* 支付验证 */}
            <p className="main-title">{intl.get('Pay.title4')}</p>
            <div className="content">
              <p>{intl.get('Pay.title5')}</p>
              <p>{intl.get('Pay.title6')}</p>
            </div>
            <div className="handle">
              {/* 支付失败 */}
              <button className="btn-default" onClick={this.onCloseModal}>{intl.get('Pay.button1')}</button>
              {/* 支付成功 */}
              <button className="btn-primary" onClick={this.paySuccess}>{intl.get('Pay.button2')}</button>
            </div>
          </div>
        </div> :
        // 支付方式弹窗
        <div>
          <img className="modal-close" src={require('@/assets/img/components/close.png')} alt="" onClick={hidePay} />
          <div className="line"></div>
          <div className="modal">
            {/* 请选择支付方式 */}
            <p className="main-title">{intl.get('Pay.title1')}</p>
            <ul className="payment-list">
              {/* 支付宝 */}
              <li onClick={this.aliPay}>
                <img src={require(`@/${imgPath}alipay.png`)} alt="" />
                <span>{intl.get('Pay.title2')}</span>
              </li>
              {/* 微信 */}
              <li onClick={this.weChat}>
                <img src={require(`@/${imgPath}wechat.png`)} alt="" />
                <span>{intl.get('Pay.title3')}</span>
              </li>
            </ul>
          </div>
        </div>
      }
    </div>);
  }
}

export default connect(
  state => ({
    host: state.main.host,
    userInfo: state.main.userInfo,
    commodity: state.main.commodity
  }),
  dispatch => ({
    hidePay: () => dispatch(changeShowPay(false))
  })
)(Pay);
