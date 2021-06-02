// Temporarily save the link to a temp variable
// Copy this to the clipboard
const copyToClipboard = (text) => {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(text).select();
  document.execCommand("copy");
  $temp.remove();
}
