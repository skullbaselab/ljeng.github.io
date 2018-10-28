// !Google Apps Script
// Fix Email log, Sheet1
 
var ss = SpreadsheetApp.getActiveSpreadsheet();
var el = SpreadsheetApp.openById('1u4sWfwXUdmxnX4_trM7FtCEcEl2piXfQQD85KsysTJ0');
 
function runScript() {
  var variables = ss.getSheetByName('var');
  var sendEmails = variables.getRange(1, 2).getValue();
  var days = variables.getRange(4, 2).getValue();
  for (i = 4; i < 15; i++) {
    getWarnDate(sendEmails, i, days, 2 * i, 2 * i - 1);
  }
  var sender = Session.getActiveUser().getEmail();
  var cEmailArr = getCoordinatorEmail()
          var elSheet2 = el.getSheetByName('Sheet2');
        var nextRow2 = elSheet2.getLastRow() + 1;
  var elSheet1 = el.getSheetByName('Sheet1');
  var nextRow1 = elSheet1.getLastRow() + 1;
  var cEmailBody = (elSheet2.getRange(2, 4, nextRow2 - 1, 1).getValues()).join('<p>');
   var elSheet1 = el.getSheetByName('Sheet1');
          elSheet1.getRange(nextRow1, 1).setValue(sender);
        elSheet1.getRange(nextRow1, 2).setValue(cEmailArr);
        elSheet1.getRange(nextRow1, 3).setValue('Book project tracker template script error: invalid date');
        // elSheet1.getRange(nextRow2, 4).setValue(cEmailBody);
if (sendEmails == 1) {
MailApp.sendEmail(cEmailArr, 'Email to coordinators', '', {
     htmlBody: cEmailBody
     });
     }
}
 
function getWarnDate(sendEmails, i, days, whoColumn, dueDateColumn) {
  var content = ss.getSheetByName('content');
    var data = content.getDataRange().getValues();
    var comments = content.getDataRange().getComments();
    for (var j = 1; j < data.length; j++) {
        var rawDate = data[j][dueDateColumn];
        var who = data[j][whoColumn];
      if (rawDate.length > 0 && rawDate != 'N/A' && rawDate != 'n/a' && who.length > 0 && who != 'N/A' && who != 'n/a') {
        if (rawDate instanceof Date) {
            var formattedDueDate = Utilities.formatDate(rawDate, 'EDT', 'yyyy/mm/dd');
        }
        else {
            var formattedDueDate = rawDate;
        }
        var now = new Date();
        var firstDueDate = new Date(rawDate.toString().split('-').shift());
        if (isNaN(firstDueDate) == false) {
            var warnDate = firstDueDate;
            warnDate.setDate(warnDate.getDate() - days);
            sendReminder(sendEmails, whoColumn, j, warnDate, comments, data, formattedDueDate, dueDateColumn);
        }
        else {
            invalidDateHandler(sendEmails, j, data, rawDate, dueDateColumn);
        }
      }
    }
}
 
