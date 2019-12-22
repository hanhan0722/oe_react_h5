import React, { Component } from 'react'
import { Form, Input, message } from 'antd'
import { validEmail, validUpwd } from '@/assets/utils/valid'
import { Link } from 'react-router-dom';
import $ajax from '@/http'
import { connect } from 'react-redux'
import intl from 'react-intl-universal'
import './FindUpwd.scss'

class FindUpwd extends Component {
  state = {
    uname: "",
    upwd: "",
    code: "",
    codeTime: 60,
    timer: null,
    canRequest: true
  }
  componentWillUnmount() {
    clearInterval(this.state.timer)
  }
  getCode = () => {
    if (this.state.canRequest) {
      this.setState({
        canRequest: false
      }, () => {
        $ajax.post(`${this.props.host}common/sendCode`, {
          code_type: 3,
          user_name: this.state.uname,
        }).then(data => {
          //发送验证码成功
          message.success(intl.get('FindUpwd.prompt3'));
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
            }, 1000),
            canRequest: true
          })
        })
      })
    }
  }
  onSubmit = () => {
    $ajax.post(`${this.props.host}user/findpw`, {
      user_name: this.state.uname,
      password: this.state.upwd,
      code: this.state.code,
    }).then(data => {
      //找回密码成功，请登录
      message.success(intl.get('FindUpwd.prompt2'));
      this.props.history.push('/email-login')
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="find-upwd">
        <p className="title">{intl.get('FindUpwd.title1')}</p>
        <Form>
          {/* 邮箱 */}
          <Form.Item>
            {getFieldDecorator('email', {
              rules: [{
                validator: validEmail
              }],
              initialValue: this.state.phone
            })(<Input
              className="form-phone"
              placeholder={intl.get('FindUpwd.placeholder1')}
              allowClear
              onChange={e => this.setState({ uname: e.target.value })}>
            </Input>)
            }
          </Form.Item>
          {/* 验证码 */}
          <Form.Item>
            {getFieldDecorator('code', {
              rules: [{ required: true, message: intl.get('FindUpwd.prompt1') }],
            })(
              <Input
                suffix={
                  this.state.codeTime < 60 ?
                    <span style={{ color: '#919191' }}>{this.state.codeTime}s</span>
                    : <span className="get-code" onClick={this.getCode}>{intl.get('FindUpwd.button1')}</span>
                }
                allowClear
                placeholder={intl.get('FindUpwd.placeholder2')}
                onChange={e => this.setState({ code: e.target.value })}
              />,
            )}
          </Form.Item>
          {/* 密码 */}
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{
                validator: validUpwd
              }],
            })(
              <Input.Password
                placeholder={intl.get('FindUpwd.placeholder3')}
                allowClear
                onChange={e => this.setState({ upwd: e.target.value })}
              />,
            )}
          </Form.Item>
        </Form>
        {/* 找回密码 */}
        <button className="btn-grad-pink" onClick={this.onSubmit}>{intl.get('FindUpwd.button2')}</button>
        {/* 返回登录 */}
        <Link to="/email-login">
          <p className="font-primary">{intl.get('FindUpwd.button3')}</p>
        </Link>
      </div>
    );
  }
}

FindUpwd = Form.create({})(FindUpwd);
export default connect(
  state => ({
    host: state.main.host
  })
)(FindUpwd);