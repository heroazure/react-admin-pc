## Loading

- 该模块也是@hlj/share/Http 模块中默认调用的

```js
import loading, { loadingTypes } from '@hlj/share/Loading'

// 默认
loading()
// 可配置的loading
loading({
  type: loadingTypes.wander, // loading类型，决定loading的形状
  mask: true // 是否显示遮罩层
})
// 直接传type
loading(loadingTypes.wander)
// 暂停loading,暂停会有一个渐隐的动画效果
loading(false)
// 直接销毁loading,没有任何动画效果
loading.destroy()
```

### loading 的类型 loadingTypes 有以下几种：

- circle
- plane
- chase
- fold
- grid
- wander
- circleFade
- bounce
- wave
- pulse
- flow
- swing

## 注意事项

loading 的开始和暂停必须配对出现，
如果调用两次 loading()，但是只调用了一次 loading(false)
那么 loading 仍然存在，必须也调用两次暂停才能让 loading 消失
不过可以调用 loading.destroy()直接销毁 loading
