$(document).ready(() => {
  /*
  * Allow users to input as many options as they like.
  * Create a variable with the div with each option and description.
  * After the div is appended, we can access the button using
  * the variable (opt) and delete each option individually
  */

 const $optionInput = $("#option-input");
 const $descriptionInput = $("#description-input");
 const $options = $(".options")
 let optCount = 2

  $("#add-option").click(() => {
    const option = $optionInput.val()
    const description = $descriptionInput.val()
    const opt = $(`
      <div class="option ${optCount}">
        <span>Option:</span>
        <input type="text" name="option${optCount}" value="${option}"/>
        <span>Description:</span>
        <input type="text" name="description${optCount}" value="${description}"/>
        <button type="button" class="delete-btn ${optCount}">Delete</button>
      </div>
    `)
    $options.append(opt);

    // Delete each option individually
    opt.on("click", ".delete-btn", () => {
      opt.remove();
    });

    optCount++;
    $optionInput.val("");
    $descriptionInput.val("");
    $optionInput.focus();
  });

  // Prevent user from losing progress
  // window.onbeforeunload = function(){
  //   const optionsCreated = $options.children();
  //   const pollName = $('#poll-name').val();

  //   if (optionsCreated.length > 0) {
  //     return 'Are you sure you want to leave?';
  //   }

    // if (pollName !== "") {
    //   return 'Are you sure you want to leave?';
    // }

  // };

  $(() => {
    $('#poll-form').areYouSure({
      message: 'It looks like you have been editing something. '
              + 'If you leave before saving, your changes will be lost.'
    });

    const optionsCreated = $options.children();
    const pollName = $('#poll-name').val();

    if (optionsCreated.length > 0) {
      $('#poll-form').areYouSure({
        message: 'It looks like you have been editing something. '
              + 'If you leave before saving, your changes will be lost.'
      })
    };
  });
});
