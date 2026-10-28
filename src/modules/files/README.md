# Files

### List all files
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints -->

Lists the account's media library. A file's `url` can be used directly as an image block's `src` or a
button/link `href`.

---
```javascript
const params = {
  filter: {
    name: "logo", // case-insensitive substring match; a comma splits the value into OR terms
    type: "image" // possible types: image, pdf, epub
  },
  sort: "-created_at", // possible values: created_at, name, size (prefix with "-" for descending)
  limit: 25,
  page: 1
};

mailerlite.files.get(params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
