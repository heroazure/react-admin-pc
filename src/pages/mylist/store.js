import BaseTableStore from '../table/store'
import Api from './api'
import {makeAutoObservable} from "mobx"
import {v4} from 'uuid'

export const tableStore = new BaseTableStore()
tableStore.$listApi = Api.getList
tableStore.$getParams = ({ date, ...rest }) => {
    return {
        date: date?.format('YYYY-MM-DD'),
        type: 3,
        ...rest,
    }
}

class Store {
    value = 'chongtianbai'
    constructor() {
        makeAutoObservable(this)
    }

    onTest = () => {
        this.value = v4()
    }
}

export default new Store()
