// node examples/stats/getSentCampaigns.js regular 25 1

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let params = {
  filter: {
    status: "sent"
  }
};

if (process.argv.slice(2).length) params.filter.type = String(process.argv[2]);
if (process.argv.slice(4).length) params.limit = parseInt(process.argv[3]);
if (process.argv.slice(5).length) params.page = parseInt(process.argv[4]);

mailerlite.stats.getSentCampaigns(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
