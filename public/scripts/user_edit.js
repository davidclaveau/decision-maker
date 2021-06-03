/* eslint-disable no-undef */
//For users to his  delete polls
$(document).ready(function() {
  $('.delete').each((function() {
    $(this).click(function() {

      // Store this delete dom in _this variable
      const _this = $(this);
      //Delete confirmation
      $.confirm({
        title: 'Are you sure to delete the poll?',
        content: '',
        buttons: {
          confirm: {
            text: 'Confirm',
            btnClass: 'btn-blue',
            keys: ['enter'],
            action: function() {

              //Delete the poll from database and users' page
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
              );
              $(_this).parents('.poll-container').remove();

            }
          },
          cancel: function() {
            'Cancel';
          }

        }
      });
    });
  }));
});


