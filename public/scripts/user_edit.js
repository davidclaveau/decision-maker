//in the user's administration page
//delete poll
$(document).ready(function() {
  $('.delete').each((function() {
    $(this).click(function(){
      $(this).parent().remove();
    })
  }))
});

//update poll
// $(document).ready(function() {
//   $('.edit').each((function() {
//     $(this).click(function(){

//     })
//   }))
// });
