import { browser, os, thirdapp, Version } from 'amfe-env';

interface IENV {
  isWeimai: boolean;
  isEnze: boolean;
  isWenFuEr: boolean;
  isWeiXin: boolean;
  isWeiBo: boolean;
  isIOS: boolean;
  isIPhoneX: boolean;
  isIPad: boolean;
  isAndroid: boolean;
  isAndroidPad: boolean;
  isUC: boolean;
  isQQ: boolean;
  isIE: boolean;
  isIEMobile: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isSafari: boolean;
  isWebview: boolean;
  osName: string;
  osVersion: string;
  browserName: string;
  browserVersion: string;
  version: string;
  compare: (v1: string | Version, v2: string | Version) => 1 | 0 | -1;
  portalId: string;
}

const UA: string = window.navigator.userAgent;
const regVersion = /(WMDoctor|WMAPP|Micropulse|MicroMessenger)\/\d+(\.\d+)*/;
const matchUA: (reg: RegExp) => boolean = (reg) => !!UA.match(reg);
const toBool: (target: string | boolean | number | undefined | null) => boolean = (target) =>
  !!target;
let version = '';
const matchArr: string[] = UA.match(regVersion);
if (matchArr) {
  version = matchArr[0].split('/')[1];
}

//获取UA的门户ID
let portalId = '';// WEIMAI:1723694017453137921:10006:912000000064416448
const weiMaiPortal: string[] = UA.match(/x-weimai-portal\s(WEIMAI.+?)[\)|;]/);
if (weiMaiPortal) {
  portalId = weiMaiPortal[1] || '';
}
console.log('app环境：' + (portalId ? '多端' : '微脉医生'))

// 渠道判断
const matchChannel = (channeluid: string) =>
  matchUA(new RegExp(`x-channel-source\\s+${channeluid}`));

const ENV: IENV = {
  isWeimai: matchUA(/(WMAPP|Micropulse|WMDoctor)/i),
  isEnze: matchUA(/wmdoctor-enze/i),
  isWenFuEr: matchChannel('10028410110'), // 温附二HI医生
  isWeiXin: toBool(thirdapp.isWeixin) || matchUA(/MicroMessenger/i),
  isWeiBo: toBool(thirdapp.isWeiBo) || matchUA(/__weibo__/),
  isIOS: toBool(os.isIOS) || matchUA(/iphone os/),
  isIPhoneX: toBool(os.isIOS) || matchUA(/iphone\s*(X|11)/i),
  isIPad: toBool(os.isIPad) || matchUA(/ipad/),
  isAndroid: toBool(os.isAndroid) || matchUA(/android/),
  isAndroidPad: toBool(os.isAndroidPad),
  isUC: toBool(browser.isUC) || matchUA(/ucbrowser/),
  isQQ: toBool(browser.isQQ),
  isIE: toBool(browser.isIE),
  isIEMobile: toBool(browser.isIEMobile),
  isChrome: toBool(browser.isChrome) || matchUA(/chrome\/([\d.]+)/),
  isFirefox: toBool(browser.isFirefox),
  isSafari: toBool(browser.isSafari) || matchUA(/version\/([\d.]+).*safari/),
  isWebview: toBool(browser.isWebview),
  osName: os.name,
  osVersion: os.version.val,
  browserName: browser.name,
  browserVersion: browser.version.val,
  version,
  // v1>v2 => 1; v1<v2 => -1; v1===v2 => 0; // compare(version, '2.63.0') >= 0;
  compare: Version.compare,
  portalId,
};

export default ENV;
