module.exports = function( app ) {
  var express = require( "express" );
  var router = express.Router();
  var fs = require("fs");
  var multipart = require('connect-multiparty');
  var multipartMiddleware = multipart();
  var php=require('node-php');
   

  var mongojs=require('mongojs');
	var db;

var severfile=require('../controller/controller');


//this is middlewhere to check use login is register with session or not
function restrict_user(req, res, next) {
    //console.log(req.session.role);
    if ((req.session.username) && (req.session.role == 'editor')) {
        res.render('view/category');
    } else if ((req.session.username) && (req.session.role == 'admin')) {
        res.render('view/dashbord');
    }else if ((req.session.username) && (req.session.role == 'investigator')) {
        res.render('view/investigator');
    }else{
        res.redirect('/');
    }
}

/*function restrict_admin(req, res, next) {
    if ((req.session.username) && (req.session.role == 'admin')) {
        next();
    } else {
        res.redirect('/');
    }
}*/

//we are using midddleware if seesion is not created it will not routed to category,goes to home page

router.get('/', function(req, res) {
res.render('view/index');
});

router.get('/dashbord',restrict_user,function(req, res) {

});
router.get('/dashbord',restrict_user,function(req, res) {

});


app.post('/upload', multipartMiddleware, function(req, res) {
    console.log("path:"+JSON.stringify(req.body));
    var fs = require('fs');
    fs.readFile(req.files.upload.path, function (err, data) {

        var newPath = __dirname +'/images/'+req.files.upload.name;
        console.log(newPath);
        fs.writeFile(newPath, data, function (err) {
          console.log("newPath:"+newPath);
            if (err) console.log({err: err});
             else {
                html = "";
                html += "<script type='text/javascript'>";
                html += "    var funcNum = " + req.query.CKEditorFuncNum + ";";
                html += "    var url     =  \"" + req.files.upload.name + "\";";
                html += "    var message = \"Uploaded file successfully\";";
                html += "";
                html += "    window.parent.CKEDITOR.tools.callFunction(funcNum, url, message);";
                html += "</script>";
                res.send(html);
            }
        });
    });
  });




    router.post('/login', function(req, res) {
	    //console.log(JSON.stringify(req.body));
        severfile.login(req.body,function(data){
           //console.log("response data:"+JSON.stringify(data));
           for(var i=0;i<data.length;i++)
           {
            if(data[i]!=null)
            {
               req.session.username = data[i].username;
               req.session.password = data[i].password;
               req.session.role = data[i].role;
		           res.json(true);
               
            }
           }

            if(data.length==0)
            {
                res.json(false);
            }
         });      
    });

    /* ------999999999999999999registeration form for user and admin  -----------------------------------------------*/
    router.post('/registration', function(req, res) {
          //console.log("registration data:"+JSON.stringify(req.body));
           severfile.registration(req.body,function(data){
               res.json(data);
           });

    });

    /* ------999999999999999999registeration form for user and admin  -----------------------------------------------*/

     router.post('/addCountry', function(req, res) {
           // console.log("entercountry:"+JSON.stringify(req.body));
            severfile.addCountry(req.body,function(data){
                res.json(data);
            });
    });

    router.post('/deleteCountry', function(req, res) {
            //console.log("deleteCountry:"+JSON.stringify(req.body));
            severfile.deleteCountry(req.body,function(data){
                res.json(data);
            });
    });

     router.post('/addState', function(req, res) {
            //console.log("cmgstate:"+JSON.stringify(req.body));
            severfile.addState(req.body,function(data){
                res.json(data);
            });
    });

     router.post('/deleteState', function(req, res) {
            //console.log("deleteCountry:"+JSON.stringify(req.body));
            severfile.deleteState(req.body,function(data){
                res.json(data);
            });
    });

      router.post('/addCity', function(req, res) {
            //console.log("cmgcity:"+JSON.stringify(req.body));
            severfile.addCity(req.body,function(data){
                res.json(data);
            });
    });

      router.post('/deleteCity', function(req, res) {
            //console.log("deleteCountry:"+JSON.stringify(req.body));
            severfile.deleteCity(req.body,function(data){
                res.json(data);
            });
    });

      router.post('/addLocation', function(req, res) {
            //console.log("cmglocation:"+JSON.stringify(req.body));
            severfile.addLocation(req.body,function(data){
                res.json(data);
            });
    });

    router.post('/deleteLoc', function(req, res) {
            //console.log("deleteCountry:"+JSON.stringify(req.body));
            severfile.deleteLoc(req.body,function(data){
                res.json(data);
            });
    });

    router.get('/getCountry', function(req, res) {
           // console.log("cmgcountry:"+JSON.stringify(req.body));
            severfile.getCountry(req.body,function(data){
                res.json(data);
            });
    });

    router.get('/getState', function(req, res) {
            //console.log("cmgcountry:"+JSON.stringify(req.body));
            severfile.getState(req.body,function(data){
                res.json(data);
            });
    });

    router.get('/getCity', function(req, res) {
            //console.log("cmgcountry:"+JSON.stringify(req.body));
            severfile.getCity(req.body,function(data){
                res.json(data);
            });
    });


    router.get('/getLocation', function(req, res) {
            //console.log("cmgcountry:"+JSON.stringify(req.body));
            severfile.getLocation(req.body,function(data){
                res.json(data);
            });
    });

    /* ----------------this function is fire for assignededitor name  ---------------------------*/


    router.post('/assignedState', function(req, res) {
            //console.log("assignededitor:"+JSON.stringify(req.body));
            severfile.assignedState(req.body,function(data){
                res.json(data);
            });
    });

    router.post('/assignedCity', function(req, res) {
            //console.log("assignededitor:"+JSON.stringify(req.body));
            severfile.assignedCity(req.body,function(data){
                res.json(data);
            });
    });

    router.post('/assignedLocation', function(req, res) {
            //console.log("assignededitor:"+JSON.stringify(req.body));
            severfile.assignedLocation(req.body,function(data){
                res.json(data);
            });
    });

    
    router.get('/getCategory', function(req, res) {
           // console.log("editorname:"+req.session.username);
            severfile.getCategory(req.body,function(data){
                res.json(data);
            });
    });

    router.post('/addcategory', function(req, res) {
           // console.log("editorname:"+req.session.username);
            severfile.addcategory(req.body,function(data){
                res.json(data);
            });
    });

    router.get('/getloginDetails', function(req, res) {
           // console.log("editorname:"+req.session.username);
            severfile.getloginDetails(req.body,function(data){
                res.json(data);
            });
    });
 
 /*---------------api for get assinged state,city,location and category------------------------------------------*/
    router.get('/getassignState', function(req, res) {
           // console.log("editorname:"+req.session.username);
            severfile.getassignState(req.session.username,function(data){
                res.json(data);
            });
    });

    router.get('/getassignCity', function(req, res) {
           // console.log("editorname:"+req.session.username);
            severfile.getassignCity(req.session.username,function(data){
                res.json(data);
            });
    });

    router.get('/getassignLocation', function(req, res) {
           // console.log("editorname:"+req.session.username);
            severfile.getassignLocation(req.session.username,function(data){
                res.json(data);
            });
    });
 /*---------------api for get assinged state,city,location and category start------------------------------------------*/
 /*---------------api for updated selected category to particular update------------------------------------------*/

  router.post('/updateassignState', function(req, res) {
            //console.log("categoryupdate:"+JSON.stringify(req.body));
            severfile.updateassignState(req.body,function(data){
                res.json(data);
            });
    });

   router.post('/updateassignCity', function(req, res) {
            //console.log("categoryupdate:"+JSON.stringify(req.body));
            severfile.updateassignCity(req.body,function(data){
                res.json(data);
            });
    });

   router.post('/updateassignLocation', function(req, res) {
           // console.log("categoryupdate:"+JSON.stringify(req.body));
            severfile.updateassignLocation(req.body,function(data){
                res.json(data);
            });
    });
 /*---------------api for updated selected category to particular update------------------------------------------*/

 /*--------------------------------------------ajax query from category.js------------------------------------------*/
   router.post('/getstateitemlist', function(req, res) {
            //console.log("selectedstate:"+JSON.stringify(req.body.selectedstate));
            // console.log("loginUser:"+req.session.username);

             var obj = {};
                   
              obj["state"] =req.body.selectedstate;
              obj["assinged_to"] =req.session.username;

              //console.log("makingcombo:"+JSON.stringify(obj));

            severfile.getstateitemlist(obj,function(data){
                res.json(data);
            });
    });

   router.post('/getcityitemlist', function(req, res) {
            //console.log("selectedcity:"+JSON.stringify(req.body.selectedcity));
             //console.log("loginUser:"+req.session.username);

             var obj = {};
                   
              obj["city"] =req.body.selectedcity;
              obj["assinged_to"] =req.session.username;

              //console.log("makingcombo:"+JSON.stringify(obj));

            severfile.getcityitemlist(obj,function(data){
                res.json(data);
            });
    });

   router.post('/getlocationitemlist', function(req, res) {
            //console.log("selectedcity:"+JSON.stringify(req.body.selectedlocation));
            //console.log("loginUser:"+req.session.username);

             var obj = {};
                   
              obj["location"] =req.body.selectedlocation;
              obj["assinged_to"] =req.session.username;

              //console.log("makingcombo:"+JSON.stringify(obj));

            severfile.getlocationitemlist(obj,function(data){
                res.json(data);
            });
    });



 /*--------------------------------------------ajax query from category.js------------------------------------------*/
 /*--------------------------------------------api to save the siteseen from category.js-----------------------------*/
   router.post('/addSiteSeen', function(req, res) {
            //console.log("selectedcity:"+JSON.stringify(req.body));
            //console.log("loginUser:"+req.session.username);

             var obj = req.body;
                   
            
              obj["editor_name"] =req.session.username;

            //console.log("siteseen:"+JSON.stringify(obj));

            severfile.addSiteSeen(obj,function(data){
                res.json(data);
            });
    });




 /*--------------------------------------------api to save the siteseen from category.js------------------------*/

 /*--------------------------------------------api to get the siteseen from category.js-----------------------------*/
   router.post('/getSiteseen', function(req, res) {
            //console.log("selectedcity:"+JSON.stringify(req.body));
            //console.log("loginUser:"+req.session.username);

             var obj = req.body;
                   
            
              obj["editor_name"] =req.session.username;

            //console.log("siteseen:"+JSON.stringify(obj));

            severfile.getSiteseen(obj,function(data){
                res.json(data);
            });
    });

 /*--------------------------------------------api to get the siteseen from category.js------------------------*/
/*--------------------------------------------api to update the siteseen from category.js------------------------*/
router.post('/updateSiteSeen', function(req, res) {
            //console.log("selectedcity:"+JSON.stringify(req.body));
            //console.log("loginUser:"+req.session.username);

             var obj = req.body;
                   
            
              obj["editor_name"] =req.session.username;

            //console.log("siteseen:"+JSON.stringify(obj));

            severfile.updateSiteSeen(obj,function(data){
                res.json(data);
            });
    });



 /*--------------------------------------------api to update the siteseen from category.js------------------------*/


 /* -------------######  here api is started for ananlytics page ######-----------------------------------*/

  // 1111 get all the assigned state for analytics
  router.get('/ananlyticsState', function(req, res) {
           // console.log("cmgcountry:"+JSON.stringify(req.body));
            severfile.ananlyticsState(req.body,function(data){
                res.json(data);
            });
    });

  // 2222 get all the assigned city for analytics
  router.get('/ananlyticsCity', function(req, res) {
           // console.log("cmgcountry:"+JSON.stringify(req.body));
            severfile.ananlyticsCity(req.body,function(data){
                res.json(data);
            });
    });
  // 333 get all the assigned Location for analytics
  router.get('/ananlyticsLoc', function(req, res) {
           // console.log("cmgcountry:"+JSON.stringify(req.body));
            severfile.ananlyticsLoc(req.body,function(data){
                res.json(data);
            });
    });
  // 444 get all work status for analytics
  router.get('/workStatus', function(req, res) {
           // console.log("cmgcountry:"+JSON.stringify(req.body));
            severfile.workStatus(req.body,function(data){
                res.json(data);
            });
    });


/* --------------######  here api is ended for ananlytics page ######------------------------------------*/
/*-----------5.when clicked at auditor colmun in status tab this api will fire-------------------------*/
router.get('/gettotalinspector', function(req, res) {
           // console.log("cmgcountry:"+JSON.stringify(req.body));
            severfile.gettotalinspector(req.body,function(data){
                res.json(data);
            });
    });
router.post('/assignedInpector', function(req, res) {
           
            severfile.assignedInpector(req.body,function(data){
                res.json(data);
            });
    });
/*----------6.this api will get all data from inpectorDb which is finalized by inpector------------------------*/
router.get('/inspectData', function(req, res) {
           
            severfile.inspectData(req.body,function(data){
                res.json(data);
            });
    });
router.post('/getData', function(req, res) {
           
            severfile.getData(req.body,function(data){
                res.json(data);
            });
    });
/*-----7. this api update and save data into based at button click in  inpectordb $ finalDb-----*/
router.post('/UpdateinpectorDb', function(req, res) {
           
            severfile.UpdateinpectorDb(req.body,function(data){
                res.json(data);
            });
});

router.post('/insertIntoFinalDb', function(req, res) {
           
            severfile.insertIntoFinalDb(req.body,function(data){
                res.json(data);
            });
});

app.use('/',router);
}
