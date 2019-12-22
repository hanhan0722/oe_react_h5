import React, { Component } from 'react'
import OeFooter from '@/components/Footer'
import { connect } from 'react-redux'
import { Select } from 'antd'
import intl from 'react-intl-universal'
import zh from '@/assets/lang/zh'
import en from '@/assets/lang/en'
import './Index.scss'
const { Option } = Select;

class Index extends Component {
  state = {
    imgPath: "assets/img/index/"
  }
  goLogin = () => {
    const lang = localStorage.getItem('lang') || navigator.language.split('-')[0];
    if (lang === 'en') this.props.history.push('/email-login')
    else this.props.history.push('/login')
  }
  goPay = () => {
    if (this.props.userInfo.id)
      this.props.history.push('/user/1')
    else this.goLogin()
  }
  goDownLoad = () => {
    window.location.href = "https://go.onelink.me/Olq9/TrueLove"
  }
  changeLang = val => {
    localStorage.setItem('lang', val)
    intl.init({
      currentLocale: val, locales: {
        'zh': zh,
        'en': en
      }
    })
    window.location.reload();
  }
  render() {
    const lang = localStorage.getItem('lang') || navigator.language.split('-')[0]
    return (<div className="index">
      <div className="module module1">
        <Select className="rt" defaultValue={lang === 'en' ? 'English' : '简体中文'} style={{ width: 110 }} onChange={val => this.changeLang(val)}>
          <Option value="zh">简体中文</Option>
          <Option value="en">English</Option>
        </Select>
        <img src={require(`@/${this.state.imgPath}user1.png`)} alt="" />
        <img className="image-logo" src={require(`@/${this.state.imgPath}logo.png`)} alt="" />
        <p className="title-sub">{intl.get('Index.title1')}</p>
        <p className="title-main">{intl.get('Index.title2')}</p>
        <p className="module1-desc">{intl.get('Index.title3')}</p>
        {/* 寻找我的缘分 */}
        <button className="btn-grad-pink" onClick={this.goLogin}>{intl.get('Index.button1')}</button>
        <p>
          {/* 充值缴费 */}
          <span onClick={this.goPay}>{intl.get('Index.button2')}</span>
          {/* 下载APP */}
          <span onClick={this.goDownLoad}>{intl.get('Index.button3')}</span>
        </p>
      </div>
      <div className="module module2">
        <div>
          <p className="title-main">{intl.get('Index.title4')}</p>
          <p className="title-sub">{intl.get('Index.title5')}</p>
          <img src={require(`@/${this.state.imgPath}user2.png`)} alt="" />
        </div>
      </div>
      <div className="module module3">
        <div>
          <p className="title-main">{intl.get('Index.title6')}</p>
          <p className="title-sub">{intl.get('Index.title7')}</p>
          <img src={require(`@/${this.state.imgPath}chat.png`)} alt="" />
        </div>
      </div>
      <div className="module module4">
        <p className="title-main">{intl.get('Index.title8')}</p>
        <p className="title-sub">{intl.get('Index.title9')}</p>
        <img src={require(`@/${this.state.imgPath}user3.png`)} alt="" />
        <div style={{ opacity: 0 }}>
          <OeFooter></OeFooter>
        </div>
        <footer>
          <OeFooter></OeFooter>
        </footer>
      </div>
    </div>);
  }
}

export default connect(
  state => ({
    userInfo: state.main.userInfo,
  })
)(Index);