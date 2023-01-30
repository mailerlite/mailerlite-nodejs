# Stats


### Get a list of sent campaigns

---
```javascript
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

### Get a list of forms by type
[Official Documentation](https://developers.mailerlite.com/docs/forms.html#list-all-forms)

---
```javascript
const params = {
  sort: "created_at",
  limit: 10,
  page: 1
};

mailerlite.stats.getFormsByType("FORM_TYPE", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get forms count by type

---
```javascript
mailerlite.stats.getFormsCountByType("FORM_TYPE")
  .then(count => {
    console.log(`Number of ${FORM_TYPE}: ${count}`);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
    console.log(error.message);
  });
```

### Get subscribers of a form
[Official Documentation](https://developers.mailerlite.com/docs/forms.html#get-subscribers-who-signed-up-to-a-specific-form)

---
```javascript
const params = {
  filter: {
    status: "active", // possible status: active, unsubscribed, unconfirmed, bounced, junk
  },
  limit: 10,
  page:  1
}

mailerlite.stats.getFormSubscribers("FORM_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```


### List all automations
[Official Documentation](https://developers.mailerlite.com/docs/automations.html#list-all-automations)

---
```javascript
const params = {
  filter: {
    status: true,
    name: "test"
  },
  limit: 10,
  page: 1
};

mailerlite.stats.getAutomations(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get stats for a specific automation

---
```javascript
mailerlite.stats.getAutomationStats("AUTOMATION_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get the subscriber activity for an automation
[Official Documentation](https://developers.mailerlite.com/docs/automations.html#get-the-subscriber-activity-for-an-automation)

---
```javascript
const params = {
  filter: {
    status: "completed"
  },
  limit: 10,
  page: 1
};

mailerlite.stats.getAutomationSubscribers("AUTOMATION_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
