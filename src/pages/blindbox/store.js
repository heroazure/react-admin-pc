import {makeAutoObservable, toJS} from 'mobx'
import {Toast, Modal} from "antd-mobile"
import {v4} from 'uuid'
import Api from './Api'
class Store {
    visible = false
    constructor() {
        makeAutoObservable(this)
    }

    surpriseList = []
    isSupport = true
    descImg = ''
    headImg = ''
    remindTitle = ''
    getBlindBoxConfig = async () => {
        const {data} = await Api.getBlindBoxConfig(this.getParams())
        window.document.title = data?.title || ''
        this.isSupport = data.isSupport !== 0
        this.surpriseList = data.surpriseList || []
        this.descImg = data.imageUrl
        this.headImg = data.headImg
        this.remindTitle = data.remindTitle
    }

    showSurprise = false
    onCloseSurprise = () => {
        this.showSurprise = false
    }

    toDownload = () => {
        const isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        window.location.href = isIos ? 'http://itunes.apple.com/us/app/id1525111750?mt=8' : 'http://play.google.com/store/apps/details?id=com.chic.point'
    }

    surpriseCode = ''
    surpriseResult = {}
    onSubmit = async () => {
        const params = {
            ...this.getParams(),
            surpriseCode: this.surpriseCode
        }
        if (!params.token) {
            return this.handleUnLogin()
        }
        const {data, code, message} = await Api.redeemCode(params)
        if (code !== 200) {
            // 未登陆的情况
            if (code === 1009) {
                return this.handleUnLogin()
            }
            // 需要下载新版本
            if (code === 1) {
                return Modal.alert('', message || 'Please update app', [
                    { text: 'Cancel', onPress: () => console.log('cancel') },
                    {
                        text: 'Ok',
                        onPress: () => {
                            this.toDownload()
                        }
                    },
                ])
            }
            return Toast.info(message || '未知异常', 2)
        }
        this.showSurprise = true
        this.surpriseResult = data
        // Toast.info('Your code is not recognized', 2)
    }

    barrageList = []
    // 获取弹幕信息
    getBarrage = async () => {
        const {data} = await Api.queryRegionSurpriseList(this.getParams())
        this.barrageList = (data || []).map(item => ({ id: v4(), content: `${item.userName}  ${item.prizeName} * ${item.totalNumber || 1}` }))
    }

    getParams = () => {
        const obj = {
            ...this.userInfo
        }
        if (this.search.countryId) obj.countryId = this.search.countryId
        if (this.search.languageId) obj.languageId = this.search.languageId
        return obj
    }

    recordList = []
    // 获取兑换记录
    getRecordList = async () => {
        const params = {
            ...this.getParams()
        }
        const {data, code, message} = await Api.queryUserSurpriseList(params)
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
    initUserInfo = (res) => {
        try {
            this.userInfo = JSON.parse(res)
        } catch (e) {
            this.userInfo = {}
        }
        // Toast.info(res, 5)
        // window.getUserInfo = (res) => {
        //     this.userInfo = JSON.parse(res)
        //     Toast.info('countryId:' + this.userInfo.countryId, 5)
        // }
    }

    showMyPrice = false
    onClickMyPrice = async () => {
        const params = {
            ...this.getParams()
        }
        // Toast.info('params.token:' + params.token, 5)
        if (!params.token) {
            return this.handleUnLogin()
        }
        this.showMyPrice = true
        await this.getRecordList()
    }

    adList = []
    // singleImg = {}
    getAdByCode = async () => {
        const res1 = await Api.getAdByCode({...this.getParams(), code: 'SIBone'})
        this.adList = res1.data || []
        // const res2 = await Api.getAdByCode({...this.getParams(), code: 'SIBtwo'})
        // this.singleImg = res2.data[0] || {}
    }

    toggleMyPrice = () => {
        this.showMyPrice = !this.showMyPrice
    }

    handleUnLogin = () => {
        // 在app内的情况，调用原生交互跳原生登陆页面
        if (this.isIos()) {
            window.webkit.messageHandlers.toLogin.postMessage('toLogin')
        } else if (this.isAndorid()) {
            window.$App.toLogin('toLogin')
        } else {
            this.toAppOrDownload()
        }
    }

    onClickToNative = (url) => {
        // 在app内的情况，调用原生交互跳原生页面
        if (this.isIos()) {
            window.webkit.messageHandlers.toNativePage.postMessage(url)
        } else if (this.isAndorid()) {
            window.$App.toNativePage(url)
        } else {
            this.toAppOrDownload()
        }
    }

    isIos = () => {
        return window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.toLogin
    }

    isAndorid = () => {
        return window.$App && window.$App.toLogin
    }

    // 跳转app/下载页
    toAppOrDownload = () => {
        window.location.href = 'chicpoint://'
        const timer = setTimeout(() => {
            window.$history.push('/download/' + this.search.languageId || '')
        }, 2500)

        const visibilitychange = function() {
            const tag = document.hidden || document.webkitHidden
            tag && clearTimeout(timer)
        }

        document.addEventListener("visibilitychange", visibilitychange, false)
        document.addEventListener("webkitvisibilitychange", visibilitychange, false)
        window.addEventListener(
            "pagehide",
            function() {
                clearTimeout(timer)
            },
            false
        )
        // if (navigator.userAgent.match(/(iPhone|iPod|iPad);?/i)) {
        //     var loadDateTime = new Date();
        //     window.location = "chicpoint://";//schema链接或者universal link
        //     window.setTimeout(() => { //如果没有安装app,便会执行setTimeout跳转下载页
        //         var timeOutDateTime = new Date();
        //         if (timeOutDateTime - loadDateTime < 5000) {
        //             window.$history.push('/download/' + this.search.languageId || '')
        //         } else {
        //             window.close();
        //         }
        //     }, 500);
        //
        // } else if (navigator.userAgent.match(/android/i)) {
        //     var state = null;
        //     try {
        //         window.location = 'chicpoint://'; // schema链接或者universal link
        //         window.setTimeout(() => {
        //             window.$history.push('/download/' + this.search.languageId || '')
        //         }, 500);
        //     } catch (e) {}
        // }
    }
}

export default new Store()
