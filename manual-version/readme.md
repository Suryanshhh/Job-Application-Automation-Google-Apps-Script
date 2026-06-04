# Manual Job Application Workflow using Google Apps Script

## Overview

This project automates job application outreach using Google Apps Script, Google Sheets, Gmail, and Google Drive.

Unlike the trigger-based version, this implementation uses a manual batch-processing approach where users can prepare multiple job applications in Google Sheets and send them in a single execution.

The solution is designed for users who prefer greater control over email delivery while still automating repetitive tasks such as resume attachment, email generation, status tracking, and error handling.

---

## Features

* Batch email processing
* Resume attachment from Google Drive
* Personalized email generation
* Status tracking
* Sent date logging
* Error handling and validation
* Personal and company email detection
* Configurable daily send limits
* Test email functionality

---

## Technologies Used

* Google Apps Script
* JavaScript
* Google Sheets
* Gmail Service
* Google Drive Service

---

## Sheet Structure

Create a Google Sheet with the following columns:

| Column | Field         |
| ------ | ------------- |
| A      | Email Address |
| B      | Job Role      |
| C      | Status        |
| D      | Sent Date     |
| E      | Error         |

Example:

| Email Address                                         | Job Role     | Status |
| ----------------------------------------------------- | ------------ | ------ |
| [recruiter@company.com](mailto:recruiter@company.com) | Data Analyst | send   |

---

## Configuration

Update the configuration values inside the CONFIG object:

```javascript
const CONFIG = {
  RESUME_FILE_ID: "YOUR_RESUME_FILE_ID",

  CANDIDATE_NAME: "YOUR_NAME",
  PHONE: "YOUR_PHONE",
  EMAIL: "YOUR_EMAIL",
  LINKEDIN: "YOUR_LINKEDIN_URL",

  SHEET_NAME: "Applications"
};
```

---

## Finding Resume File ID

Upload your resume to Google Drive.

Example URL:

https://drive.google.com/file/d/1ABC123XYZ456/view

File ID:

```text
1ABC123XYZ456
```

Configure:

```javascript
RESUME_FILE_ID: "1ABC123XYZ456"
```

---

## Installation

### Step 1: Create Google Sheet

Create a new Google Sheet and add the required columns.

### Step 2: Open Apps Script

Extensions → Apps Script

### Step 3: Create Code File

Create:

```text
Code.gs
```

Paste the script.

### Step 4: Save

Press:

```text
Ctrl + S
```

---

## Authentication

The first execution requires authorization because the script accesses:

* Gmail
* Google Drive
* Google Sheets

### Gmail Authorization

Run any function such as:

```javascript
sendTestEmail()
```

Google will display an authorization screen.

Select your account and click:

```text
Allow
```

### Drive Authorization

The script requires access to retrieve the resume from Google Drive.

Grant Drive permissions when prompted.

---

## Running the Workflow

Populate the spreadsheet:

| Email Address                                         | Job Role     | Status |
| ----------------------------------------------------- | ------------ | ------ |
| [recruiter@company.com](mailto:recruiter@company.com) | Data Analyst | send   |

Run:

```javascript
sendAllPending()
```

The script will:

1. Scan all rows.
2. Find rows with status = send.
3. Attach the resume from Google Drive.
4. Generate and send emails.
5. Update status automatically.
6. Record timestamps.
7. Log errors if any occur.

---

## Daily Safety Limit

The script includes a configurable batch limit:

```javascript
MAX_EMAILS_PER_RUN
```

This prevents accidental mass email delivery.

Example:

```javascript
MAX_EMAILS_PER_RUN: 25
```

Only 25 emails will be processed in a single execution.

---

## Testing

Run:

```javascript
sendTestEmail()
```

The script creates a sample row and validates:

* Gmail integration
* Google Drive integration
* Email formatting
* Resume attachment

---

## Status Values

| Value  | Meaning                      |
| ------ | ---------------------------- |
| send   | Ready to send                |
| sent   | Email delivered successfully |
| failed | Error occurred               |

---

## Error Handling

The script automatically logs errors including:

* Invalid email addresses
* Missing job role
* Missing email address
* Missing resume file
* Gmail delivery issues
* Google Drive access issues

Errors are written to the Error column.

---

## Example Workflow

Before execution:

| Email Address                                         | Job Role     | Status |
| ----------------------------------------------------- | ------------ | ------ |
| [recruiter@company.com](mailto:recruiter@company.com) | Data Analyst | send   |

After execution:

| Email Address                                         | Job Role     | Status | Sent Date           |
| ----------------------------------------------------- | ------------ | ------ | ------------------- |
| [recruiter@company.com](mailto:recruiter@company.com) | Data Analyst | sent   | 2025-09-03 11:45:22 |

---

## Future Enhancements

* Scheduled email campaigns
* Follow-up reminders
* Multi-template support
* Company extraction
* Recruiter detection
* Application analytics dashboard

---

## License

MIT License

