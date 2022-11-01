// Restrict the script's authorization
// to the form it is bound to.

//@OnlyCurrentDoc

var form = FormApp.getActiveForm();

function Test() {
  // item types 
  // https://developers.google.com/apps-script/reference/forms/item-type

  // https://drive.google.com/drive/u/0/folders/
  const url = 'https://drive.google.com/drive/u/0/folders/'; 

  // FILE_UPLOAD
  const data = form.getItems(); 
  data.map(item => {
    // let itemType = itemResponse.getItem().getType(); 
    let itemType = item.getType();  
    Logger.log(itemType);
    if(itemType == 'FILE_UPLOAD'){
      Logger.log("it works!")
    }
  });   

  // send email
  const to = "gregross.dev@gmail.com"; 
  const subject = form.getTitle();
  let htmlBody;
  
  MailApp.sendEmail({
    to, 
    subject,  
    htmlBody
  });
}
