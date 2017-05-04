module.exports = function( app ) {
  var express = require( "express" );
  var router = express.Router();
  var fs = require("fs");
  var multipart = require('connect-multiparty');
  var multipartMiddleware = multipart();
  var php=require('node-php');
   

  var mongojs=require('mongojs');
	var db;

var auditorfile=require('../controller/auditorcontroller');

/*--------1.this api will fire when page load,get all data from siteseen which is finalize status-----------*/ 
router.get('/getsiteseenDetails', function(req, res) {
            //console.log("editorname:"+req.session.username);
            var obj=req.body;
            obj["auditor"] =req.session.username;
            auditorfile.getsiteseenDetails(obj,function(data){
                res.json(data);
            });
    });

/*----2.this api will fire when page load,get all country name from siteseen which is finalize status-------*/ 
router.get('/getsiteseenCountry', function(req, res) {
            //console.log("editorname:"+req.session.username);
            auditorfile.getsiteseenCountry(req.body,function(data){
                res.json(data);
            });
    });

/*----3.this api will fire when choose country,get all state name from siteseen which is finalize status-----*/ 
router.post('/getsiteseenState', function(req, res) {
            // console.log("selected country:"+JSON.stringify(req.body));
            auditorfile.getsiteseenState(req.body,function(data){
                res.json(data);
            });
    });

/*----4.this api will fire when choose state,get all city name from siteseen which is finalize status-----*/ 
router.post('/getsiteseenCity', function(req, res) {
            // console.log("selected country:"+JSON.stringify(req.body));
            auditorfile.getsiteseenCity(req.body,function(data){
                res.json(data);
            });
    });

/*----5.this api will fire when choose city,get all location name from siteseen which is finalize status-----*/ 
router.post('/getsiteseenLoc', function(req, res) {
            // console.log("selected country:"+JSON.stringify(req.body));
            auditorfile.getsiteseenLoc(req.body,function(data){
                res.json(data);
            });
    });

/*-------6.this api will fire when selected filter,get all related siteseen which have finalized status-----*/  
router.post('/filtersiteseen', function(req, res) {
           // console.log("filtered data:"+JSON.stringify(req.body));
              var obj = req.body;
                   
              obj["status"] =2;
              obj["auditor"] =req.session.username;
            auditorfile.filtersiteseen(obj,function(data){
                res.json(data);
            });
    });

/*---8.this api will fire when inpector click at edit option get all related data from siteseen through id---*/
router.post('/Details', function(req, res) {
          // console.log("editor ID:"+JSON.stringify(req.body));
            auditorfile.Details(req.body,function(data){
                res.json(data);
            });
    });

/*---9.this api will fire when inpector click at save $ final button to update siteseen save in inpectordb --*/
router.post('/siteseenUpdate', function(req, res) {

            auditorfile.siteseenUpdate(req.body,function(data){
                res.json(data);
            });
    });
router.post('/inpectorSiteseen', function(req, res) {

            var obj = req.body;
            obj["auditor"] =req.session.username;

            auditorfile.inpectorSiteseen(obj,function(data){
                res.json(data);
            });
    });


app.use('/',router);
}