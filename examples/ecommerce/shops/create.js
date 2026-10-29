// node examples/ecommerce/shops/create.js

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

const requestBody = {
  name: "My shop",
  url: "https://shop.example.com",
  currency: "EUR"
};

mailerlite.ecommerce.shops.create(requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
