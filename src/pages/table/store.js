/* eslint-disable */
import { runInAction, makeAutoObservable } from 'mobx'

export default class BaseTableStore {
    $searchBar = null
    $initSearchBar = (searchBar) => {
        this.$searchBar = searchBar
    }
    $params = {}
    $listApi = null
    $filters = {}
    $sorter = {}
    $pageSize = 10
    $initialParams = {}
    //不需要在最后发请求时传递的参数名
    $ignoreParams = []
    $getListApi = () => {
        return this.$listApi
    }

    $list = []
    $loading = false
    $pagination = {
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条`,
        showSizeChanger: true,
        current: 1,
        pageSize: this.$pageSize,
        total: 0,
    }
    constructor() {
        makeAutoObservable(this, {
            $searchBar: false,
            $params: false,
            $listApi: false,
            $filters: false,
            $sorter: false,
            $pageSize: false,
            $initialParams: false,
            $ignoreParams: false,
            $getListApi: false,
            $clearList: false,
        })
    }
    $selectedRowKeys = []
    $onSelectChange = (keys) => {
        this.$selectedRowKeys = keys
    }
    $paging = ({ current, pageSize }, filters, sorter) => {
        this.$filters = filters
        this.$sorter = sorter
        this.$pagination.current = current
        this.$pagination.pageSize = pageSize
        this.$getList(current)
    }
    /*
     切面，发请求之前和之后的操作$beforeGet,$afterGet
     */
    $afterGet = (data, page) => {
        const { list, total, ...extraData } = data
        this.$list = list || []
        this.$pagination.total = +total
        this.$pagination.current = page
        this.$selectedRowKeys = []
        this.$loading = false
        this.$setExtraData(extraData)
    }
    $extraData = {}
    $setExtraData = (extraData) => {
        this.$extraData = extraData
    }
    $getList = async (page = this.$pagination.current, params) => {
        if (Object.prototype.toString.call(page) === '[object Object]') {
            params = page
            page = this.$pagination.current
        }
        const { loading = true, ...rest } = params || {}
        const myParams = this.$getParams({
            ...this.$params,
            page,
            per_page: this.$pagination.pageSize,
        })
        const resParams = {
            ...this.$initialParams,
            ...myParams,
            ...rest,
        }
        for (const key of this.$ignoreParams) {
            delete resParams[key]
        }
        if (loading) {
            this.$loading = true
        }
        const data = await this.$getListApi()(resParams)
        console.log('data:', data)
        runInAction(() => {
            this.$afterGet(data, page)
        })
    }
    $clearList = () => {
        this.$afterGet({ list: [], total: 0 }, 1)
    }

    $initParams = (name, value) => {
        this.$initialParams[name] = value
        this.$params = Object.assign({}, this.$initialParams, this.$params)
    }

    $clearParams = () => {
        this.$initialParams = {}
        this.$params = {}
    }
    $resetParams = () => {
        this.$params = Object.assign({}, this.$initialParams)
    }
    $search = () => {
        this.$getList(1)
    }

    $getParams = (params) => {
        return params || this.$params
    }

    //当参数改变的时候调用
    $onParamsChange = () => {
        this.$getList(1)
    }

    $setParams = (values, triggerSearchItems) => {
        if (values) {
            this.$params = Object.assign({}, this.$params, values)
            const keys = Object.keys(values)
            if (triggerSearchItems.some(key => keys.includes(key))) {
                this.$onParamsChange(values)
            }
        } else {
            this.$resetParams()
            this.$onParamsChange(values)
        }
    }
}
