  $(document).ready(() => {

  $('.click').click(function() {
    // alert('click on title')
    // const description=$(this).children('.option_description');
    // console.log("clicked", $(this).html())
    $(this).parent().find('.option_description').slideToggle()

    // $('.option_description').css('background-color','red');
    // console.log($('.option_description').parent().children().slideToggle())
  })
});

