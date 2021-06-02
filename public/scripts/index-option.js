$(document).ready(() => {
  /*
  * Allow users to textarea as many options as they like.
  * Creates a variable with the div for each option and description.
  * After the div is appended, we can access the button using
  * the variable (opt) and delete each option individually
  */

 // Delete placeholder element
 $(".delete-0").click(() => {
   $(".0").remove();
 });

 const $addOption = $("#add-option")
 const $optiontextarea = $("#option-textarea");
 const $descriptiontextarea = $("#description-textarea");
 const $options = $(".added-options-container")
 let optCount = 1

  const appendOption = () => {
    const option = $optiontextarea.val()
    const description = $descriptiontextarea.val()


    if (option.length > 255 || description.length > 255) {
      console.log("Length too long!");
    }

    const opt = $(`
      <div class="option ${optCount}">
        <div class="option-container">
          <span>Option</span>
          <textarea type="text" name="option${optCount}" class="opt-txt" required>${option}</textarea>
        </div>
        <div class="description-container">
          <span>Description</span>
          <textarea type="text" name="description${optCount}" class="desc-txt">${description}</textarea>
        </div>
          <button type="button" class="delete-btn ${optCount} delete-icon">
            <i class="fas fa-trash-alt"></i>
          </button>
      </div>
    `)
    $options.append(opt);

    // Delete each appended option individually
    opt.on("click", ".delete-btn", () => {
      opt.remove();
    });

    optCount++;
    $optiontextarea.val("");
    $descriptiontextarea.val("");
    $optiontextarea.focus();
  };

  // Clicking or 'tabbing' to the add buttn will initate the append
  $addOption.click((appendOption))
  $addOption.focus((appendOption))

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
