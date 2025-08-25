// Google Apps Script for Eddie Waitlist
// This code should be deployed as a web app in Google Apps Script

function doPost(e) {
  try {
    // Get the active spreadsheet (make sure to create one first)
    const sheet = SpreadsheetApp.getActiveSheet();
    
    // Parse the JSON data from the request
    const data = JSON.parse(e.postData.contents);
    
    // Get current timestamp
    const timestamp = new Date();
    
    // Add headers if this is the first row
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Email', 'Source']);
    }
    
    // Add the new email to the sheet
    sheet.appendRow([
      timestamp.toISOString(),
      data.email,
      'Eddie Landing Page'
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Email added successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        message: 'Error: ' + error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  // Handle CORS preflight requests
  return ContentService
    .createTextOutput("Eddie Waitlist API is running")
    .setMimeType(ContentService.MimeType.TEXT);
}

// Instructions:
// 1. Create a new Google Sheet
// 2. Go to Extensions > Apps Script
// 3. Paste this code
// 4. Deploy as web app with these settings:
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy the web app URL and use it in your React form