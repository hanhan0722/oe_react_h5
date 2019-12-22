import React, { Component } from 'react'
import Swiper from 'swiper/dist/js/swiper'
import 'swiper/dist/css/swiper.min.css'
import { connect } from 'react-redux'
import { changeShowPay, changeCommodity } from '@/redux/action'
import $ajax from '@/http'
import Pay from './Pay';
import intl from 'react-intl-universal'
import './VIP.scss'

class VIP extends Component {
  state = {
    current: 1,
    index: 0,
    ready: false,
    bannerList: [
      {
        img: "banner1.png",
        text: intl.get('VIP.banner1')
      }, {
        img: "banner2.png",
        text: intl.get('VIP.banner2')
      }, {
        img: "banner3.png",
        text: intl.get('VIP.banner3')
      }, {
        img: "banner4.png",
        text: intl.get('VIP.banner4')
      }, {
        img: "banner5.png",
        text: intl.get('VIP.banner5')
      }, {
        img: "banner6.png",
        text: intl.get('VIP.banner6')
      }
    ],
    saleList: ["vip1_1", "vip1_12", "vip1_6"],
    imgPath: "assets/img/pay/"
  }
  componentDidMount() {
    new Swiper('.swiper-container', {
      loop: true,
      autoplay: {   //滑动后继续播放
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination'
      }
    })
    $ajax.post(`${this.props.host}shop/listShops`, {}).then(
      data => {
        this.setState({
          saleList: data.shops.filter(item => {
            item.month = item.purchaseId.split("_")[1];
            return this.state.saleList.indexOf(item.purchaseId) > -1;
          }).map((item, index) => {
            switch (index) {
              case 0: item.percent = 0; item.background = "#fff"; break;
              case 1: item.percent = 59; item.background = "#E90160"; break;
              case 2: item.percent = 49; item.background = "#FD8D81"; break;
              default: break;
            }
            return item;
          })
        }, () => {
          console.log(this.state.saleList)
          this.props.changeCommodity(this.state.saleList[1])
        })
      })
  }
  chooseCommodity = (e, index) => {
    this.setState({
      current: index
    }, () => {
      this.props.changeCommodity(this.state.saleList[index])
    })
  }
  render() {
    const { imgPath, current, bannerList, saleList } = this.state;
    const { showPay, showPayment } = this.props;
    return (
      <div className="vip">
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {
              bannerList.map((elem, index) => {
                return (<div className="swiper-slide" key={index}>
                  <p>{elem.text}</p>
                  <img src={require(`@/${imgPath}${elem.img}`)} alt="" />
                </div>)
              })
            }
          </div>
          <div className="swiper-pagination"></div>
        </div>
        <ul className="sale-list">
          {
            saleList.map((item, index) => {
              return (<li key={index} className={index === current ? 'current' : ''} onClick={e => this.chooseCommodity(e, index)}>
                <div style={{ background: item.background }}>
                  <div style={{ borderColor: `${item.background} transparent transparent` }}></div>
                  {item.percent > 0 && `${item.percent}%`}
                </div>
                <p>{item.goodsName}</p>
                <p className="sale-price">¥{item.price}</p>
                <p className="unit-price">¥{Math.round(item.price / item.month)}/{intl.get('VIP.unit')}</p>
              </li>)
            })
          }
        </ul>
        {/* 马上开通 */}
        <button className="btn-grad-pink" onClick={showPayment}>{intl.get('VIP.button')}</button>
        {showPay && <Pay></Pay>}
      </div>
    );
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
)(VIP);
