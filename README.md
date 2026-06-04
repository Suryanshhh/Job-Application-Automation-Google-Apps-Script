# Job Application Automation using Google Apps Script

## Overview

Job Application Automation is a workflow automation project built using Google Apps Script, Google Sheets, Gmail, and Google Drive.

The project was designed to eliminate repetitive tasks involved in job applications, such as manually attaching resumes, drafting emails, tracking application status, and maintaining application records.

By integrating multiple Google Workspace services, the solution enables users to manage and automate job application outreach directly from Google Sheets while maintaining visibility into delivery status, timestamps, and errors.

---

# Problem Statement

Applying to multiple job opportunities often requires performing the same actions repeatedly:

* Opening Gmail
* Writing application emails
* Attaching resumes
* Tracking sent applications
* Recording application dates
* Managing follow-ups

As the number of applications grows, the process becomes time-consuming and difficult to track efficiently.

This project addresses these challenges by providing both manual and fully automated workflows for sending job applications.

---

# Solution

The project introduces two independent automation approaches:

## 1. Manual Batch Processing Version

A controlled workflow where users prepare multiple applications inside Google Sheets and execute them in batches using a single function call.

### Key Features

* Batch email processing
* Resume attachment from Google Drive
* Professional email generation
* Status tracking
* Sent date logging
* Error handling
* Email validation
* Daily safety limits
* Test email functionality

### Workflow

1. Enter Email Address.
2. Enter Job Role.
3. Set Status = send.
4. Execute:

```javascript
sendAllPending()
```

5. Emails are processed sequentially.
6. Status updates automatically.
7. Sent timestamps are recorded.

---

## 2. Automated Trigger-Based Version

A fully automated workflow powered by Google Apps Script triggers.

The user only needs to update the status column to **send**, and the system automatically performs the entire process.

### Key Features

* Event-driven architecture
* Automatic email delivery
* Resume attachment management
* Real-time status updates
* Error logging
* Timestamp recording
* Email classification (personal vs company)

### Workflow

1. Enter Email Address.
2. Enter Job Role.
3. Type:

```text
send
```

4. Google Apps Script trigger activates automatically.
5. Resume is retrieved from Google Drive.
6. Email is generated and sent.
7. Status updates to:

```text
sent
```

8. Sent date is recorded automatically.

---

# Repository Structure

```text
job-application-automation-google-apps-script/
│
├── README.md
│
├── manual-version/
│   ├── Code.gs
│   └── README.md
│
├── automated-version/
│   ├── Code.gs
│   └── README.md
│
└── screenshots/
```

---

# Technologies Used

* Google Apps Script
* JavaScript
* Google Sheets
* Gmail Service
* Google Drive Service
* Google Workspace Automation

---

# Google Sheet Structure

| Column | Field         |
| ------ | ------------- |
| A      | Email Address |
| B      | Job Role      |
| C      | Status        |
| D      | Sent Date     |
| E      | Error         |

---

# Authentication & Permissions

The project requires authorization for the following Google services:

### Gmail

Used to send application emails.

### Google Drive

Used to retrieve and attach resume files.

### Google Sheets

Used to read application data and update statuses.

Authorization is requested automatically during the first execution.

---

# Real-World Applications

Although developed for job application outreach, the same architecture can be adapted for:

* Recruitment communication
* Candidate outreach
* Customer onboarding emails
* Event invitations
* Business follow-ups
* Workflow automation
* Google Workspace productivity solutions

---

# Learning Outcomes

This project demonstrates practical experience with:

* Workflow Automation
* Event-Driven Programming
* Google Apps Script Development
* Gmail Integration
* Google Drive Integration
* Spreadsheet Automation
* Error Handling
* Batch Processing
* Trigger-Based Systems

---

# Future Enhancements

* Automated follow-up emails
* Multi-template support
* Company name extraction
* Recruiter name detection
* Scheduling and email campaigns
* Application analytics dashboard
* Integration with external job platforms

---

# Project Significance

This project transforms a repetitive manual process into a scalable and reusable automation solution. It showcases how Google Apps Script can be leveraged to integrate multiple Google Workspace services and build practical productivity tools that reduce manual effort, improve consistency, and enhance workflow efficiency.

---

## Author

**Suryansh Agrawal**

B.Tech – Computer Science (Artificial Intelligence & Machine Learning)

LinkedIn: [www.linkedin.com/in/suryansh-agrawal-734648239/](http://www.linkedin.com/in/suryansh-agrawal-734648239/)
