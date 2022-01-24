// js的链式调用和流程控制（sleep）
// new Test("test").firstSleep(3).sleep(5).eat("dinner")
//等待3秒
//test
//等待5秒
//dinner
class Process {

    constructor(text) {
        this.firstText = text
        this.events = []
    }

    firstSleep = (second) => {
        this.events.push(() => {
            return new Promise((resolve) => {
                console.log(`等待${second}秒`)
                setTimeout(() => {
                    console.log(this.firstText)
                    resolve(this.firstText)
                }, second * 1000)
            })
        })
        return this
    }

    sleep = (second) => {
        // 40400 - 2800 = 37600
        // 25000 + 12000 = 37000
        this.events.push(() => {
            return new Promise((resolve) => {
                console.log(`等待${second}秒`)
                setTimeout(() => {
                    resolve()
                }, second * 1000)
            })
        })
        return this
    }

    immediateFn = () => {
        console.log('我是 immediateFn')
        return this
    }

    loop = (list, idx) => {
        const fn = list[idx++]
        if (!fn) return Promise.resolve()
        const tmp = fn()
        // if (!tmp) return this.loop(list, idx)
        if (tmp && typeof tmp.then === 'function') {
            return tmp.then(() => this.loop(list, idx))
        }
        return this.loop(list, idx)
    }

    eat = (name) => {
        this.loop(this.events, 0).then(() => console.log(name))
        return this
    }
}

export default Process
