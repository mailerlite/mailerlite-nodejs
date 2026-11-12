// node examples/emails/validateBlock.js

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

const params = {
  type: "button",
  editor_content: {
    attrs: { url: "https://example.com/shop" },
    content: [{ type: "text", text: "Shop now" }]
  }
};

// invalid content still returns 200: check `valid`
mailerlite.emails.validateBlock(params)
  .then(response => {
    console.dir(response.data, { depth: null });
  })
  .catch(error => {
    if (error.response) console.dir(error.response.data, { depth: null });
    console.log(error.message);
  });
