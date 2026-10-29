# Automations


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

mailerlite.automations.get(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get an automation
[Official Documentation](https://developers.mailerlite.com/docs/automations.html#get-an-automation)

---
```javascript
mailerlite.automations.find("AUTOMATION_ID")
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
    status: "active"
  },
  limit: 10,
  page: 1
};

mailerlite.automations.getAutomationSubscribers("AUTOMATION_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get automation e-commerce stats
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints -->

---
```javascript
const params = {
  shop_id: "SHOP_ID"
};

mailerlite.automations.getEcommerceStats("AUTOMATION_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get automation email e-commerce stats
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints -->

---
```javascript
const params = {
  shop_id: "SHOP_ID"
};

mailerlite.automations.getEmailEcommerceStats("AUTOMATION_ID", "EMAIL_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get automation e-commerce orders
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints -->

---
```javascript
const params = {
  time_frame: "all_time"
};

mailerlite.automations.getEcommerceOrders("AUTOMATION_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
