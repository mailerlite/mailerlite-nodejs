// node examples/webhooks/create.js

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

const params = {
  name:  "Test webhook",
  events: ["subscriber.updated"],
  url:    "http://www.marvin.com/omnis-accusamus-est-rem-delectus-quaerat.html"
};

mailerlite.webhooks.create(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
