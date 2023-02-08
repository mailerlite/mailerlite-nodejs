// node examples/fields/get.js

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

const params = {
  limit: 5,
  page: 1,
  filter: {
    keyword: "",
    type: "text", // text, number, date
  },
  sort: "name" // name, -name, type, -type
}

mailerlite.fields.get(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
