$( document ).ready(function()
 {

    //ajax call to get asssign login editor name
      var username;
      $.ajax({
          url : "/getassignState",
          type: "GET",
          cache: false,
          success: function(data)
          {
              //console.log( "state:"+JSON.stringify(data) );
              $("#breadcrumb").empty();//clear the previous breadcrumbs
              clickedlist1="State";
              for( var i=0;i<data.length;i++)
                {
                  $('#state').css({  "background-color": "#1a2226","border-left":"4px solid #3c8dbc"});

                  $('#addName').text("State");
                  username=data[i].assigned_to;
                  addstate='<li id="'+data[i].state+'" class="list-group-item" style="margin-bottom:5px;"><span>'+data[i].state+'</span><p class=" dropdown-toggle change1" type="button" data-toggle="dropdown" id="city" style="    float: right; padding: 0px;margin-top: -7px;margin-right: 2px;height: 40px;color: #357ca5;width: 20px;font-size: 24px;"><span class="glyphicon glyphicon-align-justify"></span></p><ul class="dropdown-menu pull-right" style="background-color: #ecf0f5;"><li id="itemstate" style="background-color: #ecf0f5;text-align:center;color:#222d32; padding:2%;" data-con="'+data[i].country+'">show itemList</li></ul></li>';
                  $('#addlist').append(addstate);

                }

               $('#username').text(username);
          }
      });
   var clickedlist1;//this varriable kept the currently clicked list in sidebar for state which is used in catagory list selection
  $('#mySidenav #mylist').on("click","#state", function(event) { 
     $("#breadcrumb").empty();//clear the previous breadcrumbs
      $("#editormodel #breadcrumb").empty();
     var addstate;
        $("#city").css({"background-color":"transparent","border-left":"none"});
        $("#location").css({"background-color":"transparent","border-left":"none"});
      
       
        $('#state').css({  "background-color": "#1a2226","border-left":"4px solid #3c8dbc"});
 

     $('#addlist').empty();  
     $('.hideshow').hide();
      $('.hideshow1').hide();
     var value1 = $(this).attr('value');
     clickedlist1=value1;//assigned the clicked state list value is state now 
     clickedlist2=null;//when click at state list clcickedlist2 become null from previous value City
     clickedlist3=null;//when click at state list clcickedlist3 become null from previous value location
     $('#addName').text(value1);//replace all span with just content
     // alert(value);
    $.ajax({
    url : "/getassignState",
    type: "GET",
    cache: false,
    success: function(data)
    {
        //console.log( "state:"+JSON.stringify(data) );
        for( var i=0;i<data.length;i++)
	        {

	        	addstate='<li id="'+data[i].state+'" class="list-group-item" style="margin-bottom:5px;"><span>'+data[i].state+'</span><p class=" dropdown-toggle change1" type="button" data-toggle="dropdown" id="city" style="    float: right; padding: 0px;margin-top: -7px;margin-right: 2px;height: 40px;color: #357ca5;width: 20px;font-size: 24px;"><span class="glyphicon glyphicon-align-justify"></span></p><ul class="dropdown-menu pull-right" style="background-color: #ecf0f5;"><li id="itemstate" style="background-color: #ecf0f5;text-align:center;color:#222d32; padding:2%;" data-con="'+data[i].country+'">show itemList</li></ul></li>';
                  $('#addlist').append(addstate);
	        }
    }
    });
  });
var clickedlist2;//this varriable kept the currently clicked list in sidebar for city which is used in catagory list selection

  $('#mySidenav #mylist').on("click","#city", function(event) {
      $("#breadcrumb").empty();//clear the previous breadcrumbs
       $("#editormodel #breadcrumb").empty();
      $('#addlist').empty(); 
      $('.hideshow').hide(); 
      $('.hideshow1').hide();    
            $("#state").css({"background-color":"transparent","border-left":"none"});
        $("#location").css({"background-color":"transparent","border-left":"none"});
      
       
        $('#city').css({  "background-color": "#1a2226","border-left":"4px solid #3c8dbc"});
      var value2 = $(this).attr('value');
     clickedlist2=value2;//assigned the clicked citylist value is City now 
     clickedlist1=null;//when click at city list clcickedlist1 become null from previous value state
     clickedlist3=null;//when click at city list clcickedlist3 become null from previous value location
     $('#addName').text(value2);//replace all span with just content
      //alert(value);
    $.ajax({
    url : "/getassignCity",
    type: "GET",
    cache: false,
    success: function(data)
    {
        //console.log( "city:"+JSON.stringify(data) );
        for( var i=0;i<data.length;i++)
          {
             addstate='<li id="'+data[i].city+'" class="list-group-item" style="margin-bottom:5px;"><span>'+data[i].city+'</span><p class=" dropdown-toggle change1" type="button" data-toggle="dropdown" id="city" style="    float: right; padding: 0px;margin-top: -7px;margin-right: 2px;height: 40px;color: #357ca5;width: 20px;font-size: 24px;"><span class="glyphicon glyphicon-align-justify"></span></p><ul class="dropdown-menu pull-right" style="background-color: #ecf0f5;"><li id="itemcity" style="background-color: #ecf0f5;text-align:center;color:#222d32; padding:2%;" data-con="'+data[i].country+'" data-state="'+data[i].state+'">show itemList</li></ul></li>';
              $('#addlist').append(addstate);
          }
    }
    });
  });
  //this will put the editor name in the header 
  $.ajax({
    url : "/getassignCity",
    type: "GET",
    cache: false,
    success: function(data)
    {
        //console.log( "city:"+JSON.stringify(data) );
        for( var i=0;i<data.length;i++)
          {
            username=data[i].assigned_to;
          }
          $('#username').text(username);
    }
    });

var clickedlist3;//this varriable kept the currently clicked list in sidebar for location which is used in catagory list selection

  $('#mySidenav #mylist').on("click","#location", function(event) {  
     $("#breadcrumb").empty();//clear the previous breadcrumbs
      $("#editormodel #breadcrumb").empty();
     $('#addlist').empty(); 
     $('.hideshow').hide();
     $('.hideshow1').hide();  

     $("#city").css({"background-color":"transparent","border-left":"none"});
     $("#state").css({"background-color":"transparent","border-left":"none"});
     $('#location').css({  "background-color": "#1a2226","border-left":"4px solid #3c8dbc"});
     var value3 = $(this).attr('value');

     clickedlist3=value3;//assigned the clicked locationlist value is City now 
     clickedlist2=null;//when click at location list clcickedlist2 become null from previous value city
     clickedlist1=null;//when click at location list clcickedlist1 become null from previous value state
     $('#addName').text(value3);//replace all span with just content
      //alert(value);
    $.ajax({
    url : "/getassignLocation",
    type: "GET",
    cache: false,
    success: function(data)
    {
        //console.log( "location:"+JSON.stringify(data) );
        for( var i=0;i<data.length;i++)
          {
             addstate='<li id="'+data[i].location+'" class="list-group-item" style="margin-bottom:5px;"><span>'+data[i].location+'</span><p class=" dropdown-toggle change1" type="button" data-toggle="dropdown" id="city" style="    float: right; padding: 0px;margin-top: -7px;margin-right: 2px;height: 40px;color: #357ca5;width: 20px;font-size: 24px;"><span class="glyphicon glyphicon-align-justify"></span></p><ul class="dropdown-menu pull-right" style="background-color: #ecf0f5;"><li id="itemlocation" style="background-color: #ecf0f5;text-align:center;color:#222d32; padding:2%;" data-con="'+data[i].country+'" data-state="'+data[i].state+'" data-city="'+data[i].city+'">show itemList</li></ul></li>';
              $('#addlist').append(addstate);
          }
    }
    });

  });
  //this will put the editor name in the header
    $.ajax({
    url : "/getassignLocation",
    type: "GET",
    cache: false,
    success: function(data)
    {
        //console.log( "city:"+JSON.stringify(data) );
        for( var i=0;i<data.length;i++)
          {
            username=data[i].assigned_to;
          }
          $('#username').text(username);
    }
    });
/* ----------------11111111111 api for get category list for state using logged editor 111111111111---------------------------*/
var globalObj={};//global object which having the all selected value

  $('#addlist').on('click','#itemstate',function()
  {
           var listId = $(this).parent().closest('li').attr('id');
           //alert("selectedstate:"+listId);
          
           var sectedcountry=$(this).data("con");

           //create one global object which having the all clicked information like country/state/city/location/category 
           globalObj={};
           globalObj.country=sectedcountry;
           globalObj.state=listId;
           globalObj.city="None";
           globalObj.location="None";

           $("#breadcrumb").empty();//clear the previous breadcrumbs
           $("#editormodel #breadcrumb").empty();
           //it will show the breadcrumbs with selected countryname and state name 
           var breadcrumb="<li class='glyphicon glyphicon-home'></li><li><span>"+sectedcountry+"<span></li><li><span>"+listId+"</span></li><li></li>";
           $("#breadcrumb").append(breadcrumb);
           $("#editormodel #breadcrumb").append(breadcrumb);

           //$('#categorylist').empty();
           $('#categorylist').empty();
           $.ajax({
                    url: "/getstateitemlist",
                    type: "POST", //send it through get method
                    data: { 
                      selectedstate:listId
                    },
                    success: function(response) {
                      //console.log(JSON.stringify(response) );
                      //console.log( "CategoryList:"+response.category_list);
                              var category_list='';
                              for(var i in response)
                              {
                                //console.log("1:"+response[i].category_list);
                                category_list=response[i].category_list;
                              }
                              //console.log("2:"+category_list);
                              $.each($.parseJSON(category_list), function(k, v) {
                                   // alert(k + ' is ' + v);
                                     var listitem='<li id="'+v+'" class="list-group-item statuschange" style="margin-bottom:5px;" data-toggle="modal" data-target="#myeditor"><span id="editor" style="width:100%;">'+v+'</span></li>';

                                    $('#categorylist').append(listitem);


                                });

                    },
                    error: function(xhr) {
                      //Do Something to handle error
                    }
                  });

           $('.hideshow').show();
            $('.hideshow1').hide();
  });
  /* ----------11111111111 api for get category list for state using logged editor111111111111-------*/

  /* ----------222222222 api for get category list for city using logged editor 222222222------------*/
  $('#addlist').on('click','#itemcity',function()
  {
          
           var listId = $(this).parent().closest('li').attr('id');
          // alert("selectedcity:"+listId);

          
           $('#categorylist').empty();

            var sectedcountry=$(this).data("con");
            var sectedstate=$(this).data("state");

          //making global object for itemcity which is used in editor to trace the all navigated location
           globalObj={};
           globalObj.country=sectedcountry;
           globalObj.state=sectedstate;
           globalObj.city=listId;
           globalObj.location="None";

            $("#breadcrumb").empty();//clear the previous breadcrumbs
            $("#editormodel #breadcrumb").empty();
           //it will show the breadcrumbs with selected countryname,state name and city
           var breadcrumb="<li class='glyphicon glyphicon-home'></li><li><span>"+sectedcountry+"</span></li><li><span>"+sectedstate+"</span></li><li><span>"+listId+"</span></li><li></li>";
           $("#breadcrumb").append(breadcrumb);
           $("#editormodel #breadcrumb").append(breadcrumb);

           $.ajax({
                    url: "/getcityitemlist",
                    type: "POST", //send it through get method
                    data: { 
                      selectedcity:listId
                    },
                    success: function(response) {
                      //console.log(JSON.stringify(response) );
                      //console.log( "CategoryList:"+response.category_list);
                              var category_list='';
                              for(var i in response)
                              {
                                //console.log("1:"+response[i].category_list);
                                category_list=response[i].category_list;
                              }
                              //console.log("2:"+category_list);
                              $.each($.parseJSON(category_list), function(k, v) {
                                   // alert(k + ' is ' + v);
                                     var listitem='<li id="'+v+'" class="list-group-item statuschange" style="margin-bottom:5px;">'+v+'</li>'
                                    $('#categorylist').append(listitem);


                                });

                    },
                    error: function(xhr) {
                      //Do Something to handle error
                    }
                  });

           $('.hideshow').show();
            $('.hideshow1').hide();
  });
  /* ----------------222222222 api for get category list for city using logged editor 222222222---------------------------*/

  /* ----------------333333333 api for get category list for city using logged editor 333333333---------------------------*/
  $('#addlist').on('click','#itemlocation',function()
  {
           var listId = $(this).parent().closest('li').attr('id');
           //alert("selectedlocation:"+listId);
          
            $('#categorylist').empty();

             var sectedcountry=$(this).data("con");
            var sectedstate=$(this).data("state");
            var sectedcity=$(this).data("city");

          //making global object for itemlocation which is used in editor to trace the all navigated location
           globalObj={};
           globalObj.country=sectedcountry;
           globalObj.state=sectedstate;
           globalObj.city=sectedcity;
           globalObj.location=listId;


           $("#breadcrumb").empty();//clear the previous breadcrumbs
            $("#editormodel #breadcrumb").empty();
           //it will show the breadcrumbs with selected countryname,state name and city
           var breadcrumb="<li class='glyphicon glyphicon-home'></li><li><span>"+sectedcountry+"</span></li><li><span>"+sectedstate+"</span></li><li><span>"+sectedcity+"</span></li><li><span>"+listId+"</span></li><li></li>";
           $("#breadcrumb").append(breadcrumb);
            $("#editormodel #breadcrumb").append(breadcrumb);

            $.ajax({
                    url: "/getlocationitemlist",
                    type: "POST", //send it through get method
                    data: { 
                      selectedlocation:listId
                    },
                    success: function(response) {
                      //console.log(JSON.stringify(response) );
                      //console.log( "CategoryList:"+response.category_list);
                              var category_list='';
                              for(var i in response)
                              {
                                //console.log("1:"+response[i].category_list);
                                category_list=response[i].category_list;
                              }
                             // console.log("2:"+category_list);
                              $.each($.parseJSON(category_list), function(k, v) {
                                   // alert(k + ' is ' + v);
                                     var listitem='<li id="'+v+'" class="list-group-item statuschange" style="margin-bottom:5px;">'+v+'</li>'
                                    $('#categorylist').append(listitem);


                                });

                    },
                    error: function(xhr) {
                      //Do Something to handle error
                    }
                  });
           $('.hideshow').show();
            $('.hideshow1').hide();
  });
  /* ----------------333333333 api for get category list for city using logged editor 333333333---------------------------*/
   /* ---------------44444 when we click at list of category for state ,city and location editor will open start----------------*/
  var start_time ;
   
  var siteName;
  var selectedCategory;
  $('#categorylist').on('click','li.statuschange',function()
  {
    var selectcat=$(this).attr("id");
    $('#category').text(selectcat);

    $('li.statuschange').attr('name', '');
    $(this).attr('name', 'colorchange');
    
    selectedCategory=$(this).attr('name');
    var currentdate = new Date(); 
    start_time = "" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "@"  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    //alert(start_time);
    
      
      siteName = $(this).closest('li').attr('id'); // li ID
     //alert(siteName);
     // alert("clickedlist for side bar state:"+clickedlist1);
     // alert("clickedlist for side bar city:"+clickedlist2);
     // alert("clickedlist for side bar location:"+clickedlist3);

     if(clickedlist1=="State")
     {
      
      $("#breadcrumb li:nth-child(4)").html('<span>'+siteName+'</span>');
     }

     if(clickedlist2=="City")
     {
     $("#breadcrumb li:nth-child(5)").html('<span>'+siteName+'</span>');
     }
      if(clickedlist3=="Location")
     {
     $("#breadcrumb li:nth-child(6)").html('<span>'+siteName+'</span>');
     }

     globalObj.sitename=siteName;

     //alert(JSON.stringify(globalObj));
      

      $.ajax({
        url : "/getSiteseen",
        type: "POST",
        data: globalObj,
        success: function(data)
        {
           //console.log("filtered site at click list:"+JSON.stringify(data));
           var len=data.length;
          if(len==1){

             if(data[0].status==1)
             {
               $('#editormodel').modal('show');
                // $("#"+selectedCategory).css({"background-color":"red"});
                $("li[name=colorchange]").css({"background-color":"#f39c12","color":"#ecf0f5"});

                $(".changestatus").css({"background-color":"#f39c12","color":"#ecf0f5","border":"1px solid #f39c12"});
                $("#submit").css({"background-color":"#f39c12","color":"#ecf0f5","border":"1px solid #f39c12"});

                 $("form").find("#submit").attr("value","finalize");
                 CKEDITOR.instances['editor1'].setData(data[0].content);
  
                  $("#submitform #keywords").val(data[0].keywords);
                  
                  $("#submitform #tags").val(data[0].tags);
                  
             }
             if(data[0].status==2)
             {
                 $('#editormodel').modal('hide');
                $("li[name=colorchange]").css({"background-color":"#00a654","color":"#ecf0f5"});
                $( "li[name=colorchange] .tooltip-r" ).remove();  
                $("li[name=colorchange]").append('<span class="tooltip-r pull-right" data-toggle="tooltip" data-placement="left" title="Finalized" style=""><i class="fa fa-exclamation-circle" aria-hidden="true"></i></span>');
                
                 
             }

         }else{
                $('#editormodel').modal('show');
            CKEDITOR.instances['editor1'].setData('');
            $("form").find("#submit").attr("value","pre-finalize");
            $("#keywords").val('');
            $("#tags").val('');
             $(".changestatus").css({"background-color":"#6679c1","color":"#ddd","border":"1px solid #6679c1"});
             $("#submit").css({"background-color":"#6679c1","color":"#ddd","border":"1px solid #6679c1"});
           
         }
          
          
        }
      });

      
   });
    /* ---------------44444 when we click at list of category for state ,city and location editor will open end----------------*/


 $('.hideshow').hide();
  
 /* ----------------------------------   CKEDITOR WORK FOR WITH AJAX STARTS-----------------------------------------------------*/
    CKEDITOR.replace( 'editor1');
    CKEDITOR.config.width="100%";
    CKEDITOR.config.height="210px"; 

   var postData=[];
   $('form').on("submit", function(e){
        e.preventDefault();
        var value=$("#submitform #submit").attr("value");
        //alert("buttton name:"+value);
        
        var currentdate = new Date(); 
        end_time = "" + currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + "@"  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
                // alert(end_time);

        //alert("all selected value in gloobal object:"+JSON.stringify(globalObj));
        
        var globalObj1=JSON.stringify(globalObj);

        $.each($.parseJSON(globalObj1), function(k, v) {
          //alert(k + ' is ' + v);
          var globaldata = {"name":k,"value":v}
          postData.push(globaldata); 

        });

         var ckvalue = CKEDITOR.instances.editor1.getData();
         var keywords = $("#keywords").val();
         var tags = $("#tags").val();
        
         var data = {"name":"editor1","value":ckvalue}
          postData.push(data); 

          var data1 = {"name":"keywords","value":keywords}
          postData.push(data1); 

         var data2 = {"name":"tags","value":tags}
          postData.push(data2); 


         var obj1 = {"name":"start_time","value":start_time}
          postData.push(obj1); 

        
         var obj = {"name":"end_time","value":end_time}
          postData.push(obj);

         

          // var obj2 = {"name":"siteName","value":siteName}
          // postData.push(obj2); 

          // var obj3 = {"name":"placeName","value":placeName}
          // postData.push(obj3); 

           
          if(value=="pre-finalize")
          { 
          var obj3 = {"name":"status","value":"1"}
          postData.push(obj3);
          //console.log("sitesseen form"+JSON.stringify(postData));
          $.ajax({
                          url: "/addSiteSeen",
                          type: "POST",
                          data: postData,              
                         success: function(data, textStatus)
                          {
                              //data - response from server
                              //console.log(textStatus);
                              if(textStatus=="success")
                              {
                                  postData = [];
                                  //CKEDITOR.instances.editor1.setData('');
                                   // $("#submitform #keywords").val('');
                                   // $("#submitform #tags").val('');
                                   // $("#"+selectedCategory).css({"background-color":"red"});
                                   $("li[name=colorchange]").css({"background-color":"#f39c12","color":"#ecf0f5"});
                                    
                                   $('#editormodel').modal('hide');
                              }
                              
                          }
                      });            
       }
       else
       {
        var obj3 = {"name":"status","value":"2"}
          postData.push(obj3);
          //alert("sitesseen form"+JSON.stringify(postData));
          $.ajax({
                          url: "/updateSiteSeen",
                          type: "POST",
                          data: postData,              
                         success: function(data, textStatus)
                          {
                              //data - response from server
                              //console.log(textStatus);
                              if(textStatus=="success")
                              {
                                  postData = [];
                                  // CKEDITOR.instances.editor1.setData('');
                                  //  $("#submitform #keywords").val('');
                                  //  $("#submitform #tags").val('');
                                   $("li[name=colorchange]").css({"background-color":"#00a654","color":"#ecf0f5"});
                                   $("li[name=colorchange]").append('<span class="tooltip-r pull-right" data-toggle="tooltip" data-placement="left" title="Finalized" style=""><i class="fa fa-exclamation-circle" aria-hidden="true"></i></span>');
                                   $('#editormodel').modal('hide'); 
                              }
                              
                          }
                      });      

       }

    });
 /* ----------------------------------   CKEDITOR WORK FOR WITH AJAX END----------------------------------------------------------*/
	
});