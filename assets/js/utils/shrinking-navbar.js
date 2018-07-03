$(document).ready(function() {
  $(window).on("scroll", function() {
    if ($(window).scrollTop() >= 130) {
      $(".navbar").addClass("compressed");
    } else {
      $(".navbar").removeClass("compressed");
    }
  });
});
