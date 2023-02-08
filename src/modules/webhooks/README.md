# Webhooks


### List all webhooks
[Official Documentation](https://developers.mailerlite.com/docs/webhooks.html#list-all-webhooks)

---
```javascript
mailerlite.webhooks.get()
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get a webhook
[Official Documentation](https://developers.mailerlite.com/docs/webhooks.html#get-a-webhook)

---
```javascript
mailerlite.webhooks.find("WEBHOOK_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Create a webhook
[Official Documentation](https://developers.mailerlite.com/docs/webhooks.html#create-a-webhook)

---
```javascript
const params = {
  name: "Test webhook",
  events: ["subscriber.updated"],
  url: "http://www.marvin.com/omnis-accusamus-est-rem-delectus-quaerat.html"
};

mailerlite.webhooks.create(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update a webhook
[Official Documentation](https://developers.mailerlite.com/docs/webhooks.html#update-a-webhook)

---
```javascript
const params = {
  name: "Test webhook updated",
  enabled: false
};

mailerlite.webhooks.update(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Delete a webhook
[Official Documentation](https://developers.mailerlite.com/docs/webhooks.html#delete-a-webhook)

---
```javascript
mailerlite.webhooks.delete("WEBHOOK_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
