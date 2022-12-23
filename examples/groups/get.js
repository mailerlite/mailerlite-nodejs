// node examples/groups/get.js

"use strict";

import dotenv from 'dotenv';
dotenv.config();

import MailerLite from '../../dist/MailerLite.js';

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let params = {
  limit: 5,
  page: 1,
  filter: {
      name: ""
  },
  sort: "-name" // name, total, open_rate, click_rate, created_at
};

mailerlite.groups.get(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
