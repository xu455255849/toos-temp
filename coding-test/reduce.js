
// arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
var arr = [1,2,3,4]

const reducer = arr.reduce((acc, cur, idx, arr) => acc + cur)

console.log(reducer)

function reduce(arr, cb, initialValue){
	var num = initValue == undefined? num = arr[0]: initValue;
	var i = initValue == undefined? 1: 0
	for (i; i< arr.length; i++){
		num = cb(num,arr[i],i)
	}
	return num
}

function fn(result, currentValue, index){
	return result + currentValue
}

var arr = [2,3,4,5]
var b = reduce(arr, fn,10)
var c = reduce(arr, fn)
console.log(b)   // 24
