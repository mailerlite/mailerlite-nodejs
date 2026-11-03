// node examples/automation-reports/getOrderActivity.js AUTOMATION_ID_string

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

const automation_id = process.argv[2] ? String(process.argv[2]) : null;

const params = {
  time_frame: "custom",
  time_frame_start: "2026-01-01",
  time_frame_end: "2026-01-31",
  limit: 10,
  page: 1
};

mailerlite.automationReports.getOrderActivity(automation_id, params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
