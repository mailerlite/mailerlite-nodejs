// node examples/segments/update.js ID_string

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let segment_id = null
if (process.argv.slice(2).length) {
  segment_id = process.argv[2];
}

const params = {
  name: 'Updated segment name 2'
}

mailerlite.segments.update(segment_id, params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });

