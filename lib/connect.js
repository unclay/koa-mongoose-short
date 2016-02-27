var mongoose = require('mongoose');
var poolModule     = require('generic-pool');
var db       = mongoose.createConnection();
var connect  = options => {
	options  = Object.prototype.toString.call(options) === '[object Object]' ? options : {};
	var url  = options.url || '';
	var mongoPool = poolModule.Pool({
		name: 'koa-mongoose-short',
		create: function(callback){
			if( db.readyState === 0 ){
				db.open(url, function(db){
					callback(null, db);
				});
				db.on('error', function(err){
					callback(err);
				});
			} else {
				callback(null, db)
			}
		},
		destroy: function(db){ db.close() },
		max:               options.max || 10,
		min:               options.min || 0,
		idleTimeoutMillis: options.idleTimeoutMillis || 30000,
		log:               options.log || false
	});

	return function* (next){
		yield mongoPool.acquire.bind(mongoPool);
		yield next;
	}
}

module.exports = {
	mongoose: mongoose,
	db:       db,
	connect:  connect
}