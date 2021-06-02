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
        <section class="poll-created">
          <h1>Poll Created!</h1>
            <div class="poll-links">
              <container class="guest-link">
                <h2>Share</h2>
                <span>Start sharing your poll!</span>
                <p><a href="${url}/polls/${pollId}">${url}/polls/${pollId}</a></p>
                <a href="${url}/polls/${pollId}">
                  <button id="share">
                    Share
                    <i class="far fa-paper-plane"></i>
                  </button>
                </a>
              </container>
              <container class="admin-link">
                <h2>Results</h2>
                <span>See the poll here!</span>
                <p><a href="${url}/polls/${pollId}/results">${url}/polls/${pollId}/results</a></p>
                <a href="${url}/polls/${pollId}/results">
                  <button id="results">
                    Results
                    <i class="fas fa-chart-bar"></i>
                  </button>
                </a>
              </container>
            </div>
          </section>
        `);
      }
    })

    // Wait until post is complete, then retrieve last poll
     $.when(ajaxPost).done(() => {
       ajaxGet
      });
  });
});
