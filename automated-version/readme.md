# Automated Job Application Workflow

## Overview

This version implements a trigger-based job application automation workflow using Google Apps Script, Google Sheets, Gmail, and Google Drive.

The solution automatically sends personalized job application emails whenever a user updates the status column to **"send"** in Google Sheets. It eliminates repetitive manual tasks and provides real-time tracking of application status.

## Features

* Automated email sending using Google Apps Script triggers
* Resume attachment retrieval from Google Drive
* Personalized email generation
* Status tracking (`send → sent`)
* Error logging and validation
* Timestamp recording for successful deliveries
* Personal and company email detection
* Configurable and reusable setup

## Workflow

1. Enter the recipient's email address.
2. Enter the target job role.
3. Type **send** in the Status column.
4. Google Apps Script automatically triggers the workflow.
5. Resume is attached from Google Drive.
6. Email is sent through Gmail.
7. Status and timestamps are updated automatically.

## Technologies Used

* Google Apps Script
* JavaScript
* Google Sheets
* Gmail Service
* Google Drive Service

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

Before using the project, update the configuration values:

* Resume File ID
* Candidate Name
* Email Address
* Phone Number
* LinkedIn Profile URL

Update the following values inside the CONFIG object:

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

### Finding Resume File ID

Upload your resume to Google Drive.

Example URL:

https://drive.google.com/file/d/1ABC123XYZ456/view

File ID:

1ABC123XYZ456

Use this value as:

```javascript
RESUME_FILE_ID: "1ABC123XYZ456"
```

---

## Installation

### Step 1: Create a Google Sheet

Create a new Google Sheet and add the required columns.

### Step 2: Open Apps Script

Extensions → Apps Script

### Step 3: Create Code File

Create a new file named:

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

### Authorize Gmail

Run any function that sends email.

Google will display an authorization screen.

Click:

```text
Review Permissions
```

Select your Google account.

Click:

```text
Allow
```

### Authorize Google Drive

The script requires access to retrieve the resume file from Google Drive.

When prompted, grant Drive permissions.

---

## Trigger Setup

This project uses an installable trigger.

### Create Trigger

Open:

Apps Script → Triggers

Click:

```text
+ Add Trigger
```

Configure:

| Setting         | Value            |
| --------------- | ---------------- |
| Function to Run | onEdit           |
| Deployment      | Head             |
| Event Source    | From Spreadsheet |
| Event Type      | On Edit          |

Click:

```text
Save
```

Authorize permissions if requested.

---

## How It Works

1. User enters recipient email.
2. User enters target job role.
3. User types:

```text
send
```

in the Status column.

4. The Apps Script trigger executes automatically.
5. Resume is fetched from Google Drive.
6. Email is generated and delivered using Gmail.
7. Status changes to:

```text
sent
```

8. Sent timestamp is recorded.
9. Errors are logged automatically.

---

## Status Values

| Value  | Meaning                 |
| ------ | ----------------------- |
| send   | Trigger email sending   |
| sent   | Email sent successfully |
| failed | Email sending failed    |

---

## Error Handling

The script automatically logs errors including:

* Invalid email addresses
* Missing job role
* Missing resume file
* Google Drive access issues
* Gmail sending failures

Errors are written to the Error column.

---

## Example Workflow

| Email Address                                         | Job Role     | Status |
| ----------------------------------------------------- | ------------ | ------ |
| [recruiter@company.com](mailto:recruiter@company.com) | Data Analyst | send   |

After processing:

| Email Address                                         | Job Role     | Status | Sent Date           |
| ----------------------------------------------------- | ------------ | ------ | ------------------- |
| [recruiter@company.com](mailto:recruiter@company.com) | Data Analyst | sent   | 2025-09-03 11:45:22 |

---

## Use Cases

* Job application outreach automation
* Recruitment communication workflows
* Google Workspace automation
* Productivity and workflow management

## Future Enhancements

* Follow-up email automation
* Company name extraction
* Recruiter name detection
* Application analytics dashboard
* Multi-template email support

