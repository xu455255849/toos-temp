function myNew(Fn, ...args) {
	const obj = Object.create(Fn.prototype)
	const res = Fn.apply(obj, args)
	return res instanceof Object ? res : obj
}

function Parent(name, age) {
	this.name = name;
	this.age = age;
	return 111
}

console.log(new Parent('xu', 18))
console.log(myNew(Parent,'xu', 18))

