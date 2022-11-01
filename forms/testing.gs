// Restrict the script's authorization
// to the form it is bound to.

//@OnlyCurrentDoc

var form = FormApp.getActiveForm();

function Test() {
  const data = form.getItems(); 
  data.map(item => Logger.log(item.getType()));     
}