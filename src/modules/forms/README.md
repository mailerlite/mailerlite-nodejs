# Forms


### List all forms
[Official Documentation](https://developers.mailerlite.com/docs/forms.html#list-all-forms)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

const formType = "popup";

const params = {
  sort: "created_at",
  limit: 25,
  page: 1
};

mailerlite.forms.get(formType, params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```


### Update a form
[Official Documentation](https://developers.mailerlite.com/docs/forms.html#update-a-form)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

const params = {
  name: "Updated name"
};

mailerlite.forms.update("FORM_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```


### Delete a form
[Official Documentation](https://developers.mailerlite.com/docs/forms.html#delete-a-form)

---
```javascript
import { MailerLite } from "MailerLite";

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});

mailerlite.forms.delete("FORM_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
