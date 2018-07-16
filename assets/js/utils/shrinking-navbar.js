$(document).ready(function() {
  $(window).on("scroll", function() {
    if ($(window).scrollTop() >= 40) {
      $(".navbar").addClass("compressed");
    } else {
      $(".navbar").removeClass("compressed");
    }
  });
});
