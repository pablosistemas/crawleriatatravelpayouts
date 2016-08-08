const http = require('http');
const fs = require('fs');

/*************************************************************/
// CONSULTA API DE VOOS SKYSCANNER A PARTIR DE STRINGS IATA
// (ORIGEM E DESTINO) RECEBIDAS COMO PARÂMETRO
// Formato: node getnode.js IATAOrigem IATADestino

/*************************************************************/
if(process.argv.length != 4){
	console.log("Argumentos invalidos");
}

iata1 = process.argv[2];
iata2 = process.argv[3];

var dataGlob = '';

var pastaDestino = 'consultas/';

var consulta = "http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/UK/BRL/en-GB/"+iata1+"/"+iata2+"/20161021/?apiKey=re656117399127175378891168308063";

// console.log(consulta);

//'http://partners.api.skyscanner.net/apiservices/browsedates/v1.0/UK/USD/en-GB/CNF/GRU/20161021/?apiKey=re656117399127175378891168308063'

var req = http.get(consulta, 
	function(res) {
	  //console.log(`Got response: ${res.statusCode}`);
	  
	  res.on('end', function(){
	  	if(dataGlob !== "Erro"){
		  	dataGlob = dataGlob.replace(/\n/g,'');
			//console.log(dataGlob);
			var dataJson = JSON.parse(dataGlob); 
			//console.log(iata1+" "+iata2);
			//console.log(dataJson.Quotes.length);
			if(dataJson.Quotes.length > 0){
				var obj 	= {};
				obj.origem 	= {};
				obj.destino 	= {};
				obj.preco 	= dataJson.Quotes[0].MinPrice;
				obj.partida 	= dataJson.Quotes[0].QuoteDateTime.slice(11,dataJson.Quotes[0].QuoteDateTime.length);			
			
				if(dataJson.Quotes[0].OriginId == dataJson.Places[0].PlaceId){
					obj.origem.nomeAeroporto = dataJson.Places[0].Name;
					obj.origem.iata 	= dataJson.Places[0].IataCode;
					obj.origem.nomeCidade 	= dataJson.Places[0].CityName;
					obj.origem.iataCidade	= dataJson.Places[0].CityId;
					obj.origem.pais 	= dataJson.Places[0].CountryName;
				
					obj.destino.nomeAeroporto = dataJson.Places[1].Name;
					obj.destino.iata 	= dataJson.Places[1].IataCode;
					obj.destino.nomeCidade 	= dataJson.Places[1].CityName;
					obj.destino.iataCidade	= dataJson.Places[1].CityId;
					obj.destino.pais 	= dataJson.Places[1].CountryName;
				} else {
					obj.origem.nomeAeroporto = dataJson.Places[1].Name;
					obj.origem.iata 	= dataJson.Places[1].IataCode;
					obj.origem.nomeCidade 	= dataJson.Places[1].CityName;
					obj.origem.iataCidade	= dataJson.Places[1].CityId;
					obj.origem.pais 	= dataJson.Places[1].CountryName;
				
					obj.destino.nomeAeroporto = dataJson.Places[0].Name;
					obj.destino.iata 	= dataJson.Places[0].IataCode;
					obj.destino.nomeCidade 	= dataJson.Places[0].CityName;
					obj.destino.iataCidade	= dataJson.Places[0].CityId;
					obj.destino.pais 	= dataJson.Places[0].CountryName;
			
				}
				   
				//console.log(dataJson.Quotes[0]);
		
				//fs.writeFile(pastaDestino+iata1+'2'+iata2, JSON.stringify(obj), (err) => {
				fs.writeFile(pastaDestino+obj.origem.iata+'2'+obj.destino.iata, JSON.stringify(obj), (err) => {
				  if (err) throw err;
				  //console.log('It\'s saved!');
				});
			}
		}
		
	  });
	  
	  if(res.statusCode == 200){
	  	
	  	res.on('data', (chunk) => {
	  		/*console.log(`${chunk}`);
	  		console.log();
	  		console.log();*/
	  		dataGlob = dataGlob.concat(chunk); 
	  		//console.log(dataGlob);
	  	});
	  } else {
	  	dataGlob = "Erro";
	  	fs.appendFile("errosSkyScannerQueries", iata1+'2'+iata2+"\n", (err) => {
		  if (err) throw err;
		});
	  }
	  
	  
	  // consume response body
	  res.resume();
	}).on('error', (e) => {
	  console.log(`Got error: ${e.message}`);
	});


req.end();
