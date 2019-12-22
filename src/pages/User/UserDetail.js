import React, { Component } from 'react'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import $ajax from '@/http'
import { getCountry, getCity, getLabel } from "@/assets/utils/public.js";
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { changeOtherInfo } from '@/redux/action'
import intl from 'react-intl-universal'
import DownLoad from '@/components/DownLoad'
import { changeShowDownLoad } from '@/redux/action'
import './UserDetail.scss'

class UserDetail extends Component {
  state = {
    imgPath: "assets/img/user/",
    photoList: [],
    url_prefix: "",
    avatar: "",
    user: {},
    authInfo: {},
    message: ""
  }
  componentDidMount() {
    new Swiper('.swiper-container', {
      observer: true,
      loop: true,  //循环
      autoplay: {   //滑动后继续播放（不写官方默认暂停）
        disableOnInteraction: false,
      },
      pagination: {  //分页器
        el: '.swiper-pagination'
      }
    })
    const { host, userInfo, match } = this.props;
    $ajax.post(`${host}user/getAnotherUserInfo`, {
      id: userInfo.id || null,
      uid: match.params.id
    }).then(data => {
      console.log(data)
      this.setState({
        photoList: data.listAlbum,
        url_prefix: data.url_prefix,
        avatar: data.avatar,
        user: data.user,
        authInfo: data.authInfo
      })
    })
  }
  goDataDetail(e, name) {
    const { user } = this.state;
    this.props.changeOtherInfo(user)
    if (name === "base") {
      this.props.history.push(`/user/details/${user.id}/base`)
    } else if (name === "mate") {
      this.props.history.push(`/user/details/${user.id}/mate`)
    }
  }
  showDownLoad = (e, message) => {
    this.setState({
      message: message
    })
    this.props.showDownLoad()
  }
  render() {
    const { url_prefix, avatar, photoList, user, imgPath, authInfo, message } = this.state;
    return (<div className="user-detail">
      {/* 相册 */}
      <div className="swiper-container" style={{ display: (photoList.length > 0 ? 'block' : 'none') }}>
        <div className="swiper-wrapper">
          {
            photoList.map((elem, index) => {
              return (
                <div className="swiper-slide" key={index}>
                  <img src={url_prefix + elem.imgurl} alt="" />
                </div>)
            })
          }
        </div>
        <div className="swiper-pagination"></div>
      </div>
      {photoList.length === 0 && <img width="100%" src={url_prefix + avatar} alt="" />}
      {/* 资料 */}
      <div className="user-info">
        <div className="clear">
          {/* 昵称 */}
          <p className="user-name">
            <span>{user.nickname}</span>
            <i className="icon-shield"></i>
            <i className="icon-vip"></i>
          </p>
          <div className="lf">
            {/* 年龄身高婚姻状况 */}
            <p className="content-light">{user.age + intl.get('UserList.unit')}|{user.height}cm</p>
            <p className="content-light">{getCountry(user.workProvince) ? getCountry(user.workProvince) + "," + getCity(user.workProvince, user.workCity) : ""}</p>
          </div>
          <div className="rt">
            <p className="content-light">ID:{user.id}</p>
            {/* 给Ta写信 */}
            <p onClick={e => this.showDownLoad(e, intl.get('UserList.message3'))}><i className="icon-letter"></i><span>{intl.get('UserDetail.button1')}</span></p>
          </div>
        </div>
        {/* 认证 */}
        <ul className="auth-list">
          {/* 身份认证 */}
          <li>{
            authInfo.userAuthState === 1 ?
              <div>
                <img src={require(`@/${imgPath}identify-active.png`)} alt="" />
                <p>{intl.get('UserDetail.title1')}</p>
              </div> :
              <div>
                <img src={require(`@/${imgPath}identify.png`)} alt="" />
                <p>{intl.get('UserDetail.title2')}</p>
              </div>
          }
          </li>
          {/* 视频认证 */}
          <li>{
            authInfo.videoAuthStatus === 1 ?
              <div>
                <img src={require(`@/${imgPath}video-active.png`)} alt="" />
                <p>{intl.get('UserDetail.title3')}</p>
              </div> :
              <div>
                <img src={require(`@/${imgPath}video.png`)} alt="" />
                <p>{intl.get('UserDetail.title4')}</p>
              </div>
          }
          </li>
          {/* 学历认证 */}
          <li>{
            authInfo.educationAuthState === 1 ?
              <div>
                <img src={require(`@/${imgPath}education-active.png`)} alt="" />
                <p>{intl.get('UserDetail.title5')}</p>
              </div> :
              <div>
                <img src={require(`@/${imgPath}education.png`)} alt="" />
                <p>{intl.get('UserDetail.title6')}</p>
              </div>
          }
          </li>
        </ul>
        {/* 签名 */}
        <div className="user-signature">
          <img src={require(`@/${imgPath}mark-left.png`)} alt="" />
          <p>{user.description || intl.get('UserDetail.title7')}</p>
          <img src={require(`@/${imgPath}mark-right.png`)} alt="" />
          <img src={require(`@/${imgPath}mark-right.png`)} alt="" />
        </div>
        {/* 基本资料 */}
        <div className="data-item">
          <p>
            {intl.get('UserDetail.title8')}
            <Icon type="right" className="rt" onClick={e => this.goDataDetail(e, 'base')} />
          </p>
          {/* 年龄 */}
          <p>{intl.get('UserDetail.title10') + user.age || intl.get('UserDetail.title19')}</p>
          {/* 身高 */}
          <p>{intl.get('UserDetail.title11') + user.height || intl.get('UserDetail.title19')}cm</p>
          {/* 收入 */}
          <p>{intl.get('UserDetail.title12') + (user.income !== undefined ? getLabel(intl.get('UserDetail.incomeOption'), user.income) : intl.get('UserDetail.title19'))}</p>
          {/* 期待结婚时间 */}
          <p>{intl.get('UserDetail.title13') + (user.expectMarryTime !== undefined ? getLabel(intl.get('UserDetail.marryTimeOption'), user.expectMarryTime) : intl.get('UserDetail.title19'))}</p>
        </div>
        {/* 择偶标准 */}
        <div className="data-item">
          <p>
            {intl.get('UserDetail.title9')}
            <Icon type="right" className="rt" onClick={e => this.goDataDetail(e, 'mate')} />
          </p>
          {/* 年龄 */}
          <p>{intl.get('UserDetail.title10') + (user.mateAgeStart ? `${user.mateAgeStart}-${user.mateAgeEnd}` : intl.get('UserDetail.title19'))}</p>
          {/* 身高 */}
          <p>{intl.get('UserDetail.title11') + (user.mateHeightStart ? `${user.mateHeightStart}-${user.mateHeightEnd}cm` : intl.get('UserDetail.title19'))}</p>
          {/* 收入 */}
          <p>{intl.get('UserDetail.title12') + (user.mateIncome !== undefined ? getLabel(intl.get('UserDetail.incomeOption'), user.mateIncome) : intl.get('UserDetail.title19'))}</p>
          {/* 期待结婚时间 */}
          <p>{intl.get('UserDetail.title13') + (user.mateExpectMarryTim !== undefined ? getLabel(intl.get('UserDetail.marryTimeOption'), user.mateExpectMarryTime) : intl.get('UserDetail.title19'))}</p>
        </div>
        {/* 朋友对我的评价 */}
        <div className="data-item">
          <p>{intl.get('UserDetail.title14')}</p>
          <p>{user.evaluation || intl.get('UserDetail.title19')}</p>
        </div>
        {/* 家人对我的评价 */}
        <div className="data-item">
          <p>{intl.get('UserDetail.title15')}</p>
          <p>{user.familyevaluation || intl.get('UserDetail.title19')}</p>
        </div>
        {/* 人生中最难忘的事 */}
        <div className="data-item">
          <p>{intl.get('UserDetail.title16')}</p>
          <p>{user.unforgettable || intl.get('UserDetail.title19')}</p>
        </div>
        {/* 我最喜欢做的事 */}
        <div className="data-item">
          <p>{intl.get('UserDetail.title17')}</p>
          <p>{user.favoritethings || intl.get('UserDetail.title19')}</p>
        </div>
        {/* 未来伴侣重要素质 */}
        <div className="data-item">
          <p>{intl.get('UserDetail.title18')}</p>
          <p>{user.qualityofpartner || intl.get('UserDetail.title19')}</p>
        </div>
        <div className="handle">
          <i className="icon-heart" onClick={e => this.showDownLoad(e, intl.get('UserList.message1'))}></i>
          <i className="icon-chat" onClick={e => this.showDownLoad(e, intl.get('UserList.message2'))}></i>
        </div>
      </div>
      <DownLoad message={message}></DownLoad>
    </div>);
  }
}

export default connect(
  state => ({
    host: state.main.host,
    userInfo: state.main.userInfo,
    otherInfo: state.main.otherInfo
  }),
  dispatch => ({
    changeOtherInfo: data => dispatch(changeOtherInfo(data)),
    showDownLoad: () => dispatch(changeShowDownLoad(true))
  })
)(UserDetail);