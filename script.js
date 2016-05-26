function sampleApp() {
  var sundays = getSundays(new Date().getFullYear());
  var lastRow = sundays.length+1;
   
  ssActive = SpreadsheetApp.getActiveSheet();
  ssActive.getRange('A1').setValue('Date');
  ssActive.getRange('B1').setValue('Helpers');
  
  rgMyRange = ssActive.getRange('A2:A'+lastRow);
  rgMyRange.setValues(sundays)
  
  var numRows = rgMyRange.getNumRows();
  
  sendEmails();
  
  function sendEmails(){
    var emailAddress = "maikko123@gmail.com";
  
    for (var i = 2; i < rgMyRange.getNumRows(); i++) {
      date_raw = new Date(ssActive.getRange(2 + i, 1).getValue());
      monday_prior = date_raw.setDate(date_raw.getDate() - 6);
    
      if(isSameDateAs(new Date(), new Date(monday_prior))) {
        date = date_raw.getDate()  + "/" + (date_raw.getMonth()+1) + "/" + date_raw.getFullYear()
        helpers = ssActive.getRange(2 + i, 2).getValue();
        content = date + ' - ' + helpers;
        Logger.log(content);
        MailApp.sendEmail(emailAddress, content, content);
      } else {
        Logger.log('Sent');
      }
    }
  };
} 

function getSundays(year) {
  var date = new Date(year, 0, 1);
  while (date.getDay() != 0) {
    date.setDate(date.getDate() + 1);
  }
  var days = [];
  while (date.getFullYear() == year) {
    var m = date.getMonth() + 1;
    var d = date.getDate();
    days.push([
      year + '-' +
      (m < 10 ? '0' + m : m) + '-' +
      (d < 10 ? '0' + d : d)
    ]);
    date.setDate(date.getDate() + 7);
  }
  return days;
}

isSameDateAs = function(aDate, pDate) {
  return (
    aDate.getFullYear() === pDate.getFullYear() &&
    aDate.getMonth() === pDate.getMonth() &&
    aDate.getDate() === pDate.getDate()
  );
}
