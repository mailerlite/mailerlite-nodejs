// node examples/subscribers/get.js active 5

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let myArgs = {};
if (process.argv.slice(2).length) {
  myArgs.filter = {
    status: String(process.argv[2])
  };
  myArgs.limit = parseInt(process.argv[3]);
}

mailerlite.subscribers.get(myArgs)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
