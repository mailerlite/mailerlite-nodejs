// node examples/campaigns/create.js

"use strict";

import dotenv from 'dotenv';
dotenv.config();

import MailerLite from '../../dist/MailerLite.js';

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

const campaignData = {
  name: "Dummy campaign. Type: regular",
  language_id:	4,
  type:	"regular",
  emails:	[{
    subject: "Dummy subject",
    from_name: "Dummy Testerson",
    from:	"dummy@mailerlite.io", // insert verified email
    content: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n  <meta name=\"format-detection\" content=\"address=no\" />\n  <meta name=\"format-detection\" content=\"telephone=no\" />\n  <meta name=\"format-detection\" content=\"email=no\" />\n  <meta name=\"x-apple-disable-message-reformatting\" />\n  <title>Untitled</title>\n  <!-- Style goes here -->\n  <style type=\"text/css\">\n\n  </style>\n</head>\n<body style=\"margin: 0; padding: 0;\">\n<!-- Main table -->\n<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n  <tr>\n    <td style=\"padding: 0 40px;\">\n      <!-- Child table -->\n      <table align=\"center\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" style=\"width: 100%; min-width: 100%;\">\n        <tr>\n          <td>\n            <p> This is a test content </p>\n            <a href=\"{$unsubscribe}\">Unsubscribe</a>\n          </td>\n        </tr>\n      </table>\n\n    </td>\n  </tr>\n</table>\n<!-- Footer -->\n</body>\n</html>",
  }],
  groups: ['19293959921600205']
};

const campaignDataAb = {
  name: "Dummy campaign. Type: AB",
  language_id:	4,
  type:	"ab",
  emails:	[{
    subject: "Dummy subject",
    from_name: "Dummy Testerson",
    from:	"dummy@mailerlite.io", // insert verified email
    content: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n  <meta name=\"format-detection\" content=\"address=no\" />\n  <meta name=\"format-detection\" content=\"telephone=no\" />\n  <meta name=\"format-detection\" content=\"email=no\" />\n  <meta name=\"x-apple-disable-message-reformatting\" />\n  <title>Untitled</title>\n  <!-- Style goes here -->\n  <style type=\"text/css\">\n\n  </style>\n</head>\n<body style=\"margin: 0; padding: 0;\">\n<!-- Main table -->\n<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n  <tr>\n    <td style=\"padding: 0 40px;\">\n      <!-- Child table -->\n      <table align=\"center\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" style=\"width: 100%; min-width: 100%;\">\n        <tr>\n          <td>\n            <p> This is a test content </p>\n            <a href=\"{$unsubscribe}\">Unsubscribe</a>\n          </td>\n        </tr>\n      </table>\n\n    </td>\n  </tr>\n</table>\n<!-- Footer -->\n</body>\n</html>",
  }],
  groups: ['19293959921600205'],
  ab_settings: {
    test_type: "subject",
    select_winner_by:	"o",
    after_time_amount:	2,
    after_time_unit:	"d",
    test_split:	5,
    b_value: {
      subject: "Dummy subject AB test",
      from_name: "Dummy Testerson AB test",
      from:	"dummy@mailerlite.io", // insert verified email
    }
  }
};

const campaignDataResend = {
  name: "Dummy campaign. Type: resend",
  language_id:	4,
  type:	"resend",
  emails:	[{
    subject: "Dummy subject",
    from_name: "Dummy Testerson",
    from:	"dummy@mailerlite.io", // insert verified email
    content: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n  <meta name=\"format-detection\" content=\"address=no\" />\n  <meta name=\"format-detection\" content=\"telephone=no\" />\n  <meta name=\"format-detection\" content=\"email=no\" />\n  <meta name=\"x-apple-disable-message-reformatting\" />\n  <title>Untitled</title>\n  <!-- Style goes here -->\n  <style type=\"text/css\">\n\n  </style>\n</head>\n<body style=\"margin: 0; padding: 0;\">\n<!-- Main table -->\n<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n  <tr>\n    <td style=\"padding: 0 40px;\">\n      <!-- Child table -->\n      <table align=\"center\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" style=\"width: 100%; min-width: 100%;\">\n        <tr>\n          <td>\n            <p> This is a test content </p>\n            <a href=\"{$unsubscribe}\">Unsubscribe</a>\n          </td>\n        </tr>\n      </table>\n\n    </td>\n  </tr>\n</table>\n<!-- Footer -->\n</body>\n</html>",
  }],
  groups: ['19293959921600205'],
  resend_settings: {
    test_type: "subject",
    select_winner_by:	"o",
    b_value: {
      subject: "Dummy subject resend",
    }
  }
};

mailerlite.campaigns.create(campaignData)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });

