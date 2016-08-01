const http = require('http');
var querystring = require('querystring');

var postData = querystring.stringify({
  'apiKey' : 're656117399127175378891168308063',
  'country' : 'US',
  'currency' : 'USD',
  'locale' : 'en-US',
  'locationSchema' : 'iata',
  'originplace' : 'EDI-iata',
  'destinationplace': 'CNF-iata',
	'outbounddate' : '2016-09-23'
});

//var postData = 'http://api.skyscanner.net/apiservices/pricing/v1.0/?apikey=re656117399127175378891168308063 HTTP/1.1';

var options = {
  hostname: 'partners.api.skyscanner.net',
  port: 80,
  path: "/apiservices/pricing/v1.0",
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json',
    'Content-Length' :  Buffer.byteLength(postData)		
	//'Transfer-Encoding' : 'chunked'
  }
};



var req = http.request(options, (res) => {
  /*console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
  */
  console.log("LOCATION: " + res.headers.location);

  var optionsGet = {
  	//host: res.headers.location,
	host: 'partners.api.skyscanner.net',
  	port: 80,
  	path: res.headers.location+'/?apiKey=re656117399127175378891168308063',
  	method: 'GET',
  	headers: {
	
    	'Host': 'api.skyscanner.net',
    	'Accept': 'application/json'
  }
  };

  var getReq = http.request (optionsGet, (resGet) => {
  	console.log('requisicao GET');
  	resGet.setEncoding('utf8');
  	resGet.on('data', (chunk) => {
  	  console.log(`BODY: ${chunk}`);
	});
	resGet.on('end', () => {
	    console.log('No more data in response.');
	});
  });	
  // write data to request body
  //getReq.write();

  getReq.end();

});

req.on('error', (e) => {
  console.log(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);

req.end();