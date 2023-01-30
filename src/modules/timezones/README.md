# Timezones

### List all timezones
[Official Documentation](https://developers.mailerlite.com/docs/timezones.html)

---
```javascript
mailerlite.timezones.get()
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
