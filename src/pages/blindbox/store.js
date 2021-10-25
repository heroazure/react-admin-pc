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
    surpriseList = []
    isSupport = true
    descImg = ''
    getBlindBoxConfig = async () => {
        const {data} = await Api.getBlindBoxConfig(this.getParams())
        window.document.title = data?.title || ''
        this.isSupport = data.isSupport !== 0
        this.surpriseList = data.surpriseList || []
        this.descImg = data.imageUrl
        console.log('getBlindBoxConfig:', data)
    }

    showSurprise = false
    onCloseSurprise = () => {
        this.showSurprise = false
    }

    surpriseCode = ''
    surpriseResult = {}
    onSubmit = async () => {
        const {data, code, message} = await Api.redeemCode({
            ...this.getParams(),
            surpriseCode: this.surpriseCode
        })
        if (code !== 200) {
            // 未登陆的情况
            if (code === 1009) {
                return this.handleUnLogin()
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
        const {data, code, message} = await Api.queryUserSurpriseList({...this.getParams(), userId: '111'})
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
        Toast.info(res, 5)
        // window.getUserInfo = (res) => {
        //     this.userInfo = JSON.parse(res)
        //     Toast.info('countryId:' + this.userInfo.countryId, 5)
        // }
    }

    showMyPrice = false
    onClickMyPrice = async () => {
        this.showMyPrice = true
        await this.getRecordList()
    }

    adList = []
    singleImg = {}
    getAdByCode = async () => {
        const res1 = await Api.getAdByCode({...this.getParams(), code: 'SIBone'})
        this.adList = res1.data || []
        const res2 = await Api.getAdByCode({...this.getParams(), code: 'SIBtwo'})
        this.singleImg = res2.data[0] || {}
    }

    toggleMyPrice = () => {
        this.showMyPrice = !this.showMyPrice
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
