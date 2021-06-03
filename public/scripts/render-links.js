/*
 * Use this to render the links for the user after they create their poll
 * This will check for any character limit errors first
 * Will then chain ajax requests to POST to the db, then GET the last poll
 * added and show the correct links to the user.
 */

$(document).ready(() => {
  $('form').submit((event) => {
    event.preventDefault();

    const $optTxt = $(".opt-txt")
    const $pollTxt = $("#poll-name");
    const option = $optTxt.val()
    const pollName = $pollTxt.val()
    const $error = $("div.error-message");
    const optionsArr = [];

    // Error handling
    // Get the string of every poll option in the form
    // Push the string.length into an array
    $(".opt-txt").each((index) => {
      const eachOption = $optTxt.eq(index).val()
      optionsArr.push(eachOption.length);
    });

    // Find any values that are greater than 255
    const found = optionsArr.find(num => num > 255);

    // Show an error if character limits are reached
    if (found || pollName.length > 255) {
      let errorName = "";

      if (option.length > 255 && pollName.length <= 255) {
        errorName += "Option title";
      } else if (pollName.length > 255 && option.length <= 255) {
        errorName += "Poll name";
      } else if (option.length > 255 && pollName.length > 255) {
        errorName += "Poll name and option title";
      }

      $error.empty().append(`
        <i class="fas fa-exclamation-circle"></i>
        <span><strong>${errorName} character limit exceeded! Please make sure it's less than 255 characters!</strong></span>
      `).slideDown();

      setTimeout(() => {
        $error.slideUp()
      }, 5000)

    } else {

    // Render link page after creating a new poll
      $(".create-poll").hide();

      const $form = $("form");
      const serialized = ($form.serialize());
      const url = 'http://localhost:8080'

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
          const linksRender = $(`
            <section class="poll-created">
              <h1>Congratulations - You've Created a New Poll!</h1>
                <div class="poll-links">
                  <container class="guest-link">
                    <h2>Share</h2>
                    <span>Start sharing your poll!</span>
                    <p class="copy-text" data-text="${url}/polls/${pollId}">
                      <span class="link-break">
                        <a href="${url}/polls/${pollId}">${url}/polls/${pollId}</a>
                      </span>
                    </p>
                    <button id="copy">
                      Copy
                      <i class="far fa-clipboard"></i>
                    </button>
                  </container>
                  <container class="admin-link">
                    <h2>Results</h2>
                    <span>See the poll here!</span>
                    <p>
                      <span class="link-break">
                        <a href="${url}/polls/${pollId}/results">${url}/polls/${pollId}/results</a>
                      </span>
                    </p>
                    <a href="${url}/polls/${pollId}/results">
                      <button id="results">
                        Results
                        <i class="fas fa-chart-bar"></i>
                      </button>
                    </a>
                  </container>
                </div>
              </section>
          `)

          $("main").append(linksRender);
          // history.pushState(`${url}/index/links`,"Your Links",'/#link-page');

          // Copy to clipboard function for sharing link
          linksRender.on("click", "#copy", () => {
            const $copyText = $(".copy-text")
            const copy = $copyText.attr("data-text")
            copyToClipboard(copy);

            $("#copy").html(`
              Copied!
              <i class="far fa-paper-plane"></i>
            `);
          })
        }
      })

      // Wait until post is complete, then retrieve last poll
      $.when(ajaxPost).done(() => {
        ajaxGet
        });
    }
  });
});
