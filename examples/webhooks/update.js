// node examples/webhooks/update.js ID_string

"use strict";

import dotenv from 'dotenv';
dotenv.config();

import MailerLite from '../../dist/MailerLite.js';

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let webhook_id = null
if (process.argv.slice(2).length) {
  webhook_id = process.argv[2];
}

const params = {
  name:  "Test webhook updated",
  enabled: false
};

mailerlite.webhooks.update(webhook_id, params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
