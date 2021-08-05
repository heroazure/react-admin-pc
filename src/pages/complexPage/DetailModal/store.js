import { makeAutoObservable } from 'mobx'
class Store {
    visible = false
    loading = false
    detail = {}
    constructor() {
        makeAutoObservable(this)
    }

    handleOk = () => {
        this.loading = true
        setTimeout(() => {
            this.visible = false
            this.loading = false
        }, 1000)
    }

    handleCancel = () => {
        this.visible = false
    }

    showModal = (detail) => {
        console.log('show')
        // do something
        this.detail = detail
        this.visible = true
    }
}

export default new Store()
