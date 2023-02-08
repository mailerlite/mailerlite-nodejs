// node examples/campaigns/schedule.js ID_string

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let campaign_id = null
if (process.argv.slice(2).length) {
  campaign_id = process.argv[2];
}

const scheduleParamsInstant = {
  delivery: 'instant'
};

const scheduleParamsScheduled = {
  delivery: "scheduled",
  schedule: { // change dates
    date: "2022-12-20",
    hours: "07",
    minutes: "15",
    timezone_id: 50
  },
  // if resend type campaign
  // resend: {
  //   delivery: "day"
  // }
};

mailerlite.campaigns.schedule(campaign_id, scheduleParamsScheduled)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });

