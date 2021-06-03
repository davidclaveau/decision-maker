$(document).ready(function() {

    const optionsContainer = $('.options-container');

/*     //if an option has no rank yet, remove background color of its bars
    if (!$(optionsContainer).find('.rank').html().split(' ').join('').split('\n').join('')) {
      $(optionsContainer).find('.bar').css('background-color', 'transparent');
    } */



    //calculate total score of all options
    let totalScore = 0;
    let optionNumber = 0;
    $(optionsContainer).find('.rank').each(function() {
      const score = Number($(this).parent().children('.rank').html());
      totalScore += score;
      optionNumber++;
    })


    //set options bar's width

    const color = ['#fb5057', '#fd9644', '#34ace0'];
    let i = 0;
    $(optionsContainer).find('.bar').each(function() {
      let scorePercentage = '';
      const score = Number($(this).parent().children('.rank').html());
      // if more than 3 options, adjust scorePercentage to make each bar more distinguishable
      if (optionNumber > 3) {
        scorePercentage = (score / totalScore * 300 + '%').split(' ').join('').split('\n').join('');
      } else {
        scorePercentage = (score / totalScore * 100 + '%').split(' ').join('').split('\n').join('');
      }
      $(this).css({ 'width': scorePercentage })
      $(this).css({'background-color':color[i]});
      if(i===2){
        i=0
      }else{
        i++;
      }
    })



  const color2 = ['#fd9644', '#34ace0'];
    let j = 0;
  $('table').find('tr').each(function() {

    $(this).css({'background-color':color2[j]});
    if(j===1){
      j=0
    }else{
      j++;
    }
  })

  $('table').find('th').css('background-color', '#c23d3d')

});
