// node examples/campaigns/delete.js ID_string

"use strict";

import dotenv from 'dotenv';
dotenv.config();

import MailerLite from '../../dist/index.js';

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let campaign_id = null
if (process.argv.slice(2).length) {
  campaign_id = process.argv[2];
}

mailerlite.campaigns.delete(campaign_id)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
