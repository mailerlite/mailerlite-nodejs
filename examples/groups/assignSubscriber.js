// node examples/groups/assignSubscribe.js ID_string_subscriber ID_string_group

"use strict";

import dotenv from 'dotenv';
dotenv.config();

import MailerLite from '../../dist/MailerLite.js';

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let subscriber_id = null
let group_id = null
if (process.argv.slice(2).length) subscriber_id = process.argv[2];
if (process.argv.slice(3).length) group_id = process.argv[3];

mailerlite.groups.assignSubscriber(subscriber_id, group_id)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
