// node examples/emails/saveAsTemplate.js ID_string_email [idempotency_key]

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let email_id = null
let options = undefined
if (process.argv.slice(2).length) email_id = String(process.argv[2]);
if (process.argv.slice(3).length) options = { idempotencyKey: String(process.argv[3]) };

const params = {
  name: "Template saved from the Node.js SDK"
};

mailerlite.emails.saveAsTemplate(email_id, params, options)
  .then(response => {
    console.dir(response.data, { depth: null });
  })
  .catch(error => {
    if (error.response) console.dir(error.response.data, { depth: null });
    console.log(error.message);
  });
