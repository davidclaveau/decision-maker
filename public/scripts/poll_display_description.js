  $(document).ready(() => {
  $('.option_title').click(function() {
    $(this).parent().find('.option_description').slideToggle()
  })
});

