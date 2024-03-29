//= require jquery_ujs
//= require spin.min
$("ul.post-list > li:not(.0):not(.page-button:last)").css('display', 'none');
$("a.post-title").click(function() {
  $('.post-content *').remove();
  var spinner = new Spinner({top: '50px'}).spin();
  $('.post-content').append(spinner.el);
  $.get("/posts/" + $(this).attr("id"), function(result) {
    $('.post-content').html(result);
  });
});

$("li.page-button").click(function() {
  var show_id = parseInt($("ul.post-list > li:visible").attr("class"), 0) ;
  if ($(this).children().text() === 'Next') {
    show_id += 1;
    if (show_id >= 5) { show_id = 5; }
    $("ul.post-list > li:visible:not(.page-button)").hide();
    $("li." + show_id).fadeIn('slow');
    if (show_id === 1) {
      $(".page-button:first").fadeIn('slow');
    }else if (show_id === 5) {
      $(this).fadeOut('slow');
    }
  }else if ($(this).children().text() === 'Prev') {
    show_id -= 1;
    if (show_id <= 0) { show_id = 0; }
    $("ul.post-list > li:visible:not(.page-button)").hide();
    $("li." + show_id).fadeIn('slow');
    if (show_id === 3) {
      $(".page-button:last").fadeIn('slow');
    }else if (show_id === 0) {
      $(this).fadeOut('slow');
    }
  }
});
post_id = 1;
$(".phone-button>a").click(function() {
  if ($(this).attr("class") === 'next-post') {
    post_id += 1;
    if (post_id === 2) { $(".prev-post").show(); }
    else if (post_id === 30) { $(".next-post").hide(); }
    else if (post_id > 30) { post_id = 30; }
  } else{
    post_id -= 1;
    if (post_id === 29) { $(".next-post").show(); }
    else if (post_id === 1) { $(".prev-post").hide(); }
    else if (post_id < 1) { post_id = 1; }
  };
  $('.post-content *').remove();
  var spinner = new Spinner({top: '50px'}).spin();
  $('.post-content').append(spinner.el);
  $.get("/posts/" + post_id, function(result) {
    $('.post-content').html(result);
  });
});
