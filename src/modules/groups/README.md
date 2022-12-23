# Groups


### List all groups
[Official Documentation](https://developers.mailerlite.com/docs/groups.html#list-all-groups)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

const params = {
  limit: 25,
  page: 1,
  filter: {
    name: "dummy",
  },
  sort: "-name"
};

mailerlite.groups.get(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Create a group
[Official Documentation](https://developers.mailerlite.com/docs/groups.html#create-a-group)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

const params = {
  name: "Dummy group"
};

mailerlite.groups.create("GROUP_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update a group
[Official Documentation](https://developers.mailerlite.com/docs/groups.html#update-a-group)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

const params = {
  name: "Dummy group updated"
}

mailerlite.groups.update("GROUP_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Delete group
[Official Documentation](https://developers.mailerlite.com/docs/groups.html#delete-group)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

mailerlite.groups.delete("GROUP_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get subscribers belonging to a group
[Official Documentation](https://developers.mailerlite.com/docs/groups.html#get-subscribers-belonging-to-a-group)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

const params = {
  filter: {
    status: "active" // active, unsubscribed, unconfirmed, bounced or junk
  },
  limit: 5,
  page: 1
};

mailerlite.groups.getSubscribers("GROUP_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Assign subscriber to a group
[Official Documentation](https://developers.mailerlite.com/docs/groups.html#assign-subscriber-to-a-group)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

mailerlite.groups.assignSubscriber("SUBSCRIBER_ID", "GROUP_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Unassign subscriber from a group
[Official Documentation](https://developers.mailerlite.com/docs/groups.html#unassign-subscriber-from-a-group)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

mailerlite.groups.unAssignSubscriber("SUBSCRIBER_ID", "GROUP_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
