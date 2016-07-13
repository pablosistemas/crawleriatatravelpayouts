//var bson = require('bson');
var fs = require('fs');
//var BSON = new bson.BSONPure.BSON();

var bson_file = fs.readFile("Downloads/residencia/aeroportos.json",'utf8',function(err,data){
	if(err) throw err;
	//console.log(data);	
	//var doc_fmt = BSON.deserialize(data);
	var obj = JSON.parse(data);
	//console.log(obj);
	/*obj.forEach(function(elemento){
		console.log(elemento);
	});*/
})
