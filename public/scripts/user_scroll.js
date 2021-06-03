/* eslint-disable no-undef */
//Adjust option container's position, when user scrolls.
$(document).ready(function() {
  $(document).scroll(function() {
    if ($(this).scrollTop() > 150) {
      const topGrid = $(this).scrollTop() - 150;
      $('.options-container').css({ "top": topGrid });
    }
  });
});
