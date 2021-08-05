type config = {
  text?: string
  title?: '提示'
  okText?: '确定'
}
export declare function toast(msg?: string | config, config?: config)

export default toast
