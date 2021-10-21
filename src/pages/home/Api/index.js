import http from '@/common/http'

export default {
    // 获取盲盒配置信息
    getBlindBoxConfig (data) {
        return http({
            url: '/api/v1/blindBox/getBlindBoxConfig',
            method: 'post',
            data
        })
    },
    // 获取用户兑换记录
    queryUserSurpriseList (data) {
        return http({
            url: '/api/v1/blindBox/queryUserSurpriseList',
            method: 'post',
            data
        })
    },
    // 获取国家中奖记录
    queryRegionSurpriseList (data) {
        return http({
            url: '/api/v1/blindBox/queryRegionSurpriseList',
            method: 'post',
            data
        })
    },
    // 兑换奖项
    redeemCode (data) {
        return http({
            url: '/api/v1/blindBox/redeemCode',
            method: 'post',
            data
        })
    }
}
