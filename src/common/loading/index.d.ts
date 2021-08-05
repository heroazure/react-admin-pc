type config = {
  // loading形状类型
  type?: string
  // 是否显示遮罩
  mask?: boolean
  // 尺寸大小
  size?: null | number | string
}
export declare function loading(config?: config | boolean | string)

export declare namespace loading {
  export function start(config: object)
  export function stop()
}

export const loadingTypes: {
  plane: 'plane'
  chase: 'chase'
  fold: 'fold'
  grid: 'grid'
  wander: 'wander'
  circle: 'circle'
  circleFade: 'circle-fade'
  'circle-fade': 'circle-fade'
  bounce: 'bounce'
  wave: 'wave'
  pulse: 'pulse'
  flow: 'flow'
  swing: 'swing'
}

export default loading
