// node examples/groups/unAssignSubscriber.js ID_string_subscriber ID_string_group

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let subscriber_id = null
let group_id = null
if (process.argv.slice(2).length) subscriber_id = String(process.argv[2]);
if (process.argv.slice(3).length) group_id = String(process.argv[3]);

mailerlite.groups.unAssignSubscriber(subscriber_id, group_id)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
