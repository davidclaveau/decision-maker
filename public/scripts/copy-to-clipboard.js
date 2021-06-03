// Copy this to the clipboard
const copyToClipboard = (text) => {
  let $temp = $("<input>");
  $("body").append($temp);
  $temp.val(text).select();
  document.execCommand("copy");
  $temp.remove();
};
