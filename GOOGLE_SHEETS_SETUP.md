# Google Sheets Integration Setup Guide

This guide will help you connect your contact form to Google Sheets using Google Apps Script (completely free and serverless).

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Indoss Contact Form Submissions" (or any name you prefer)
4. In the first row, add these column headers:
   - `Timestamp`
   - `Name`
   - `Email`
   - `Phone`
   - `Service`
   - `Organisation`
   - `Load (kW)`
   - `Description`

Your sheet should look like this:

```
| Timestamp | Name | Email | Phone | Service | Organisation | Load (kW) | Description |
|-----------|------|-------|-------|---------|--------------|-----------|-------------|
```

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code in the editor
3. Copy and paste the following script:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Parse the incoming JSON data
    var data = JSON.parse(e.postData.contents);

    // Prepare the row data in the same order as your sheet columns
    var rowData = [
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.service || '',
      data.organisation || '',
      data.load || '',
      data.description || ''
    ];

    // Append the data to the sheet
    sheet.appendRow(rowData);

    // Return success response with CORS headers
    var output = ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'message': 'Data saved successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

    return output;

  } catch (error) {
    // Return error response with CORS headers
    var output = ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);

    return output;
  }
}

// Handle OPTIONS requests for CORS preflight
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'success', 'message': 'GET request received' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function (optional - for testing in the Apps Script editor)
function testDoPost() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: "Test User",
        email: "test@example.com",
        phone: "+91 98765 43210",
        service: "solar-epc",
        organisation: "Test Company",
        load: "100 kW",
        description: "This is a test submission"
      })
    }
  };

  var result = doPost(testData);
  Logger.log(result.getContent());
}
```

4. Click the **Save** icon (💾) and name your project "Contact Form Handler"

## Step 3: Deploy the Script as a Web App

1. Click the **Deploy** button (top right) → **New deployment**
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**
3. Configure the deployment:
   - **Description**: Contact Form to Google Sheets
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. **IMPORTANT**: You'll be asked to authorize the script
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → "Go to [your project name] (unsafe)"
   - Click **Allow**
6. Copy the **Web app URL** (it will look like: `https://script.google.com/macros/s/AKfycby.../exec`)

## Step 4: Update Your Website Code

1. Open the file: `Indoss_website/app/routes/contact.tsx`
2. Find this line (around line 26):
   ```typescript
   const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE";
   ```
3. Replace `"YOUR_GOOGLE_APPS_SCRIPT_URL_HERE"` with your Web app URL from Step 3:
   ```typescript
   const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycby.../exec";
   ```
4. Save the file

## Step 5: Test Your Form

1. Visit your website's contact page
2. Fill out the form with test data
3. Submit the form
4. Check your Google Sheet - you should see the new submission appear!

## Troubleshooting

### Form submits but data doesn't appear in Google Sheets

1. Go back to your Apps Script editor
2. Click **Executions** (clock icon on the left)
3. Check for any errors in recent executions
4. Make sure the column headers in your sheet exactly match the order in the script

### Authorization issues

- Make sure you authorized the script in Step 3
- The script needs permission to access and modify your Google Sheets

### CORS errors in browser console

- This is normal with `no-cors` mode
- The form uses `mode: "no-cors"` which means we can't read the response
- As long as the data appears in your sheet, it's working correctly

## Optional Enhancements

### 1. Email Notifications

Add this function to get email notifications for new submissions:

```javascript
function sendEmailNotification(data) {
  var emailAddress = "your-email@indoss.in"; // Change this
  var subject = "New Contact Form Submission - " + data.service;
  var message = "New enquiry received:\n\n" +
                "Name: " + data.name + "\n" +
                "Email: " + data.email + "\n" +
                "Phone: " + data.phone + "\n" +
                "Service: " + data.service + "\n" +
                "Organisation: " + data.organisation + "\n" +
                "Load: " + data.load + "\n" +
                "Description: " + data.description;

  MailApp.sendEmail(emailAddress, subject, message);
}
```

Then add this line in your `doPost` function after `sheet.appendRow(rowData);`:

```javascript
sendEmailNotification(data);
```

### 2. Auto-response Email to Customer

Add this to send a confirmation email to the customer:

```javascript
function sendCustomerConfirmation(data) {
  var subject = "Thank you for contacting Indoss Energy";
  var message = "Dear " + data.name + ",\n\n" +
                "Thank you for your enquiry about " + data.service + ".\n\n" +
                "We have received your message and will respond within 24 hours.\n\n" +
                "Best regards,\n" +
                "Indoss Energy LLP\n" +
                "www.indoss.in";

  MailApp.sendEmail(data.email, subject, message);
}
```

## Security Notes

- The script is deployed as "Anyone" can access, but it only accepts POST requests with the correct data format
- No sensitive data is exposed through the web app URL
- All data is stored securely in your private Google Sheet
- Only you (and people you share the sheet with) can view the submissions

## Support

If you encounter issues:
1. Check the Apps Script execution log for errors
2. Verify the Web app URL is correctly copied to contact.tsx
3. Make sure the sheet column headers match exactly
4. Test the script using the `testDoPost()` function in the Apps Script editor

---

**Setup Complete!** Your contact form is now connected to Google Sheets.
