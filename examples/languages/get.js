// node examples/languages/get.js

"use strict";

import dotenv from 'dotenv';
dotenv.config();

import MailerLite from '../../dist/esm/index.mjs';

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

mailerlite.languages.get()
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
