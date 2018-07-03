$(document).ready(function() {
  $(window).on("scroll", function() {
    if ($(window).scrollTop() >= 100) {
      $(".navbar").fadeOut(0);
    } else {
      $(".navbar").fadeIn(0);
    }
  });
});
