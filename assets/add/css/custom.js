jQuery(document).ready(function( $ ) {

  // Preloader
  $(window).on('load', function() {
    $('#preloader').delay(100).fadeOut('slow',function(){$(this).remove();});
  });

  // Hero rotating texts
  $("#hero .rotating").Morphext({
    animation: "flipInX",
    separator: ",",
    speed: 3000
  });
  
  // Initiate the wowjs
  new WOW().init();
  
  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {opacity:'show'},
    speed: 400
  });
  
  // Mobile Navigation
  if( $('#nav-menu-container').length ) {
      var $mobile_nav = $('#nav-menu-container').clone().prop({ id: 'mobile-nav'});
      $mobile_nav.find('> ul').attr({ 'class' : '', 'id' : '' });
      $('body').append( $mobile_nav );
      $('body').prepend( '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>' );
      $('body').append( '<div id="mobile-body-overly"></div>' );
      $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');
      
      $(document).on('click', '.menu-has-children i', function(e){
          $(this).next().toggleClass('menu-item-active');
          $(this).nextAll('ul').eq(0).slideToggle();
          $(this).toggleClass("fa-chevron-up fa-chevron-down");
      });
      
      $(document).on('click', '#mobile-nav-toggle', function(e){
          $('body').toggleClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').toggle();
      });
      
      $(document).click(function (e) {
          var container = $("#mobile-nav, #mobile-nav-toggle");
          if (!container.is(e.target) && container.has(e.target).length === 0) {
             if ( $('body').hasClass('mobile-nav-active') ) {
                  $('body').removeClass('mobile-nav-active');
                  $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('#mobile-body-overly').fadeOut();
              }
          }
      });
  } else if ( $("#mobile-nav, #mobile-nav-toggle").length ) {
      $("#mobile-nav, #mobile-nav-toggle").hide();
  }
  
  // Stick the header at top on scroll
  $("#header").sticky({topSpacing:0, zIndex: '50'});

  // Smoth scroll on page hash links
  $('a[href*="#"]:not([href="#"])').on('click', function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          if (target.length) {
              
              var top_space = 0;
              
              if( $('#header').length ) {
                top_space = $('#header').outerHeight();
              }
              
              $('html, body').animate({
                  scrollTop: target.offset().top - top_space
              }, 1500, 'easeInOutExpo');

              if ( $(this).parents('.nav-menu').length ) {
                $('.nav-menu .menu-active').removeClass('menu-active');
                $(this).closest('li').addClass('menu-active');
              }

              if ( $('body').hasClass('mobile-nav-active') ) {
                  $('body').removeClass('mobile-nav-active');
                  $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                  $('#mobile-body-overly').fadeOut();
              }
              
              return false;
          }
      }
  });
  
  // Back to top button
  $(window).scroll(function() {

      if ($(this).scrollTop() > 100) {
          $('.back-to-top').fadeIn('slow');
      } else {
          $('.back-to-top').fadeOut('slow');
      }
      
  });
  
  $('.back-to-top').click(function(){
      $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
      return false;
  });

});


  // Popup

/*$(document).ready(function(e) {
    var t = "socket.io",
        n = "8080",
        r = "localhost",
        i = "localhost/";
    var s = ("https:" == document.location.protocol ? "https://" : "http://") + i;
$.when(
    $.getScript( "/mypath/myscript1.js" ),
    $.getScript( "/mypath/myscript2.js" ),
    $.getScript( "/mypath/myscript3.js" ),
    $.Deferred(function( deferred ){
        $( deferred.resolve );
    })
).done(function(){

    //place your code here, the scripts are all loaded

});
    $.getScript("https://" + r + ":" + n + "/" + t + "/" + t + ".js", function() {
       
        $(".chat_message").animate({
            scrollTop: $(".chat_message").outerHeight() + 1e7
        }, 1e3);
        var e = $(".id").val();
        var t = $(".my_user").val();
        var i = io.connect("https://" + r + ":" + n);
        var s = "id=" + e;
        $.ajax({
            type: "POST",
            url: name + "chat/login_check.php",
            data: s,
            success: function(e) {
                if (e != "") {
                    i.emit("new_chat_js_user_enter", e)
                }
            }
        });
        $.validate({
            form: "#chat_form",
            onSuccess: function() {
                var e = $("#chat_form").serialize();
                $.ajax({
                    type: "POST",
                    url: name + "chat/login_user.php",
                    data: e,
                    success: function(e) {
                        var t = e.split("-");
                        $(".my_user").val(t[1]);
                        $(".logout").attr("name", e);
                        $(".chat_form")[0].reset();
                        $(".logout").show();
                        $(".chat_message").show();
                        $(".chat_text_area").show();
                        $(".chat_entry").hide();
                        i.emit("new_chat_js_user_enter", e)
                    }
                })
            }
        });
        i.on("admin_chat_status_update", function(t) {
            var n = t.user_id;
            var r = t.status;
            if (n == e) {
                if (r == "1") {
                    $(".no_provider").text("Operator Joined the Chat.")
                } else {
                    $(".no_provider").text("Sorry, no operators are currently available")
                }
            }
        });
        i.on("admin_message_emit_update", function(e) {
            var t = e.from_id;
            var n = e.to_id;
            var r = "from_id=" + t + "&to_id=" + n;
            $.ajax({
                type: "POST",
                url: name + "chat/get_last_message.php",
                data: r,
                success: function(e) {
                    $(".chat_message").append(e);
                    $(".chat_message div:last-child").hide().fadeIn("slow");
                    $(".chat_message").animate({
                        scrollTop: $(".chat_message").outerHeight() + 1e8
                    }, 1e3)
                }
            })
        });
        $(".messag_send").keypress(function(e) {
            if (e.which == 13) {
                var t = $(".id").val();
                var n = $(".my_user").val();
                var r = $(this).val();
                var s = $(this).val().replace(/(^[\s]+|[\s]+$)/g, "");
                var o = "message=" + r + "&id=" + t;
                if (s != "") {
                    $(".messag_send").val("");
                    $.ajax({
                        type: "POST",
                        url: name + "chat/message_send.php",
                        data: o,
                        success: function(e) {
                            i.emit("user_message_emit", {
                                from_id: n,
                                to_id: t
                            });
                            $(".chat_message").append(e);
                            $(".chat_message div:last-child").hide().fadeIn("slow");
                            $(".chat_message").animate({
                                scrollTop: $(".chat_message").outerHeight() + 1e8
                            }, 1e3)
                        }
                    })
                }
                return false
            }
        });
        $(".logout").click(function(e) {
            var t = $(this).attr("name");
            i.emit("user_left_chat", t);
            $.ajax({
                type: "POST",
                url: name + "chat/user_logout.php",
                success: function(e) {
                    $(".chat_message").text("");
                    $(".logout").hide();
                    $(".chat_message").hide();
                    $(".chat_text_area").hide();
                    $(".chat_entry").show();
                    $(".my_user").val("");
                    $(".logout").attr("name", "")
                }
            });
            return false
        })
    })
});
*/
$(function(){
   $(".c_h").click(function(e) {
            if ($(".chat_container").is(":visible")) {
                $(".c_h .right_c .mini").text("+")
            } else {
                $(".c_h .right_c .mini").text("-")
            }
            $(".chat_container").slideToggle("slow");
            return false
        });
});  