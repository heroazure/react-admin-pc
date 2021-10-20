import { makeAutoObservable } from 'mobx'
import {Toast} from "antd-mobile"
import Api from './Api'
import xbox from './images/xbox.png'
class Store {
    visible = false
    constructor() {
        makeAutoObservable(this)
    }

    handleCancel = () => {
        this.visible = false
    }

    images = [
        xbox,xbox,xbox,xbox,xbox,xbox,xbox,xbox,xbox,xbox
    ]
    getData = async () => {
        const data = await Api.getList()
        console.log('getList:', data)
    }

    showSurprise = false
    onCloseSurprise = () => {
        this.showSurprise = false
    }
    priceList = [{}, {}, {}, {}, {}, {}]
    onSubmit = () => {
        this.showSurprise = true
        Toast.info('Your code is not recognized', 2)
    }
}

export default new Store()
