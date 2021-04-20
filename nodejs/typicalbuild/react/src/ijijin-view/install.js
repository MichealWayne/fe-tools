import React from 'react'
import alert from './Alert/index' // 弹框
import toast from './Toast/index'
import './less/animation.less';

React.Component.prototype.$alert = alert;
React.Component.prototype.$toast = toast;

window.component = {
  $alert: alert,
  $toast: toast
};