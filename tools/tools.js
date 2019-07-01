
function isObject(obj) {
    let type = typeof obj
    return obj != null && (type === 'object' || type === 'function' )
}

function type(val) {
    return Object.toString.call(val)
}


function isEmpty(value) {
    if (value == null) {
        return true;
    }
    if (isArrayLike(value)) {
        return !value.length;
    }else if(isPlainObject(value)){
        for (let key in value) {
            if (hasOwnProperty.call(value, key)) {
                return false;
            }
        }
    }
    return false;
}


// 驼峰互转 & 记忆函数
function cached(fn) {
    let cache = Object.create(null);
    return function cachedFn(str) {
        let hit = cache[str];
        return hit || (cache[str] = fn(str))
    }
}

let camelizeRE = /-(\w)/g;
function camelize(str) {
    return str.replace(camelizeRE, function(_, c) {
        return c ? c.toUpperCase() : '';
    })
}
//ab-cd-ef ==> abCdEf
//使用记忆函数
let _camelize = cached(camelize)

let hyphenateRE = /\B([A-Z])/g;
function hyphenate(str){
    return str.replace(hyphenateRE, '-$1').toLowerCase()
}
//abCd ==> ab-cd
//使用记忆函数
let _hyphenate = cached(hyphenate);


function isStatic(value) {
    return(
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'boolean' ||
        typeof value === 'undefined' ||
        value === null
    )
}

function isPrimitive(value) {
    return isStatic(value) || typeof value === 'symbol'
}


function isObjectLike(value) {
    return value != null && typeof value == 'object';
}


function getRawType(value) {
    return Object.prototype.toString.call(value).slice(8, -1)
}


function isPlainObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

function isArrayLike(value) {
    return value != null && isLength(value.length) && !isFunction(value);
}
// 浅拷贝 / 深拷贝

Object.assign = Object.assign || function(){
    if(arguments.length == 0) throw new TypeError('Cannot convert undefined or null to object');
    
    let target = arguments[0],
        args = Array.prototype.slice.call(arguments, 1),
        key;
    args.forEach(function(item){
        for(key in item){
            item.hasOwnProperty(key) && ( target[key] = item[key] )
        }
    })
    return target
}


function clone(value, deep){
    if(isPrimitive(value)){
        return value
    }
    
    if (isArrayLike(value)) { //是类数组
        value = Array.prototype.slice.call(value)
        return value.map(item => deep ? clone(item, deep) : item)
    }else if(isPlainObject(value)){ //是对象
        let target = {}, key;
        for (key in value) {
            value.hasOwnProperty(key) && ( target[key] = deep ? clone(value[key], deep) : value[key] )
        }
    }
    
    let type = getRawType(value)
    
    switch(type){
        case 'Date':
        case 'RegExp':
        case 'Error': value = new window[type](value); break;
    }
    return value
}
