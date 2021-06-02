$(document).ready(() => {
  $('#no_blank').hide()

  $('#not_submit').click(function(event) {
    event.stopPropagation();
    // alert("Do not re-submit your answer again!")



    const voter_name = $('#input_name')[0].value;
    let poll_id = $('#poll_id')[0].value
    let option_id = [];
    let inputArr = $('.option_id')
    for (const eachInput of inputArr) {
      option_id.push(eachInput.value)
    }
    const data = {
      voter_name,
      poll_id,
      option_id
    }

    if (!voter_name) {
      $('#no_blank').show().delay(1500).fadeOut(1)
    } else {
      $.ajax(
       {
         url: `/polls/${poll_id}`,
         method: 'POST',
         data: data
       }
     )

     $(this).replaceWith("<p class='message'>Submission Successful</p>")


    }



  })

});
