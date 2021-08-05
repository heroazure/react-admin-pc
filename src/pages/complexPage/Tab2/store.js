import { makeAutoObservable } from 'mobx'
import {autorun, when} from 'mobx'
// import Api from './api'

class Store {
    data = []
    get total () {
        return this.data.length
    }

    constructor() {
        makeAutoObservable(this)
        // 回调内用到的可观察变量，发生了更改，就会触发该回调
        autorun(() => {
            console.log('autorun data.length:', this.data.length)
        })
        // 第一个方法的返回值为真，立即调用后面的 effect,when的回调只会执行一次
        when(() => this.data.length < 3 && this.data.length > 0, () => {
            console.log('when执行一次：', this.data.length)
        })
    }

    getList = () => {
        setTimeout(async () => {
            // this.data = await Api.getList()
            console.log(this.data)
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
