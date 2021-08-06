import { makeAutoObservable } from 'mobx'
import Api from './api'

class Store {
    data = []
    get total () {
        return this.data.length
    }

    constructor() {
        makeAutoObservable(this)
    }

    getList = () => {
        setTimeout(async () => {
            this.data = await Api.getList()
            // console.log(this.data)
        }, 1000)
    }

    del = (key) => {
        this.data = this.data.filter(item => item.key !== key)
    }

    update = (row) => {
        // const index = this.data.findIndex(item => item.key === row.key)
    }
}

export default new Store()
