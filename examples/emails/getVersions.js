// node examples/emails/getVersions.js ID_string_email 25 1

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let email_id = null
let params = {};
if (process.argv.slice(2).length) email_id = String(process.argv[2]);
if (process.argv.slice(3).length) params.limit = parseInt(process.argv[3]);
if (process.argv.slice(4).length) params.page = parseInt(process.argv[4]);

mailerlite.emails.getVersions(email_id, params)
  .then(response => {
    console.dir(response.data, { depth: null });
  })
  .catch(error => {
    if (error.response) console.dir(error.response.data, { depth: null });
    console.log(error.message);
  });
