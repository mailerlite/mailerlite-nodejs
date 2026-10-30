// node examples/ecommerce/cart-items/create.js SHOP_ID_string CART_ID_string

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

const shop_id = process.argv[2] ? String(process.argv[2]) : null;
const cart_id = process.argv[3] ? String(process.argv[3]) : null;

const requestBody = {
  ecommerce_product_id: "PRODUCT_ID",
  quantity: 1
};

mailerlite.ecommerce.cartItems.create(shop_id, cart_id, requestBody)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
