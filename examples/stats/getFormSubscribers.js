// node examples/stats/getFormSubscribers.js ID_string

"use strict";

import dotenv from 'dotenv';
dotenv.config();

import MailerLite from '../../dist/MailerLite.js';

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let form_id = null
if (process.argv.slice(2).length) {
  form_id = process.argv[2];
}

const params = {
  filter: {
    status: "active", // "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
  },
  limit: 10,
  page:  1
}

mailerlite.stats.getFormSubscribers(form_id, params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
