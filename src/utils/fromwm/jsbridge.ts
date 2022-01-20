import isPlainObject from 'lodash/isPlainObject';
// import ENV from './env';

const { isWeimai, version } = {isWeimai: true, version: '1.0.0'};

class Bridge {
  private readyPromise: Promise<any>;

  constructor() {
    if (isWeimai) {
      this.readyPromise = this.ready();
    }
  }

  // 处理返回数据
  public async exec(name, params): Promise<any> {
    if (!isWeimai) {
      return console.error('交互调用失败，请使用 WeiMai App 容器打开页面');
    }

    await this.readyPromise;

    // 计时开始
    const before = performance.now();
    const command = isPlainObject(params) ? params.command : '';
    const directive = [name, command].join(':');
    return new Promise((resolve) => {
      window.WebViewJavascriptBridge.callHandler(
        name,
        params,
        (response) => {
          if (typeof response === 'string') {
            response = JSON.parse(response);
          }

          resolve(response);
        },
        (fail) => {
          Promise.reject(`调用 WeiMai App jsbridge: ${directive} 命令错误`);
        }
      );
    });
  }

  /**
   * comand交互
   * @params { command: string, value: object }
   */
  public async command(params?) {
    return this.exec('h5Command', params);
  }

  /**
   * 注册交互
   *
   */
  public async registerHandler(...props) {
    if (!isWeimai) {
      return console.error('交互注入失败，请使用 WeiMai App 容器打开页面');
    }
    await this.readyPromise;
    return window.WebViewJavascriptBridge.registerHandler(...props);
  }

  /**
   * 获取授权AreaNo 地区编号
   */
  public async getSessionId() {
    const res = await this.getDoctorInfo({});

    return res.sessionId;
  }

  // ’获取医生信息‘
  public async getDoctorInfo(option) {
    if (!option) {
      console.error('The share option cant`t empty!');
    }
    return this.command({
      webFunc: {
        getDoctorInfo: option,
      },
    });
  }

  // ’校验sessionId 失效后跳登录‘
  public async checkSessionId() {
    return this.command({
      webSettings: {
        sessionInvalidCallback: 'true',
      },
    });
  }

  public closeWebView() {
    return this.command({
      webSettings: {
        closeWebView: 'true',
      },
    });
  }

  private setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback();
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    const WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe);
    }, 0);
  }

  private ready() {
    return new Promise((resolve) => {
      // 设置超时阀值
      const timer = setTimeout(() => {
        Promise.reject('JSBridge注入失败');
      }, 5e3);
      // 计时开始
      const before = performance.now();
      // WebViewJavascriptBridge 初始化任务
      const init = () => {
        clearTimeout(timer);
        if (window.WebViewJavascriptBridge.init) {
          window.WebViewJavascriptBridge.init();
        }
        resolve(true);
      };
      if (window.WebViewJavascriptBridge) {
        init();
      } else {
        this.setupWebViewJavascriptBridge(() => {
          window.WebViewJavascriptBridge.init = () => {
            console.log(1);
          };
          window.WebViewJavascriptBridge.inited = true;
          init();
        });
        document.addEventListener('WebViewJavascriptBridgeReady', init, false);
      }
    });
  }
}

export default new Bridge();
