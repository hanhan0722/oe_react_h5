import { combineReducers, applyMiddleware, createStore } from 'redux'
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import switches from './reducer'

let main = function (state = {
  host: "http://testapi.ouidating.com/web/",
  userInfo: {},
  otherInfo: {},     //用户详情里的更多资料
  loading: false,
  commodity: {}
}, action) {
  switch (action.type) {
    case 'CHANGE_LOADING':
      return {
        ...state,
        loading: action.loading
      };
    case 'CHANGE_OTHER_INFO':
      return {
        ...state,
        otherInfo: action.otherInfo
      }
    case 'CHANGE_USER_INFO':
      return {
        ...state,
        userInfo: action.userInfo
      }
    case 'CHANGE_COMMODITY':
      return {
        ...state,
        commodity: action.commodity
      }
    default:
      return state;
  }
}

let rootReducer = combineReducers({ main, switches })
const store = createStore(rootReducer, applyMiddleware(logger, thunk))

export default store;