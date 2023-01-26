// node examples/batches/send.js

"use strict";

import dotenv from 'dotenv';
dotenv.config();

import MailerLite from '../../dist/index.js';

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

const params = {
  requests: [
    {
      method: "POST",
      path:   "api/fields",
      body:   {
        name: "test batch field 3",
        type: "text"
      }
    },
    {
      method: "POST",
      path:   "api/fields",
      body:   {
        name: "test batch field 4",
        type: "text"
      }
    },
    {
      method: "GET",
      path:   "/api/forms/popup",
      body:   {
        filter: {
          name: "nodejs"
        }
      }
    }
  ]
}

mailerlite.batches.send(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
