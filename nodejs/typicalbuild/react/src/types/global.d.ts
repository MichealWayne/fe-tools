/**
 * declare
 */
interface Window {
  userinfo: any;
  FundCharts: {
    line: any;
  };
  component: {
    $alert: any;
    $toast: any;
  };
  showKeyValuesResult: any;
  getUserid: any;
}

// 声明模块
declare module 'classnames';
declare module 'fundcharts';
declare module 'redux-logger';

/**
 * declare images | fonts | styles
 */
declare module '*.svg';
declare module '*.svgz';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module '*.eot';
declare module '*.ttf';
declare module '*.woff';
declare module '*.woff2';
declare module '*.less';
declare module '*.css';
