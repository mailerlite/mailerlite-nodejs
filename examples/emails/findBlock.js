// node examples/emails/findBlock.js ID_string_email ID_string_block

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let email_id = null
let block_id = null
if (process.argv.slice(2).length) email_id = String(process.argv[2]);
if (process.argv.slice(3).length) block_id = String(process.argv[3]);

mailerlite.emails.findBlock(email_id, block_id)
  .then(response => {
    console.dir(response.data, { depth: null });
  })
  .catch(error => {
    if (error.response) console.dir(error.response.data, { depth: null });
    console.log(error.message);
  });
