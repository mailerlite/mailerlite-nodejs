# Brand styles

### Get brand styles
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints (CMAC-860) -->

Returns the account's own palette (`brand`, `null` until it differs from the defaults), the `default` palette and
the built-in `presets`. Match on `identifier`, not `name`: a preset's `identifier` is what an email's
`brand.style` setting accepts.

---
```javascript
mailerlite.brandStyles.get()
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
