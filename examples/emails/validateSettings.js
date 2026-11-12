// node examples/emails/validateSettings.js ID_string_email

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let email_id = null
if (process.argv.slice(2).length) email_id = String(process.argv[2]);

const params = {
  brand: {
    background_color: "#f5f5f5"
  }
};

// invalid values still return 200: check `valid`
mailerlite.emails.validateSettings(email_id, params)
  .then(response => {
    console.dir(response.data, { depth: null });
  })
  .catch(error => {
    if (error.response) console.dir(error.response.data, { depth: null });
    console.log(error.message);
  });
