// node examples/emails/updateBlock.js ID_string_email ID_string_block etag_string [idempotency_key]

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let email_id = null
let block_id = null
let etag = null
let options = undefined
if (process.argv.slice(2).length) email_id = String(process.argv[2]);
if (process.argv.slice(3).length) block_id = String(process.argv[3]);
if (process.argv.slice(4).length) etag = String(process.argv[4]);
if (process.argv.slice(5).length) options = { idempotencyKey: String(process.argv[5]) };

// replaces the block's editor_content whole: read it with findBlock.js, change it, send it back
const params = {
  etag: etag,
  editor_content: {
    attrs: { textAlign: "center" },
    content: [{ type: "text", text: "Updated from the Node.js SDK" }]
  }
};

mailerlite.emails.updateBlock(email_id, block_id, params, options)
  .then(response => {
    console.dir(response.data, { depth: null });
  })
  .catch(error => {
    if (error.response) console.dir(error.response.data, { depth: null });
    console.log(error.message);
  });
