$(document).ready(() => {

  $('.option_title').click(() => {
    // alert('click on title')
    // $(this).css("color","yellow");
    const description=$(this).children('.option_description');
    console.log($(description));
    $(description).css('display','block');
  })


});
