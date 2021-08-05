export declare const getVal: (
  obj: any,
  path: string | Array<string | number>,
  defaultValue: any
) => any
export declare const setVal: (obj: any, path: string | Array<string | number>, value: any) => any

export declare function hasSomeKey(obj: object, keys: string | Array<string>)
export declare function hasEveryKey(obj: object, keys: string | Array<string>)
export declare function resetStore(self: object, instant: object)

export declare function getFuncVal(func: any, ...params)
