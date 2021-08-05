# 发送请求相关 支持 mock

```js
import http from '@hlj/share/Http'
function getData1() {
  http({
    method: 'get', //默认是get，可不写
    url: 'xxx',
    params: { name: 'aaa' }, //当是post请求的时候一般传data:{name:'aaa'}
  }).then((res) => {
    console.log(res)
  })
}
//如果是在脚手架工程里，可以直接async/await
async function getData2() {
  const res = await http({ method: 'get', url: 'xxx', params: { name: 'aaa' } })
  console.log(res)
}
```

## 如果需要修改默认全局配置，那么可以像如下这样配置

```js
http.setConfig({
  /*
  自定义url的域名,最后会被拼接到url的前面
  比如发送请求的url是'/p/getList',那么最后
  url会被改为https://admin.hunliji.com/p/getList
   */
  // baseURL: 'https://admin.hunliji.com',
  /*
  baseURL除了可以是个字符串还可以是个函数，
  然后你可以根据不同环境返回不同的baseURL
  或者你自己去定义条件去返回不同baseURL
   */
  baseURL() {
    return 'https://api.example.com'
  },
  // 接口是否需要携带token，默认是true
  withToken: true,
  /*
  当接口需要携带token时你可以配置setToken,自己去设置token
  第一个参数是请求的配置，比如将token设置到header中，按如下配置就可以了,
  记得最后必须返回config
  注意：当上诉needToken配置为false时，setToken配置将失效
   */
  setToken(config) {
    config.headers.token = sessionStorage.getItem('tokenKey')
    return config
  },
  /*
  当不配置setToken的时候，会根据默认规则去设置token，默认规则是从不同地方取出token
  设置到header中，取token的优先级是localStorage-->sessionStorage-->cookie
  getToken会去覆盖上诉默认取token的规则，最后将getToken的返回值作为token设置到header中，
  注意：当配置了setToken，那么getToken将失效
   */
  getToken() {
    return 'xxxxx'
  },
  /*
  发送请求到请求返回，是否需要显示loading加载条,用于请求响应时间比较长的时候
  当同时发送多个请求的时候，loading不会同时出现多个，而是根据请求响应速度来合理显示，
   */
  // loading: false,
  /*
   loading可以是一个字符串，设置loading的类型,默认hlj
   可从@share/Loading的TYPES获取所有类型
    */
  // loading: 'hlj',
  /*
    loading还可以是一个对象，默认是以下配置,相当于写loading:true
   */
  loading: {
    type: 'rotate', // 类型，有dot、rotate、hlj
    mask: false, // 是否显示遮罩层
    size: 60, // loading尺寸
  },
  /*
  success表示请求成功的操作，注意是retCode===0的情况下，
  才会调用这个success,第一个参数是接口返回的数据
   */
  success(data) {},
  /*
  当异常的时候触发，注意区分fail配置，
  不配置的话会默认弹框提示异常信息，比如断网，js处理异常等情况
  一般情况下这个字段不需要配置,
   */
  error({ err, msg, type }) {},
})
```

## MOCK 功能

数据 mock 功能，默认不开启，并且只有开发环境开启才会生效，
开启后，请求直接会返回你 mock 定义的数据,mock 可以有多种形式,请看下面例子

- 直接返回一个普通 json 格式对象

```js
http({
  url: '/xxx',
  mock: {
    name: 'zhi_shui',
    age: 100,
  },
})
```

- 返回一个模板，最后生成符合模板的数据
  - 模板的写法规则参考：https://github.com/nuysoft/Mock/wiki

```js
http({
  url: '/xxx',
  mock: {
    // 生成长度为10的对象数组
    'list|10': [
      {
        'id|+1': 1, // id从1开始后续依次加一
        'sex|1': ['男', '女'], // 性别是数组中的一个，随机的
      },
    ],
  },
})
```

- 函数形式，函数返回的的结果被当做最后的数据请求响应，函数的返回同样支持上诉的模板形式
  - 第一个参数是 Mock 的工具类，可以调用它身上的很多函数产生更多模拟数据：https://github.com/nuysoft/Mock/wiki/Mock.Random
  - 第二个参数是本次请求的所有配置，包括请求参数，类型等

```js
http({
  url: '/xxx',
  mock(helper) {
    return {
      color: helper.color(), // 形成随机的颜色值 #3538B2
      date: helper.date(), // 形成随机的日期
    }
  },
})
```

- 如果你想模拟接口延迟，只需要配置 mockDelay 即可，

```js
http({
  url: '/xxx',
  mockDelay: 1000,
})
```

## loading 和 toast

Http 模块中的 loading 和 toast 效果都是一个单独的模块，分别在@hlj/share/Loading 和@hlj/share/Toast 中，
都可单独使用，不一定要和 Http 模块一起使用

```js
import toast from '@hlj/share/Toast'

toast('xxx')
```

```js
import loading, { TYPES } from '@hlj/share/Loading'

loading()
loading(false)
// 带配置的
loading({
  type: TYPES.wander,
  mask: true,
})
```

## httpProxy

http 的代理可以设置以下值

- 设置一个字符串域名

```js
http.setConfig({
  // 所有请求都会被代理到http://dev.hunliji.com
  httpProxy: 'http://dev.hunliji.com',
})
```

- 设置一个对象

```js
http.setConfig({
  httpProxy: {
    // 以/p开头的才会被代理到 http://dev.hunliji.com
    '/p': 'http://dev.hunliji.com',
  },
})
```

- 设置一个函数

```js
http.setConfig({
  httpProxy({ url }) {
    // 可以根据需要返回一个字符串域名或一个对象，满足上诉两种情况即可
    return 'http://dev.hunliji.com'
  },
})
```

## 注意事项

上面的全局配置中有些是可以在每个单独请求中再次配置的，会去覆盖全局配置，以下配置可以为每个请求单独再次配置

- loading
- domain
- needToken
- httpProxy
- original
- fail
- success
- error 这个 error 有点特殊，不一定保证都能进入单独配置的 error，需要看是什么错误

默认不带 cookie 信息，如果需要带上 cookie,按如下设置，

- http.defaults.withCredentials=true

```

```
