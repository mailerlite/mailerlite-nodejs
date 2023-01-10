# Automations


### List all automations
[Official Documentation](https://developers.mailerlite.com/docs/automations.html#list-all-automations)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

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
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

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
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

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
