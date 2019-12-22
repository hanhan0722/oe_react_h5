import React from 'react'
import { Link } from 'react-router-dom';
export default {
  Index: {
    title1: <span>找<b>外国人</b>谈恋爱</span>,
    title2: <span>上<b>欧亿婚恋</b></span>,
    title3: '全球百万+优质海外用户随意撩～',
    title4: '人工视频认证',
    title5: '真实展示自己，拒绝任何虚假信息',
    title6: '实时翻译系统',
    title7: '跨越语言障碍，随意聊～',
    title8: '精准的匹配系统',
    title9: '为您快速找到合适的TA',
    title10:'注册遇到问题，请拨打技术服务热线：',
    button1: '寻找我的缘分',
    button2: '充值缴费',
    button3: 'Down Load APP',
  },
  DownLoad: {
    title: '现在下载APP',
    button: '立即下载'
  },
  UserList: {
    tab1: '推荐',
    tab2: '充值',
    unit: '',
    message1: '表达对她的爱意',
    message2: '和Ta开启聊天',
    message3: '给Ta写一封信',
    prompt: '啊哦，没有更多数据了',
    button: 'Sign up/Login'
  },
  UserDetail: {
    title1: '身份已认证',
    title2: '身份未认证',
    title3: '视频已认证',
    title4: '视频未认证',
    title5: '学历已认证',
    title6: '学历未认证',
    title7: '尚未填写个性签名',
    title8: '基本资料',
    title9: '择偶标准',
    title10: 'Age:',
    title11: 'Height:',
    title12: 'Annual Income:',
    title13: 'Would like to marry in:',
    title14: 'What my friends think of me',
    title15: 'What my family thinks of me',
    title16: 'My most memorable moment',
    title17: 'My favorite thing to do',
    title18: 'My ideal partner is...',
    title19: '?',
    button1: '给Ta写信',
    incomeOption: [
      { label: "< $15,000", value: 0 },
      { label: "$15,000 - $30,000", value: 1 },
      { label: "$30,000 - $45,000", value: 2 },
      { label: "$45,000 - $60,000", value: 3 },
      { label: "$60,000 - $75,000", value: 4 },
      { label: "$75,000 - $150,000", value: 5 },
      { label: "$150,000 + ", value: 6 }
    ],
    marriageOption: [
      { label: "Single", value: 0 },
      { label: "Divorced", value: 1 },
      { label: "Widowed", value: 2 }
    ],
    marryTimeOption: [
      { label: "half a year", value: 1 },
      { label: "one year", value: 2 },
      { label: "two years", value: 3 }
    ],
    faithOption: [
      { label: "Non-religious", value: 0 },
      { label: "Marxism", value: 1 },
      { label: "Christianity", value: 2 },
      { label: "Buddhism", value: 3 },
      { label: "Taoism", value: 4 },
      { label: "Islam", value: 5 },
      { label: "Other", value: 6 }
    ],
    alcoholOption: [
      { label: "Never", value: 0 },
      { label: "Occasionally", value: 1 },
      { label: "Socially", value: 2 },
      { label: "Frequently", value: 3 }
    ],
    smokeOption: [
      { label: "Never", value: 0 },
      { label: "Occasionally", value: 1 },
      { label: "Socially", value: 2 },
      { label: "Frequently", value: 3 }
    ],
    childOption: [{ label: "Yes", value: 0 }, { label: "No", value: 1 }]
  },
  Details: {
    title1: 'First name:',
    title2: 'Birthday:',
    title3: 'Height:',
    title4: 'Weight:',
    title5: 'Annual Income:',
    title6: 'Location:',
    title7: 'Would like to marry in:',
    title8: 'Citizen of:',
    title9: 'Occupation:',
    title10: 'Marital status:',
    title11: 'Faith:',
    title12: 'Do you drink?',
    title13: 'Do you smoke?',
    title14: 'Children:',
    title15: 'Age:',
  },
  VIP: {
    banner1: '无限畅聊 拉近心灵的距离',
    banner2: '解锁搜索 定位你想寻找的人',
    banner3: '来访记录 你心动的人就在其中',
    banner4: '已读提醒 不错过每个可能',
    banner5: '比普通用户增加8倍以上的曝光机会',
    banner6: 'VIP用户信息优先审核特权',
    button: '马上开通',
    unit: 'Month'
  },
  Identify: {
    title: '认证费：',
    button: '立即认证'
  },
  Pay: {
    title1: 'Please select your payment method',
    title2: 'Alipay',
    title3: 'Wechat Pay',
    title4: 'Payment verification',
    title5: 'After the purchase is successful, please click "Successful".',
    title6: 'If the purchase fails, please click "Failed".',
    button1: 'Failed',
    button2: 'Successful',
    prompt: 'Successful payment'
  },
  Login: {
    title1: 'Please input your phone number',
    title2: <span>当您点击下一步，表示您已阅读并同意欧亿婚恋的<Link to="/">用户协议</Link>及<Link to="/">隐私政策</Link></span>,
    title3: '请输入发送到以下手机的验证码',
    placeholder1: 'Phone number',
    button1: 'Next',
    button2: 'Resend',
    prompt1: 'Please agree to the terms of Service agreement and Privacy Policy',
    prompt2: 'Country code  is required',
    valid1: 'Please type your phone number',
    valid2: 'Phone number incorrect',
    valid3: 'Please input your email address',
    valid4: 'Email address incorrect',
    valid5: 'Please input your password',
    valid6: 'Please input your password (6 - 20 characters)',
    valid7: 'Your name should be less than 40 characters'
  },
  Register: {
    title1: '创建您的真实档案',
    title2: '开始您的寻爱之旅',
    title3: 'male',
    title4: 'famale',
    placeholder1: 'Location',
    placeholder2: 'First Name',
    placeholder3: 'Birthday',
    button: 'Next',
    prompt1: '地区不能为空',
    prompt2: '生日不能为空'
  },
  EmailLogin: {
    title1: 'Enter your Email Address',
    placeholder1: 'Email Address',
    placeholder2: 'Password',
    button1: 'Sign up/Login',
    button2: 'Forgot Password?',
    button3: 'Sign up/Login with Mobile',
    button4: 'Sign up/Login with email'
  },
  FindUpwd: {
    title1: 'Reset Password',
    placeholder1: 'Email Address',
    placeholder2: 'Verification code',
    placeholder3: 'Password',
    prompt1: 'Please input verification code',
    prompt2: '找回密码成功，请登录',
    prompt3: '发送验证码成功',
    button1: 'Get Code',
    button2: 'Confirm',
    button3: 'Back To Login'
  }
}