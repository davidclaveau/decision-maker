$(document).ready(function() {
  $('.poll').click(function() {

    const optionsContainer = $(this).parent().find('.options-container');
    //toggle options container
    $(optionsContainer).slideToggle(1000);
    //set options bar chart
    $(optionsContainer).find('.bar').each(function() {

      const rank = $(this).parent().children('.rank').html();
      const rankPercentage = (Number(rank) * 3.5 + '%').split(' ').join('').split('\n').join('');

      console.log(rankPercentage);

      $(this).animate({
        'width': rankPercentage
      }, 1000);
    })

  })
});
