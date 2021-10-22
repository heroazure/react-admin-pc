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
    getBlindBoxConfig = async () => {
        const {data} = await Api.getBlindBoxConfig(this.search)
        console.log('getBlindBoxConfig:', data)
    }

    showSurprise = false
    onCloseSurprise = () => {
        this.showSurprise = false
    }

    priceList = [{}, {}, {}, {}, {}, {}]
    onSubmit = async () => {
        // const {data} = await Api.queryRegionSurpriseList(this.search)
        this.showSurprise = true
        Toast.info('Your code is not recognized', 2)
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
        const {data} = await Api.queryUserSurpriseList(this.search)
        this.recordList = (data || [])
    }

    search = {}
    setSearch = (search) => {
        this.search = search
    }
}

export default new Store()
