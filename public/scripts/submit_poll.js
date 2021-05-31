$(document).ready(() => {
  $('#submit').click(() => {
    let votes = {};
    let ranknum = 1;
    const results = $('.option_title')
<<<<<<< HEAD
    for (const child of results) {
      votes[child.childNodes[0].nodeValue.split(" ").join("").split("\n").join("")] = ranknum;
      ranknum ++;
      alert(child.childNodes[0].nodeValue);
=======
    console.log(results)
    for (const child of results) {
      votes[child.childNodes[0].nodeValue.split(" ").join("").split("\n").join("")] = ranknum;
      ranknum ++;
      // alert(child.childNodes[0].nodeValue);
>>>>>>> a236d032534df87a3d1b691a6f6aeff52c1a5e74
    }
    console.log(votes);
  })
});
