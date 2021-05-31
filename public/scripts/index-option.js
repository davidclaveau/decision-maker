$(document).ready(() => {
  /*
  * Allow users to input as many options as they like.
  * Creates a variable with the div for each option and description.
  * After the div is appended, we can access the button using
  * the variable (opt) and delete each option individually
  */

 // Delete placeholder element
 $(".delete-0").click(() => {
   $(".delete-0").parent().remove();
 });

 const $optionInput = $("#option-input");
 const $descriptionInput = $("#description-input");
 const $options = $(".options")
 let optCount = 1

  $("#add-option").click(() => {
    const option = $optionInput.val()
    const description = $descriptionInput.val()
    const opt = $(`
      <div class="option ${optCount}">
        <span>Option:</span>
        <input type="text" name="option${optCount}" required value="${option}"/>
        <span>Description:</span>
        <input type="text" name="description${optCount}" value="${description}"/>
        <button type="button" class="delete-btn ${optCount}">Delete</button>
      </div>
    `)
    $options.append(opt);

    // Delete each appended option individually
    opt.on("click", ".delete-btn", () => {
      opt.remove();
    });

    optCount++;
    $optionInput.val("");
    $descriptionInput.val("");
    $optionInput.focus();
  });

  /*
  * Uses Are-You-Sure jquery plugin to check if the form has been
  * changed. Prompts the user that their information will be lost if
  * they choose to navigate away from the page
  */

  $(() => {
    $('#poll-form').areYouSure(
      { message: 'It looks like you have been editing something. '
              + 'If you leave before saving, your changes will be lost.'}
    );
  });
});
