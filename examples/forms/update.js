// node examples/forms/update.js ID_string

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let form_id = null
if (process.argv.slice(2).length) {
  form_id = process.argv[2];
}

const requestBody = {
  name: 'Updated name'
}

mailerlite.forms.update(form_id, requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });

