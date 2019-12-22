let switches = function (state = {
  showDownLoad: false,
  showPay:false
}, action) {
  switch (action.type) {
    case 'CHANGE_SHOW_DOWN_LOAD':
      return {
        ...state,
        showDownLoad: action.showDownLoad
      };
    case 'CHANGE_SHOW_PAY':
      return {
        ...state,
        showPay: action.showPay
      };
    default:
      return state;
  }
}

export default switches;