import {makeAutoObservable} from "mobx"
import {message} from 'antd'

class Store {
    authStorageKey = 'userInfo'
    userAuth = {
        user: null,
        isAuthenticated: false
    }
    username = ''
    password = ''
    constructor() {
        const storage = localStorage.getItem(this.authStorageKey)
        this.userAuth = storage ? JSON.parse(storage) : {user: null, isAuthenticated: false}
        makeAutoObservable(this, {authStorageKey: false})
    }

    signIn = (cb) => {
        if (!this.username || !this.password) return message.error('请输入用户名和密码')
        setTimeout(() => {
            const userInfo = {
                isAuthenticated: true,
                user: this.username
            }
            this.setUserAuth(userInfo)
            cb()
        }, 100)
    }

    setUserAuth = (userInfo) => {
        this.userAuth = userInfo
        localStorage.setItem(this.authStorageKey, JSON.stringify(userInfo))
    }

    signOut = (cb) => {
        // setTimeout(() => {
        //
        // }, 100)
        this.userAuth = {
            isAuthenticated: false,
            user: null
        }
        localStorage.removeItem(this.authStorageKey)
        cb()
    }

    onChangeVal = (key, e) => {
        this[key] = e.target.value
    }
}

export default new Store()
