# Setting up Google Sheets Integration for Eddie Waitlist

## Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Eddie Waitlist" or similar
4. The sheet will automatically get headers when the first email is submitted

## Step 2: Set up Google Apps Script
1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any existing code in the editor
3. Copy and paste the code from `google-apps-script.js` file in this project
4. Save the project (Ctrl/Cmd + S)
5. Name it "Eddie Waitlist API"

## Step 3: Deploy as Web App
1. Click **Deploy > New deployment**
2. Click the gear icon next to "Type" and select **Web app**
3. Fill in the deployment settings:
   - **Description**: "Eddie Waitlist Form Handler"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Authorize** the script when prompted
6. Copy the **Web app URL** that appears

## Step 4: Update the Frontend Code
1. Open `src/app/page.tsx`
2. Find line 44 where it says:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
   ```
3. Replace `YOUR_SCRIPT_ID` with your actual web app URL
4. Save the file

## Step 5: Test the Form
1. Make sure your Next.js dev server is running (`npm run dev`)
2. Go to http://localhost:3000
3. Scroll down to the waitlist form
4. Enter a test email and submit
5. Check your Google Sheet - you should see the email appear with a timestamp

## Troubleshooting
- If emails aren't appearing, check the Apps Script logs: **View > Logs**
- Make sure the web app is deployed with "Anyone" access
- The form uses `no-cors` mode, so you won't see network errors in the browser console
- Check that your Google Sheet is not in a restricted folder

## What Gets Stored
Each submission creates a row with:
- **Timestamp**: When the form was submitted
- **Name**: The user's name
- **Email**: The user's email address
- **Source**: "Eddie Landing Page"

## Security Note
The web app URL is public but only accepts POST requests with email data. The spreadsheet remains private to your Google account unless you explicitly share it.