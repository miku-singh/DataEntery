var express = require( "express" );
var mysql  = require('mysql');

 var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'limestem',
    database : 'tourism'
  });
  connection.connect();
exports.getsiteseenDetails=function(data,callback){
	//console.log("data from login code:"+JSON.stringify(data));
	 q='SELECT id,country,state,city,location,sitename,editor_name FROM siteseen WHERE status = 2 AND auditor="'+data.auditor+'" AND inpectorStatus = 0';

	  connection.query(q, function(err, result) { 
	  	//console.log(result);
	 	callback(result);
	  });
	
};
/*----2.this api will fire when page load,get all country name from siteseen which is finalize status-------*/ 

exports.getsiteseenCountry=function(data,callback){
	//console.log("data from login code:"+JSON.stringify(data));
	 q='SELECT country FROM siteseen WHERE status = 2 ';

	  connection.query(q, function(err, result) { 
	  	//console.log(result);
	 	callback(result);
	  });
	
};
/*----3.this api will fire when choose country,get all state name from siteseen which is finalize status-----*/ 
exports.getsiteseenState=function(data,callback){
	//console.log("selected country:"+JSON.stringify(data));
	 q='SELECT state FROM siteseen WHERE status = 2 AND country="'+data.country+'"';

	  connection.query(q, function(err, result) { 
	  	//console.log(result);
	 	callback(result);
	  });
	
};
/*----4.this api will fire when choose state,get all city name from siteseen which is finalize status-----*/ 
exports.getsiteseenCity=function(data,callback){
	//console.log("selected state:"+JSON.stringify(data));
	 q='SELECT city FROM siteseen WHERE status = 2 AND state="'+data.state+'" AND country="'+data.country+'" ';

	  connection.query(q, function(err, result) { 
	  	//console.log(result);
	 	callback(result);
	  });
	
};
/*----5.this api will fire when choose city,get all location name from siteseen which is finalize status-----*/ 
exports.getsiteseenLoc=function(data,callback){
	//console.log("selected city:"+JSON.stringify(data));
	 q='SELECT location FROM siteseen WHERE status = 2 AND city="'+data.city+'" AND state="'+data.state+'" AND country="'+data.country+'" ';

	  connection.query(q, function(err, result) { 
	  	console.log(result);
	 	callback(result);
	  });
	
};
/*-------6.this api will fire when selected filter,get all related siteseen which have finalized status-----*/  
exports.filtersiteseen=function(data,callback){
	//console.log("filtered data:"+JSON.stringify(data));
	var input = JSON.parse(JSON.stringify(data));
	    var query={};
		  for(var key in input)
		  {
		  	//console.log("key:"+key);
		  	//console.log("value:"+input[key]);
		  	if(!(input[key]=="null"))
		  	{
               query[key] = input[key]; 
		  	}
		  }
		//console.log("make query:"+JSON.stringify(query));
		//console.log("make query length:"+Object.keys(query).length);

		if(Object.keys(query).length==3)
		{
		  //console.log("country field");
		  connection.query('select * from siteseen  where country=? AND status=? AND auditor=? AND inpectorStatus = 0',[input.country,input.status,input.auditor],function(err, result) { 
	    	callback(result);
	      });
		}
		else if(Object.keys(query).length==4)
		{
			connection.query('select * from siteseen  where country=? AND state=? AND status=? AND auditor=? AND inpectorStatus = 0',[input.country, input.state,input.status,input.auditor],function(err, result) { 
	 	      callback(result);
	       });
		}
		else if(Object.keys(query).length==5)
		{
			connection.query('select * from siteseen  where country=? AND state=? AND city=? AND status=? AND auditor=? AND inpectorStatus = 0',[input.country, input.state,input.city,input.status,input.auditor],function(err, result) { 
			 	callback(result);
			 });
		}
		else if(Object.keys(query).length==6)
		{
			connection.query('select * from siteseen  where country=? AND state=? AND city=? AND location=? AND status=? AND auditor=? AND inpectorStatus = 0',[input.country, input.state,input.city, input.location,input.status,input.auditor],function(err, result) { 
			 	callback(result);
			 });
		}
	
};

/*---8.this api will fire when inpector click at edit option get all related data from siteseen through id---*/
exports.Details=function(data,callback){
	//console.log("editor ID:"+JSON.stringify(data));
	 q='SELECT * FROM siteseen WHERE id ='+data.id+'';

	  connection.query(q, function(err, result) { 
	  	//console.log(result);
	 	callback(result);
	  });
	
};

/*---9.this api will fire when inpector click at save $ final button to update siteseen save in inpectordb --*/
exports.siteseenUpdate=function(data,callback){
	 //console.log("siteseenUpdate:"+JSON.stringify(data));
    var query = 'UPDATE siteseen SET content = ?, keywords =?, tags=? WHERE id=? ';
	connection.query(query,[data.editor1,data.keywords,data.tags,data.id],function (err, result) {
	  	//console.log(result);
	  	//console.log(err);
	 	callback(result);
	 });
	
};

exports.inpectorSiteseen=function(data,callback){
	// console.log("inpectordb:"+JSON.stringify(data));

	 var input = JSON.parse(JSON.stringify(data));
	 var query = {
            country    : input.country,
            state      : input.state,
            city       : input.city,
            location   : input.location,
            sitename   : input.sitename,
            content    : input.editor1,
            keywords   : input.keywords,
            tags       : input.tags,
            auditor_name     :  input.auditor
        };

    q='SELECT id,country,state,city,location,sitename,editor_name FROM siteseen WHERE status = 2 AND auditor="'+data.auditor+'" AND inpectorStatus = 0';
 //console.log("query:"+JSON.stringify(query));
	connection.query("INSERT INTO inpectorDb set ? ",query,function(err, result) { 
	  	   connection.query('UPDATE siteseen SET inpectorStatus = 1 WHERE id=? ',[data.id],function (err, result1) {
			  	//console.log(result);
	             connection.query(q,[data.id],function (err,data){

				  	//console.log(err);
				 	callback(data);
				   });

			});
	 });
	
};