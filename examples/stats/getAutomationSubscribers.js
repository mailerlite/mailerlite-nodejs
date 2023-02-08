// node examples/stats/getAutomationSubscribers.js ID_string

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let automation_id = null
if (process.argv.slice(2).length) {
  automation_id = process.argv[2];
}

const params = {
  filter: {
    status: "completed"
  },
  limit: 10,
  page: 1
};

mailerlite.stats.getAutomationSubscribers(automation_id, params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
