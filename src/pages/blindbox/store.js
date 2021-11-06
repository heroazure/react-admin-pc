import {makeAutoObservable} from 'mobx'
import {Toast, Modal} from "antd-mobile"
import {v4} from 'uuid'
import Api from './Api'
import moment from 'moment'
import momentZone from 'moment-timezone'
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
    myPrizeTran = ''
    redeemTran = ''
    inputTran = ''
    getBlindBoxConfig = async () => {
        const {data} = await Api.getBlindBoxConfig(this.getParams())
        window.document.title = data?.title || ''
        this.isSupport = data.isSupport !== 0
        this.surpriseList = (data.surpriseList || []).map(item => {
            return {...item, surpriseName: item.surpriseName.slice(0, 32)}
        })
        this.descImg = data.imageUrl
        this.headImg = data.headImg
        this.remindTitle = data.remindTitle
        this.myPrizeTran = data.myPrizeTran
        this.redeemTran = data.redeemTran
        this.inputTran = data.inputTran
    }

    showSurprise = false
    onCloseSurprise = () => {
        this.showSurprise = false
    }

    toDownload = () => {
        const isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        const url = isIos ? 'http://itunes.apple.com/us/app/id1525111750?mt=8' : 'http://play.google.com/store/apps/details?id=com.chic.point'
        window.location.href = url
    }

    surpriseCode = ''
    surpriseResult = {}
    disabledBtn = false
    onSubmit = async () => {
        if (!/^[a-zA-Z0-9]{1,32}$/.test(this.surpriseCode)) return
        const params = {
            ...this.getParams(),
            surpriseCode: this.surpriseCode
        }
        // if (!params.token) {
        //     return this.handleUnLogin()
        // }
        try {
            this.disabledBtn = true
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
        } finally {
            this.disabledBtn = false
        }
    }

    barrageList = []
    // 获取弹幕信息
    getBarrage = async () => {
        const {data} = await Api.queryRegionSurpriseList(this.getParams())
        this.barrageList = (data || []).map(item => ({ id: v4(), content: `${item.userName}  ${item.prizeName}` }))
    }

    params = {}
    rtlClass = ''
    getParams = () => {
        const obj = {
            ...this.userInfo
        }
        if (this.search.countryId) obj.countryId = this.search.countryId
        if (this.search.languageId) obj.languageId = this.search.languageId
        if (this.search.terminalType) obj.terminalType = this.search.terminalType
        if (this.search.appVersion) obj.appVersion = this.search.appVersion
        this.params = obj
        this.rtlClass = +obj.languageId === 1 ? 'rtl' : ''
        // Toast.info('userInfo.lang:' + this.userInfo.languageId + ' obj.lang:' + obj.languageId, 5)
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
        this.recordList = (data || []).map(item => {
            // 沙特-利雅得Saudi Arabia/Riyadh  摩洛哥-拉巴特Morocco/Rabat 墨西哥-墨西哥城Mexico/Mexico City
            item.expiredTime = momentZone(item.expiredTime).tz('America/Los_Angeles').format('YYYY/MM/DD')
            // item.gmtCreated = moment(item.gmtCreated).format('YYYY/MM/DD HH:mm:ss')
            item.gmtCreated = momentZone(item.gmtCreated).tz('America/Los_Angeles').format('YYYY-MM-DD HH:mm:ss')
            return item
        })
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
    }

    showMyPrice = false
    onClickMyPrice = async () => {
        // const params = {
        //     ...this.getParams()
        // }
        // if (!params.token) {
        //     return this.handleUnLogin()
        // }
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

    // 只有当新版app，才有这个方法，但不是用来单纯判断iOS设备
    isIos = () => {
        return window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.toLogin
    }

    // 只有当新版app，才有这个方法，但不是用来单纯判断安卓设备
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
