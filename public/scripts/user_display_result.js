/* eslint-disable no-undef */
$(document).ready(function() {
  $('.poll').click(function() {

    //reset display
    $('.options-container').hide();
    $('.bar').css({ 'width': '0px' });

    const optionsContainer = $(this).parents('.poll-container').find('.options-container');

    //if an option has no rank yet, remove background color of its bars
    if (!$(optionsContainer).find('.rank').html().split(' ').join('').split('\n').join('')) {
      $(optionsContainer).find('.bar').css('background-color', 'transparent');
    }

    //toggle options container
    $(optionsContainer).slideToggle(600);

    //calculate total score of all options
    let totalScore = 0;
    let optionNumber = 0;
    $(optionsContainer).find('.rank').each(function() {
      const score = Number($(this).parent().children('.rank').html());
      totalScore += score;
      optionNumber++;
    });

    const color = ['#c23d3d', '#fd9644', '#34ace0'];
    let i = 0;

    //set options bar's width
    $(optionsContainer).find('.bar').each(function() {
      let scorePercentage = '';
      const score = Number($(this).parent().children('.rank').html());

      // if more than 3 options, adjust scorePercentage to make each bar more distinguishable
      if (optionNumber > 3) {
        scorePercentage = (score / totalScore * 300 + '%').split(' ').join('').split('\n').join('');
      } else {
        scorePercentage = (score / totalScore * 100 + '%').split(' ').join('').split('\n').join('');
      }
      $(this).css({ 'width': scorePercentage });

      //set option bar's color
      $(this).css({ 'background-color': color[i] });
      if (i === 2) {
        i = 0;
      } else {
        i++;
      }
    });
  });

  //toggle options-container when clicked
  $('.options-container').each((function() {
    $(this).click(function() {
      $(this).slideToggle(600);
    });
  }));

  //when hover on a poll-title-container, show box shadow.
  $('.poll-title-container').hover(function() {
    $(this).toggleClass("shadow");
  });

});
