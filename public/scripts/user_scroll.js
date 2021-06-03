$(document).ready(function() {
  $(document).scroll(function() {
    if ($(this).scrollTop() > 150) {
      const topGrid=$(this).scrollTop()-150;
      console.log(topGrid);
      $('.options-container').css({ "top": topGrid });
    }
  })
})
