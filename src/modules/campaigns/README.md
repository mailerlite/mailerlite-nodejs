# Campaigns


### Campaign list
[Official Documentation](https://developers.mailerlite.com/docs/campaigns.html#campaign-list)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

const params = {
  filter: {
    status: "sent", // possible statuses: sent, draft, ready
    type: "regular" // possible types: regular, ab, resend, rss
  },
  limit: 25,
  page: 1
};

mailerlite.campaigns.get(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get a campaign
[Official Documentation](https://developers.mailerlite.com/docs/campaigns.html#get-a-campaign)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

mailerlite.campaigns.find("CAMPAIGN_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Create a campaign
[Official Documentation](https://developers.mailerlite.com/docs/campaigns.html#create-a-campaign)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

const params = {
  name: "Dummy AB campaign",
  language_id: 4,
  type:	"ab",
  emails: [{
    subject: "Dummy subject",
    from_name: "Dummy Testerson",
    from: "dummy@mailerlite.io",
    content: "<!DOCTYPE html>\n<html>\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n  <meta name=\"format-detection\" content=\"address=no\" />\n  <meta name=\"format-detection\" content=\"telephone=no\" />\n  <meta name=\"format-detection\" content=\"email=no\" />\n  <meta name=\"x-apple-disable-message-reformatting\" />\n  <title>Untitled</title>\n  <!-- Style goes here -->\n  <style type=\"text/css\">\n\n  </style>\n</head>\n<body style=\"margin: 0; padding: 0;\">\n<!-- Main table -->\n<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n  <tr>\n    <td style=\"padding: 0 40px;\">\n      <!-- Child table -->\n      <table align=\"center\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" style=\"width: 100%; min-width: 100%;\">\n        <tr>\n          <td>\n            <p> This is a test content </p>\n            <a href=\"{$unsubscribe}\">Unsubscribe</a>\n          </td>\n        </tr>\n      </table>\n\n    </td>\n  </tr>\n</table>\n<!-- Footer -->\n</body>\n</html>",
  }],
  groups: ['4243829086487936'],
  ab_settings: {
    test_type: "subject",
    select_winner_by: "o",
    after_time_amount: 2,
    after_time_unit: "d",
    test_split:	5,
    b_value: {
      subject: "Dummy subject AB test",
      from_name: "Dummy Testerson AB test",
      from: "dummy@mailerlite.io"
    }
  }
}

mailerlite.campaigns.create(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update campaign
[Official Documentation](https://developers.mailerlite.com/docs/campaigns.html#update-campaign)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

const params = {
  name: "Dummy resend campaign update",
  language_id: 4,
  type:	"resend",
  emails: [{
    subject: "Dummy subject update",
    from_name: "Dummy Testerson update",
    from: "dummy@mailerlite.io",
    content: "<!DOCTYPE html>\n<html>\n<head>\n  <meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n  <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n  <meta name=\"format-detection\" content=\"address=no\" />\n  <meta name=\"format-detection\" content=\"telephone=no\" />\n  <meta name=\"format-detection\" content=\"email=no\" />\n  <meta name=\"x-apple-disable-message-reformatting\" />\n  <title>Untitled</title>\n  <!-- Style goes here -->\n  <style type=\"text/css\">\n\n  </style>\n</head>\n<body style=\"margin: 0; padding: 0;\">\n<!-- Main table -->\n<table border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\">\n  <tr>\n    <td style=\"padding: 0 40px;\">\n      <!-- Child table -->\n      <table align=\"center\" border=\"0\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\" style=\"width: 100%; min-width: 100%;\">\n        <tr>\n          <td>\n            <p> This is a test content </p>\n            <a href=\"{$unsubscribe}\">Unsubscribe</a>\n          </td>\n        </tr>\n      </table>\n\n    </td>\n  </tr>\n</table>\n<!-- Footer -->\n</body>\n</html>",
  }],
  groups: ['4243829086487936'],
  resend_settings: {
    test_type: "subject",
    select_winner_by:	"o",
    b_value: {
      subject: "Dummy subject resend",
    }
  }
};

mailerlite.campaigns.update("CAMPAIGN_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Schedule a campaign
[Official Documentation](https://developers.mailerlite.com/docs/campaigns.html#schedule-a-campaign)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

const params = {
  delivery: "scheduled",
  schedule: {
    date: "2022-12-12",
    hours: "12",
    minutes: "12",
    timezone_id: 50
  }
};

mailerlite.campaigns.schedule("CAMPAIGN_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Cancel a ready campaign
[Official Documentation](https://developers.mailerlite.com/docs/campaigns.html#cancel-a-ready-campaign)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

mailerlite.campaigns.cancel("CAMPAIGN_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Delete a campaign
[Official Documentation](https://developers.mailerlite.com/docs/campaigns.html#delete-a-campaign)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

mailerlite.campaigns.delete("CAMPAIGN_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
