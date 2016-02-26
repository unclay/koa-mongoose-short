var expect  = require('chai').expect;
var mongoose = require('mongoose')
var koashort = require('../lib/connect');

describe('短链接mongod', function(){
	it('koashort.mongoose === mongoose', function(){
		expect(koashort.mongoose).to.equal(mongoose);
	});

	it('koashort.db       ==  mongoose.createConnection()', function(){
		expect(koashort.db).to.eql(mongoose.createConnection());
	});

	it('koashort.connect is a function', function(){
		expect(koashort.connect).to.be.a('function');
	});

	it('koashort.connect({}) is a function', function(){
		expect(koashort.connect({})).to.be.a('function');
	});

	it('koashort.connect() 容错处理,参数为空', function(){
		expect(koashort.connect()).to.be.a('function');
	});

});