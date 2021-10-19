import { makeAutoObservable } from 'mobx'
import Api from './Api'
class Store {
    visible = false
    constructor() {
        makeAutoObservable(this)
    }

    handleCancel = () => {
        this.visible = false
    }

    getData = async () => {
        const data = await Api.getList()
        console.log('getList:', data)
    }
}

export default new Store()
