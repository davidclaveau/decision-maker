  $(document).ready(() => {
  $('.option_description').hide()
  $('.option_title').click(function() {
    $(this).find('.option_description').slideToggle()
  })
});

