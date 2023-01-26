// node examples/webhooks/find.js ID_string

"use strict";

import dotenv from 'dotenv';
dotenv.config();

import MailerLite from '../../dist/index.js';

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let webhook_id = null
if (process.argv.slice(2).length) {
  webhook_id = process.argv[2];
}

mailerlite.webhooks.find(webhook_id)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
