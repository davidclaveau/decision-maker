$(document).ready(() => {

  $(function() {
    $('ul li .bar').each(function(){
      const rank=$(this).parent().children('span').html();
      console.log(rank);
      $(this).animate({
      'width':rank +'%'
      },1000);
    });
  })
  // $('li').click(() => {
  //   alert('you click');
  // })

});
