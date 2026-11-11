# Automation triggers


### List automation triggers
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
mailerlite.automationTriggers.get("AUTOMATION_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get an automation trigger
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
mailerlite.automationTriggers.find("AUTOMATION_ID", "TRIGGER_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Create an automation trigger
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  type: "subscriber_joins_group",
  data: {
    group_ids: ["GROUP_ID"]
  }
};

mailerlite.automationTriggers.create("AUTOMATION_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update an automation trigger
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  data: {
    group_ids: ["GROUP_ID"],
    exclude_group_ids: ["OTHER_GROUP_ID"]
  }
};

mailerlite.automationTriggers.update("AUTOMATION_ID", "TRIGGER_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Delete an automation trigger
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
mailerlite.automationTriggers.delete("AUTOMATION_ID", "TRIGGER_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
