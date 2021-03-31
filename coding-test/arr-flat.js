var arr1 = [1, 2, [3], [1, 2, 3, [4, [2, 3, 4]]]];
function flatten(arr) {
	return arr.reduce((res,next) =>{
		return res.concat(Array.isArray(next)? flatten(next) : next);
	},[]);
}

function flatten(arr) {
	while (arr.some(item => Array.isArray(item))) {
		arr = [].concat(...arr);

	}
	return arr;
}

arr.flat()

console.log(arr)
