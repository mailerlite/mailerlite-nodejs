// node examples/campaigns/get.js sent regular 25 1

"use strict";

import dotenv from 'dotenv';
dotenv.config();

import MailerLite from '../../dist/index.js';

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let myArgs = {};
if (process.argv.slice(2).length) {
  myArgs.filter = {
    status: String(process.argv[2]),
    type: String(process.argv[3])
  };
}

if (process.argv.slice(4).length) myArgs.limit = parseInt(process.argv[4]);
if (process.argv.slice(5).length) myArgs.page = parseInt(process.argv[5]);

mailerlite.campaigns.get(myArgs)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
