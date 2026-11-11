// node examples/automation-emails/getEcommerceOverviewStats.js AUTOMATION_ID_string EMAIL_ID_string

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

const automation_id = process.argv[2] ? String(process.argv[2]) : null;
const email_id = process.argv[3] ? String(process.argv[3]) : null;

const params = {
  start_date: "2026-01-01",
  end_date: "2026-01-31",
  shop_id: "SHOP_ID"
};

mailerlite.automationEmails.getEcommerceOverviewStats(automation_id, email_id, params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
