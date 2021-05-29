$(document).ready(() => {
  $("#add-option").click(() => {

    const option = $("#option-input").val()
    const description = $("#description-input").val()



    $(".options").append(`OPTION: ${option} DESCRIPTION ${description}`);
  });
});
