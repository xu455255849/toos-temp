// 实现 findFirstIndex函数，找到有序数组 [1, 2, 3, 4, 7, 7, 7, 9, 12, 23, 34, 45, 55, 67]中第一次出现的位置，比如7第一次出现的位置是4

function findFirstIndex(arr, target) {
	let begin = 0
	let end = arr.length
	while(begin < end) {
		const mid = (begin + end) >>> 1
		if (arr[mid] >= target) {
			end = mid
		} else {
			begin = mid + 1
		}
	}
	if (begin === arr.length) return -1
	return arr[begin] === target ? begin : -1
}
