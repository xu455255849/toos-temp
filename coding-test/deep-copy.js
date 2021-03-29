
function _deepClone(obj, map = new WeakMap()) {
	// 如果是 null 或 不是对象 不需要深拷贝
	if (obj === null || typeof obj !== 'object') {
		return obj
	}
	
	// 处理循环引用
	if (map.has(obj)) return map.get(obj)
	
	const copy = Array.isArray(obj) ? [] : {}
	
	map.set(obj, copy)
	
	// Reflect 比起 Object.keys 可以遍历到 Symbol 的属性值
	const keys = Reflect.ownKeys(obj)
	keys.forEach(key => {
		copy[key] = _deepClone(obj[key], map)
	})
	return copy
}


const obj = {
	name: 'xushaoping',
	age: 111,
	sayH: () => { console.log('hello world') },
	goods: [1,2,3,4],
	object: { a: 11 }
}

obj[Symbol('symbol')] = 22

const bug ={
	b: obj.object
}

obj.object.b = bug.b

const copyObj = _deepClone(obj)

obj.goods.push(5)
obj.symbol = '22'


console.log(obj, 111)
console.log(copyObj)
