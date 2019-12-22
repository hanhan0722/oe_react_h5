import React, { Component } from 'react'
import intl from 'react-intl-universal'
import './Footer.scss'

class OeFooter extends Component {
  state = {}
  render() {
    return (
      <div className="oe-footer">
        <div className="content-top">
          <img className="footer-logo" src={require(`@/assets/img/components/black_logo.png`)} alt="" />
          <div>Copyright ©2005~2013 ouimeet.com Inc.All rights reserved . <br />版权所有:北京欧亿文化交流有限公司 <br />ICP备案：京ICP备05037432号</div>
        </div>
        <div className="content-bottom">
          <p>{intl.get('Index.title10')}</p>
          <p> 010-68056701 (9:30-18:00）</p>
        </div>
      </div>
    );
  }
}

export default OeFooter;