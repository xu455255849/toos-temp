class myPromise {
	constructor(fn) {
		this.callbacks = []; // 回调 注册表 (then)
		this.state = 'pending'; // 增加promise 状态 以保证promise的输出正确
		this.value = null;
		fn(this._resolve.bind(this));
	}
	
	then(onFulfilled) {
		if (this.state === 'pending') {
			this.callbacks.push(onFulfilled); // then 方法其实就是向任务队列中 推入promise函数
		} else {
			onFulfilled(this.value) // 如果注册的时候 已经resolve 直接返回
		}
		return this; // 支持 then 链式调用
	}
	_resolve(value) {
		this.state = 'fulfilled';
		this.value =
		this.callbacks.forEach(fn => fn(value)); // 参考观察者模式 ，resolve 其实就是将注册的回调一一执行
	}
}

let p = new myPromise(resolve => {
	console.log('同步执行');
	resolve('同步执行promise');
}).then(res => {
	console.log(res, 111);
}).then(res => {
	console.log(res, 222);
})

console.log(p)
