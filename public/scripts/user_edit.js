//in the user's administration page
//delete poll
$(document).ready(function() {
  $('.delete').each((function() {
    $(this).click(function() {
      const userId = $(this).parent().find('.userId').attr('value');
      // console.log(userId);
      const pollId = $(this).attr('value');
      // console.log(pollId);
      const data = {
        pollId
      };
      $.ajax(
        {
          url: `/users/${userId}`,
          method: 'POST',
          data: data
        }
      )
      $(this).parents('.poll-container').remove();
    })
  }))
});


