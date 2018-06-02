$(document).ready(function() {
  $(window).on("scroll", function() {
    if ($(window).scrollTop() >= 130) {
      $(".navbar").addClass("compressed");
      $("#logo-image").hide(300);
    } else {
      $(".navbar").removeClass("compressed");
      $("#logo-image").show(300);
    }
  });
});
