class myPromise {
	constructor(fn) {
		this.callbacks = [];
		fn(this._resolve.bind(this));
	}
	
	then(onFulfilled) {
		console.log(onFulfilled, 222)
		this.callbacks.push(onFulfilled); // then 方法其实就是向任务队列中 推入promise函数
		return this; // 支持 then 链式调用
	}
	_resolve(value) {
		console.log(value, 111)
		this.callbacks.forEach(fn => fn(value));
	}
}

let p = new myPromise(resolve => {
	setTimeout(() => {
		console.log('done');
		resolve('5秒');
	}, 5000);
}).then(res => {
	console.log(res);
})

console.log(p)
