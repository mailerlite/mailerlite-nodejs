// node examples/automation-templates/select.js AUTOMATION_TEMPLATE_ID_string

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

const automation_template_id = process.argv[2] ? String(process.argv[2]) : null;

mailerlite.automationTemplates.select(automation_template_id)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
