$( document ).ready(function()
 {
      var $item = $('.carousel .item');
      var $wHeight = $(window).height();

      $item.height($wHeight); 
      $item.addClass('full-screen');

      var $numberofSlides = $('.item').length;
      var $currentSlide = Math.floor((Math.random() * $numberofSlides));

      $('.carousel-indicators li').each(function(){
        var $slideValue = $(this).attr('data-slide-to');
        if($currentSlide == $slideValue) {
          $(this).addClass('active');
          $item.eq($slideValue).addClass('active');
        } else {
          $(this).removeClass('active');
          $item.eq($slideValue).removeClass('active');
        }
      });

      $('.carousel img').each(function() {
        var $src = $(this).attr('src');
        var $color = $(this).attr('data-color');
        $(this).parent().css({
          'background-image' : 'url(' + $src + ')',
          'background-color' : $color
        });
        $(this).remove();
      });

      $(window).on('resize', function (){
        $wHeight = $(window).height();
        $item.height($wHeight);
      });

      $('.carousel').carousel({
        interval: 3000,
        pause: "false"
      });

    $('#submitform').submit(function(e){  
    var str = new String("please enter correct credential");
               e.preventDefault();   
               var postData=$(this).serialize();
               console.log("data:"+JSON.stringify(postData));

                     $.ajax({
                              url: "/login",
                              type: "POST",
                              data:postData,              
                              success: function(response) {   
                                 console.log("coming response"+response);
                          			   if(response)
                          				{

                          					window.location.href="/dashbord";
                          				}
                                  else
                                  {
                                
                                    $( "#myModal .panel-footer span#filter1" ).fadeIn( 300 ).delay( 1500 ).fadeOut( 400 );
                                  }
                             }
                          });  

     });


 $("#submit").click(function(){
        $('#submitform').submit();
    });     

 //hide the incorrect credential text after some time
    $('#sucess').delay(10000).fadeOut();     
  


});
