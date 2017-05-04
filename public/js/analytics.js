$( document ).ready(function()//started page
 {

 /*-------------1.this api will get all the data available in assignstate------------------------*/

	$.ajax({
    url : "/ananlyticsState",
    type: "GET",
    cache: false,
    success: function(data)
    {
        //console.log( "assignstate for analytics:"+JSON.stringify(data) );
        var category_list='';

        for( var i=0;i<data.length;i++)
	        {    
	        	 category_list='';
	        	 category_list=data[i].category_list;
	        	 var addstate1='';
	        	 addstate1='<tr><td></td><td>'+data[i].assigned_to+'</td><td>'+data[i].state+'</td><td>'+data[i].country+'</td><td>'+data[i].assigned_date+'</td><td>';
                  

                  $.each($.parseJSON(category_list), function(k, v) {
                         addstate1+=' <span id="category">'+v+'</span>';
                      
	               });

                  addstate1+='</td> </tr>';

                  $('#addassignstate1').append(addstate1);
	        }
       
	        pagination("stateassign");
    }
    });

    

 /*-------------1.this api will get all the data available in assignstate--------------------*/

 /*-------------2.this api will get all the data available in assigncity---------------------*/

  $.ajax({
    url : "/ananlyticsCity",
    type: "GET",
    cache: false,
    success: function(data)
    {
        //console.log( "assigncity for analytics:"+JSON.stringify(data) );
         var category_list='';

        for( var i=0;i<data.length;i++)
          {    
        //      category_list='';
              category_list=data[i].category_list;
             var addcity1='';
             addcity1='<tr><td></td><td>'+data[i].assigned_to+'</td><td>'+data[i].city+'</td><td>'+data[i].state+'</td><td>'+data[i].country+'</td><td>'+data[i].assigned_date+'</td><td>';
                  

                  $.each($.parseJSON(category_list), function(k, v) {
                         addcity1+=' <span id="category">'+v+'</span>';
                      
                 });

                  addcity1+='</td> </tr>';

                  //console.log( "assigncity for category:"+category_list );

                  $('#addassigncity1').append(addcity1);
          }
       
           pagination("cityassign");
    }
    }); 
 /*-------------2.this api will get all the data available in assigncity----------------------*/

 /*-------------3.this api will get all the data available in assignlocation-----------------*/

  $.ajax({
    url : "/ananlyticsLoc",
    type: "GET",
    cache: false,
    success: function(data)
    {
       //console.log( "assignLoc for analytics:"+JSON.stringify(data) );
       var category_list='';

        for( var i=0;i<data.length;i++)
          {    
             category_list=data[i].category_list;
             var addloc1='';
             addloc1='<tr><td></td><td>'+data[i].assigned_to+'</td><td>'+data[i].location+'</td><td>'+data[i].city+'</td><td>'+data[i].state+'</td><td>'+data[i].country+'</td><td>'+data[i].assigned_date+'</td><td>';
                  

                  $.each($.parseJSON(category_list), function(k, v) {
                         addloc1+=' <span id="category">'+v+'</span>';
                      
                 });

                  addloc1+='</td> </tr>';
                  $('#addassignloc1').append(addloc1);
                 
          }
       
        pagination("locationassign");
    }
  });
 
 /*-------------3.this api will get all the data available in assignlocation------------------*/
/*-----------4.this api will get all the data available in siteseen for workstatus------------*/
   $.ajax({
    url : "/workStatus",
    type: "GET",
    cache: false,
    success: function(data)
    {
       //console.log( "workstatus for analytics:"+JSON.stringify(data) );
       

        for( var i=0;i<data.length;i++)
          {    
            var addStatus='';
             addStatus='<tr><td></td><td>'+data[i].editor_name+'</td><td>'+data[i].country+'</td><td>'+data[i].state+'</td><td>'+data[i].city+'</td><td>'+data[i].location+'</td><td>'+data[i].sitename+'</td><td>'+data[i].start_time+'</td><td>'+data[i].end_time+'</td><td>';

               if(data[i].status=="1")
               {
                      addStatus+=' <span id="category1">Progress</span>';
               }
               else if(data[i].status=="2")
               {
                      addStatus+=' <span id="category2">Finalized</span>';
               }

              addStatus+='</td><td id="'+data[i].id+'">';
              if(data[i].auditor=="None")
               {
                      addStatus+=' <i class="fa fa-user-plus" title="assign_to '+data[i].auditor+'" aria-hidden="true"></i>';
               }
               else 
               {
                      addStatus+='<i class="fa fa-user-plus iconred" title="assign_to '+data[i].auditor+'" aria-hidden="true"></i>';
               }
              addStatus+='</td> </tr>';


                  
                  $('#status').append(addStatus);
          }
          pagination("workstatus");
    }
  });

/*-----------4.this api will get all the data available in siteseen for workstatus-------------*/
/*-----------5.when clicked at inpector colmun in status tab this api will fire----------------*/
var totalInspector;
$.ajax({
        url : "/gettotalinspector",
        type: "GET",
        cache: false,
        async: false ,
        success: function(data)
        {
          
            console.log( "auditor:"+JSON.stringify(data) );
             totalInspector=data;
            
        }
       });
$('#status').on('click','.fa.fa-user-plus',function(){

   var selectID=$(this).parent().attr("id");
   //alert("selected ID:"+selectID);
   var content=$('<div class="modal fade" id="auditorModel" style="z-index:10000" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Assigned to inspector</h4></div><div class="modal-body"><select class="selectpicker editorName" style="width: 100%;margin-bottom:10px;border-radius: 4px;height: 30px;" id="inpectorname" ><option>select inspector...</option></select> </div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary" id="auditor" data-dismiss="modal" data-trid="'+selectID+'">Submit</button></div></div></div></div>');

            for( var i=0;i<totalInspector.length;i++)
            {
                     
                    content.find('select').append(' <option>'+totalInspector[i].username+'</option>');
            }

    $(".modalauditor").empty();
    $(".modalauditor").append(content);
    $("#auditorModel").modal({show:true});
});

$('.modalauditor').on('click','#auditor',function(e)
  {
     $('#status').empty();
    var trid=$(this).data("trid");
    //alert("selected table data:"+trid);

    var inpectorname=$('#inpectorname').val();
    //alert("inpectorname:"+inpectorname);

       $.ajax({
          url : "/assignedInpector",
          type: "POST",
          data:{"id":trid,"inpectorname":inpectorname},
          success: function(data)
          {
            //console.log("get status after assignauditor:"+JSON.stringify(data));
              for( var i=0;i<data.length;i++)
              {    
                var addStatus='';
                 addStatus='<tr><td></td><td>'+data[i].editor_name+'</td><td>'+data[i].country+'</td><td>'+data[i].state+'</td><td>'+data[i].city+'</td><td>'+data[i].location+'</td><td>'+data[i].sitename+'</td><td>'+data[i].start_time+'</td><td>'+data[i].end_time+'</td><td>';

                   if(data[i].status=="1")
                   {
                          addStatus+=' <span id="category1">Progress</span>';
                   }
                   else if(data[i].status=="2")
                   {
                          addStatus+=' <span id="category2">Finalized</span>';
                   }

                  addStatus+='</td><td id="'+data[i].id+'">';
                  if(data[i].auditor=="None")
                   {
                          addStatus+=' <i class="fa fa-user-plus" title="assign_to '+data[i].auditor+'" aria-hidden="true"></i>';
                   }
                   else 
                   {
                          addStatus+='<i class="fa fa-user-plus iconred" title="assign_to '+data[i].auditor+'" aria-hidden="true"></i>';
                   }
                  addStatus+='</td> </tr>';

                      
                      $('#status').append(addStatus);
              }
              pagination("workstatus");
              
          }
        });
  });

/*-----------5.when clicked at auditor colmun in status tab this api will fire---------------*/

/*----------6.this api will get all data from inpectorDb which is finalized by inpector----------*/
$.ajax({
    url : "/inspectData",
    type: "GET",
    cache: false,
    success: function(data)
    {
      //console.log("inpectordata analytics:"+JSON.stringify(data));
      $('#verifydata').empty();
      var inpectordata='';
        for( var i=0;i<data.length;i++)
        {    
       
           inpectordata+='<tr><td></td><td>'+data[i].auditor_name+'</td><td>'+data[i].country+'</td><td>'+data[i].state+'</td> <td>'+data[i].city+'</td><td>'+data[i].location+'</td><td>'+data[i].sitename+'</td><td class="col-xs-1" id='+data[i].id+'><i class="fa fa-pencil fa-lg iconblue" aria-hidden="true"></i></td></tr>'
               
        }
        $('#verifydata').html(inpectordata);
        pagination("verify");
    }
});

/*---6.1click at refresh option to get new inspect data submited by inspector-----------*/
$('.refresh5').on('click',function()
{
     //alert("refresh inpectordata");
     $('#verifydata').empty();
     $.ajax({
        url : "/inspectData",
        type: "GET",
        cache: false,
        success: function(data)
        {
          //console.log("inpectordata analytics reffresh:"+JSON.stringify(data));
          
          var inpectordata='';
            for( var i=0;i<data.length;i++)
            {    
           
               inpectordata+='<tr><td></td><td>'+data[i].auditor_name+'</td><td>'+data[i].country+'</td><td>'+data[i].state+'</td> <td>'+data[i].city+'</td><td>'+data[i].location+'</td><td>'+data[i].sitename+'</td><td class="col-xs-1" id='+data[i].id+'><i class="fa fa-pencil fa-lg iconblue" aria-hidden="true"></i></td></tr>'
                   
            }
            $('#verifydata').html(inpectordata);
            pagination("verify");
        }
    });
});
/*---6.1click at refresh option to get new inspect data submited by inspector-----------*/
/*---6.2click at edit action in verify tabto get particlar inspector data using selectedID-----*/
var postdata=[];
$('#verifydata').on('click','.fa.fa-pencil',function()
{ 
   var selectedId=$(this).parent('td').attr("id");
   //alert("admin panel for edit:"+selectedId);
   postdata=[];//clear the array next click
   $.ajax({
        url : "/getData",
        type: "POST",
        data:{"id":selectedId},
        success: function(data)
        {
                 console.log("inpector data for admin editor:"+JSON.stringify(data));

                 CKEDITOR.instances['editor1'].setData(data[0].content);  

                  $("#adminsubmitform #keywords").val(data[0].keywords);
                  
                  $("#adminsubmitform #tags").val(data[0].tags);

                  var IdData = {"name":"id","value":data[0].id}
                  postdata.push(IdData);

                  var country = {"name":"country","value":data[0].country}
                  postdata.push(country);

                  var state = {"name":"state","value":data[0].state}
                  postdata.push(state);

                  var city = {"name":"city","value":data[0].city}
                  postdata.push(city);

                  var location = {"name":"location","value":data[0].location}
                  postdata.push(location);

                  var sitename = {"name":"sitename","value":data[0].sitename}
                  postdata.push(sitename);


        }
    });
   $('#adminmodel').modal('show');
   
}); 


/*---6.2click at edit action in verify tabto get particlar inspector data using selectedID-----*/

/*---------6. this api will get all data from inpectorDb which is finalized by inpector--------*/

/*-----7. this api update and save data into based at button click in  inpectordb $ finalDb-----*/
var which;

  $("#adminsubmitform #click").click(function () {
      which = $(this).attr("value");
      //alert("clcike button:"+which);
  });
$('#adminsubmitform').submit(function(e){
         e.preventDefault();
         var ckvalue = CKEDITOR.instances.editor1.getData();
         var keywords = $("#keywords").val();
         var tags = $("#tags").val();

         
        
         var data = {"name":"editor1","value":ckvalue}
          postdata.push(data); 

          var data1 = {"name":"keywords","value":keywords}
          postdata.push(data1); 

         var data2 = {"name":"tags","value":tags}
          postdata.push(data2); 
    if(which=="Save")
    {
      //alert("update inside inpectorDb:"+JSON.stringify(postdata));
     
      $.ajax({
          url : "/UpdateinpectorDb",
          type: "POST",
          data:postdata,
          success: function(data)
          {
            
            $('#adminmodel').modal('hide');
                    
          }
       });
    }
    else if(which=="Final")
    {
     //alert("save in finaldb and update admin status:"+JSON.stringify(postdata));
      $('#verifydata').empty();
        $.ajax({
          url : "/insertIntoFinalDb",
          type: "POST",
          data:postdata,
          success: function(data)
          {
            var inpectordata='';
            for( var i=0;i<data.length;i++)
            {    
           
               inpectordata+='<tr><td></td><td>'+data[i].auditor_name+'</td><td>'+data[i].country+'</td><td>'+data[i].state+'</td> <td>'+data[i].city+'</td><td>'+data[i].location+'</td><td>'+data[i].sitename+'</td><td class="col-xs-1" id='+data[i].id+'><i class="fa fa-pencil fa-lg iconblue" aria-hidden="true"></i></td></tr>'
                   
            }
            $('#verifydata').html(inpectordata);
            pagination("verify");
            $('#adminmodel').modal('hide');
          }
        });
    }
});
/*-----7. this api update and save data into based at button click in  inpectordb $ finalDb-----*/
 $('#search').on('keyup', function() { 
  var value = $(this).val(); 
  var refer=$("#previewmodel").find(".active").attr("refer");
  var patt = new RegExp(value, "i"); 

  $('#'+refer+" .myTable").find('tr').each(function() { 
  
    if (!($(this).find('td').text().search(patt) >= 0)) { 
      $(this).not('.myHead').hide(); 
    } 
    if (($(this).find('td').text().search(patt) >= 0)) { 
      $(this).show(); 
    } 
  }); 

});

$('#search1').on('keyup', function() { 
  var value = $(this).val(); 
  //alert(value);
  var patt = new RegExp(value, "i"); 
  $('.myTable1').find('tr').each(function() { 
     // alert("hello");
      if (!($(this).find('td').text().search(patt) >= 0)) { 
      $(this).not('.myHead1').hide(); 
      } 
      if (($(this).find('td').text().search(patt) >= 0)) { 
        $(this).show(); 
      } 

  });

});

$('#search2').on('keyup', function() { 
  var value = $(this).val(); 
  //alert(value);
  var patt = new RegExp(value, "i"); 
  $('.myTable2').find('tr').each(function() { 
     // alert("hello");
      if (!($(this).find('td').text().search(patt) >= 0)) { 
      $(this).not('.myHead2').hide(); 
      } 
      if (($(this).find('td').text().search(patt) >= 0)) { 
        $(this).show(); 
      } 

  });

});


$('#search3').on('keyup', function() { 
  var value = $(this).val(); 
  //alert(value);
  var patt = new RegExp(value, "i"); 
  $('.myTable3').find('tr').each(function() { 
     // alert("hello");
      if (!($(this).find('td').text().search(patt) >= 0)) { 
      $(this).not('.myHead3').hide(); 
      } 
      if (($(this).find('td').text().search(patt) >= 0)) { 
        $(this).show(); 
      } 

  });

});

 
/*------------------this function work with pagination for table----------------------------*/
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
/*----------this function work with pagination for table---------------------------------------*/

});//end page