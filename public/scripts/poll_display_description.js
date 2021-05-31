  $(document).ready(() => {

  $('.option_title').click(() => {
    // alert('click on title')
    // const description=$(this).children('.option_description');
    // $(this).find('p').css
    $(this).css("background-color","yellow");
    console.log("Clicked",$(this).data);
  })
});

