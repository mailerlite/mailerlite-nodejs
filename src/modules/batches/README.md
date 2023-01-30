# Batching

### Send batch request
Make multiple request to api in a single call

[Official Documentation](https://developers.mailerlite.com/docs/batching.html)

---
```javascript
const params = {
  requests: [
    {
      method: "POST",
      path:   "api/fields",
      body:   {
        name: "test batch field 1",
        type: "text"
      }
    },
    {
      method: "POST",
      path:   "api/fields",
      body:   {
        name: "test batch field 2",
        type: "text"
      }
    },
    {
      method: "GET",
      path:   "/api/forms/popup",
      body:   {
        filter: {
          name: "test popup"
        }
      }
    }
  ]
}

mailerlite.batches.send(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
