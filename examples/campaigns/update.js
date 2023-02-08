// node examples/campaigns/update.js ID_string

"use strict";

import dotenv from 'dotenv';
import MailerLite from '../../dist/index.mjs';

dotenv.config();

const mailerlite = new MailerLite({
  api_key: process.env.API_KEY,
});

let campaign_id = null
if (process.argv.slice(2).length) {
  campaign_id = process.argv[2];
}

const campaignData = {
  name: "Dummy campaign update. Type: resend",
  language_id:	4,
  type:	"regular",
  emails:	[{
    subject: "Dummy subject",
    from_name: "Dummy Testerson",
    from:	"dummy@mailerlite.io", // insert verified email
    content: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n  <meta name=\"format-detection\" content=\"address=no\" />\n  <meta name=\"format-detection\" content=\"telephone=no\" />\n  <meta name=\"format-detection\" content=\"email=no\" />\n  <meta name=\"x-apple-disable-message-reformatting\" />\n  <title>Untitled</title>\n  <!-- Style goes here -->\n  <style type=\"text/css\">\n\n  </style>\n</head>\n<body style=\"margin: 0; padding: 0;\">\n<!-- Main table -->\n<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n  <tr>\n    <td style=\"padding: 0 40px;\">\n      <!-- Child table -->\n      <table align=\"center\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" style=\"width: 100%; min-width: 100%;\">\n        <tr>\n          <td>\n            <p> This is a test content </p>\n            <a href=\"{$unsubscribe}\">Unsubscribe</a>\n          </td>\n        </tr>\n      </table>\n\n    </td>\n  </tr>\n</table>\n<!-- Footer -->\n</body>\n</html>",
  }],
  groups: ['19293959921600205']  // insert real group ID
};

const campaignDataResend = {
  name: "Dummy campaign updated. Type: resend",
  language_id:	4,
  type:	"resend",
  emails:	[{
    subject: "Dummy subject updated",
    from_name: "Dummy Testerson updated",
    from:	"dummy@mailerlite.io", // insert verified email
    content: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n  <meta name=\"format-detection\" content=\"address=no\" />\n  <meta name=\"format-detection\" content=\"telephone=no\" />\n  <meta name=\"format-detection\" content=\"email=no\" />\n  <meta name=\"x-apple-disable-message-reformatting\" />\n  <title>Untitled</title>\n  <!-- Style goes here -->\n  <style type=\"text/css\">\n\n  </style>\n</head>\n<body style=\"margin: 0; padding: 0;\">\n<!-- Main table -->\n<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n  <tr>\n    <td style=\"padding: 0 40px;\">\n      <!-- Child table -->\n      <table align=\"center\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" style=\"width: 100%; min-width: 100%;\">\n        <tr>\n          <td>\n            <p> This is a test content </p>\n            <a href=\"{$unsubscribe}\">Unsubscribe</a>\n          </td>\n        </tr>\n      </table>\n\n    </td>\n  </tr>\n</table>\n<!-- Footer -->\n</body>\n</html>",
  }],
  groups: ['19293959921600205'],
  resend_settings: {
    test_type: "subject",
    select_winner_by:	"o",
    b_value: {
      subject: "Dummy subject resend updated",
    }
  }
};

mailerlite.campaigns.update(campaign_id, campaignDataResend)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });

