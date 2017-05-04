$( document ).ready(function()
 {
		
/* ----------------44444444444444 api for get registered editor info start---------------------------*/
var totaleditor;
 $.ajax({
		    url : "/getloginDetails",
		    type: "GET",
		    cache: false,
		    async: false ,
		    success: function(data)
		    {
		    	
		        //console.log( "editor:"+JSON.stringify(data) );
		        totaleditor=data;
		        for( var i=0;i<data.length;i++)
		        {

		       		  //console.log("filtered location:"+data[i].name);
                     editorName=' <option>'+data[i].username+'</option>';
                    $(' #editorName').append(editorName);
                     $('.editorName').append(editorName);
                    //content.find('.selectpicker.editorName').append(editorName);
   		        }
		        
		    }
		   });
//console.log( "editor1:"+JSON.stringify(totaleditor));
/* ----------------44444444444444 api for get registered editor info start---------------------------*/
/*-------------2.this api will add the new category in category table--------------------------------------------*/
var totalcategory;
 $("#addcategorymodel").on('click','#submit',function() {
  	 
     var value= $('#addcategorymodel #category').val() ;
     //alert(value);
          
    $.ajax({
		    url : "/addcategory",
		    type: "POST",
		    data :{category:value},
		    success: function(data)
		    {
		        totalcategory=data;
		    }
		});

  });	
 /*-------------2.this api will add the new category in category table--------------------------------------------*/
/* ----------------44444444444444 api for get state category list  start---------------------------*/

      $.ajax({
		    url : "/getCategory",
		    type: "GET",
		    cache: false,
		    async: false ,
		    success: function(data)
		    {
		       // console.log( "Category1:"+JSON.stringify(data) );
		        totalcategory=data;     
		    }
		   });
//console.log( "Category2:"+JSON.stringify(totalcategory));
/* ----------------44444444444444 api for get state category list  end---------------------------*/
/* ----------------------------------------ajax request for post method start---------------------------*/

/* ----------------111111111111111111111111ajax request for post country name---------------------------*/

  $('#submit').click(function()
  {
  	var country=$('#country').val();
    console.log( "country:"+country );
      //location.reload();
      $('#addcountrylist').empty();
     $.ajax({
		    url : "/addCountry",
		    type: "POST",
		    data : {country:country},
		    success: function(data, textStatus)
		    {
		        for( var i=0;i<data.length;i++)
		        {
                    var addcountry='<li id="'+data[i].country+'" class="list-group-item countrycode" style=""><button id="countrycode">'+data[i].country+'</button><button class="btn  dropdown-toggle conname" type="button" data-toggle="dropdown" id="city" style="float: right;padding: 0px;margin-top:-10px;margin-right:-15px;height:44px;width:20px;"><span class="caret"></span></button><ul class="list-group dropdown-menu stylish"><li class="list-group-item addstate" data-id="'+data[i].id+'" >Add State</li><li id="'+data[i].id+'" class="list-group-item Delete">Delete</li></ul></li>';
                   $('#addcountrylist').append(addcountry);
		        }
		    }
		   });
/* ----------------111111111111111111111111ajax request for post country name---------------------------*/



/* ----------------------------------------ajax request for post method end---------------------------*/

  });


  /* ########################################ajax request for get method start for country ########################*/
 
     $.ajax({
		    url : "/getCountry",
		    type: "GET",
		    cache: false,
		    success: function(data)
		    {
		        //console.log( "cmgcountry:"+JSON.stringify(data) );
		        for( var i=0;i<data.length;i++)
		        {
                    var addcountry='<li id="'+data[i].country+'" class="list-group-item countrycode" style=""><button id="countrycode">'+data[i].country+'</button><button class="btn  dropdown-toggle conname" type="button" data-toggle="dropdown" id="city " style="float: right;padding: 0px;margin-top:-10px;margin-right:-15px;height:44px;width:20px;"><span class="caret"></span></button><ul class="list-group dropdown-menu stylish"><li class="list-group-item addstate" data-id="'+data[i].id+'" >Add State</li><li id="'+data[i].id+'" class="list-group-item Delete">Delete</li></ul></li>';
                   $('#addcountrylist').append(addcountry);
		        }
		    }
		   });


/* ########################################ajax request for get method end#############################*/
/* ----------------11111111111111111 delete the country list 11111111111111111---------------------------*/
$('#addcountrylist').on('click', '.list-group-item.Delete', function(){
    var trid = $(this).closest('li').attr('id');// li ID for delete the selected country
     //alert(trid);
     $('#addcountrylist').empty();
      $.ajax({
		    url : "/deleteCountry",
		    type: "POST",
		    data : {id:trid},
		    success: function(data)
		    {
		         for( var i=0;i<data.length;i++)
		        {
                    var addcountry='<li id="'+data[i].country+'" class="list-group-item countrycode" style=""><button id="countrycode">'+data[i].country+'</button><button class="btn  dropdown-toggle conname" type="button" data-toggle="dropdown" id="city" style="float: right;padding: 0px;margin-top:-10px;margin-right:-15px;height:44px;width:20px;"><span class="caret"></span></button><ul class="list-group dropdown-menu stylish"><li class="list-group-item addstate" data-id="'+data[i].id+'" >Add State</li><li id="'+data[i].id+'" class="list-group-item Delete">Delete</li></ul></li>';
                   $('#addcountrylist').append(addcountry);
		        }
		        
		    }
		   });
  });

/* ----------------11111111111111111 delete the country list 11111111111111111---------------------------*/

/* ----------------22222222222222222222222222ajax request for post state name---------------------------*/

$('#addcountrylist').on('click', '.addstate', function(){

    var trid = $(this).parent().closest('li').attr('id');// li ID
   // alert(trid);
    
    var content='<div class="modal fade" id="myModal2" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Register State Name</h4></div><div class="modal-body"><input type="text" class="form-control" placeholder="Enter state Name here" id="stateval"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" id="submit2" data-trid="'+trid+'" data-dismiss="modal">Submit</button></div></div></div></div>';

    $(".modalAddstate").empty();
    $(".modalAddstate").html(content);
    $("#myModal2").modal("show");
     //alert(content);
 });

	$('.modalAddstate').on('click','#submit2',function(e)
  {
    var trid=$("#submit2").data("trid");
    //alert("countrycode:"+trid);
  	var state=$('#stateval').val();
    //alert( "state:"+state );
    e.preventDefault();
    $('#addstatelist').empty();
       $.ajax({
		    url : "/addState",
		    type: "POST",
		    data : {countrycode:trid,state:state},
		    success: function(data)
		    {
		    	console.log( "cmgstate:"+JSON.stringify(data) );
		        for( var i=0;i<data.length;i++)
		        {

		        	if(trid==data[i].countrycode)
		        	{
		        		//console.log("filtered state:"+data[i].state);
                     

                    addstate='<li id="'+data[i].state+'" class="list-group-item statecode" style=""><button id="statecode">'+data[i].state+'</button><button class="btn  dropdown-toggle" type="button" data-toggle="dropdown" id="city" style="float: right;padding: 0px;margin-top:-10px;margin-right:-15px;height:44px;width:20px;"><span class="caret"></span></button><ul class="list-group dropdown-menu stylish"><li class="list-group-item addcity" data-id="'+data[i].id+'">Add city</li><li class="list-group-item stateitem" data-id="'+data[i].id+'">Item List</li><li data-id="'+data[i].id+'" class="list-group-item clickassignstate">assigned_to</li><li id="'+data[i].id+'" class="list-group-item DeleteState">Delete</li></ul></li>';
                    $('#addstatelist').append(addstate);
                    }
		        }
		    }
		   });

 })

//});
/* ----------------22222222222222222222222222ajax request for post state name---------------------------*/


  /* ########################################ajax request for get method start for state ########################*/
var clickedcountry;
$('#addcountrylist').on('click','.countrycode',function()

{     
      var trid = $(this).closest('li').attr('id'); // table row ID to give clicked country name
      //alert(trid);
      clickedcountry=trid;
      $('#addcountrylist li').css("background-color","#ffffff");//clear the all list background color with white
	  $(this).css({"background-color":"#42bfed","color":"#fff"});//set the item list button background color

	  $('#addcountrylist #countrycode ').css({"background-color":"#ffffff","color":"black"});//clear the all button background color with white
	  $(this).find('#countrycode').css({"background-color":"#42bfed","color":"#fff"});//set the selected button background color with blue

	  $('#addcountrylist .conname').css({"background-color":"#ffffff","color":"black"});//clear the all dropdown button background color with white
	  $(this).find('.conname').css({"background-color":"#42bfed","color":"#fff"});//set the selected dropdown button background color with blue

      var addstate;
      $('#addstatelist').empty();
      $('#addcitylist').empty();
      $('#addlocationlist').empty();//select of country for state, city location list should be empty 

      $.ajax({
		    url : "/getState",
		    type: "GET",
		    cache: false,
		    success: function(data)
		    {
		       // console.log( "cmgstate:"+JSON.stringify(data) );
		        for( var i=0;i<data.length;i++)
		        {

		        	if(trid==data[i].countrycode)
		        	{
		        		//console.log("filtered state:"+data[i].state);
                    addstate='<li id="'+data[i].state+'" class="list-group-item statecode" style=""><button id="statecode">'+data[i].state+'</button><button class="btn  dropdown-toggle" type="button" data-toggle="dropdown" id="city" style="float: right;padding: 0px;margin-top:-10px;margin-right:-15px;height:44px;width:20px;"><span class="caret"></span></button><ul class="list-group dropdown-menu stylish"><li class="list-group-item addcity" data-id="'+data[i].id+'">Add city</li><li  class="list-group-item stateitem" data-id="'+data[i].id+'">Item List</li><li  class="list-group-item clickassignstate" data-id="'+data[i].id+'">assigned_to</li><li id="'+data[i].id+'" class="list-group-item DeleteState">Delete</li></ul></li>';
                    $('#addstatelist').append(addstate);
                    }
		        }
		        
		    }
		   });


});
  /* ########################################ajax request for get method end for state ########################*/
  /* ----------------44444444444444ajax request for post assignededitor name  ---------------------------*/
  
  $('#addstatelist').on('click', '.clickassignstate', function(){

    var trid = $(this).parent().closest('li').attr('id');// li ID
    //alert("selectedstate:"+trid);
    var content=$('<div class="modal fade" id="myModal5" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Assigned to EditorName</h4></div><div class="modal-body"><select class="selectpicker editorName" style="width: 100%;margin-bottom:10px;border-radius: 4px;height: 30px;" id="assignedName" ><option>select editor...</option></select> <input type="date" class="form-control" placeholder="selectdate" id="assignedDate"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" id="submit5" data-dismiss="modal" data-trid="'+trid+'">Submit</button></div></div></div></div>');

        for( var i=0;i<totaleditor.length;i++)
		        {
                     
                    content.find('select').append(' <option>'+totaleditor[i].username+'</option>');
   		        }

    $(".modalassignState").empty();
    $(".modalassignState").append(content);
    $("#myModal5").modal("show");
     //alert(content);
 });
	$('.modalassignState').on('click','#submit5',function(e)
  {
     var trid=$("#submit5").data("trid");
     //alert("selected state"+trid);
     $('#previewmodel #addassignstate1').empty();

     //alert( "countryname for this state:"+clickedcountry);

  	 var assignedName=$('#assignedName option:selected').val();
     //alert( "assignedName:"+assignedName );
     var assignedDate=$('#assignedDate').val();
     //alert( "assignedDate:"+assignedDate );
     e.preventDefault();
       $.ajax({
		    url : "/assignedState",
		    type: "POST",
		    data : {state:trid,assigned_to:assignedName,assigned_date:assignedDate,country:clickedcountry},
		    success: function(data)
		    {
		    	console.log("assignState:"+JSON.stringify(data));
		       var category_list='';
                var modelbody='';
                	modelbody+='<span class="refresh refresh1  btn btn-primary "><i class="fa fa-refresh"  aria-hidden="true"></i></span>';
                	modelbody+=' <span class="next  btn btn-rounded "><i class="fa fa-angle-double-right"></i> Next</span><span class="prev btn btn-rounded"><i class="fa fa-angle-double-left"></i> Previous</span><span class="" style="float:left;font-size: 12px; "><input type="text" id="search" class="form-control" placeholder="Search" style="height:28px;" /></span> <br><br><div class="table-responsive"> <table class="table table-bordered myTable scroll" id=""> <thead> <tr class="myHead"><th>Sn</th> <th>Name</th><th>State</th><th>Country</th><th>assignDate</th> <th>Category</th></tr> </thead> <tbody id="addassignstate1">';

 	        var addstate1='';
            for( var i=0;i<data.length;i++)
	        {    

	        	 category_list='';
	        	 category_list=data[i].category_list;
	       
	        	 addstate1+='<tr><td></td><td>'+data[i].assigned_to+'</td><td>'+data[i].state+'</td><td>'+data[i].country+'</td><td>'+data[i].assigned_date+'</td><td>';
                  

                  $.each($.parseJSON(category_list), function(k, v) {
                         addstate1+=' <span id="category">'+v+'</span>';
                      
	               });

                  addstate1+='</td> </tr>';
 
	        }
	        modelbody+=addstate1;
	        modelbody+=' </tbody></table>   </div>';
                      
	        $("#stateassign").empty();
	        $("#stateassign").html(modelbody);
                                   
	        pagination("stateassign");
                        
		    }
		   });

 })

/* ----------------44444444444444ajax request for post assignededitor name  ---------------------------*/
/* ------66666666666 this api fire when submit60 will be fire to update category in assignState table--------*/
$('#addstatelist').on('click', '.stateitem', function(){

    var trid = $(this).parent().closest('li').attr('id');// li ID
    //alert("selectedstatefor item:"+trid);
    var content=$('<div class="modal fade" id="stateItem" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Choose category</h4></div><div class="modal-body"><select class="selectpicker" style="width: 100%;margin-bottom:10px;border-radius: 4px;height: 30px;" id="editorName"> <option>select editor...</option></select><ul class="list-group" id="addCategory"></ul></div> <div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" id="submit60" data-dismiss="modal" data-trid="'+trid+'">Submit</button> </div></div></div></div>');

        for( var i=0;i<totaleditor.length;i++)
		        {
                     
                    content.find('select').append(' <option>'+totaleditor[i].username+'</option>');
   		        }
   		for( var i=0;i<totalcategory.length;i++)
		        {
                     
                    content.find('ul').append('<li id="'+totalcategory[i].name+'" class="list-group-item" style=""><span style=";">'+totalcategory[i].name+'</span><span style="float:right;"><input type="checkbox" value="'+totalcategory[i].name+'" name="editorName"></span></li>');
   		        }


    $(".modalassignstateitem").empty();
    $(".modalassignstateitem").append(content);
    $("#stateItem").modal("show");
     //alert(content);
 });
$('.modalassignstateitem').on('click','#submit60',function()
  {
  	 var trid=$("#submit60").data("trid");
     //alert("selected state"+trid);
     $('#previewmodel #addassignstate1').empty();
    $('#previewmodel').find('.next').removeClass('disabled');
    $('#previewmodel').find('.prev').removeClass('disabled');


  	 var assigned_to=$("#editorName option:selected").val();;
     //alert( "assigned_to:"+assigned_to );

      var category = [];
            $.each($("input[name='editorName']:checked"), function(){            
                category.push($(this).val());
            });
        //alert("selected category: " + category.join(", "));
    
       $.ajax({
		    url : "/updateassignState",
		    type: "POST",
		    data : {state:trid,assigned_to:assigned_to,category:category},
		    success: function(data, textStatus)
		    {
		    	console.log("updateassignState:"+JSON.stringify(data));
		       var category_list='';
                var modelbody='';
                	modelbody+='<span class="refresh refresh1  btn btn-primary "><i class="fa fa-refresh"  aria-hidden="true"></i></span>';
                	modelbody+=' <span class="next  btn btn-rounded "><i class="fa fa-angle-double-right"></i> Next</span><span class="prev btn btn-rounded"><i class="fa fa-angle-double-left"></i> Previous</span><span class="" style="float:left;font-size: 12px; "><input type="text" id="search" class="form-control" placeholder="Search" style="height:28px;" /></span> <br><br><div class="table-responsive"> <table class="table table-bordered myTable scroll" id=""> <thead> <tr class="myHead"><th>Sn</th> <th>Name</th><th>State</th><th>Country</th><th>assignDate</th> <th>Category</th></tr> </thead> <tbody id="addassignstate1">';

	 	        var addstate1='';
	            for( var i=0;i<data.length;i++)
		        {    

		        	 category_list='';
		        	 category_list=data[i].category_list;
		       
		        	 addstate1+='<tr><td></td><td>'+data[i].assigned_to+'</td><td>'+data[i].state+'</td><td>'+data[i].country+'</td><td>'+data[i].assigned_date+'</td><td>';
	                  

	                  $.each($.parseJSON(category_list), function(k, v) {
	                         addstate1+=' <span id="category">'+v+'</span>';
	                      
		               });

	                  addstate1+='</td> </tr>';
	 
		        }
		        modelbody+=addstate1;
		        modelbody+=' </tbody></table>   </div>';
	                      
		        $("#stateassign").empty();
		        $("#stateassign").html(modelbody);
	                                   
		        pagination("stateassign");
                        
		    }
		   });

 })


/* ------6666666666666 this api fire when submit60 will be fire to update category in assignState table-----------*/
/* ------------------------------- delete the state list ---------------------------------------*/
$('#addstatelist').on('click', '.list-group-item.DeleteState', function(){
    var trid = $(this).closest('li').attr('id');// li ID for delete the selected state
     //alert("clickedcountry:"+clickedcountry);
     $('#addstatelist').empty();
      $.ajax({
		    url : "/deleteState",
		    type: "POST",
		    data : {id:trid},
		    success: function(data)
		    {
		    	$('#addstatelist').empty();
		         for( var i=0;i<data.length;i++)
		        {

		        	if(clickedcountry==data[i].countrycode)
		        	{
		        		//console.log("filtered state:"+data[i].state);
                  var addstate='<li id="'+data[i].state+'" class="list-group-item statecode" style=""><button id="statecode">'+data[i].state+'</button><button class="btn  dropdown-toggle" type="button" data-toggle="dropdown" id="city" style="float: right;padding: 0px;margin-top:-10px;margin-right:-15px;height:44px;width:20px;"><span class="caret"></span></button><ul class="list-group dropdown-menu stylish"><li class="list-group-item addcity" data-id="'+data[i].id+'">Add city</li><li class="list-group-item stateitem" data-id="'+data[i].id+'">Item List</li><li  class="list-group-item clickassignstate" data-id="'+data[i].id+'">assigned_to</li><li id="'+data[i].id+'" class="list-group-item DeleteState">Delete</li></ul></li>';
                    $('#addstatelist').append(addstate);
                    }
		        }
		        
		    }
		   });
  });

/* ------------------------------- delete the state list ---------------------------------------*/


/* ----------------33333333333333333333333333ajax request for post city name---------------------------*/
$('#addstatelist').on('click', '.addcity', function(){

    var trid = $(this).parent().closest('li').attr('id');// li ID
    //alert(trid);
    var content='<div class="modal fade" id="myModal3" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Register State Name</h4></div><div class="modal-body"><input type="text" class="form-control" placeholder="Enter city Name here" id="cityval"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" id="submit3" data-trid="'+trid+'" data-dismiss="modal">Submit</button></div></div></div></div>';

    $(".modalAddcity").empty();
    $(".modalAddcity").html(content);
    $("#myModal3").modal("show");
     //alert(content);
 });

// $('#addstatelist').on('click', '#city', function(){
//      var trid = $(this).closest('li').attr('id'); // li ID
//     // alert(trid);
$('.modalAddcity').on('click','#submit3',function(e)
  {
    var trid=$("#submit3").data("trid");
    //alert("statecode:"+trid);
  	var city=$('#cityval').val();
    //alert( "city:"+city );
    e.preventDefault();
    $('#addcitylist').empty();
       $.ajax({
		    url : "/addCity",
		    type: "POST",
		    data : {statecode:trid,city:city},
		    success: function(data, textStatus)
		    {
		        //data - response from server
		        console.log(textStatus);
		        if(textStatus=="success")
		        {for( var i=0;i<data.length;i++)
		        {

		         	if(trid==data[i].statecode)
		         	{
		       		  //console.log("filtered city:"+data[i].city);
                     addcity='<li id="'+data[i].city+'" class="list-group-item citycode" style=""><button id="citycode">'+data[i].city+'</button><button class="btn  dropdown-toggle" type="button" data-toggle="dropdown" id="cityname" style="float: right;padding: 0px;margin-top:-10px;margin-right:-15px;height:44px;width:20px;"><span class="caret"></span></button><ul class="list-group dropdown-menu stylish"><li  data-id="'+data[i].id+'" class="list-group-item addlocation">Add location</li><li class="list-group-item cityitem" data-id="'+data[i].id+'">Item List</li><li  class="list-group-item clickassigncity" data-id="'+data[i].id+'">assigned_to</li><li id="'+data[i].id+'" class="list-group-item DeleteCity">Delete</li></ul></li>';
                    $('#addcitylist').append(addcity);
                   }
		        }
		        }  

		    }
		   });

 })

//});


/* ----------------33333333333333333333333333ajax request for post city name---------------------------*/



/* ########################################ajax request for get method end for city ########################*/
var clickedstate;
  $('#addstatelist').on('click','.statecode',function()
{
      var trid = $(this).closest('li').attr('id'); // table row ID 
       //alert(trid);
       clickedstate=trid;

      $('#addstatelist li').css("background-color","#ffffff");//clear the all list background color with white
	  $(this).css({"background-color":"#42bfed","color":"#fff"});//set the item list button background color

	  $('#addstatelist #statecode ').css({"background-color":"#ffffff","color":"black"});//clear the all button background color with white
	  $(this).find('#statecode').css({"background-color":"#42bfed","color":"#fff"});//set the selected button background color with blue

	   $('#addstatelist #city ').css({"background-color":"#ffffff","color":"black"});//clear the all dropdown button background color with white
	  $(this).find('#city').css({"background-color":"#42bfed","color":"#fff"});//set the selected dropdown button background color with blue

      var addcity;
      $('#addcitylist').empty();
      $('#addlocationlist').empty();//select of state for city location list should be empty 
      $.ajax({
		    url : "/getCity",
		    type: "GET",
		    cache: false,
		    success: function(data)
		    {
		        console.log( "cmgcity:"+JSON.stringify(data) );
		        for( var i=0;i<data.length;i++)
		        {

		         	if(trid==data[i].statecode)
		         	{
		       		  //console.log("filtered city:"+data[i].city);
                     addcity='<li id="'+data[i].city+'" class="list-group-item citycode" style=""><button id="citycode">'+data[i].city+'</button><button class="btn  dropdown-toggle" type="button" data-toggle="dropdown" id="cityname" style="float: right;padding: 0px;margin-top:-10px;margin-right:-15px;height:44px;width:20px;"><span class="caret"></span></button><ul class="list-group dropdown-menu stylish"><li  class="list-group-item addlocation" data-id="'+data[i].id+'">Add location</li><li class="list-group-item cityitem" data-id="'+data[i].id+'">Item List</li><li  class="list-group-item clickassigncity" data-id="'+data[i].id+'">assigned_to</li><li id="'+data[i].id+'" class="list-group-item DeleteCity">Delete</li></ul></li>';
                    $('#addcitylist').append(addcity);
                   }
		       }
		        
		    }
		   });

});
  /* ########################################ajax request for get method end for city ########################*/

/* ------7777777777777 this api fire when submit61 will be fire to update category in assigncity table--------*/
$('#addcitylist').on('click', '.cityitem', function(){

    var trid = $(this).parent().closest('li').attr('id');// li ID
    //alert("selectedcityfor item:"+trid);
    var content=$('<div class="modal fade" id="cityItem" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Choose category</h4></div><div class="modal-body"><select class="selectpicker" style="width: 100%;margin-bottom:10px;border-radius: 4px;height: 30px;" id="editorNamecity"> <option>select editor...</option></select><ul class="list-group" id="addCategory"></ul></div> <div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" id="submit61" data-dismiss="modal" data-trid="'+trid+'">Submit</button> </div></div></div></div>');

        for( var i=0;i<totaleditor.length;i++)
		        {
                     
                    content.find('select').append(' <option>'+totaleditor[i].username+'</option>');
   		        }
   		for( var i=0;i<totalcategory.length;i++)
		        {
                     
                    content.find('ul').append('<li id="'+totalcategory[i].name+'" class="list-group-item" style=""><span style=";">'+totalcategory[i].name+'</span><span style="float:right;"><input type="checkbox" value="'+totalcategory[i].name+'" name="editorNamecity"></span></li>');
   		        }


    $(".modalassigncityitem").empty();
    $(".modalassigncityitem").append(content);
    $("#cityItem").modal("show");
     //alert(content);
 });
$('.modalassigncityitem').on('click','#submit61',function()
  {
  	 var trid=$("#submit61").data("trid");
     //alert("selected city:"+trid);

  	 var assigned_to=$("#editorNamecity option:selected").val();;
     //alert( "assigned_to:"+assigned_to );

      var category = [];
            $.each($("input[name='editorNamecity']:checked"), function(){            
                category.push($(this).val());
            });
        //alert("selected category: " + category.join(", "));
     $.ajax({
		    url : "/updateassignCity",
		    type: "POST",
		    data : {city:trid,assigned_to:assigned_to,category:category},
		    success: function(data, textStatus)
		    {
		    	console.log("updateassignState:"+JSON.stringify(data));
		         var category_list='';
		         var modelbody1='';
		         modelbody1+='<span class="refresh refresh2  btn btn-primary "><i class="fa fa-refresh"  aria-hidden="true"></i></span>';
		         modelbody1+='<span class="next  btn btn-rounded "><i class="fa fa-angle-double-right"></i> Next</span><span class="prev btn btn-rounded"><i class="fa fa-angle-double-left"></i> Previous</span><span class="" style="float:left;font-size: 12px; "><input type="text" id="search3" class="form-control" placeholder="Search" style="height:28px;" /></span> <br><br> <div class="table-responsive"> <table class="table table-bordered myTable3 scroll" id=""> <thead><tr class="myHead3"><th>Sn</th> <th>Name</th><th>City</th><th>State</th><th>Country</th><th>assignDate</th><th>Category</th></tr></thead><tbody id="addassigncity1">';

                var addcity1='';
		        for( var i=0;i<data.length;i++)
		          {    
		        //      category_list='';
		              category_list=data[i].category_list;
		             
		             addcity1+='<tr><td></td><td>'+data[i].assigned_to+'</td><td>'+data[i].city+'</td><td>'+data[i].state+'</td><td>'+data[i].country+'</td><td>'+data[i].assigned_date+'</td><td>';
		                  

		                  $.each($.parseJSON(category_list), function(k, v) {
		                         addcity1+=' <span id="category">'+v+'</span>';
		                      
		                 });
		                  addcity1+='</td> </tr>';


		          }
		             modelbody1+=addcity1;
			        modelbody1+=' </tbody></table></div>';
		                      
			        $("#cityassign").empty();
			        $("#cityassign").html(modelbody1);	       
		           pagination("cityassign");

		    }
		   });
})


/* ------777777777this api fire when submit61 will be fire to update category in assigncity table-----------*/

/* ----------------44444444444444ajax request for post assignededitor name for city  ---------------------------*/
  
$('#addcitylist').on('click', '.clickassigncity', function(){

    var trid = $(this).parent().closest('li').attr('id');// li ID
   // alert("selectedcity:"+trid);
    var content=$('<div class="modal fade" id="myModal51" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Assigned to EditorName</h4></div><div class="modal-body"><select class="selectpicker editorName" style="width: 100%;margin-bottom:10px;border-radius: 4px;height: 30px;" id="assignedName1" ><option>select editor...</option></select> <input type="date" class="form-control" placeholder="selectdate" id="assignedDate1"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" id="submit51" data-dismiss="modal" data-trid="'+trid+'">Submit</button></div></div></div></div>');

        for( var i=0;i<totaleditor.length;i++)
		        {
                     
                    content.find('select').append(' <option>'+totaleditor[i].username+'</option>');
   		        }

    $(".modalassignCity").empty();
    $(".modalassignCity").append(content);
    $("#myModal51").modal("show");
     //alert(content);
});
/* ---------555555 api to insert cityname,assigned name and assinged date into assigncity table------------------*/
$(".modalassignCity").on('click','#submit51',function(e)
  {
  	var trid=$("#submit51").data("trid");
    // alert("selected city"+trid);
    // alert( "countryname for this city:"+clickedcountry);
    // alert( "statename for this city:"+clickedstate);
  	 var assignedName=$('#assignedName1 option:selected').val();
     //alert( "assignedName in city:"+assignedName );
     var assignedDate=$('#assignedDate1').val();
     //alert( "assignedDate in city:"+assignedDate );
     e.preventDefault();
       $.ajax({
		    url : "/assignedCity",
		    type: "POST",
		    data : {city:trid,assigned_to:assignedName,assigned_date:assignedDate,country:clickedcountry,state:clickedstate},
		    success: function(data)
		    {   
		    	console.log("assigncity:"+JSON.stringify(data));
		         var category_list='';
		         var modelbody1='';
		         modelbody1+='<span class="refresh refresh2  btn btn-primary "><i class="fa fa-refresh"  aria-hidden="true"></i></span>';
		         modelbody1+='<span class="next  btn btn-rounded "><i class="fa fa-angle-double-right"></i> Next</span><span class="prev btn btn-rounded"><i class="fa fa-angle-double-left"></i> Previous</span><span class="" style="float:left;font-size: 12px; "><input type="text" id="search3" class="form-control" placeholder="Search" style="height:28px;" /></span> <br><br> <div class="table-responsive"> <table class="table table-bordered myTable3 scroll" id=""> <thead><tr class="myHead3"><th>Sn</th> <th>Name</th><th>City</th><th>State</th><th>Country</th><th>assignDate</th><th>Category</th></tr></thead><tbody id="addassigncity1">';

                var addcity1='';
		        for( var i=0;i<data.length;i++)
		          {    
		        //      category_list='';
		              category_list=data[i].category_list;
		             
		             addcity1+='<tr><td></td><td>'+data[i].assigned_to+'</td><td>'+data[i].city+'</td><td>'+data[i].state+'</td><td>'+data[i].country+'</td><td>'+data[i].assigned_date+'</td><td>';
		                  

		                  $.each($.parseJSON(category_list), function(k, v) {
		                         addcity1+=' <span id="category">'+v+'</span>';
		                      
		                 });

		                   addcity1+='</td> </tr>';

		          }
		             modelbody1+=addcity1;
			        modelbody1+='</tbody></table></div>';
		                      
			        $("#cityassign").empty();
			        $("#cityassign").html(modelbody1);

		       
		           pagination("cityassign");

		    }
		   });

})


 /* ----------------44444444444444ajax request for post assignededitor name for city  ---------------------------*/
/* ------------------------------- delete the city list ---------------------------------------*/
$('#addcitylist').on('click', '.list-group-item.DeleteCity', function(){
    var trid = $(this).closest('li').attr('id');// li ID for delete the selected state
    // alert(trid);
    // alert("clickedstate:"+clickedstate);
     $('#addcitylist').empty();
      $.ajax({
		    url : "/deleteCity",
		    type: "POST",
		    data : {id:trid},
		    success: function(data, textStatus)
		    {
		        //data - response from server
		        console.log(textStatus);
		        if(textStatus=="success")
		        {
		        	for( var i=0;i<data.length;i++)
		        {

		         	if(clickedstate==data[i].statecode)
		         	{
		       		  //console.log("filtered city:"+data[i].city);
                    var addcity='<li id="'+data[i].city+'" class="list-group-item citycode" style=""><button id="citycode">'+data[i].city+'</button><button class="btn  dropdown-toggle" type="button" data-toggle="dropdown" id="cityname" style="float: right;padding: 0px;margin-top:-10px;margin-right:-15px;height:44px;width:20px;"><span class="caret"></span></button><ul class="list-group dropdown-menu stylish"><li  class="list-group-item addlocation" data-id="'+data[i].id+'">Add location</li><li class="list-group-item cityitem" data-id="'+data[i].id+'">Item List</li><li  class="list-group-item clickassigncity" data-id="'+data[i].id+'">assigned_to</li><li id="'+data[i].id+'" class="list-group-item DeleteCity">Delete</li></ul></li>';
                    $('#addcitylist').append(addcity);
                   }
		       }
		        
		        }
		        
		    }
		   });
  });

/* ------------------------------- delete the city list ---------------------------------------*/




/* ----------------44444444444444ajax request for post assignededitor name  ---------------------------*/
/* ########################################ajax request for get method start for location ########################*/
var clickedcity;
$('#addcitylist').on('click','.citycode',function()
{
	  //alert("hello");
      var trid = $(this).closest('li').attr('id'); // table row ID 
       //alert(trid);
       clickedcity=trid;
      $('#addcitylist li').css("background-color","#ffffff");//clear the all list background color with white
	  $(this).css({"background-color":"#42bfed","color":"#fff"});//set the item list button background color

	  $('#addcitylist #citycode ').css({"background-color":"#ffffff","color":"black"});//clear the all button background color with white
	  $(this).find('#citycode').css({"background-color":"#42bfed","color":"#fff"});//set the selected button background color with blue
      
      $('#addcitylist #cityname ').css({"background-color":"#ffffff","color":"black"});//clear the all dropdown button background color with white
	  $(this).find('#cityname').css({"background-color":"#42bfed","color":"#fff"});//set the selected dropdown button background color with blue
     

      var addlocation;
      $('#addlocationlist').empty();
      $.ajax({
		    url : "/getLocation",
		    type: "GET",
		    cache: false,
		    success: function(data)
		    {
		        //console.log( "cmglocation:"+JSON.stringify(data) );
		        for( var i=0;i<data.length;i++)
		        {

		         	if(trid==data[i].citycode)
		         	{
		       		  //console.log("filtered location:"+data[i].location);
                     addlocation='<li id="'+data[i].location+'" class="list-group-item locationcode" style="" >'+data[i].location+'<button class="btn  dropdown-toggle loccolchange" type="button" data-toggle="dropdown" id="locationname" style="float: right;padding: 1px;margin-top:-10px;margin-right:-15px;height:40px;width:20px;"><span class="caret"></span></button><ul class="list-group dropdown-menu stylish"><li class="list-group-item locitem" data-id="'+data[i].id+'">Item List</li><li class="list-group-item clickassignloc" data-id="'+data[i].id+'">assigned_to</li><li id="'+data[i].id+'" class="list-group-item DeleteLoc">Delete</li></ul></li>';
                    $('#addlocationlist').append(addlocation);
                   }
		       }
		        
		    }
		   });


});



/* ########################################ajax request for get method end for location ########################*/
/* ------101010 this api fire when submit62 will be fire to update category in assignlocation table--------*/
$('#addlocationlist').on('click', '.locitem', function(){

    var trid = $(this).parent().closest('li').attr('id');// li ID
   // alert("selectedlocfor item:"+trid);
    var content=$('<div class="modal fade" id="cityLoc" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Choose category</h4></div><div class="modal-body"><select class="selectpicker" style="width: 100%;margin-bottom:10px;border-radius: 4px;height: 30px;" id="editorNameloc"> <option>select editor...</option></select><ul class="list-group" id="addCategory"></ul></div> <div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" id="submit62" data-dismiss="modal" data-trid="'+trid+'">Submit</button> </div></div></div></div>');

        for( var i=0;i<totaleditor.length;i++)
		        {
                     
                    content.find('select').append(' <option>'+totaleditor[i].username+'</option>');
   		        }
   		for( var i=0;i<totalcategory.length;i++)
		        {
                     
                    content.find('ul').append('<li id="'+totalcategory[i].name+'" class="list-group-item" style=""><span style=";">'+totalcategory[i].name+'</span><span style="float:right;"><input type="checkbox" value="'+totalcategory[i].name+'" name="editorNameloc"></span></li>');
   		        }


    $(".modalassignlocitem").empty();
    $(".modalassignlocitem").append(content);
    $("#cityLoc").modal("show");
     //alert(content);
 });

$('.modalassignlocitem').on('click','#submit62',function()
  {
  	 var trid=$("#submit62").data("trid");
  	 $('#previewmodel #addassignloc1').empty();
    // alert("selected location:"+trid);

  	 var assigned_to=$("#editorNameloc option:selected").val();;
    // alert( "assigned_to:"+assigned_to );

      var category = [];
            $.each($("input[name='editorNameloc']:checked"), function(){            
                category.push($(this).val());
            });
      //  alert("selected category: " + category.join(", "));
        $.ajax({
		    url : "/updateassignLocation",
		    type: "POST",
		    data : {location:trid,assigned_to:assigned_to,category:category},
		    success: function(data)
		    {
		        var category_list='';
		        var modelbody='';
                	modelbody+='<span class="refresh refresh1  btn btn-primary "><i class="fa fa-refresh"  aria-hidden="true"></i></span>';
                	modelbody+='<span class="next  btn btn-rounded "><i class="fa fa-angle-double-right"></i> Next</span><span class="prev btn btn-rounded"><i class="fa fa-angle-double-left"></i> Previous</span><span class="" style="float:left;font-size: 12px; "><input type="text" id="search2" class="form-control" placeholder="Search" style="height:28px;" /></span> <br><br><div class="table-responsive"> <table class="table table-bordered myTable2 scroll"><thead><tr class="myHead2"><th>Sn</th><th>Name</th><th>Location</th><th>City</th><th>State</th><th>Country</th><th>assignDate</th><th>Category</th> </tr></thead><tbody id="addassignloc1">';


                    var addloc1='';
			        for( var i=0;i<data.length;i++)
			          {    
			             category_list=data[i].category_list;
			             
			             addloc1+='<tr><td></td><td>'+data[i].assigned_to+'</td><td>'+data[i].location+'</td><td>'+data[i].city+'</td><td>'+data[i].state+'</td><td>'+data[i].country+'</td><td>'+data[i].assigned_date+'</td><td>';
			                  

			                  $.each($.parseJSON(category_list), function(k, v) {
			                         addloc1+=' <span id="category">'+v+'</span>';
			                      
			                 });

			                  addloc1+='</td> </tr>';
			                 
			          }
						modelbody+=addloc1;
				        modelbody+=' </tbody></table>   </div>';
			                      
				        $("#locationassign").empty();
				        $("#locationassign").html(modelbody);

			       
			        pagination("locationassign");
		    }
		   });
})
/* ------101010 this api fire when submit62 will be fire to update category in assignlocation table--------*/

/* --33333333333ajax request for post location name this active when i click add inside city table------------*/

$('#addcitylist').on('click', '.addlocation', function(){

    var trid = $(this).parent().closest('li').attr('id');// li ID
   // alert(trid);
    var content='<div class="modal fade" id="myModal4" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Register State Name</h4></div><div class="modal-body"><input type="text" class="form-control" placeholder="Enter location Name here" id="locval"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" id="submit4" data-trid="'+trid+'" data-dismiss="modal">Submit</button></div></div></div></div>';

    $(".modalAddlocation").empty();
    $(".modalAddlocation").html(content);
    $("#myModal4").modal("show");
     //alert(content);
 });

$('.modalAddlocation').on('click','#submit4',function(e)
  {
    var trid=$("#submit4").data("trid");
   // alert("citycode:"+trid);
  	var local=$('#locval').val();
    //alert( "local:"+local );
    e.preventDefault();
    $('#addlocationlist').empty();
       $.ajax({
		    url : "/addLocation",
		    type: "POST",
		    data : {citycode:trid,location:local},
		    success: function(data)
		    {
		    	for( var i=0;i<data.length;i++)
		        {

		         	if(trid==data[i].citycode)
		         	{
		       		  //console.log("filtered location:"+data[i].location);
                     addlocation='<li id="'+data[i].location+'" class="list-group-item locationcode" style="" >'+data[i].location+'<button class="btn  dropdown-toggle loccolchange" type="button" data-toggle="dropdown" id="locationname" style="float: right;padding: 1px;margin-top:-10px;margin-right:-15px;height:40px;width:20px;"><span class="caret"></span></button><ul class="list-group dropdown-menu stylish"><li class="list-group-item locitem" data-id="'+data[i].id+'">Item List</li><li class="list-group-item clickassignloc" data-id="'+data[i].id+'">assigned_to</li><li id="'+data[i].id+'" class="list-group-item DeleteLoc">Delete</li></ul></li>';
                    $('#addlocationlist').append(addlocation);
                   }
		       }
		    }
		   });    
 })


/* --33333333333ajax request for post location name this active when i click add inside city table------------*/
$('#addlocationlist').on('click', 'li.locationcode', function(){
     var trid = $(this).attr('id');// li ID
     //alert("selectedlocation:"+trid);
     $('#addlocationlist span ').css({"color":"black"});
     $(this).find('span').css({"color":"#fff"});//set the caret color

     $('#addlocationlist li.locationcode ').css({"background-color":"#ffffff","color":"black"});//clear the all list background color with white
     $('#addlocationlist #locationname ').css({"background-color":"#ffffff","color":"black"});//clear the all button background color with white
     $(this).find('#locationname').css({"background-color":"#42bfed","color":"#000"});//set the selected button background color with blue
     $(this).css({"background-color":"#42bfed","color":"white"});//set the item list button background color

});


/*-------this will provide assinge to location to editor from click in assign-to in location box start---------*/
$('#addlocationlist').on('click', '.clickassignloc', function(){

    var trid = $(this).parent().closest('li').attr('id');// li ID
  //  alert("selected location for assign:"+trid);
    var content=$('<div class="modal fade" id="myModalloc" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Assigned to EditorName</h4></div><div class="modal-body"><select class="selectpicker editorName" style="width: 100%;margin-bottom:10px;border-radius: 4px;height: 30px;" id="assignedName2" ><option>select editor...</option></select> <input type="date" class="form-control" placeholder="selectdate" id="assignedDate2"></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" id="submitloc" data-dismiss="modal" data-trid="'+trid+'">Submit</button></div></div></div></div>');

        for( var i=0;i<totaleditor.length;i++)
		        {
                     
                    content.find('select').append(' <option>'+totaleditor[i].username+'</option>');
   		        }

    $(".modalassignLoc").empty();
    $(".modalassignLoc").append(content);
    $("#myModalloc").modal("show");
     //alert(content);
});

$(".modalassignLoc").on('click','#submitloc',function(e)
  {
  	var trid=$("#submitloc").data("trid");
  	$('#previewmodel #addassignloc1').empty();
    // alert("selected location"+trid);
  	 var assignedName=$('#assignedName2 option:selected').val();
    // alert( "assignedName:"+assignedName );
     var assignedDate=$('#assignedDate2').val();
  //  alert( "assignedDate:"+assignedDate );
  //  alert( "countryname for this location:"+clickedcountry);
   //  alert( "statename for this location:"+clickedstate);
   //   alert( "cityname for this location:"+clickedcity);
    e.preventDefault();
       $.ajax({
		    url : "/assignedLocation",
		    type: "POST",
		    data : {location:trid,assigned_to:assignedName,assigned_date:assignedDate,country:clickedcountry,state:clickedstate,city:clickedcity},
		    success: function(data)
		    {
		        var category_list='';
		        var modelbody='';
                	modelbody+='<span class="refresh refresh1  btn btn-primary "><i class="fa fa-refresh"  aria-hidden="true"></i></span>';
                	modelbody+='<span class="next  btn btn-rounded "><i class="fa fa-angle-double-right"></i> Next</span><span class="prev btn btn-rounded"><i class="fa fa-angle-double-left"></i> Previous</span><span class="" style="float:left;font-size: 12px; "><input type="text" id="search2" class="form-control" placeholder="Search" style="height:28px;" /></span> <br><br><div class="table-responsive"> <table class="table table-bordered myTable2 scroll"><thead><tr class="myHead2"><th>Sn</th><th>Name</th><th>Location</th><th>City</th><th>State</th><th>Country</th><th>assignDate</th><th>Category</th> </tr></thead><tbody id="addassignloc1">';


                    var addloc1='';
			        for( var i=0;i<data.length;i++)
			          {    
			             category_list=data[i].category_list;
			             
			             addloc1+='<tr><td></td><td>'+data[i].assigned_to+'</td><td>'+data[i].location+'</td><td>'+data[i].city+'</td><td>'+data[i].state+'</td><td>'+data[i].country+'</td><td>'+data[i].assigned_date+'</td><td>';
			                  

			                  $.each($.parseJSON(category_list), function(k, v) {
			                         addloc1+=' <span id="category">'+v+'</span>';
			                      
			                 });

			                  addloc1+='</td> </tr>';
			                 
			          }
						modelbody+=addloc1;
				        modelbody+=' </tbody></table>   </div>';
			                      
				        $("#locationassign").empty();
				        $("#locationassign").html(modelbody);

			       
			        pagination("locationassign");
		    }
		   });

 })
/*-------this will provide assinge to location to editor from click ay assign-to in location box end---------*/

/* ------------------------------- delete the location list ---------------------------------------*/
$('#addlocationlist').on('click', '.list-group-item.DeleteLoc', function(){
    var trid = $(this).closest('li').attr('id');// li ID for delete the selected state
    // alert(trid);
    // alert("clickedcity:"+clickedcity);
     $('#addlocationlist').empty();
      $.ajax({
		    url : "/deleteLoc",
		    type: "POST",
		    data : {id:trid},
		    success: function(data)
		    {
		    	console.log("location after delete:"+JSON.stringify(data));
				for( var i=0;i<data.length;i++)
		        {

		         	if(clickedcity==data[i].citycode)
		         	{
		       		 //console.log("filtered location:"+data[i].location);
                    var addlocation='<li id="'+data[i].location+'" class="list-group-item locationcode" style="" >'+data[i].location+'<button class="btn  dropdown-toggle loccolchange" type="button" data-toggle="dropdown" id="locationname" style="float: right;padding: 1px;margin-top:-10px;margin-right:-15px;height:40px;width:20px;"><span class="caret"></span></button><ul class="list-group dropdown-menu stylish"><li class="list-group-item locitem" data-id="'+data[i].id+'">Item List</li><li class="list-group-item clickassignloc" data-id="'+data[i].id+'">assigned_to</li><li id="'+data[i].id+'" class="list-group-item DeleteLoc">Delete</li></ul></li>';
                    $('#addlocationlist').append(addlocation);
                   }
		       }
		        
		    }
		   });
  });

/* ------------------------------- delete the location list ---------------------------------------*/
/* ------8888888888888 this api fire when submit6 will be fire to update category in assignlocation table--------*/
/* ------999999999999999999registeration form for user and admin  -----------------------------------------------*/
  $("#registrationForm").submit(function(event) {
  	 event.preventDefault(); 
     var value= $( this ).serializeArray() ;
     console.log(JSON.stringify(value));
     this.reset();

        $.ajax({
		    url : "/registration",
		    type: "POST",
		    data :value,
		    success: function(data, textStatus)
		    {
		        totaleditor=data;
		        $('#register').modal('hide');

		    }
		 });

  });
/* ------999999999999999999registeration form for user and admin  -----------------------------------------------*/
/*---------------------this function work with pagination for table-------------------------------------------*/
function pagination(refer)
{
  var maxRows = 5;
  //alert(refer);
$('#'+refer+' table').each(function() {
  var cTable = $(this);
  //alert(JSON.stringify(cTable));
  var cRows = cTable.find('tr:gt(0)');
  //alert("no of row:"+JSON.stringify(cRows));
  var cRowCount = cRows.length;
 
  
  if (cRowCount < maxRows) {
      cRows.each(function(i) {
      $(this).find('td:first').text(function(j, val) {
         return (i + 1);
      }); 
      $('#'+refer+'').find('.next').addClass('disabled');
  });

  }

  cRows.each(function(i) {
      $(this).find('td:first').text(function(j, val) {
         return (i + 1);
      }); 
  });

  cRows.filter(':gt(' + (maxRows - 1) + ')').hide();


  var cPrev = $('#'+refer+'').find('.prev');
  var cNext = $('#'+refer+'').find('.next');

  cPrev.addClass('disabled');

  cPrev.click(function() {
      var cFirstVisible = cRows.index(cRows.filter(':visible'));
      
      if (cPrev.hasClass('disabled')) {
          return false;
      }
      
      cRows.hide();
      if (cFirstVisible - maxRows - 1 > 0) {
          cRows.filter(':lt(' + cFirstVisible + '):gt(' + (cFirstVisible - maxRows - 1) + ')').show();
      } else {
          cRows.filter(':lt(' + cFirstVisible + ')').show();
      }

      if (cFirstVisible - maxRows <= 0) {
          cPrev.addClass('disabled');
      }
      
      cNext.removeClass('disabled');

      return false;
  });

  cNext.click(function() {
      var cFirstVisible = cRows.index(cRows.filter(':visible'));
      
      if (cNext.hasClass('disabled')) {
          return false;
      }
      
      cRows.hide();
      cRows.filter(':lt(' + (cFirstVisible +2 * maxRows) + '):gt(' + (cFirstVisible + maxRows - 1) + ')').show();

      if (cFirstVisible + 2 * maxRows >= cRows.length) {
          cNext.addClass('disabled');
      }
      
      cPrev.removeClass('disabled');

      return false;
  });
});//pagination
};
/*---------------------this function work with pagination for table----------------------------------------*/

});
