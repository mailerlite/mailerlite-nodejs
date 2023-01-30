// node examples/groups/update.js ID_string

"use strict";

import dotenv from 'dotenv';
dotenv.config();

import MailerLite from '../../dist/esm/index.mjs';

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let group_id = null
if (process.argv.slice(2).length) {
  group_id = String(process.argv[2]);
}

const params = {
  name: "Test group updated"
}

mailerlite.groups.update(group_id, params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });

