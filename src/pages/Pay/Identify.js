import React, { Component } from 'react'
import Pay from './Pay';
import { connect } from 'react-redux'
import $ajax from '@/http'
import { changeShowPay, changeCommodity } from '@/redux/action'
import intl from 'react-intl-universal'
import './Identify.scss'

class Identify extends Component {
  state = {
    saleList: ["rezheng1_s1"]
  }
  componentDidMount() {
    $ajax.post(`${this.props.host}shop/listShops`, {}).then(
      data => {
        console.log(data)
        this.setState({
          saleList: data.shops.filter(item => {
            return this.state.saleList.indexOf(item.purchaseId) > -1;
          })
        }, () => {
          this.props.changeCommodity(this.state.saleList[0])
        })
      })
  }

  render() {
    const lang = localStorage.getItem('lang') || navigator.language.split('-')[0];
    const { showPay, showPayment } = this.props;

    return (<div className="identify">
      <div>
        {lang === "zh" ?
          <img className="bg-img" src={require('@/assets/img/pay/identify_zh.jpg')} alt="" /> :
          <img className="bg-img" src={require('@/assets/img/pay/identify_en.jpg')} alt="" />
        }
      </div>
      <div className="clear">
        {/* 认证费： */}
        <p className="font-primary">{intl.get('Identify.title') + (lang === 'en' ? '$' : '¥') + this.state.saleList[0].price}</p>
        {/* 立即认证 */}
        <button className="btn-primary" onClick={showPayment}>{intl.get('Identify.button')}</button>
      </div>
      {showPay && <Pay></Pay>}
    </div>);
  }
}

export default connect(
  state => ({
    host: state.main.host,
    showPay: state.switches.showPay
  }),
  dispatch => ({
    showPayment: () => dispatch(changeShowPay(true)),
    changeCommodity: commodity => dispatch(changeCommodity(commodity))
  })
)(Identify);