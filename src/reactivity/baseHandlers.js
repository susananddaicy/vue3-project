
import { track, trigger } from './effect';
import reactive from './reactive';
import { isObject, hasOwn } from "../shared"

const get = createGetter();
const set = createSetter();
const shallowReactiveGet = createGetter(true)

function createGetter(shallow = false) {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver) // 这里的 Reflect.get 和 target[key]实现的结果是一致的
    track(target, "get", key)
    if (isObject(res)) {
      // 值也是对象的话，需要嵌套调用reactive
      // res就是target[key]
      // 浅层代理，不需要嵌套
      return shallow ? res : reactive(res)
    }
    return res
  }
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver)
    // 在触发 set 的时候进行触发依赖
    trigger(target, "set", key)
    return result
  }
}
export const mutableHandles = {
  get,
  set,
};

export const shallowReactiveHandlers = {
  get: shallowReactiveGet,
  set,
}