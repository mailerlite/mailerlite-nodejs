# E-commerce settings


### Get e-commerce tracking settings
[Official Documentation](https://developers.mailerlite.com/ecommerce/settings#get-e-commerce-tracking-settings)

---
```javascript
mailerlite.ecommerce.settings.get()
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
