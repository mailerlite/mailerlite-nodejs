// node examples/subscribers/createOrUpdate.js

"use strict";

import dotenv from 'dotenv';
dotenv.config();

import MailerLite from '../../dist/index.js';

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

const subscriberData = {
  email: 'test3@mail.com',
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

mailerlite.subscribers.createOrUpdate(subscriberData)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
