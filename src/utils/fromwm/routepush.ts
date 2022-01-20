import qs from 'qs';
import ENV from './env';
import { lanuchWindow } from './h5Command';

const { isWeimai } = ENV;

interface Params {
  [key: string]: string | number | undefined;
}

export default {
  /**
   * @method 页面跳转方法
   * @param link 短link 无origin
   * @param params 参数
   * @param openWebView 是否新开webview
   */
  push(options: { link: string; params?: Params; openWebView?: boolean }) {
    const { link, openWebView = false } = options || {};
    if (!link) {
      console.error('link不能为空');
      return;
    }

    const url = this.parseLink({ ...options, link });
    // 新开webview
    if (isWeimai && openWebView && !/wmdoctor:\/\//.test(url)) {
      lanuchWindow({
        actionType: 'open',
        url,
      });
      return;
    }
    window.location.href = url;
  },

  /**
   * @method 组装url
   * @param link 短link 无origin 无参数
   * @param params 参数
   */
  parseLink(options: { link: string; params?: Params }) {
    const { link, params } = options || {};
    const origin = /(https?)|(wmdoctor):\/\//.test(link) ? link : window.location.origin + link;
    const queryStr = qs.stringify(params);
    const connector = origin.includes('?') ? '&' : '?';
    return `${origin}${queryStr ? `${connector}${queryStr}` : ''}`;
  },

  /**
   * @method 页面替换
   * @param link 短link 无origin 无参数
   * @param params 参数
   */
  replace(options: { link: string; params?: Params }) {
    const { link } = options || {};
    if (!link) {
      return console.error('link不能为空');
    }
    const url = this.parseLink(options);
    return window.location.replace(url);
  },

  back(delta?: number, refreshParent?: 0 | 1) {
    if (window.history.length === 1 && isWeimai) {
      return lanuchWindow({
        actionType: 'closeSelf',
        refreshParent,
      });
    }
    return window.history.go(delta === undefined ? -1 : delta);
  },
};
