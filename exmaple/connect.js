var koa      = require('koa');
var app      = koa();
var koashort = require('./../lib/connect');
var dburl    = process.env.koadburl || 'mongodb://127.0.0.1:27017/koatest';
console.log(`当前数据库连接地址为：${dburl}`);
app.use(koashort.connect({
	url: dburl
}));

app.use(require('./lib/db')());

app.use(function* (){
	var content = yield this.model.user.findOne();
	if( !!content ){
		this.body = content;
	} else {
		new this.model.user({
			name:  'test-koa',
			pass:  123456,
			email: 'test-koa@qq.com'
		}).save();
		this.body = '暂无数据，新增数据完成';
	}
});

app.listen(11234, function(){
	console.log('listen to 11234');
});