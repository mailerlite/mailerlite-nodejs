// node examples/automations/getAutomationSubscribers.js ID_string

"use strict";

import dotenv from 'dotenv';
dotenv.config();

import MailerLite from '../../dist/esm/index.mjs';

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let automation_id = null
if (process.argv.slice(2).length) {
  automation_id = process.argv[2];
}

const params = {
  filter: {
    status: "active"
  },
  limit: 10,
  page: 1
};

mailerlite.automations.getAutomationSubscribers(automation_id, params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
