// node examples/emails/restoreVersion.js ID_string_email ID_string_version etag_string [idempotency_key]

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let email_id = null
let version_id = null
let etag = null
let options = undefined
if (process.argv.slice(2).length) email_id = String(process.argv[2]);
if (process.argv.slice(3).length) version_id = String(process.argv[3]);
if (process.argv.slice(4).length) etag = String(process.argv[4]);
if (process.argv.slice(5).length) options = { idempotencyKey: String(process.argv[5]) };

mailerlite.emails.restoreVersion(email_id, version_id, { etag: etag }, options)
  .then(response => {
    console.dir(response.data, { depth: null });
  })
  .catch(error => {
    if (error.response) console.dir(error.response.data, { depth: null });
    console.log(error.message);
  });
