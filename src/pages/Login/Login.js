import React, { Component } from 'react'
import { Form, Input, Checkbox, Icon, message } from 'antd'
import { Picker } from 'antd-mobile';
import './Login.scss'
import { validPhone } from '@/assets/utils/valid'
import $ajax from '@/http'
import { AesEncrypt } from '@/http/secret'
import { connect } from 'react-redux'
import { changeUserInfo } from '@/redux/action'
import intl from 'react-intl-universal'
import phoneCode from '@/assets/lang/phone_code'
import { Link } from 'react-router-dom';
const InputGroup = Input.Group;

class Login extends Component {

  state = {
    checked: true,
    step: 1,
    phone: "",
    codeTime: 60,
    countryCode: 86,
    code: "",
    allowSend: true,
    timer: null
  }

  onCheckChange = e => {
    this.setState({
      checked: e.target.checked
    })
  }
  onPhoneChange = e => {
    this.setState({
      phone: e.target.value
    })
  }
  onSelectChange = value => {
    this.setState({
      countryCode: value[0]
    })
  }
  onCodeChange = e => {
    this.setState({
      code: e.target.value
    })
  }
  sendCode = (cb) => {
    const { phone, countryCode } = this.state;
    this.props.form.validateFields((err, values) => {
      if (err) {
        return false;
      } else if (this.state.allowSend && this.state.checked) {
        this.setState({
          allowSend: false
        })
        $ajax.post(`${this.props.host}common/sendCode`, {
          code_type: 5,
          user_name: phone,
          countryCode: countryCode
        }).then(data => {
          message.success(intl.get('FindUpwd.prompt3'));
          console.log(data)
          typeof (cb) === 'function' && cb()
        })
        this.setState({
          allowSend: true
        })
      }
    });
  }
  goNext = () => {
    this.sendCode(() => {
      this.setState({
        step: 2,
        timer: setInterval(() => {
          if (this.state.codeTime > 1) {
            let num = this.state.codeTime
            this.setState({
              codeTime: --num
            })
          } else {
            clearInterval(this.state.timer)
            this.setState({
              codeTime: 60
            })
          }
        }, 1000)
      })
    })
  }
  reSend = () => {
    this.sendCode(() => {
      this.setState({
        timer: setInterval(() => {
          if (this.state.codeTime > 1) {
            let num = this.state.codeTime
            this.setState({
              codeTime: --num
            })
          } else {
            clearInterval(this.state.timer)
            this.setState({
              codeTime: 60
            })
          }
        }, 1000)
      })
    })
  }
  onLogin = () => {
    $ajax.post(`${this.props.host}user/doLogin`, {
      mobile: this.state.phone,
      code: this.state.code,
      countryCode: this.state.countryCode
    }).then(data => {
      console.log(data)
      new Promise((resolve, reject) => {
        data.user.token = data.token;
        sessionStorage.setItem('user', AesEncrypt(JSON.stringify(data.user)));
        this.props.changeUserInfo(data.user);
        resolve(data)
      }).then(data => {
        if (data.isLogin)
          this.props.history.push("/user/0")
        else  //新用户
          this.props.history.push("/register")
      })
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const lang = localStorage.getItem('lang') || navigator.language.split('-')[0];
    let codeOptions = [];
    phoneCode.forEach((item, index) => {
      let option = {
        value: item.code,
        label: item[lang] + " +" + item.code
      }
      codeOptions.push(option)
    })
    return (
      <div className="login">
        {this.state.step === 1 ? (<div>
          {/* 请填写您的手机号码 */}
          <p className="login-title">{intl.get('Login.title1')}</p>
          <Form.Item>
            <InputGroup compact>
              <div style={{ display: 'inline-block', width: '30%' }}>
                <Picker data={codeOptions} cols={1} onChange={e => this.onSelectChange(e)} title={intl.get('Login.prompt2')}
                >
                  <span className="country-code">{"+" + this.state.countryCode}</span>
                </Picker>
              </div>
              {getFieldDecorator('phone', {
                rules: [{
                  required: true, message: intl.get('Login.placeholder1')
                }, {
                  validator: validPhone
                }],
                initialValue: this.state.phone
              })(<Input className="form-phone" placeholder={intl.get('Login.placeholder1')} allowClear onChange={e => this.onPhoneChange(e)}></Input>)
              }
            </InputGroup>
          </Form.Item>
          {/* 下一步 */}
          <button className="btn-grad-pink" onClick={this.goNext}>{intl.get('Login.button1')}</button>
          <Checkbox onChange={e => this.onCheckChange(e)} checked={this.state.checked}>{intl.get('Login.title2')}</Checkbox>
          {this.state.checked || <p className="prompt-error">{intl.get('Login.prompt1')}</p>}
          {lang === 'en' && <Link to="/email-login">
            <button className="btn-default">
              <Icon type="mail" />
              <span>{intl.get('EmailLogin.button4')}</span>
            </button>
          </Link>}
        </div>) :
          (<div>
            {/* 请输入发送到以下手机的验证码 */}
            <p className="login-title">{intl.get('Login.title3')}</p>
            <p className="phone-number">{"+" + this.state.countryCode + this.state.phone}</p>
            <div className="login-code">
              <ul className="square-list">
                <li>{this.state.code[0]}</li>
                <li>{this.state.code[1]}</li>
                <li>{this.state.code[2]}</li>
                <li>{this.state.code[3]}</li>
              </ul>
              <input type="tel" id="code" maxLength="4" value={this.state.code} onChange={e => this.onCodeChange(e)} />
            </div>
            {/* 下一步 */}
            <button className="btn-grad-pink" onClick={this.onLogin}>{intl.get('Login.button1')}</button>
            {/* 重新发送 */}
            {
              this.state.codeTime === 60 ?
                <p className="resend-code" onClick={this.reSend}>{intl.get('Login.button2')}({this.state.codeTime}s)</p> :
                <p className="resend-code" style={{ color: '#919191' }}>{intl.get('Login.button2')}({this.state.codeTime}s)</p>
            }
          </div>)
        }
      </div>
    );
  }
}
Login = Form.create({})(Login);
export default connect(
  state => ({
    host: state.main.host
  }),
  dispatch => ({
    changeUserInfo: userInfo => dispatch(changeUserInfo(userInfo))
  })
)(Login);