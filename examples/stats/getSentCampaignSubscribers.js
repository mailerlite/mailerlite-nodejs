// node examples/stats/getSentCampaignSubscribers.js ID_string

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

const params = {
  filter: {
    // type: "opened",  // "opened" | "unopened" | "clicked" | "unsubscribed" | "forwarded" | "hardbounced" | "softbounced" | "junk"
    // search: "",
  },
  limit: 10, // 10 | 25 | 50 | 100;
  sort:  "id", // "id" | "updated_at" | "clicks_count" | "opens_count";
  page:  1
}

mailerlite.stats.getSentCampaignSubscribers(campaign_id, params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
