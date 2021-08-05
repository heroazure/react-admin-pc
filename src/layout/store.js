import {makeAutoObservable} from "mobx";

class Store {
    collapsed = false
    constructor() {
        makeAutoObservable(this)
    }

    toggle = () => {
        this.collapsed = !this.collapsed
    }
}

export default new Store()