function sendReminder(sendEmails, whoColumn, j, warnDate, comments, data, formattedDueDate, dueDateColumn) {
        var content = ss.getSheetByName('content');
    var currentDate = new Date();
    if (currentDate.getTime() > warnDate.getTime() && comments[j][dueDateColumn] != 'reminder_sent') {
        var table = CreateTable([data[0], data[j]]);
        var taskDescription = data[j][0];
        var assigneeName = getAssigneeName(whoColumn, j);
        var assigneeEmail = getAssigneeEmail(whoColumn, j, data, dueDateColumn);
      var whenHeader = data[0][dueDateColumn];
      var stage = whenHeader.substring(whenHeader.length - 5, whenHeader.length);
        var body = table +
            '<br /><br /><div>Dear ' + assigneeName + ',</div>'
            + stage + ': ' + taskDescription + ' is due on ' + formattedDueDate + '. Please try to get it done by then.</div>'
            + '<div></div>'
            + '<div>Sincerely,</div>'
            + '<div>Lareine Jeng</div>'
            + '<div><i>2e Coordinator</i></div>'
            + '<div><i>2e Editor</i></div>'
            + '<div><i>Google Apps Developer</i></div>'
            + '<a href=\"' + ss.getUrl() + '">Open spreadsheet</a>'
                    var bodyText =
            'Dear ' + assigneeName + ','
            + stage + ': ' + taskDescription + ' is due on ' + formattedDueDate + '. Please try to get it done by then.'
            + ''
            + 'Sincerely,'
            + 'Lareine Jeng'
            + '2e Coordinator'
            + '2e Editor'
            + 'Google Apps Developer'
            var coordinatorEmail = getCoordinatorEmail();
        var assigneeInitials = content.getRange(j + 1, whoColumn + 1).getValue();
      var regEx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (assigneeEmail != String(coordinatorEmail) && regEx.test(assigneeEmail) == true) {
  var elSheet1 = el.getSheetByName('Sheet1');
        var nextRow1 = elSheet1.getLastRow() + 1;
        var sender = Session.getActiveUser().getEmail();
        elSheet1.getRange(nextRow1, 1).setValue(sender);
        elSheet1.getRange(nextRow1, 2).setValue(assigneeEmail);
        elSheet1.getRange(nextRow1, 3).setValue('Due ' + formattedDueDate + ': ' + stage + ': ' + taskDescription);
        elSheet1.getRange(nextRow1, 4).setValue(bodyText);
        Logger.log(sender + assigneeEmail + 'Due ' + formattedDueDate + ': ' + stage + ': ' + taskDescription + bodyText);  
        var elSheet2 = el.getSheetByName('Sheet2');
        var nextRow2 = elSheet1.getLastRow() + 1;
        var sender = Session.getActiveUser().getEmail();
        elSheet2.getRange(nextRow2, 1).setValue(sender);
        elSheet2.getRange(nextRow2, 2).setValue(assigneeEmail);
        elSheet2.getRange(nextRow2, 3).setValue('Due ' + formattedDueDate + ': ' + stage + ': ' + taskDescription);
        elSheet2.getRange(nextRow2, 4).setValue(bodyText);
        if (sendEmails == 1) {
        MailApp.sendEmail(assigneeEmail, 'Due ' + formattedDueDate + ': ' + stage + ': ' + taskDescription, '', {
         htmlBody: body
         });
        }
        content.getRange(j + 1, dueDateColumn + 1).setComment('reminder_sent');
      }
      else {
        noNameHandler(sendEmails, j, data, assigneeInitials, dueDateColumn);
      }
    }
}
 
function invalidDateHandler(sendEmails, j, data, rawDate, dueDateColumn) {
    var team = ss.getSheetByName('team');
    var table = CreateTable([data[0], data[j]]);
    var cNameArr = getCoordinatorName();
    var cEmailArr = getCoordinatorEmail();
    if (cNameArr == 1) {
    var salutation = '<br /><br /><div>Dear ' + cNameArr + ',</div>'
    var salutationText = 'Dear ' + cNameArr + ',';
  }
  else {
  var salutation = '<br /><br /><div>Dear all,</div>'
  var salutationText = 'Dear all,';
  }
    var body = table +
        salutation
        + rawDate + ' is an invalid date. Dates must be entered in a valid date format or yyyy/mm/dd-yyyy/mm/dd format.</div>'
        + '<div></div>'
        + '<div>Sincerely,</div>'
        + '<div>Lareine Jeng</div>'
        + '<div><i>2e Coordinator</i></div>'
        + '<div><i>2e Editor</i></div>'
        + '<div><i>Google Apps Developer</i></div>'
        + '<a href=\"' + ss.getUrl() + '">Open spreadsheet</a>'
            var bodyText = salutationText
        + rawDate + ' is an invalid date. Dates must be entered in a valid date format or yyyy/mm/dd-yyyy/mm/dd format.'
        + ''
        + 'Sincerely,'
        + 'Lareine Jeng'
        + '2e Coordinator'
        + '2e Editor'
        + 'Google Apps Developer'
          var elSheet2 = el.getSheetByName('Sheet2');
  var nextRow2 = elSheet2.getLastRow() + 1;
  var sender = Session.getActiveUser().getEmail();
        elSheet2.getRange(nextRow2, 1).setValue(sender);
        elSheet2.getRange(nextRow2, 2).setValue(cEmailArr);
        elSheet2.getRange(nextRow2, 3).setValue('Book project tracker template script error: invalid date');
        elSheet2.getRange(nextRow2, 4).setValue(body);
        if (sendEmails == 1) {
    MailApp.sendEmail(cEmailArr, 'Book project tracker template script error: invalid date', '', {
     htmlBody: body
     });
        }
    var content = ss.getSheetByName('content');
    content.getRange(j + 1, dueDateColumn + 1).setComment('invalid_date');
}
 
 
function getAssigneeName (whoColumn, j) {
    var content = ss.getSheetByName('content');
    var team = ss.getSheetByName('team');
    var whoArr = team.getDataRange().getValues();
    var whoName = getCoordinatorName();
    for (var k = 1; k < whoArr.length; k++) {
        var whoCheck = whoArr[k][1];
        var assigneeInitials = content.getRange(j + 1, whoColumn + 1).getValue();
        if (assigneeInitials == whoCheck) {
            var whoName = whoArr[k][2];
        }
    }
            return whoName;
}
 
