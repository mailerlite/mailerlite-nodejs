# Fields


### List all fields
[Official Documentation](https://developers.mailerlite.com/docs/fields.html#list-all-fields)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

const params = {
  limit: 5,
  page: 1,
  filter: {
    type: "text", // text, number, date
  },
  sort: "name" // name, -name, type, -type
}

mailerlite.fields.get(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Create a field
[Official Documentation](https://developers.mailerlite.com/docs/fields.html#create-a-field)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

const params = {
  name: 'Test field',
  type: 'text' // text, number, date
}

mailerlite.fields.create(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update a field
[Official Documentation](https://developers.mailerlite.com/docs/fields.html#update-a-field)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

const params = {
  name: "Updated field name"
};

mailerlite.fields.update("FIELD_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```


### Delete a field
[Official Documentation](https://developers.mailerlite.com/docs/fields.html#delete-a-field)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

mailerlite.fields.delete("FIELD_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
