// node examples/automation-steps/create.js AUTOMATION_ID_string

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

const automation_id = process.argv[2] ? String(process.argv[2]) : null;

const params = {
  type: "delay",
  parent_id: "PARENT_STEP_ID",
  data: {
    unit: "days",
    value: 2
  }
};

mailerlite.automationSteps.create(automation_id, params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
