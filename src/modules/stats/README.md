# Stats


### Get a list of sent campaigns

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

const params = {
  filter: {
    type: "regular" // possible types: regular, ab, resend, rss
  },
  limit: 25,
  page: 1
};

mailerlite.stats.getSentCampaigns(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get stats for a sent campaign

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

mailerlite.stats.getSentCampaignStats("CAMPAIGN_ID")
  .then(stats => {
    console.log(stats);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
```

###  Get a subscribers of sent campaign
[Official Documentation](https://developers.mailerlite.com/docs/campaigns.html#get-subscribers-activity-of-a-sent-campaign)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

const params = {
  filter: {
    type: "opened",  // possible types: opened, unopened, clicked, unsubscribed, forwarded, hardbounced, softbounced, junk
  },
  limit: 10, // possible limits: 10, 25, 50, 100;
  sort:  "id", // possible sort: id, updated_at, clicks_count, opens_count;
  page:  1
}

mailerlite.stats.getSentCampaignStats("CAMPAIGN_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
