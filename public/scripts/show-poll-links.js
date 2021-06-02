$(document).ready(() => {
  $('form').submit((event) => {
    event.preventDefault();
    $(".create-poll").hide();

    const $form = $("form");
    const serialized = ($form.serialize());
    const url = 'http://localhost:8080'
    console.log("url", url);

    // Post the form to the database
    const ajaxPost = $.ajax({
      type: "POST",
      url: "/index",
      data: serialized,
    })

    // Retrieve submitted post, show links to user
    const ajaxGet = $.ajax({
      type: "GET",
      url: "/index/links",
      success: function(result) {
        pollId = result.id;
        $('main').append(`
          <div class="poll-links">
            <h1> This is where we can show the links</h1>
            <p>Admin link <a href="${url}/polls/${pollId}/results">can be used here</a></p>
            <p>Guest's link <a href="${url}/polls/${pollId}">can be used here</a></p>
          </div>
        `);
      }
    })

    // Wait until post is complete, then retrieve last poll
     $.when(ajaxPost).done(() => {
       ajaxGet
      });
  });
});
