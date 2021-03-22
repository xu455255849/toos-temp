
function deepClone(obj, map = new WeakMap()) {
	if (obj === null || typeof obj !== 'object') {
		return obj
	}
	
	if (map.has(obj)) {
		return map.get(obj)
	}
	
	const copy = Array.isArray(obj) ? [] : {}
	
	map.set(obj, copy)
	
	const keys = Reflect.ownKeys(obj)
	
	keys.forEach(key => {
		copy[key] = deepClone(obj[key], map)
	})
	
	return copy
}
