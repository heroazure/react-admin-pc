import { makeAutoObservable } from 'mobx'
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
}

export default new Store()
