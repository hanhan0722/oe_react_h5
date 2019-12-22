import React, { Component } from 'react'
import $ajax from '@/http'
import { getCountry, getCity, getLabel, timeFormat } from "@/assets/utils/public.js";
import { connect } from 'react-redux'
import { changeOtherInfo } from '@/redux/action'
import intl from 'react-intl-universal'
import './Details.scss'

class Details extends Component {
  state = {}
  componentDidMount() {
    const { otherInfo, host, userInfo, changeOtherInfo, match } = this.props;
    if (!otherInfo.id) {
      $ajax.post(`${host}user/getAnotherUserInfo`, {
        id: userInfo.id || null,
        uid: match.params.id
      }).then(data => {
        changeOtherInfo(data.user)
      })
    }
  }
  render() {
    const { match, otherInfo } = this.props;
    return (<div className="details">
      {match.params.type === 'base' ?
        // 基本资料
        <div>
          {/* 姓名 */}
          <p><span className="label">{intl.get('Details.title1')}</span>
            <span>{otherInfo.nickname || intl.get('UserDetail.title19')}</span></p>
          {/* 出生日期 */}
          <p><span className="label">{intl.get('Details.title2')}</span>
            <span>{otherInfo.birthday ? timeFormat(otherInfo.birthday) : intl.get('UserDetail.title19')}</span></p>
          {/* 身高 */}
          <p><span className="label">{intl.get('Details.title3')}</span>
            <span>{otherInfo.height ? otherInfo.height + "cm" : intl.get('UserDetail.title19')}</span></p>
          {/* 体重 */}
          <p><span className="label">{intl.get('Details.title4')}</span>
            <span>{otherInfo.weight ? otherInfo.weight + "kg" : intl.get('UserDetail.title19')}</span></p>
          {/* 年收入 */}
          <p><span className="label">{intl.get('Details.title5')}</span>
            <span>{otherInfo.income !== undefined ? getLabel(intl.get('UserDetail.incomeOption'), otherInfo.income) : intl.get('UserDetail.title19')}</span></p>
          {/* 工作生活在 */}
          <p><span className="label">{intl.get('Details.title6')}</span>
            <span>{otherInfo.workProvince ? getCountry(otherInfo.workProvince) + "-" + getCity(otherInfo.workProvince, otherInfo.workCity) : intl.get('UserDetail.title19')}</span></p>
          {/* 期望结婚时间 */}
          <p><span className="label">{intl.get('Details.title7')}</span>
            <span>{otherInfo.expectMarryTime !== undefined ? getLabel(intl.get('UserDetail.marryTimeOption'), otherInfo.expectMarryTime) : intl.get('UserDetail.title19')}</span></p>
          {/* 户籍（老家） */}
          <p><span className="label">{intl.get('Details.title8')}</span>
            <span>{otherInfo.province ? getCountry(otherInfo.province) + "-" + getCity(otherInfo.province, otherInfo.city) : intl.get('UserDetail.title19')}</span></p>
          {/* 职业 */}
          <p><span className="label">{intl.get('Details.title9')}</span>
            <span>{otherInfo.occupation || intl.get('UserDetail.title19')}</span></p>
          {/* 婚姻状况 */}
          <p><span className="label">{intl.get('Details.title10')}</span>
            <span>{otherInfo.marriageStatus !== undefined ? getLabel(intl.get('UserDetail.marriageOption'), otherInfo.marriageStatus) : intl.get('UserDetail.title19')}</span></p>
          {/* 信仰 */}
          <p><span className="label">{intl.get('Details.title11')}</span>
            <span>{otherInfo.faith !== undefined ? getLabel(intl.get('UserDetail.faithOption'), otherInfo.faith) : intl.get('UserDetail.title19')}</span></p>
          {/* 饮酒 */}
          <p><span className="label">{intl.get('Details.title12')}</span>
            <span>{otherInfo.alcohol !== undefined ? getLabel(intl.get('UserDetail.alcoholOption'), otherInfo.alcohol) : intl.get('UserDetail.title19')}</span></p>
          {/* 吸烟 */}
          <p><span className="label">{intl.get('Details.title13')}</span>
            <span>{otherInfo.smoke !== undefined ? getLabel(intl.get('UserDetail.smokeOption'), otherInfo.smoke) : intl.get('UserDetail.title19')}</span></p>
          {/* 有无子女 */}
          <p><span className="label">{intl.get('Details.title14')}</span>
            <span>{otherInfo.haveChildern !== undefined ? getLabel(intl.get('UserDetail.childOption'), otherInfo.haveChildern) : intl.get('UserDetail.title19')}</span></p>
        </div> :
        // 择偶标准
        <div>
          {/* 年龄 */}
          <p><span className="label">{intl.get('Details.title15')}</span>
            <span>{otherInfo.mateAgeStart ? `${otherInfo.mateAgeStart}-${otherInfo.mateAgeEnd}` : intl.get('UserDetail.title19')}</span></p>
          {/* 身高 */}
          <p><span className="label">{intl.get('Details.title3')}</span>
            <span>{otherInfo.mateHeightStart ? `${otherInfo.mateHeightStart}-${otherInfo.mateHeightEnd} cm` : intl.get('UserDetail.title19')}</span></p>
          {/* 体重 */}
          <p><span className="label">{intl.get('Details.title4')}</span>
            <span>{otherInfo.mateWeightStart ? `${otherInfo.mateWeightStart}-${otherInfo.mateWeightEnd} kg` : intl.get('UserDetail.title19')}</span></p>
          {/* 年收入 */}
          <p><span className="label">{intl.get('Details.title5')}</span>
            <span>{otherInfo.mateIncome !== undefined ? getLabel(intl.get('UserDetail.incomeOption'), otherInfo.mateIncome) : intl.get('UserDetail.title19')}</span></p>
          {/* 工作生活在 */}
          <p><span className="label">{intl.get('Details.title6')}</span>
            <span>{otherInfo.mateWorkProvince !== undefined ? getCountry(otherInfo.mateWorkProvince) + "-" + getCity(otherInfo.mateWorkProvince, otherInfo.mateWorkCity) : intl.get('UserDetail.title19')}</span></p>
          {/* 期望结婚时间 */}
          <p><span className="label">{intl.get('Details.title7')}</span>
            <span>{otherInfo.mateExpectMarryTime !== undefined ? getLabel(intl.get('UserDetail.marryTimeOption'), otherInfo.mateExpectMarryTime) : intl.get('UserDetail.title19')}</span></p>
          {/* 户籍（老家） */}
          <p><span className="label">{intl.get('Details.title8')}</span>
            <span>{otherInfo.mateProvince !== undefined ? getCountry(otherInfo.mateProvince) + "-" + getCity(otherInfo.mateProvince, otherInfo.mateCity) : intl.get('UserDetail.title19')}</span></p>
          {/* 婚姻状况 */}
          <p><span className="label">{intl.get('Details.title10')}</span>
            <span>{otherInfo.mateMarriageStatus !== undefined ? getLabel(intl.get('UserDetail.marriageOption'), otherInfo.mateMarriageStatus) : intl.get('UserDetail.title19')}</span></p>
          {/* 信仰 */}
          <p><span className="label">{intl.get('Details.title11')}</span>
            <span>{otherInfo.mateFaith !== undefined ? getLabel(intl.get('UserDetail.faithOption'), otherInfo.mateFaith) : intl.get('UserDetail.title19')}</span></p>
          {/* 饮酒 */}
          <p><span className="label">{intl.get('Details.title12')}</span>
            <span>{otherInfo.mateAlcohol !== undefined ? getLabel(intl.get('UserDetail.alcoholOption'), otherInfo.mateAlcohol) : intl.get('UserDetail.title19')}</span></p>
          {/* 吸烟 */}
          <p><span className="label">{intl.get('Details.title13')}</span>
            <span>{otherInfo.mateSmoke !== undefined ? getLabel(intl.get('UserDetail.smokeOption'), otherInfo.mateSmoke) : intl.get('UserDetail.title19')}</span></p>
          {/* 有无子女 */}
          <p><span className="label">{intl.get('Details.title14')}</span>
            <span>{otherInfo.mateHaveChildern !== undefined ? getLabel(intl.get('UserDetail.childOption'), otherInfo.mateHaveChildern) : intl.get('UserDetail.title19')}</span></p>
        </div>}
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
    changeOtherInfo: (data) => dispatch(changeOtherInfo(data))
  })
)(Details);