import { makeAutoObservable } from 'mobx'
import {Toast} from "antd-mobile"
import {v4} from 'uuid'
import Api from './Api'
import xbox from './images/xbox.png'
class Store {
    visible = false
    constructor() {
        makeAutoObservable(this)
    }

    images = [
        xbox,xbox,xbox,xbox,xbox,xbox,xbox,xbox,xbox,xbox
    ]
    isSupport = true
    getBlindBoxConfig = async () => {
        const {data} = await Api.getBlindBoxConfig(this.search)
        window.document.title = data?.title || ''
        this.isSupport = data.isSupport !== 0
        console.log('getBlindBoxConfig:', data)
    }

    showSurprise = false
    onCloseSurprise = () => {
        this.showSurprise = false
    }

    priceList = [{}, {}, {}, {}, {}, {}]
    surpriseCode = ''
    onSubmit = async () => {
        const {data, code, message} = await Api.redeemCode({
            ...this.userInfo,
            ...this.search,
            surpriseCode: this.surpriseCode,
            userId: '111'
        })
        if (code !== 200) {
            // 未登陆的情况
            if (code === 1009) {
                return this.handleUnLogin()
            }
            return Toast.info(message || '未知异常', 2)
        }
        console.log(data)
        this.showSurprise = true
        // Toast.info('Your code is not recognized', 2)
    }

    barrageList = []
    // 获取弹幕信息
    getBarrage = async () => {
        const {data} = await Api.queryRegionSurpriseList(this.search)
        this.barrageList = (data || []).map(item => ({ id: v4(), content: `${item.userName}  ${item.prizeName} * ${item.totalNumber || 1}` }))
    }

    recordList = []
    // 获取兑换记录
    getRecordList = async () => {
        const {data, code, message} = await Api.queryUserSurpriseList({...this.userInfo, ...this.search, userId: '111'})
        if (code !== 200) {
            // 未登陆的情况
            if (code === 1009) {
                return this.handleUnLogin()
            }
            return Toast.info(message || '未知异常', 2)
        }
        this.recordList = (data || [])
    }

    search = {}
    setSearch = (search) => {
        this.search = search
    }

    onChangeCode = (e) => {
        this.surpriseCode = e.target.value
    }

    userInfo = {}
    initUserInfo = () => {
        window.getUserInfo = (res) => {
            console.log(res)
            this.userInfo = res
        }
    }

    handleUnLogin = () => {
        // 在app内的情况，调用原生交互跳原生登陆页面
        if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.toLogin) {
            window.webkit.messageHandlers.toLogin.postMessage('toLogin')
        } else {
            this.toAppOrDownload()
        }
    }

    // 跳转app/下载页
    toAppOrDownload = () => {
        if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
            var loadDateTime = new Date();
            window.location = "chicpoint://";//schema链接或者universal link
            window.setTimeout(function() { //如果没有安装app,便会执行setTimeout跳转下载页
                var timeOutDateTime = new Date();
                if (timeOutDateTime - loadDateTime < 5000) {
                    window.$history.push('/download')
                } else {
                    window.close();
                }
            }, 500);

        } else if (navigator.userAgent.match(/android/i)) {
            var state = null;
            try {
                window.location = 'chicpoint://'; // schema链接或者universal link
                window.setTimeout(function() {
                    window.$history.push('/download')
                }, 500);
            } catch (e) {}
        }
    }
}

export default new Store()
