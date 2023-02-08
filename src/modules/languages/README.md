# Timezones

### List all languages
[Official Documentation](https://developers.mailerlite.com/docs/languages.html)

---
```javascript
mailerlite.languages.get()
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
