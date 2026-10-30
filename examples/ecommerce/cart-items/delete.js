// node examples/ecommerce/cart-items/delete.js SHOP_ID_string CART_ID_string ITEM_ID_string

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

const shop_id = process.argv[2] ? String(process.argv[2]) : null;
const cart_id = process.argv[3] ? String(process.argv[3]) : null;
const item_id = process.argv[4] ? String(process.argv[4]) : null;

mailerlite.ecommerce.cartItems.delete(shop_id, cart_id, item_id)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
