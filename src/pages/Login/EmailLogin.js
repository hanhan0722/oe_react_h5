import React, { Component } from 'react'
import { Form, Input, Icon } from 'antd'
import { validEmail, validUpwd } from '@/assets/utils/valid'
import $ajax from '@/http'
import { connect } from 'react-redux'
import { changeUserInfo } from '@/redux/action'
import { AesEncrypt } from '@/http/secret'
import { Link } from 'react-router-dom';
import intl from 'react-intl-universal'
import './FindUpwd.scss'

class EmailLogin extends Component {
  state = {
    uname: "",
    upwd: ""
  }
  onSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (err) {
        return false;
      } else {
        $ajax.post(`${this.props.host}user/v3/login`, {
          userName: this.state.uname,
          password: this.state.upwd
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
          }).catch(err => {
            console.log(err)
          })
        })
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (<div className="find-upwd">
      <p className="title">{intl.get('EmailLogin.title1')}</p>
      <Form>
        {/* 邮箱 */}
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{
              validator: validEmail
            }],
            initialValue: this.state.phone
          })(<Input className="form-phone"
            placeholder={intl.get('EmailLogin.placeholder1')}
            allowClear
            onChange={e => this.setState({ uname: e.target.value })}>
          </Input>)
          }
        </Form.Item>
        {/* 密码 */}
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{
              validator: validUpwd
            }],
          })(
            <Input.Password
              placeholder={intl.get('EmailLogin.placeholder2')}
              allowClear
              onChange={e => this.setState({ upwd: e.target.value })}
            />,
          )}
        </Form.Item>
      </Form>
      {/* 登录/注册 */}
      <button className="btn-grad-pink" onClick={this.onSubmit}>{intl.get('EmailLogin.button1')}</button>
      {/* 忘记密码 */}
      <Link to="/find-upwd">
        <p className="font-primary">{intl.get('EmailLogin.button2')}</p>
      </Link>
      {/* 手机号登录 */}
      <Link to="/login">
        <button className="btn-default">
          <Icon type="mobile" />
          <span>{intl.get('EmailLogin.button3')}</span>
        </button>
      </Link>
    </div>);
  }
}

EmailLogin = Form.create({})(EmailLogin);
export default connect(
  state => ({
    host: state.main.host
  }),
  dispatch => ({
    changeUserInfo: userInfo => dispatch(changeUserInfo(userInfo))
  })
)(EmailLogin);