function f1(num) {
	return num + 1
}

function f2(num) {
	return num + 2
}

function f3(num) {
	return num + 3
}

function compose(...funcs) {
	console.log(funcs)
	if (funcs.length === 0) {
		return args => args
	}
	
	if (funcs.length === 1) {
		return funcs[0]
	}
	return funcs.reduce((acc, cur) => (...args) => acc(cur(...args)))
}

var res = compose(f1, f2, f3)
console.log(res())
