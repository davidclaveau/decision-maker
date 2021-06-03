//in the user's administration page
//delete poll
$(document).ready(function() {
  $('.delete').each((function() {
    $(this).click(function() {
      // store this delete dom in _this variable
      const _this = $(this);
      $.confirm({
        title: 'Are you sure to delete the poll?',
        content: '',
        buttons: {
          confirm: {
            text: 'Confirm',
            btnClass: 'btn-blue',
            keys: ['enter'],
            action: function() {

              //delete the poll
              const userId = $(_this).parent().find('.userId').attr('value');
              console.log(userId);
              const pollId = $(_this).attr('value');
              console.log(pollId);
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
              $(_this).parents('.poll-container').remove();

            }
          },
          cancel: function() {
            text: 'Cancel'
          }

        }
      });

    })
  }))
});


