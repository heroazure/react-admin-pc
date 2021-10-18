import http from '@/common/http'

export default {
    getList (data) {
        return http({
            url: '/api/about/us/info',
            /*mock: {
                list: [
                    {
                        "key": "1",
                        "name": "John Brown",
                        "age": 32,
                        "address": "New York No. 1 Lake Park",
                        "tags": [
                            "nice",
                            "developer"
                        ]
                    },
                    {
                        "key": "2",
                        "name": "Jim Green",
                        "age": 42,
                        "address": "London No. 1 Lake Park",
                        "tags": [
                            "loser"
                        ]
                    },
                    {
                        "key": "3",
                        "name": "Joe Black",
                        "age": 32,
                        "address": "Sidney No. 1 Lake Park",
                        "tags": [
                            "cool",
                            "teacher"
                        ]
                    },
                    {
                        "key": "4",
                        "name": "Jim Green",
                        "age": 42,
                        "address": "London No. 1 Lake Park",
                        "tags": [
                            "loser"
                        ]
                    }
                ],
                total: 4,
                uuid: v4()
            }*/
        })
    }
}
