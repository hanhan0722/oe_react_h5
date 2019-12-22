import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Icon, Dropdown, Menu } from 'antd'
import { Toast } from 'antd-mobile';
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import VIP from '@/pages/Pay/VIP'
import Identify from '@/pages/Pay/Identify'
import $ajax from '@/http'
import { getCountry, getCity } from "@/assets/utils/public.js";
import { connect } from 'react-redux'
import DownLoad from '@/components/DownLoad'
import { changeShowDownLoad } from '@/redux/action'
import intl from 'react-intl-universal'
import zh from '@/assets/lang/zh'
import en from '@/assets/lang/en'
import './UserList.scss'

class UserList extends Component {
  state = {
    pno: 1,
    pageSize: 5,
    url_prefix: "",
    userList: [],
    current: 0,
    imgPath: "assets/img/user/",
    ready: false,
    hasMove: false,
    tx: 0,
    ty: 0,
    canLoad: true,
    message: ""
  }
  componentDidMount() {
    this.onPageChange()
    console.log(this.props.match.params.tab)
    if (this.props.match.params.tab) {
      this.setState({
        current: Number(this.props.match.params.tab)
      })
    }
  }
  onPageChange() {
    const { host, userInfo } = this.props;
    const { pno, pageSize, userList } = this.state;
    $ajax.post(`${host}user/v2/listUser`, {
      page: pno,
      pageSize: pageSize,
      id: userInfo.id || null
    }).then(data => {
      console.log(data)
      if (data.list.length > 0) {
        this.setState({
          url_prefix: data.url_prefix,
          userList: userList.concat(data.list),
          canLoad: true
        }, () => {
          console.log(this.state.userList)
          if (pno === 1) {
            var loaded = [];
            var _this = this;
            this.state.userList.forEach(item => {
              var img = new Image();
              img.src = this.state.url_prefix + item.avatar;
              img.onload = function () {
                loaded.push(true);
                if (loaded.length === _this.state.userList.length) {
                  _this.setState({
                    ready: true
                  })
                }
              }
            })
          }
        })
      } else {
        Toast.info(intl.get('UserList.prompt'), 1);
      }
    });
  }
  onTabChange = (e, val) => {
    this.setState({
      current: val
    })
  }
  changeLang = (e, lang) => {
    localStorage.setItem('lang', lang)
    intl.init({
      currentLocale: lang, locales: {
        'zh': zh,
        'en': en
      }
    })
    window.location.reload();
  }
  goLogin = () => {
    const lang = localStorage.getItem('lang') || navigator.language.split('-')[0];
    if (lang === 'en') this.props.history.push('/email-login')
    else this.props.history.push('/login')
  }
  showDownLoad = (e, message) => {
    this.setState({
      message: message
    })
    this.props.showDownLoad()
  }
  onTouchStart = e => {
    this.setState({
      hasMove: false,
      startX: e.touches[0].clientX,
      startY: e.touches[0].clientY
    })
  }
  onTouchMove = e => {
    this.setState({
      hasMove: true,
      tx: e.touches[0].clientX - this.state.startX,
      ty: e.touches[0].clientY - this.state.startY
    })
  }
  onTouchEnd = e => {
    const { hasMove, tx, ty, canLoad, pno } = this.state;
    if (!hasMove) return false;
    if (Math.abs(tx) < Math.abs(ty)) {
      if (ty > 0) {
        //下滑
        console.log("down");
      } else {
        //上滑
        console.log("up");
        var scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;
        if (
          canLoad &&
          this.refs.bottom.offsetTop <= scrollTop + document.documentElement.clientHeight
        ) {
          console.log("load next page");
          this.setState({
            canLoad: false,
            pno: pno + 1
          })
          this.onPageChange();
        }
      }
    }
  }
  render() {
    const { current, url_prefix, userList, imgPath, ready, message } = this.state;
    const lang = localStorage.getItem('lang') || navigator.language.split('-')[0]
    const menu = (
      <Menu>
        <Menu.Item key="0" onClick={e => this.changeLang(e, 'zh')}>
          简体中文
          <Icon type="check" style={{ color: '#3E3A39', background: '#13CE66', borderRadius: '50%', marginLeft: '5px', display: lang === 'en' ? 'none' : 'inline-block' }} />
        </Menu.Item>
        <Menu.Item key="1" onClick={e => this.changeLang(e, 'en')}>
          English
          <Icon type="check" style={{ color: '#3E3A39', background: '#13CE66', borderRadius: '50%', marginLeft: '5px', display: lang === 'en' ? 'inline-block' : 'none' }} />
        </Menu.Item>
      </Menu>
    );
    const userMenu = (
      <Menu>
        <Menu.Item key="0" onClick={this.goLogin}>
          {intl.get('UserList.button')}
        </Menu.Item>
      </Menu>
    );
    return (<div className="user-list">
      <header>
        <Dropdown overlay={menu} trigger={['click']}>
          <Icon type="menu" style={{ fontSize: '24px' }} />
        </Dropdown>
        <img className="logo" src={require(`@/${imgPath}logo.png`)} alt="" />
        {this.props.userInfo.avatar ?
          <Link to={'/user/detail/'+this.props.userInfo.id}>
            <img className="avatar" src={url_prefix + this.props.userInfo.avatar} alt="" />
          </Link> :
          <Dropdown overlay={userMenu} trigger={['click']}>
            <img className="avatar" src={require(`@/${imgPath}user.png`)} alt="" />
          </Dropdown>
        }
      </header>
      <ul className="tab-list">
        {/* 推荐 */}
        <li className={current === 0 ? 'active' : ''} onClick={e => this.onTabChange(e, 0)}>{intl.get('UserList.tab1')}</li>
        {/* 充值 */}
        <li className={current === 1 ? 'active' : ''} onClick={e => this.onTabChange(e, 1)}>{intl.get('UserList.tab2')}</li>
      </ul>
      <ul className="user-card"
        style={{ display: current === 0 ? 'block' : 'none' }}
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
      >
        {userList.map((item, index) => {
          return (<li key={index}>
            <ReactPlaceholder type='media' rows={10} ready={ready}>
              <Link to={`/user/detail/${item.id}`}>
                <img src={url_prefix + item.avatar} alt="" />
              </Link>
              <div className="user-info">
                <p className="user-name">
                  <span>{item.nickname}</span>
                  <i className="icon-shield"></i>
                  <i className="icon-vip"></i>
                </p>
                <div className="user-desc">
                  <div>
                    <p className="content-light">{item.age + intl.get('UserList.unit')}|{item.height}cm</p>
                    <p className="content-light">{getCountry(item.workProvince) ? getCountry(item.workProvince) + "," + getCity(item.workProvince, item.workCity) : ""}</p>
                  </div>
                  <div>
                    <i className="icon-heart" onClick={e => this.showDownLoad(e, intl.get('UserList.message1'))}></i>
                    <i className="icon-chat" onClick={e => this.showDownLoad(e, intl.get('UserList.message2'))}></i>
                  </div>
                </div>
              </div>
            </ReactPlaceholder>
          </li>)
        })}
      </ul>
      <div id="bottom" style={{ height: current === 1 ? 'auto' : 0, overflow: 'hidden' }} ref="bottom">
        {this.props.userInfo.authStatus !== 1 ?
          <Identify></Identify> :
          <VIP></VIP>
        }
      </div>
      <DownLoad message={message}></DownLoad>
    </div>);
  }
}

export default connect(
  state => ({
    host: state.main.host,
    userInfo: state.main.userInfo,
    showDownLoad: state.switches.showDownLoad
  }),
  dispatch => ({
    showDownLoad: () => dispatch(changeShowDownLoad(true))
  })
)(UserList);