// node examples/stats/getFormsCountByType.js popup

"use strict";

import dotenv from 'dotenv';
dotenv.config();

import MailerLite from '../../dist/index.js';

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let form_type = null; // "popup" | "embedded" | "promotion";
if (process.argv.slice(2).length) {
  form_type = process.argv[2];
}

mailerlite.stats.getFormsCountByType(form_type)
  .then(count => {
    console.log(`Number of ${form_type}: ${count}`);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
