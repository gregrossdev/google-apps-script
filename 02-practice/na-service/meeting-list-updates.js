/** 
 * https://docs.google.com/forms/d/e/1FAIpQLSes_2H3o-FImigfD1GZ5GJj3sBf5TBnrkWZ6nkiGiYjxa-NYA/viewform
 * https://script.google.com/home/projects/1NHDwu31tytM3pxHTRWkR3MJrCsQW41HZOTiXDd8NWBodH7X2mpalDpLl/edit
*/


//@OnlyCurrentDoc

function createFormSubmitTrigger() {

  let form = FormApp.getActiveForm();

  let currentTriggers = ScriptApp.getProjectTriggers();
  if(currentTriggers.length > 0)
    return;

  ScriptApp.newTrigger("onFormSubmit").forForm(form).onFormSubmit().create();
}

function onFormSubmit(e) {

  let formResponse = e.response;
  let itemResponses = formResponse.getItemResponses();
  let emailBody = '<div>';

  itemResponses.forEach(function(itemResponse) {
    let title = itemResponse.getItem().getTitle();
    let response = itemResponse.getResponse();
    emailBody += '<u><h3>' + title + '</h3></u>' + "\n" + '<strong><h2>' + response + '</h2></strong>' + "\n\n";
  });

  emailBody += '</div>'; 

  sendEmail(emailBody);
}

function sendEmail(emailBody) {
  MailApp.sendEmail(
    "gregross.dev@gmail.com", 
    "📝 Meeting List",
    "",
    {htmlBody:emailBody} 
  );
}