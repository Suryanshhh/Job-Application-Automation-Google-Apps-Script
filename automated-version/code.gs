const CONFIG = {
  RESUME_FILE_ID: "YOUR_RESUME_FILE_ID

CANDIDATE_NAME: "YOUR_NAME",
PHONE: "YOUR_PHONE",
EMAIL: "YOUR_EMAIL",
LINKEDIN: "YOUR_LINKEDIN_URL",

SHEET_NAME: "Applications",

  COL_EMAIL: 1,
  COL_JOB_ROLE: 2,
  COL_STATUS: 3,
  COL_SENT_DATE: 4,
  COL_ERROR: 5
};

function onEdit(e) {

  const sheet = e.range.getSheet();

  if (sheet.getName() !== CONFIG.SHEET_NAME) return;

  if (e.range.getColumn() !== CONFIG.COL_STATUS) return;

  const value = String(e.value || "").toLowerCase().trim();

  if (value !== "send") return;

  processRow(sheet, e.range.getRow());
}

function processRow(sheet, row) {

  try {

    const email = sheet.getRange(row, 1).getValue().toString().trim();
    const jobRole = sheet.getRange(row, 2).getValue().toString().trim();

    const resumeFile =
      DriveApp.getFileById(CONFIG.RESUME_FILE_ID);

    const greeting =
      isPersonalEmail(email)
        ? "Dear Recruiter,"
        : "Dear Hiring Team,";

    const subject =
      "Application for " +
      jobRole +
      " Role | " +
      CONFIG.CANDIDATE_NAME;

      const body =
greeting + "\n\n" +

"I hope you are doing well.\n\n" +

"I am reaching out to express my interest in the " +
jobRole +
" position.\n\n" +

"I am a B.Tech Computer Science graduate specializing in Artificial Intelligence and Machine Learning with hands-on experience in Python, Java, SQL, Data Analytics, Power BI, Machine Learning, and AI-driven solutions.\n\n" + 
"My project experience includes AI-Powered Skin Cancer Detection, Customer Sentiment Analysis, Business Intelligence Dashboards, and data-driven problem-solving applications that strengthened both my analytical and technical capabilities.\n\n" +

"I have attached my resume for your review. I would welcome the opportunity to discuss how my skills and project experience can contribute to your team.\n\n" +

"Thank you for your time and consideration. I look forward to connecting with you.\n\n" +

"Best Regards,\n\n" +

CONFIG.CANDIDATE_NAME + "\n" +

"Phone: " + CONFIG.PHONE + "\n" +

"Email: " + CONFIG.EMAIL + "\n" +

"LinkedIn: " + CONFIG.LINKEDIN;




    GmailApp.sendEmail(
      email,
      subject,
      body,
      {
        attachments: [resumeFile.getBlob()]
      }
    );

    sheet.getRange(row, 3).setValue("sent");

    sheet.getRange(row, 4).setValue(
      Utilities.formatDate(
        new Date(),
        Session.getScriptTimeZone(),
        "yyyy-MM-dd HH:mm:ss"
      )
    );

    sheet.getRange(row, 5).clearContent();

  } catch (error) {

    sheet.getRange(row, 3).setValue("failed");
    sheet.getRange(row, 5).setValue(error.message);
  }
}

function isPersonalEmail(email) {

  const personalDomains = [
    "gmail.com",
    "yahoo.com",
    "outlook.com",
    "hotmail.com",
    "icloud.com"
  ];

  const domain =
    email.split("@")[1]?.toLowerCase() || "";

  return personalDomains.includes(domain);
}