function getAssigneeEmail (whoColumn, j, data, dueDateColumn, table, assigneeName, taskDescription, formattedDueDate) {
    var content = ss.getSheetByName('content');
    var team = ss.getSheetByName('team');
    var whoArr = team.getDataRange().getValues();
  var whoEmail = getCoordinatorEmail();
    for (var k = 1; k < whoArr.length; k++) {
        var whoCheck = whoArr[k][1];
        var assigneeInitials = content.getRange(j + 1, whoColumn + 1).getValue();
        if (assigneeInitials == whoCheck) {
            var whoEmail = whoArr[k][3];
            var found = true;
        }
    }
  return whoEmail;
}
 
function noNameHandler(sendEmails, j, data, assigneeInitials, dueDateColumn) {
    var team = ss.getSheetByName('team');
    var table = CreateTable([data[0], data[j]]);
    var cNameArr = getCoordinatorName();
    var cEmailArr = getCoordinatorEmail();
  if (cNameArr == 1) {
    var salutation = '<br /><br /><div>Dear ' + cNameArr + ',</div>'
    var salutationText = 'Dear ' + cNameArr + ',';
  }
  else {
  var salutation = '<br /><br /><div>Dear all,</div>'
  var salutationText = 'Dear all,';
  }
    var body = table +
        salutation
        + assigneeInitials + ' does not match any valid email in the "team" tab of the book project tracker template.</div>'
        + '<div></div>'
        + '<div>Sincerely,</div>'
        + '<div>Lareine Jeng</div>'
        + '<div><i>2e Coordinator</i></div>'
        + '<div><i>2e Editor</i></div>'
        + '<div><i>Google Apps Developer</i></div>'
        + '<a href=\"' + ss.getUrl() + '">Open spreadsheet</a>'
                    var bodyText = salutationText
        + assigneeInitials + ' does not match any valid email in the "team" tab of the book project tracker template.'
        + ''
        + 'Sincerely,'
        + 'Lareine Jeng'
        + '2e Coordinator'
        + '2e Editor'
        + 'Google Apps Developer'
        var elSheet2 = el.getSheetByName('Sheet2');
  var nextRow2 = elSheet2.getLastRow() + 1;
        var sender = Session.getActiveUser().getEmail();
        elSheet2.getRange(nextRow2, 1).setValue(sender);
        elSheet2.getRange(nextRow2, 2).setValue(cEmailArr);
        elSheet2.getRange(nextRow2, 3).setValue('Book project tracker template script error: no assignee email found');
        elSheet2.getRange(nextRow2, 4).setValue(body);
        if (sendEmails == 1) {
    MailApp.sendEmail(cEmailArr, 'Book project tracker template script error: no assignee email found', '', {
     htmlBody: bodyArr
     });
        }
    var content = ss.getSheetByName('content');
    content.getRange(j + 1, dueDateColumn + 1).setComment('no_valid_assignee_email_found');
}
 
function getCoordinatorName () {
    var team = ss.getSheetByName('team');
    var whoArr = team.getDataRange().getValues();
  var cNameArr = [];
    for (var k = 0; k < whoArr.length; k++) {
        var roleCheck = whoArr[k][0]
        if (roleCheck == 'c') {
            var coordinatorName = whoArr[k][2];
  cNameArr.push(coordinatorName);
        }
    }
  return cNameArr;
}
 
function getCoordinatorEmail () {
    var team = ss.getSheetByName('team');
    var whoArr = team.getDataRange().getValues();
  var cEmailArr = [];
    for (var k = 0; k < whoArr.length; k++) {
        var roleCheck = whoArr[k][0]
        if (roleCheck == 'c') {
            var coordinatorEmail = whoArr[k][3];
          cEmailArr.push(coordinatorEmail);
        }
    }
            return cEmailArr;
}
 
function CreateTable(result) {
  var variables = ss.getSheetByName('var');
  var columnsArray = variables.getRange(5, 2).getValue().split(',');
    var str = '<table style=\'font-family: Arial; line-height: 19px; width: 700px; border-collapse: collapse; font-size: 12px;\'><tr>';
    for (var k = 0; k < columnsArray.length; k++) {
      var m = columnsArray[k].charCodeAt(0) - 65;
        str += '<th style=\'border: 1px solid rgb(221, 221, 221); padding: 10px; background-color: rgb(245, 245, 245); text-align: left; font-size: 1.1em;\'>' + result[0][m] + '</th>';
    }
    str += '</tr><tr>';
    for (var k = 0; k < columnsArray.length; k++) {
      var m = columnsArray[k].charCodeAt(0) - 65;
        str += '<td style=\'border: 1px solid rgb(221, 221, 221); padding: 7px;\'>' + result[1][m] + '</td>';
    }
    str += '</tr></table>';
    return str;
}
