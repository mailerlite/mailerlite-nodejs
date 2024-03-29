// node examples/stats/getAutomationStats.js ID_string

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

mailerlite.stats.getAutomationStats(automation_id)
  .then(stats => {
    console.log(stats);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
