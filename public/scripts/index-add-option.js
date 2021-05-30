$(document).ready(() => {
let count = 1

  $("#add-option").click(() => {
    const $optionInput = $("#option-input");
    const $descriptionInput = $("#description-input");

    const option = $optionInput.val()
    const description = $descriptionInput.val()

    $(".options").append(`
      <div>
        <span>Option ${count}:</span>
        <input type="text" name="option${count}" value="${option}"/>
        <span>Description:</span>
        <input type="text" name="description${count}" value="${description}"/>
      </div>
    `);
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
