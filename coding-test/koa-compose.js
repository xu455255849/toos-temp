
const fn1 = async (ctx, next) => {
	console.log(ctx)
	ctx.name = 'xushaoping'
	await next()
	console.log('f1111')
}

const fn2 = async (ctx, next) => {
	console.log(ctx)
	ctx.age = '26'
	await next()
	console.log('f111222222')
}

const fn3 = async (ctx, next) => {
	console.log(ctx)
	await next()
	console.log('f133333')
}

const fnMiddleware = function(context){
	return Promise.resolve(
		fn1(context, function next(){
			return Promise.resolve(
				fn2(context, function next(){
					return Promise.resolve(
						fn3(context, function next(){
							return Promise.resolve();
						})
					)
				})
			)
		})
	);
};
fnMiddleware({ name: 'xu', age: 18}).then(res => console.log(res));
