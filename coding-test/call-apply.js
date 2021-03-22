// call
Function.prototype.myCall = function (context = window, ...args) {
	context = context || window; // 参数默认值并不会排除null，所以重新赋值 ，context 就是 Food
	const fn = Symbol('临时属性')
	context[fn] = this; // this 是调用call的函数 ，这里 指向 Fruit
	console.log(context, 111)
	console.log(fn, 222)
	console.log(context[fn], 333)
	context[fn](...args)
	delete context[fn]
}

// apply
Function.prototype.myCall = function (context = window, args = []) {
	context = context || window; // 参数默认值并不会排除null，所以重新赋值 ，context 就是 Food
	const fn = Symbol('临时属性')
	context[fn] = this; // this 是调用call的函数 ，这里 指向 Fruit
	console.log(context, 111)
	console.log(fn, 222)
	console.log(context[fn], 333)
	context[fn](...args)
	delete context[fn]
}

// bind
Function.prototype.myBind = function(context, ...args) {
	const _this = this;
	return function Bind(...newArgs) {
		// 如果是通过 new 调用的，绑定 this 为实例对象
		if (this instanceof Bind) {
			return _this.myApply(this, [...args, ...newArgs])
		}
		return _this.myApply(context, [...args, ...newArgs])
	}
}

// mdn example

function Fruit(name, price) {
	this.name = name;
	this.price = price;
}


function Food(name, price) {
	Fruit.myCall(this, name, price);
	this.type = 'new'
	console.log(this.name, this.price)
}

console.log()




