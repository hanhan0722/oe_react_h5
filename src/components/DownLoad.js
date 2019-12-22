import React, { Component } from 'react'
import './DownLoad.scss'
import { connect } from 'react-redux'
import { changeShowDownLoad } from '@/redux/action'
import intl from 'react-intl-universal'

class DownLoad extends Component {
  state = {}
  componentDidMount() { }
  onDownLoad = () => {
    window.location.href = "https://go.onelink.me/Olq9/TrueLove";
  }
  render() {
    const { showDownLoad, hideDownLoad, message } = this.props;
    return (<div className="down-load">
      {showDownLoad && (<div className="shadow-fixed">
        <div>
          <img className="modal-close" onClick={hideDownLoad} src={require('@/assets/img/components/close.png')} alt="" />
          <div className="line"></div>
          <div className="modal">
            <img src={require('@/assets/img/components/oe.png')} alt="" />
            <p className="main-title">{intl.get('DownLoad.title')}</p>
            <p>{message}</p>
            {/* 立即下载 */}
            <button className="btn-grad-pink" onClick={this.onDownLoad}>{intl.get('DownLoad.button')}</button>
          </div>
        </div>
      </div>)}
    </div>);
  }
}

export default connect(
  state => ({
    showDownLoad: state.switches.showDownLoad
  }),
  dispatch => ({
    hideDownLoad: () => dispatch(changeShowDownLoad(false))
  })
)(DownLoad);