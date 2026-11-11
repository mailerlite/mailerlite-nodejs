// node examples/automation-triggers/update.js AUTOMATION_ID_string TRIGGER_ID_string

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

const automation_id = process.argv[2] ? String(process.argv[2]) : null;
const trigger_id = process.argv[3] ? String(process.argv[3]) : null;

const params = {
  data: {
    group_ids: ["GROUP_ID"],
    exclude_group_ids: ["OTHER_GROUP_ID"]
  }
};

mailerlite.automationTriggers.update(automation_id, trigger_id, params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
