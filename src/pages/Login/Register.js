import React, { Component } from 'react'
import { Form, Input } from 'antd'
import { DatePicker, Picker } from 'antd-mobile';
import { connect } from 'react-redux'
import intl from 'react-intl-universal'
import country_en from '@/assets/lang/en_country'
import country_zh from '@/assets/lang/zh_country'
import { getCountry, getCity, timeFormat, computeLength } from "@/assets/utils/public.js";
import $ajax from '@/http'
import { AesEncrypt } from '@/http/secret'
import { changeUserInfo } from '@/redux/action'
import './Register.scss'

class Register extends Component {
  state = {
    gender: 0,
    area: [],
    uname: "",
    birthday: "",
    showError: false
  }
  onRegister = () => {
    console.log(this.state)
    this.props.form.validateFields((err, values) => {
      if (err || this.state.area.length === 0 || this.birthday === "") {
        this.setState({
          showError: true
        })
        return false;
      } else {
        $ajax.post(`${this.props.host}user/updateUserDetail`, {
          id: this.props.userInfo.id,
          token: this.props.userInfo.token,
          nickname: this.state.uname,
          birthday: new Date(this.state.birthday).getTime(),
          work_province: this.state.area[0],
          work_city: this.state.area[1]
        }).then(data => {
          data.user.token = data.token;
          sessionStorage.setItem('user', AesEncrypt(JSON.stringify(data.user)));
          this.props.changeUserInfo(data.user);
          this.props.history.push("/user/0")
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const lang = localStorage.getItem('lang') || navigator.language.split('-')[0];
    let country = lang === 'en' ? country_en : country_zh;
    let countryOptions = [];
    country.forEach(item => {
      let obj = {
        label: item["-Name"],
        value: item["-Code"],
        children: []
      }
      if (item.State) {
        item.State.forEach(elem => {
          obj.children.push({
            label: elem["-Name"],
            value: elem["-Code"]
          });
        });
        //只有城市的国家
      } else if (item.StateOnly) {
        item.StateOnly.City.forEach(elem => {
          obj.children.push({
            label: elem["-Name"],
            value: elem["-Code"]
          });
        });
      } else {
        //没有省也没有城市的国家
        obj.children.push({
          label: item["-Name"],
          value: item["-Code"]
        });
      }
      countryOptions.push(obj)
    })
    const validName = function (rule, value, callback) {
      if (computeLength(value) > 20) {
        callback(intl.get('Login.valid7'))
      } else {
        callback()
      }
    }
    return (
      <div className="register" >
        <div className="register-title">
          <p><b>{intl.get('Register.title1')}</b></p>
          <p>{intl.get('Register.title2')}</p>
        </div>
        <Form>
          {/* 地区 */}
          <Form.Item>
            <Picker
              title={intl.get('Register.placeholder1')}
              data={countryOptions}
              cascade={true}
              onChange={val => this.setState({ area: val })}
            >
              <p className="work-place" style={{ padding: '4px 30px 4px 11px', borderColor: this.state.showError && this.state.area.length === 0 ? '#f5222d' : '#d9d9d9' }}>
                {
                  this.state.area.length === 0 ?
                    <span className="placeholder"> {intl.get('Register.placeholder1')} </span> :
                    <span>{getCountry(this.state.area[0]) + "," + getCity(this.state.area[0], this.state.area[1])}</span>
                }
              </p>
            </Picker>
            {this.state.showError && this.state.area.length === 0 && <p className="ant-form-explain error">{intl.get('Register.prompt1')}</p>}
          </Form.Item>
          {/* 昵称 */}
          <Form.Item>
            {getFieldDecorator('nickName', {
              rules: [{ required: true, message: intl.get('Register.placeholder2') }, {
                validator: validName
              }],
            })(
              <Input
                placeholder={intl.get('Register.placeholder2')}
                onChange={e => this.setState({ uname: e.target.value })}
                allowClear
                maxLength={40}
              />,
            )}
          </Form.Item>
          {/* 生日 */}
          <Form.Item>
            <DatePicker
              mode="date"
              title={intl.get('Register.placeholder3')}
              value={this.state.birthday}
              onChange={val => this.setState({ birthday: val })}
              minDate={new Date(new Date().getFullYear()-100,0,1)}
              maxDate={new Date(new Date().getFullYear()-18,0,1)}
            >
              <p className="birth-date" style={{ padding: '4px 30px 4px 11px', borderColor: this.state.showError && this.state.birthday === '' ? '#f5222d' : '#d9d9d9' }}>
                {
                  this.state.birthday ?
                    <span>{timeFormat(this.state.birthday)}</span> :
                    <span className="placeholder"> {intl.get('Register.placeholder3')} </span>
                }
              </p>
            </DatePicker>
            {this.state.showError && this.state.birthday === "" && <p className="ant-form-explain error">{intl.get('Register.prompt2')}</p>}
          </Form.Item>
        </Form>
        {/* 性别 */}
        <div className="image-gender" >
          {/* 男 */}
          < div className={this.state.gender === 1 ? 'gender-active' : ''} onClick={e => this.setState({ gender: 1 })} >
            {
              this.state.gender === 1 ?
                <img src={require('@/assets/img/login/male_active.png')} alt="" /> :
                <img src={require('@/assets/img/login/male.png')} alt="" />
            }
            < span > {intl.get('Register.title3')}</span>
          </div >
          {/* 女 */}
          < div className={this.state.gender === 0 ? 'gender-active' : ''} onClick={e => this.setState({ gender: 0 })} >
            {
              this.state.gender === 0 ?
                <img src={require('@/assets/img/login/famale_active.png')} alt="" /> :
                <img src={require('@/assets/img/login/famale.png')} alt="" />
            }
            < span > {intl.get('Register.title4')}</span >
          </div >
        </div >
        {/* 下一步 */}
        < button className="btn-grad-pink" onClick={this.onRegister} > {intl.get('Register.button')}</button >
      </div >
    );
  }
}

Register = Form.create({})(Register);
export default connect(
  state => ({
    host: state.main.host,
    userInfo: state.main.userInfo,
  }), dispatch => ({
    changeUserInfo: userInfo => dispatch(changeUserInfo(userInfo))
  })
)(Register);