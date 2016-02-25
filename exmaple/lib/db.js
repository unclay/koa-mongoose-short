var koashort = require('../../lib/connect');
var Schema   = koashort.mongoose.Schema;
var UserSchema = new Schema({
	name:  String,
	pass:  String,
	email: String
});
var User = koashort.db.model('User', UserSchema);
module.exports = function(){
	return function* (next){
		this.model = this.model || {};
		if( !this.model.user ) this.model.user = User;
		yield next;
	}
}