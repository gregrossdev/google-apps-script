// Restrict the script's authorization
// to the form it is bound to.

//@OnlyCurrentDoc

// Create a form submit installable trigger
// using Apps Script.
function createFormSubmitTrigger() {

  // Get the form object.
  var form = FormApp.getActiveForm();

  // See if the trigger has already been set up.
  // Since we know this project should only have a single trigger
  // we'll simply check if there are more than 0 triggers. If yes,
  // we'll assume this function was already run so we won't create
  // a trigger.
  var currentTriggers = ScriptApp.getProjectTriggers();
  if(currentTriggers.length > 0)
    return;
  
  // Create a trigger that will run the onFormSubmit function
  // whenever the form is submitted.
  ScriptApp.newTrigger("onFormSubmit").forForm(form).onFormSubmit().create();
}

function onFormSubmit(e) {
 

  var formResponse = e.response;
  var itemResponses = formResponse.getItemResponses();
  var emailBody = "New form response:\n\n";

  itemResponses.forEach(function(itemResponse) {
    var title = itemResponse.getItem().getTitle();
    var response = itemResponse.getResponse();
    emailBody += title + "\n" + response + "\n\n";
  });

  
  sendEmail(emailBody);
}

function sendEmail(emailBody) {
  MailApp.sendEmail(
    "gregross.dev@gmail.com", 
    "📝 Meeting List", 
    emailBody
  );
}