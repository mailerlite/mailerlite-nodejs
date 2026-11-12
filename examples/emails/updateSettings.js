// node examples/emails/updateSettings.js ID_string_email etag_string [idempotency_key]

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let email_id = null
let etag = null
let options = undefined
if (process.argv.slice(2).length) email_id = String(process.argv[2]);
if (process.argv.slice(3).length) etag = String(process.argv[3]);
if (process.argv.slice(4).length) options = { idempotencyKey: String(process.argv[4]) };

// send only the keys you change; style values are strings ("8", not 8)
const params = {
  etag: etag,
  brand: {
    background_color: "#f5f5f5"
    // style: "preset-retro" // a preset identifier from brandStyles.get()
  },
  button: {
    border_radius: "8"
  }
};

mailerlite.emails.updateSettings(email_id, params, options)
  .then(response => {
    console.dir(response.data, { depth: null });
  })
  .catch(error => {
    if (error.response) console.dir(error.response.data, { depth: null });
    console.log(error.message);
  });
