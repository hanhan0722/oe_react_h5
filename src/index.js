import React from 'react'
import ReactDOM from 'react-dom'
import App from '@/pages/App/App'
import * as serviceWorker from '@/assets/utils/serviceWorker'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import intl from 'react-intl-universal'
import zh from '@/assets/lang/zh'
import en from '@/assets/lang/en'
import "lib-flexible"
import '@/assets/style/base.css'

intl.init({
  currentLocale: localStorage.getItem('lang') || navigator.language.split('-')[0], locales: {
    'zh': zh,
    'en': en
  }
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
