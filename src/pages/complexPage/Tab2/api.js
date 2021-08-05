import http from '../../../common/http'

export default {
    getList (data) {
        return http({
            url: '/about/us/info',
            method: 'get',
            data
        })
    }
}
