# Automation templates


### List automation templates
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
const params = {
  filter: {
    type: "welcome"
  },
  limit: 10,
  page: 1
};

mailerlite.automationTemplates.get(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Create an automation from a template
[Official Documentation](https://developers.mailerlite.com/docs/automations.html)

---
```javascript
mailerlite.automationTemplates.select("AUTOMATION_TEMPLATE_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
