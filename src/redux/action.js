//改变下载弹窗的显示状态
export const changeShowDownLoad = showDownLoad => {
  return {
    type: 'CHANGE_SHOW_DOWN_LOAD',
    showDownLoad
  }
}
//改变支付方式弹窗的显示状态
export const changeShowPay = showPay => {
  return {
    type: 'CHANGE_SHOW_PAY',
    showPay
  }
}
//改变loading
export const changeLoading = loading => {
  return {
    type: 'CHANGE_LOADING',
    loading
  }
}
//改变用户详情的更多资料
export const changeOtherInfo = otherInfo => {
  return {
    type: 'CHANGE_OTHER_INFO',
    otherInfo
  }
}
//改变当前用户资料
export const changeUserInfo = userInfo => {
  return {
    type: 'CHANGE_USER_INFO',
    userInfo
  }
}
//改变购买商品
export const changeCommodity = commodity => {
  return {
    type: 'CHANGE_COMMODITY',
    commodity
  }
}