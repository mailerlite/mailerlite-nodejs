// node examples/ecommerce/import/importOrders.js SHOP_ID_string

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

const shop_id = process.argv[2] ? String(process.argv[2]) : null;

const requestBody = {
  orders: [
    {
      customer: { email: "customer@example.com" },
      cart: { items: [{ ecommerce_product_id: "PRODUCT_ID", quantity: 1 }] }
    }
  ]
};

mailerlite.ecommerce.import.importOrders(shop_id, requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
