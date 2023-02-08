# Segments


### List all segments
[Official Documentation](https://developers.mailerlite.com/docs/segments.html#list-all-segments)

---
```javascript
const params = {
  limit: 25,
  page: 1
};

mailerlite.segments.get(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get subscribers belonging to a segment
[Official Documentation](https://developers.mailerlite.com/docs/segments.html#get-subscribers-belonging-to-a-segment)

---
```javascript
const params = {
  filter: {
    status: "active",
  },
  limit: 5,
  after: "SUBSCRIBER_ID"
}

mailerlite.segments.getSubscribers("SEGMENT_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update segment
[Official Documentation](https://developers.mailerlite.com/docs/segments.html#update-segment)

---
```javascript
const params = {
  name: "Updated segment name"
};

mailerlite.segments.update("SEGMENT_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```


### Delete segment
[Official Documentation](https://developers.mailerlite.com/docs/segments.html#delete-segment)

---
```javascript
mailerlite.segments.delete("SEGMENT_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
