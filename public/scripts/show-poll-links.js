$(document).ready(() => {
  $('form').submit(() => {
    $(".create-poll").hide();
  });

  $('main').append(`
  <div class="poll-links">
    <h1> This is where we can show the links</p>
  </div>
  `)
});
