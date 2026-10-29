// node examples/ecommerce/product-variants/delete.js SHOP_ID_string PRODUCT_ID_string VARIANT_ID_string

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

const shop_id = process.argv[2] ? String(process.argv[2]) : null;
const product_id = process.argv[3] ? String(process.argv[3]) : null;
const variant_id = process.argv[4] ? String(process.argv[4]) : null;

mailerlite.ecommerce.productVariants.delete(shop_id, product_id, variant_id)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
