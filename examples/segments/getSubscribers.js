// node examples/segments/getSubscribers.js ID_string

"use strict";

import dotenv from 'dotenv';
dotenv.config();

import MailerLite from '../../dist/MailerLite.js';

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let segment_id = null;
if (process.argv.slice(2).length) segment_id = String(process.argv[2]);

let params = {
  filter: {
    status: "active",
  },
  limit: 3,
  // after: "subscriber_id"
}

mailerlite.segments.getSubscribers(segment_id, params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
