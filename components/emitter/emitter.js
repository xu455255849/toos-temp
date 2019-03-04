/**
 * 事件机制基类，用于事件管理、监听和触发；
 * 使用实例
 * var emitter = new Emitter()
 * emitter.on("fire")
 * ...
 * emitter.emit("fire", "enermy1", "enermy2")
 * 
 */
export class Emitter {
  constructor() {
    this._listenersForType = {}
  }

  /**
   * 监听{eventType}类型的事件
   * @param {String} eventType    事件类型
   * @param {Function} listener   监听函数
   * @param {Object} context      listener对应的this值，可为空
   */
  on(eventType, listener, context) {
    if(!this._listenersForType[eventType]) {
      this._listenersForType[eventType] = []
    }
    this._listenersForType[eventType].push({context, listener})
  }

  /**
   * 触发{eventType}事件
   * @param {String} eventType 
   */
  emit(eventType) {
    const listenersOfType = this._listenersForType[eventType]
    if(!listenersOfType) return

    //去除eventType，将剩余的参数传给listener
    Array.prototype.shift.call(arguments)
    const args = arguments

    const keys = Object.keys(listenersOfType)
    var subscription = null
    for(var i = 0; i < keys.length; i++) {
      subscription = listenersOfType[keys[i]]
      if(subscription && typeof subscription.listener == "function") {
        subscription.listener.apply(subscription.context, args)
      }
    }
  }

  once(type, listener, context) {


  }

  /**
   * 移除eventType和listener对应的监听函数
   * @param {String} eventType    事件类型，如果不传值，则移除所有的监听函数
   * @param {Function} listener   监听函数，为空则移除所有eventType对应的监听函数
   */
  off(eventType, listener) {
    if(eventType == undefined) {
      this._listenersForType = {}
    }
    if(eventType && listener === undefined) {
      delete this._listenersForType[eventType];
    }
    
    const listenersOfType = this._listenersForType[eventType]
    if(!listenersOfType) return

    for(var i = 0; i < listenersOfType.length; i++) {
      var subscription = listenersOfType[i]
      if(subscription && subscription.listener === listener) {
        listenersOfType.splice(i, 1);
      }
    }
  }

}
