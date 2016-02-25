var mongoose = require('mongoose');
var db       = mongoose.createConnection();
var connect  = options => {
	options  = Object.prototype.toString.call(options) === '[object Object]' ? options : {};
	var url  = options.url || '';
	return function* (next){
		this.db    = db;
		if( db.readyState === 0 ){
			yield new Promise(function(resolve, reject){
				db.open(url, function(db){
					resolve(db);
					console.log('koa-mongoose-short-open-success');
				});
				db.on('error', function(err){
					reject(err);
					console.log('koa-mongoose-short-open: ', err);
				});
			});
		}
		yield next;
	}
}

module.exports = {
	mongoose: mongoose,
	db:       db,
	connect:  connect
}