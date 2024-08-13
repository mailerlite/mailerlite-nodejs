// node examples/subscribers/update.js ID_string

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let subscriber_id = null;

if (process.argv.slice(2).length) {
  subscriber_id = process.argv[2];
}

const subscriberData = {
  fields:	{
    name: 'Test name 1',
    last_name: 'Test lastname 1',
    company: 'test company 2',
    country: 'test country',
    city: 'test city'
  },
  groups:	['19293959921600205'],
  status:	'active',
  subscribed_at: '2022-11-23 09:59:56',
  ip_address:	'',
  opted_in_at:	'',
  optin_ip:	'',
  unsubscribed_at:	''
};

mailerlite.subscribers.update(subscriber_id,subscriberData)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
