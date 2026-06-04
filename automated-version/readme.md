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

## Sheet Structure

| Column | Description   |
| ------ | ------------- |
| A      | Email Address |
| B      | Job Role      |
| C      | Status        |
| D      | Sent Date     |
| E      | Error         |

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

## Configuration

Before using the project, update the configuration values:

* Resume File ID
* Candidate Name
* Email Address
* Phone Number
* LinkedIn Profile URL

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

