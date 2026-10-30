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

### Create draft automation
[Official Documentation](https://developers.mailerlite.com/docs/automations.html#create-draft-automation)

---
```javascript
const params = {
  name: "Welcome series"
};

mailerlite.automations.create(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update an automation
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  name: "Welcome series",
  trigger_data: {
    repeatable: false,
    track_ecommerce: false
  }
};

mailerlite.automations.update("AUTOMATION_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Delete automation
[Official Documentation](https://developers.mailerlite.com/docs/automations.html#delete-automation)

---
```javascript
mailerlite.automations.delete("AUTOMATION_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Copy an automation
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
mailerlite.automations.copy("AUTOMATION_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Enable an automation
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
mailerlite.automations.enable("AUTOMATION_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Disable an automation
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
mailerlite.automations.disable("AUTOMATION_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Send an automation test email
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  email: "verified@example.com"
};

mailerlite.automations.test("AUTOMATION_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Add subscribers to an automation
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  emails: ["subscriber@example.com"],
  groups: ["GROUP_ID"]
};

mailerlite.automations.addSubscribers("AUTOMATION_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Re-add subscribers to an automation
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  readd_subscribers_to: "last_completed_step",
  filter: {
    status: "completed" // completed, canceled or failed
  }
};

mailerlite.automations.readd("AUTOMATION_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Copy automation subscribers to groups
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  destination_groups: ["GROUP_ID"],
  filter: {
    status: "completed" // active, completed or canceled
  }
};

mailerlite.automations.addActivityToGroup("AUTOMATION_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Cancel automation runs
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  filter: {
    status: "active",
    id: ["RUN_ID"]
  }
};

mailerlite.automations.cancelActivity("AUTOMATION_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Skip an automation delay
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  filter: {
    status: "active",
    id: ["RUN_ID"]
  }
};

mailerlite.automations.skipActivityDelay("AUTOMATION_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
