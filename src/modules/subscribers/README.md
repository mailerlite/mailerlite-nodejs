# Subscribers


### List all subscribers
[Official Documentation](https://developers.mailerlite.com/docs/subscribers.html#list-all-subscribers)

---
```javascript
const params = {
  filter: {
    status: "active" // possible statuses: active, unsubscribed, unconfirmed, bounced or junk.
  },
  limit: 10
};

mailerlite.subscribers.get(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Create/update subscriber
[Official Documentation](https://developers.mailerlite.com/docs/subscribers.html#create-update-subscriber)

---
```javascript
const params = {
  email: "dummy@example.com",
  fields: {
    name: "Dummy",
    last_name: "Testerson",
    company: "MailerLite",
    country: "Best country",
    city: "Best city",
    phone: "37060677606",
    state: "Best state",
    z_i_p: "99999"
  },
  groups: ["4243829086487936"],
  status: "active", // possible statuses: active, unsubscribed, unconfirmed, bounced or junk.
  subscribed_at: "2021-08-31 14:22:08",
  ip_address: null,
  opted_in_at: null, // yyyy-MM-dd HH:mm:ss
  optin_ip: null,
  unsubscribed_at: null // yyyy-MM-dd HH:mm:ss
};

mailerlite.subscribers.createOrUpdate(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Fetch a subscriber
[Official Documentation](https://developers.mailerlite.com/docs/subscribers.html#fetch-a-subscriber)

---
```javascript
mailerlite.subscribers.find("SUBSCRIBER_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Fetch total subscribers count
[Official Documentation](https://developers.mailerlite.com/docs/subscribers.html#fetch-total-subscribers-count)

---
```javascript
mailerlite.subscribers.getCount()
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Delete a subscriber
[Official Documentation](https://developers.mailerlite.com/docs/subscribers.html#delete-a-subscriber)

---
```javascript
mailerlite.subscribers.delete("SUBSCRIBER_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
