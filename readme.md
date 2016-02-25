## koa-mongoose-short
最近想重构博客（原express, 改koa），发现又得折腾下百度云的mongodb短连接，于是做个简易点的mongodb短连接，且支持mongoose

## dependencies
+ koa@1.x
+ mongoose@4.x

## 使用方法
目前暂定只支持数据库连接参数来链接
	
	var koa      = require('koa');
	var app      = koa();
	var koashort = require('koa-mongoose-short')
	app.use(koashort.connect({
		url: 'mongodb://127.0.0.1:27017/koatest'
	}));
	app.use(function* (){
		this.body = 'hello world'
	});
	app.listen(11234);

## mongoose文档对象开发姿势
详细可见/example/connect.js, 个人喜欢把schema挂载到this上面

	// db.js
	var koashort = require('koa-mongoose');
	var Schema   = koashort.mongoose.Schema;
	var UserSchema = new Schema({
		name:  String,
		pass:  String,
		email: String
	});
	// schema生成model的过程只允许发生一次，所以放在外部
	var User = koashort.db.model('User', UserSchema);
	module.exports = function(){
		return function* (next){
			this.model = this.model || {};
			if( !this.model.user ) this.model.user = User;
			yield next;
		}
	}

	// main.js
	// ...
	app.use(koashort.connect({
		url: 'mongodb://192.168.80.40:27017/koatest'
	}));
	app.use( require('./db.js')() );
	app.use(function* (){
		// 请确保user表存在数据
		this.body = yield this.model.user.findOne();
	});
	// ...

## example

	// listen to 11234, 默认数据库连接地址：mongodb://127.0.0.1:27017/koatest
	node ./example/connect.js