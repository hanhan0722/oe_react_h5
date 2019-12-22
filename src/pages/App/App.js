import React, { Component } from 'react';
import MyRouter from '@/router';
import { connect } from 'react-redux'
import { changeUserInfo } from '@/redux/action'
import { Decrypt } from '@/http/secret'
import { Spin } from "antd";
import PureRenderMixin from 'react-addons-pure-render-mixin';
import '@/assets/style/icon.scss'

class App extends Component {
  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    localStorage.getItem('lang') || localStorage.setItem('lang', navigator.language.split('-')[0])
  }
  componentDidMount() {
    sessionStorage.getItem('user') && this.props.changeUserInfo(JSON.parse(Decrypt(sessionStorage.getItem('user'))))
  }
  render() {
    return (
      <div className="App" style={{maxWidth:'640px',margin:'0 auto'}}>
        <MyRouter></MyRouter>
        {
          this.props.loading && (<div className="shadow-fixed">
            <Spin tip="Loading..." size="large"></Spin>
          </div>)
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    loading: state.main.loading,
  }),
  dispatch => ({
    changeUserInfo: userInfo => dispatch(changeUserInfo(userInfo))
  })
)(App);
