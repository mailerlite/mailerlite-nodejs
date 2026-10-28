// node examples/emails/createBlock.js ID_string_email etag_string [idempotency_key]

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

// take the etag from find.js (or the last write's response)
let email_id = null
let etag = null
let options = undefined
if (process.argv.slice(2).length) email_id = String(process.argv[2]);
if (process.argv.slice(3).length) etag = String(process.argv[3]);
if (process.argv.slice(4).length) options = { idempotencyKey: String(process.argv[4]) };

const params = {
  etag: etag,
  type: "paragraph", // any block type except title
  editor_content: {
    attrs: { textAlign: "left" },
    content: [{ type: "text", text: "Hello from the Node.js SDK" }]
  },
  placement: {
    position: "end" // start, end, before, after (before/after also need block_id)
  }
};

const buttonParams = {
  etag: etag,
  type: "button",
  editor_content: {
    attrs: { url: "https://example.com/shop" },
    content: [{ type: "text", text: "Shop now" }] // the button label lives here, not in attrs
  }
};

mailerlite.emails.createBlock(email_id, params, options)
  .then(response => {
    console.dir(response.data, { depth: null });
  })
  .catch(error => {
    if (error.response) console.dir(error.response.data, { depth: null });
    console.log(error.message);
  });
