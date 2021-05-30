$(document).ready(() => {
let count = 1

/*
 * Allow users to input as many options as they like
 * Create a div with each option and description
 * Allow users to remove each option
 */

$("#add-option").click(() => {
    const $optionInput = $("#option-input");
    const $descriptionInput = $("#description-input");
    const $options = $(".options")
    const option = $optionInput.val()
    const description = $descriptionInput.val()
    const el = $(`
      <div class="option ${count}">
        <span>Option:</span>
        <input type="text" name="option${count}" value="${option}"/>
        <span>Description:</span>
        <input type="text" name="description${count}" value="${description}"/>
        <button type="button" class="delete-btn ${count}">Delete</button>
      </div>
    `)

    $options.append(el);

    // Delete each option individually
    el.on("click", ".delete-btn", () => {
      el.remove();
    });

    count++;

    $optionInput.val("");
    $descriptionInput.val("");
    $optionInput.focus();
  });

  // Prevent user from losing created options
  // window.onbeforeunload = function(){
  //   return 'Are you sure you want to leave?';
  // };
});
