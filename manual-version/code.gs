const CONFIG = {
  RESUME_FILE_ID: "YOUR_RESUME_FILE_ID"
  CANDIDATE_NAME: "YOUR_NAME"
  PHONE: "YOUR_PHONE"
  EMAIL: "YOUR_EMAIL"
  LINKEDIN: "YOUR_LINKEDIN_URL"

  SHEET_NAME: "Applications",

  MAX_EMAILS_PER_RUN: 25,

  COL_EMAIL: 1,
  COL_JOB_ROLE: 2,
  COL_STATUS: 3,
  COL_SENT_DATE: 4,
  COL_ERROR: 5
};

function sendAllPending() {

  const sheet = SpreadsheetApp
    .getActiveSpreadsheet()
    .getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    throw new Error(`Sheet "${CONFIG.SHEET_NAME}" not found`);
  }

  const lastRow = sheet.getLastRow();

  let emailsSent = 0;

  for (let row = 2; row <= lastRow; row++) {

    if (emailsSent >= CONFIG.MAX_EMAILS_PER_RUN) {
      Logger.log(`Daily safety limit reached (${CONFIG.MAX_EMAILS_PER_RUN})`);
      break;
    }

    const status = getCellValue(sheet, row, CONFIG.COL_STATUS)
      .toLowerCase()
      .trim();

    if (status !== "send") continue;

    try {

      const email = getCellValue(sheet, row, CONFIG.COL_EMAIL);
      const jobRole = getCellValue(sheet, row, CONFIG.COL_JOB_ROLE);

      if (!email) {
        throw new Error("Email Address is missing");
      }

      if (!jobRole) {
        throw new Error("Job Role is missing");
      }

      if (!isValidEmail(email)) {
        throw new Error("Invalid email address");
      }

      const resumeFile =
        DriveApp.getFileById(CONFIG.RESUME_FILE_ID);

      const greeting =
        isPersonalEmail(email)
          ? "Dear Recruiter,"
          : "Dear Hiring Team,";

      const subject =
        `Application for ${jobRole} Role | ${CONFIG.CANDIDATE_NAME}`;

      const htmlBody = `
<div style="font-family:Arial,sans-serif;font-size:14px;line-height:1.7;color:#222;">

<p>${greeting}</p>

<p>
I hope you are doing well.
</p>

<p>
I am writing to express my interest in the
<strong>${jobRole}</strong> opportunity.

I recently completed my B.Tech in Computer Science
with a specialization in Artificial Intelligence and Machine Learning.

My background includes hands-on experience in
Python, Java, SQL, Data Analytics, Power BI,
Machine Learning, and AI-driven projects.
</p>

<p>
I have attached my resume for your review.

I would be grateful for the opportunity to discuss
how my skills, projects, and enthusiasm can contribute
to your organization.
</p>

<p>
Thank you for your time and consideration.
I look forward to hearing from you.
</p>

<p>
Best Regards,<br><br>

<strong>${CONFIG.CANDIDATE_NAME}</strong><br>

${CONFIG.PHONE}<br>

${CONFIG.EMAIL}<br>

<a href="${CONFIG.LINKEDIN}">
LinkedIn Profile
</a>
</p>

</div>
`;

      GmailApp.sendEmail(
        email,
        subject,
        stripHtml(htmlBody),
        {
          htmlBody: htmlBody,
          attachments: [resumeFile.getBlob()],
          name: CONFIG.CANDIDATE_NAME
        }
      );

      sheet
        .getRange(row, CONFIG.COL_STATUS)
        .setValue("sent");

      sheet
        .getRange(row, CONFIG.COL_SENT_DATE)
        .setValue(
          Utilities.formatDate(
            new Date(),
            Session.getScriptTimeZone(),
            "yyyy-MM-dd HH:mm:ss"
          )
        );

      sheet
        .getRange(row, CONFIG.COL_ERROR)
        .clearContent();

      emailsSent++;

      Utilities.sleep(1500);

    } catch (error) {

      sheet
        .getRange(row, CONFIG.COL_STATUS)
        .setValue("failed");

      sheet
        .getRange(row, CONFIG.COL_ERROR)
        .setValue(error.message);
    }
  }

  Logger.log(`Completed. Emails sent: ${emailsSent}`);
}

function isPersonalEmail(email) {

  const personalDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "live.com",
    "icloud.com",
    "protonmail.com",
    "aol.com",
    "zoho.com",
    "rediffmail.com",
    "yandex.com",
    "mail.com"
  ];

  const domain =
    email.split("@")[1]?.toLowerCase() || "";

  return personalDomains.includes(domain);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getCellValue(sheet, row, col) {
  return sheet
    .getRange(row, col)
    .getValue()
    .toString()
    .trim();
}

function stripHtml(html) {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<[^>]+>/g, "")
    .trim();
}

function sendTestEmail() {

  const sheet =
    SpreadsheetApp.getActiveSpreadsheet()
      .getSheetByName(CONFIG.SHEET_NAME);

  sheet.getRange("A2")
    .setValue("your_email");

  sheet.getRange("B2")
    .setValue("Data Analyst");

  sheet.getRange("C2")
    .setValue("send");

  sendAllPending();
}
