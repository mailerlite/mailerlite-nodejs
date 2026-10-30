// node examples/automation-steps/update.js AUTOMATION_ID_string STEP_ID_string

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

const automation_id = process.argv[2] ? String(process.argv[2]) : null;
const step_id = process.argv[3] ? String(process.argv[3]) : null;

const params = {
  data: {
    unit: "days",
    value: 3
  }
};

mailerlite.automationSteps.update(automation_id, step_id, params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
