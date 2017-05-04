$( document ).ready(function()
 {
    // $('.selectpicker').selectpicker();

    /*--------1.this api will fire when page load,get all data from siteseen which is finalize status-----------*/ 
    $.ajax({
		    url : "/getsiteseenDetails",
		    type: "GET",
		    success: function(data)
		    {
		    	//console.log("total siteseen data:"+JSON.stringify(data));
		    	for(var i=0;i<data.length;i++)
		    	{
                   var tabledata=' <tr><td class="col-xs-2">'+data[i].country+'</td><td class="col-xs-2">'+data[i].state+'</td><td class="col-xs-2">'+data[i].city+'</td><td class="col-xs-2">'+data[i].location+'</td><td class="col-xs-2">'+data[i].sitename+'</td><td class="col-xs-1">'+data[i].editor_name+'</td><td class="col-xs-1" id='+data[i].id+'><i class="fa fa-pencil fa-lg iconblue" aria-hidden="true"></i></td></tr>';
                   $('#addtabledata').append(tabledata);
		    	}
		    	
             }
		  });
    /*--------1.this api will fire when page load,get all data from siteseen which is finalize status-----------*/ 

    /*----2.this api will fire when page load,get all country name from siteseen which is finalize status-------*/
   
      $.ajax({
		    url : "/getsiteseenCountry",
		    type: "GET",
		    success: function(data)
		    {
                //console.log("total country data:"+JSON.stringify(data));
                
                var newdata=data.reduceRight(function(r , a)
			                {
			                   r.some(function (b)
			                    { 
			                    	return a.country === b.country;
			                     }) || r.push(a);
                                return r;  
			                },[]);
                //console.log("remove duplicate data1:"+JSON.stringify(newdata));
                for(var i=0;i<newdata.length;i++)
                {
                	//alert(newdata[i].country);
                     var addcountry='<option value="'+newdata[i].country+'">'+newdata[i].country+'</option>';
                     $('#totalcountry').append(addcountry);
                }
            }
         });
    /*----2.this api will fire when page load,get all country name from siteseen which is finalize status-------*/

    /*----3.this api will fire when choose country,get all state name from siteseen which is finalize status-----*/
    var selectedCountry; 
     $('#totalcountry').on('click',function()
    {
    	selectedCountry=$(this).val();
    	$('#totalstate').empty();
    	$('#totalstate').append('<option value="null">Select State..</option>');
    	$('#totalcity').empty();
    	$('#totalcity').append('<option value="null">Select City..</option>');
    	$('#totalloc').empty();
    	$('#totalloc').append('<option value="null">Select Location..</option>');
        //alert("selected country:"+selectedCountry);
        $.ajax({
		    url : "/getsiteseenState",
		    type: "POST",
		    data:{"country":selectedCountry},
		    success: function(data)
		    {
		       //console.log("total state:"+JSON.stringify(data));
               var newdata=data.reduceRight(function(r , a)
			                {
			                   r.some(function (b)
			                    { 
			                    	return a.state === b.state;
			                     }) || r.push(a);
                                return r;  
			                },[]);
                //console.log("remove duplicate state:"+JSON.stringify(newdata));
                for(var i=0;i<newdata.length;i++)
                {
                	//alert(newdata[i].country);
                     var addstate='<option value="'+newdata[i].state+'">'+newdata[i].state+'</option>';
                     $('#totalstate').append(addstate);
                }
		    }
		});
    });

    /*----3.this api will fire when choose country,get all state name from siteseen which is finalize status-----*/

    /*----4.this api will fire when choose state,get all city name from siteseen which is finalize status-----*/
    var selectedState; 
    $('#totalstate').on('click',function()
    {
    	selectedState=$(this).val();
    	$('#totalcity').empty();
    	$('#totalcity').append('<option value="null">Select City..</option>');
    	$('#totalloc').empty();
    	$('#totalloc').append('<option value="null">Select Location..</option>');
       // alert("selected state:"+selectedState);
        $.ajax({
		    url : "/getsiteseenCity",
		    type: "POST",
		    data:{"country":selectedCountry,"state":selectedState},
		    success: function(data)
		    {
		       //console.log("total city:"+JSON.stringify(data));
               var newdata=data.reduceRight(function(r , a)
			                {
			                   r.some(function (b)
			                    { 
			                    	return a.city === b.city;
			                     }) || r.push(a);
                                return r;  
			                },[]);
                //console.log("remove duplicate state:"+JSON.stringify(newdata));
                for(var i=0;i<newdata.length;i++)
                {
                	//alert(newdata[i].country);
                     var addcity='<option value="'+newdata[i].city+'">'+newdata[i].city+'</option>';
                     $('#totalcity').append(addcity);
                }
		    }
		});
    });
     
    /*----4.this api will fire when choose state,get all city name from siteseen which is finalize status-----*/

    /*----5.this api will fire when choose city,get all location name from siteseen which is finalize status-----*/
    var selectedCity; 
     $('#totalcity').on('click',function()
    {
        selectedCity=$(this).val();
    	$('#totalloc').empty();
    	$('#totalloc').append('<option value="null">Select Location..</option>');
       // alert("selected city:"+selectedCity);
        $.ajax({
		    url : "/getsiteseenLoc",
		    type: "POST",
		    data:{"country":selectedCountry,"state":selectedState,"city":selectedCity},
		    success: function(data)
		    {
		       //console.log("total location:"+JSON.stringify(data));
               var newdata=data.reduceRight(function(r , a)
			                {
			                   r.some(function (b)
			                    { 
			                    	return a.location === b.location;
			                     }) || r.push(a);
                                return r;  
			                },[]);
                //console.log("remove duplicate state:"+JSON.stringify(newdata));
                for(var i=0;i<newdata.length;i++)
                {
                	//alert(newdata[i].country);
                     var addloc='<option value="'+newdata[i].location+'">'+newdata[i].location+'</option>';
                     $('#totalloc').append(addloc);
                }
		    }
		});
    });

    /*----5.this api will fire when choose city,get all location name from siteseen which is finalize status-----*/ 

    /*-------6.this api will fire when selected filter,get all related siteseen which have finalized status-----*/  
    $('#formfilter').submit(function (e) {
	    e.preventDefault();
	    if($.trim($("#totalcountry").val()) === "null")
	    {
              $( "span#filter1" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
	    }
	    else
	    {
	    $('#addtabledata').empty();
	    var data = $(this).serialize();
	    //alert("Filtered data:"+JSON.stringify(data));
		    $.ajax({
			    url : "/filtersiteseen",
			    type: "POST",
			    data:data,
			    success: function(data)
			    {
                   console.log("Filtered record:"+JSON.stringify(data));
                   for(var i=0;i<data.length;i++)
		    	   {
                   var tabledata=' <tr><td class="col-xs-2">'+data[i].country+'</td><td class="col-xs-2">'+data[i].state+'</td><td class="col-xs-2">'+data[i].city+'</td><td class="col-xs-2">'+data[i].location+'</td><td class="col-xs-2">'+data[i].sitename+'</td><td class="col-xs-1">'+data[i].editor_name+'</td><td class="col-xs-1" id='+data[i].id+'><i class="fa fa-pencil fa-lg iconblue" aria-hidden="true"></i></td></tr>';
                       $('#addtabledata').append(tabledata);
		    	   }
			    	
			    }
			});
	    } 
    });
    /*-------6.this api will fire when selected filter,get all related siteseen which have finalized status-----*/
     //this api already use in no.1
    /*---7.this api will fire when selected refresh button,get all related siteseen which have finalized status-*/
    $('#refresh').on('click',function()
    {
    	$('#addtabledata').empty();
    	$.ajax({
		    url : "/getsiteseenDetails",
		    type: "GET",
		    success: function(data)
		    {
		    	//console.log("total siteseen data:"+JSON.stringify(data));
		    	for(var i=0;i<data.length;i++)
		    	{
                   var tabledata=' <tr><td class="col-xs-2">'+data[i].country+'</td><td class="col-xs-2">'+data[i].state+'</td><td class="col-xs-2">'+data[i].city+'</td><td class="col-xs-2">'+data[i].location+'</td><td class="col-xs-2">'+data[i].sitename+'</td><td class="col-xs-1">'+data[i].editor_name+'</td><td class="col-xs-1" id='+data[i].id+'><i class="fa fa-pencil fa-lg iconblue" aria-hidden="true"></i></td></tr>';
                    $('#addtabledata').append(tabledata);

        
			    	$('#totalcountry').val("null");
			    	$('#totalstate').val("null");
			    	$('#totalcity').val("null");
			    	$('#totalloc').val("null");
			    	$('#searchinput').val("");
		    	}
		    	
             }
		  });

    })

    /*---7.this api will fire when selected refresh button,get all related siteseen which have finalized status-*/

    /*---8.this api will fire when inpector click at edit option get all related data from siteseen through id---*/
     var updateSiteseenData=[];
    $('#addtabledata').on('click','.fa.fa-pencil',function()
    {
        updateSiteseenData=[];//clear the array next click
       
    	var selectedID=$(this).parent().attr('id');
        //alert("i am ready for edit no:"+selectedID);
        $.ajax({
		    url : "/Details",
		    type: "POST",
		    data:{"id":selectedID},
		    success: function(data)
		    {
                 //console.log("inpector data:"+JSON.stringify(data));

                 CKEDITOR.instances['editor1'].setData(data[0].content);
                  
                  //var content=CKEDITOR.instances['editor1'].getData();
                  

       

                  $("#submitform #keywords").val(data[0].keywords);
                  
                  $("#submitform #tags").val(data[0].tags);

                  var IdData = {"name":"id","value":data[0].id}
                  updateSiteseenData.push(IdData);

                  var country = {"name":"country","value":data[0].country}
                  updateSiteseenData.push(country);

                  var state = {"name":"state","value":data[0].state}
                  updateSiteseenData.push(state);

                  var city = {"name":"city","value":data[0].city}
                  updateSiteseenData.push(city);

                  var location = {"name":"location","value":data[0].location}
                  updateSiteseenData.push(location);

                  var sitename = {"name":"sitename","value":data[0].sitename}
                  updateSiteseenData.push(sitename);


                 
		    }
		 });

        $('#auditormodel').modal('show');
    });

    /*---8.this api will fire when inpector click at edit option get all related data from siteseen through id---*/

    /*---9.this api will fire when inpector click at save $ final button to update siteseen save in inpectordb --*/
    var which;

	$("#submitform #click").click(function () {
	    which = $(this).attr("value");
	});
    
  	$('#submitform').submit(function (e) {
      e.preventDefault();
  
         differencesAsString=null;

          var ckvalue = CKEDITOR.instances.editor1.getData();
         
         var keywords = $("#keywords").val();
         var tags = $("#tags").val();
        
         var data = {"name":"editor1","value":ckvalue}
          updateSiteseenData.push(data); 

          var data1 = {"name":"keywords","value":keywords}
          updateSiteseenData.push(data1); 

         var data2 = {"name":"tags","value":tags}
          updateSiteseenData.push(data2); 
      /*----9.1 this api will fire and update inside siteseen usind id based at button click==save--------*/
      if(which=="Save")
      {
      	//alert("we are in update section");
    
      	//alert("formdata:"+JSON.stringify(updateSiteseenData));
	      $.ajax({
			    url : "/siteseenUpdate",
			    type: "POST",
			    data:updateSiteseenData,
			    success: function(data)
			    { 
			    
	           $('#auditormodel').modal('hide');
	                  
			    }
			 });
      }
      /*----9.1 this api will fire and update inside siteseen usind id based at button click==save--------*/
      /*----9.2 this api will fire and update inside siteseen usind id based at button click==save--------*/
      if(which=="Final")
      {
      	//alert("we are in final section");
      	$('#addtabledata').empty();
	      $.ajax({
			    url : "/inpectorSiteseen",
			    type: "POST",
			    data:updateSiteseenData,
			    success: function(data)
			    {
			    	console.log("Api9.2:"+JSON.stringify(data));
			    	for(var i=0;i<data.length;i++)
		    	    {
	                 var tabledata=' <tr><td class="col-xs-2">'+data[i].country+'</td><td class="col-xs-2">'+data[i].state+'</td><td class="col-xs-2">'+data[i].city+'</td><td class="col-xs-2">'+data[i].location+'</td><td class="col-xs-2">'+data[i].sitename+'</td><td class="col-xs-1">'+data[i].editor_name+'</td><td class="col-xs-1" id='+data[i].id+'><i class="fa fa-pencil fa-lg iconblue" aria-hidden="true"></i></td></tr>';
                         $('#addtabledata').append(tabledata);

                        
                    }
	           $('#auditormodel').modal('hide');        
			    }
			 });
      }
      /*----9.2 this api will fire and update inside siteseen usind id based at button click==save--------*/


      
   });


    /*-------9.this api will fire when inpector click at save $ final button to save in inpectordb-------*/

     CKEDITOR.replace( 'editor1');

    /*------------------------------------------------serch for table-----------------------------------------*/ 
    $('.search').on('keyup',function(){
        var searchTerm = $(this).val().toLowerCase();
        //alert("entered word:"+searchTerm);
        $('#userTbl tbody tr').each(function(){
            var lineStr = $(this).text().toLowerCase();
            //alert("related search:"+lineStr);
            //alert(lineStr.indexOf(searchTerm));
            if(lineStr.indexOf(searchTerm)===-1)
            {
                $(this).hide();
            }
            else
            {
            	$(this).show();
            }
          })
     });
    /*------------------------------------------------serch for table-----------------------------------------*/ 

});