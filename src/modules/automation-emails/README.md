# Automation emails


### Get automation email content
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
mailerlite.automationEmails.getContent("AUTOMATION_ID", "EMAIL_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Set automation email content
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  html: '<html><body><p>Hello {$name}</p><a href="{$unsubscribe}">Unsubscribe</a></body></html>'
};

mailerlite.automationEmails.updateContent("AUTOMATION_ID", "EMAIL_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get automation email stats
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  start_date: "2026-01-01",
  end_date: "2026-01-31"
};

mailerlite.automationEmails.getReportStats("AUTOMATION_ID", "EMAIL_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get automation email e-commerce stats
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  start_date: "2026-01-01",
  end_date: "2026-01-31",
  shop_id: "SHOP_ID"
};

mailerlite.automationEmails.getEcommerceOverviewStats("AUTOMATION_ID", "EMAIL_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### List automation email unsubscribe reasons
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
mailerlite.automationEmails.getUnsubscribeReasons("AUTOMATION_ID", "EMAIL_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
