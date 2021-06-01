  $(document).ready(() => {
  $('.option_description').hide()
  $('.option_title').click(function() {
    $(this).parent().find('.option_description').slideToggle()
  })
});

