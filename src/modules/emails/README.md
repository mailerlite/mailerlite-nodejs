# Emails
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints (CMAC-860) -->

Read and edit the content and settings of emails built with the simple editor.

### Before you start

- **Simple editor only.** Any other email returns `422` (`"This email was not built with the simple editor."`).
- **Email IDs** come from the email's owner: a campaign's `emails[].id`, or an automation step's `email_id`.
  ```javascript
  const campaign = await mailerlite.campaigns.find("CAMPAIGN_ID");
  const emailId = campaign.data.data.emails[0].id;
  ```
- **Writes need a draft campaign email.** `createBlock`, `updateBlock`, `deleteBlock`, `moveBlock`, `updateSettings`,
  `validateSettings`, `createVersion` and `restoreVersion` return `422` for an automation email and `409` once the
  campaign has left draft. `saveAsTemplate` needs a campaign email, but not a draft. The reads (`find`, `getHtml`,
  `findBlock`, `getVersions`) also work for automation emails.

#### The etag cycle

One `etag` covers the whole email. It is in the JSON body (`response.data.etag`), not an HTTP header.

1. Read the email (`find`, `getHtml` or `findBlock`) and take `etag`.
2. Send it in the body of the write (`createBlock`, `updateBlock`, `deleteBlock`, `moveBlock`, `updateSettings`, `restoreVersion`).
3. Use the `etag` that write returns for the next write. Reusing an old one gets a `409`.

Run writes to one email one after another: parallel writes with the same `etag` give one success and the rest conflict.
`validateBlock`, `validateSettings`, `saveAsTemplate`, `getVersions` and `createVersion` neither take nor return an `etag`.

```javascript
const email = await mailerlite.emails.find("EMAIL_ID");
let etag = email.data.etag;

const created = await mailerlite.emails.createBlock("EMAIL_ID", {
  etag,
  type: "paragraph",
  editor_content: { content: [{ type: "text", text: "Hello" }] }
});
etag = created.data.etag; // the next write must use this one

await mailerlite.emails.moveBlock("EMAIL_ID", created.data.data.id, { etag, placement: { position: "start" } });
```

#### Conflicts (409)

A `409` has four different bodies. Only a stale or malformed `etag` has `code: "version_conflict"`, so check `code`,
not just the status. The others (another request is changing the email, the campaign is not a draft, the same
idempotency key is still in progress) have only `message`.

```typescript
import type { EmailVersionConflictError } from "@mailerlite/mailerlite-nodejs";

try {
  await mailerlite.emails.updateBlock("EMAIL_ID", "BLOCK_ID", { etag, editor_content });
} catch (error: any) {
  const body = error.response?.data;

  if (error.response?.status === 409 && body?.code === "version_conflict") {
    const conflict: EmailVersionConflictError = body;
    // The email changed since you read it (conflict.etag is the current etag).
    // Read it again, re-apply your change, then retry.
  } else if (error.response?.status === 409) {
    console.log(body.message); // write collision, campaign not a draft, or idempotency key in progress
  }
}
```

#### Idempotency keys

The writes (`createBlock`, `updateBlock`, `deleteBlock`, `moveBlock`, `updateSettings`, `saveAsTemplate`,
`createVersion`, `restoreVersion`) take an optional last argument, `{ idempotencyKey }`, sent as the
`Idempotency-Key` header (1–255 printable ASCII characters). Repeating the same request with the same key within 24
hours returns the original response, including its `etag`, which may be stale by then. Only successes are stored, so
a retry after an error runs again. The same key with a different body is a `422`; a key whose first request is still
running is a `409`.

```javascript
mailerlite.emails.createBlock("EMAIL_ID", params, { idempotencyKey: "welcome-intro-paragraph" });
```

#### Batching

These endpoints work inside `mailerlite.batches.send()` with `etag` in each request's `body`, but `/batch` does not
accept `PATCH` (so no `updateBlock` or `updateSettings`) and does not forward idempotency keys. Sub-requests are
form-encoded, so an empty `editor_content: {}` arrives as `[]`, and `BatchResponseObject.body` has no `etag` type, so
cast it to read the new etag.

### Get an email
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints (CMAC-860) -->

Returns the email's settings, its top-level blocks in order, and the `etag` for the next write.

---
```javascript
mailerlite.emails.find("EMAIL_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get the HTML of an email
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints (CMAC-860) -->

A preview, not something to send yourself: personalisation stays as literal tags (`{$name}`) and links carry
tracking markers. A `503` is temporary, so retry.

---
```javascript
mailerlite.emails.getHtml("EMAIL_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Get a block
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints (CMAC-860) -->

Returns the block with its `placement` (the IDs of the siblings `after`/`before` it) and the email's current `etag`.

---
```javascript
mailerlite.emails.findBlock("EMAIL_ID", "BLOCK_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Create a block
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints (CMAC-860) -->

Any type except `title` can be inserted. Inserts always go at the top level, so `placement.block_id` must be a
top-level block; without `placement` the block goes at the end. `editor_content` is the editor's own JSON (camelCase
keys) and may be `{}`, e.g. for a `divider`. A button's label is the text nodes in `content`, not an `attrs.label`.
Link tracking IDs are assigned by the server. A value not allowed in email content, such as a `javascript:` URL, is a
`422` naming the key, and nothing is written.

---
```javascript
const params = {
  etag: "ETAG",
  type: "button",
  editor_content: {
    attrs: { url: "https://example.com/shop" },
    content: [{ type: "text", text: "Shop now" }] // the button label
  },
  placement: {
    position: "after", // possible positions: start, end, before, after
    block_id: "BLOCK_ID" // only for before and after
  }
};

mailerlite.emails.createBlock("EMAIL_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update a block
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints (CMAC-860) -->

Replaces `editor_content` whole, with no merge: read the block with `findBlock`, change it, send it back. Links you
send back keep their tracking IDs and click history. A block's type cannot change (delete it and create a new one),
position changes go through `moveBlock`, and `title` blocks cannot be updated (`422`). A value not allowed in email
content is a `422` naming the key, and nothing is written.

---
```javascript
const params = {
  etag: "ETAG",
  editor_content: {
    attrs: { textAlign: "center" },
    content: [{ type: "text", text: "Updated text" }]
  }
};

mailerlite.emails.updateBlock("EMAIL_ID", "BLOCK_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Delete a block
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints (CMAC-860) -->

Also deletes the blocks nested inside it. The response contains only the new `etag`. A block that is already gone
returns `404`.

---
```javascript
mailerlite.emails.deleteBlock("EMAIL_ID", "BLOCK_ID", { etag: "ETAG" })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Move a block
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints (CMAC-860) -->

Moves a block among its siblings; it never changes nesting, so `placement.block_id` must be a sibling (`422`
otherwise). Moving a block to where it already is succeeds without changes.

---
```javascript
const params = {
  etag: "ETAG",
  placement: {
    position: "before", // possible positions: start, end, before, after
    block_id: "SIBLING_BLOCK_ID" // only for before and after
  }
};

mailerlite.emails.moveBlock("EMAIL_ID", "BLOCK_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Validate a block
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints (CMAC-860) -->

Checks a block without writing it; no email ID or `etag` needed. Invalid content returns `200` with `valid: false`,
so check `valid`. `errors` matches what `createBlock` would return in a `422`. A malformed request (missing `type`, or
`editor_content` that is not an object) is still a `422`.

---
```javascript
const params = {
  type: "button",
  editor_content: {
    attrs: { url: "https://example.com/shop" },
    content: [{ type: "text", text: "Shop now" }]
  }
};

mailerlite.emails.validateBlock(params)
  .then(response => {
    console.log(response.data); // { valid, errors, schema }
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Update email settings
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints (CMAC-860) -->

- Send only the keys you are changing. Sending an inherited value back pins it to this email.
- Style values are strings: `"16"`, not `16` or `"16px"`; a number is a `422`. Colours are hex or `"transparent"`.
- `brand.mode`: `account` follows the account palette, `template` the template's, `custom` the email's own colours.
  Setting any brand colour switches the mode to `custom`, even if the value is unchanged.
- `brand.style` applies a preset: use a preset's `identifier` from `mailerlite.brandStyles.get()`. It cannot be
  combined with `mode: "account"` or `mode: "template"`.
- `footer.social_links` replaces the whole list. Send every link you keep with its `link_id`, or its click history
  is lost.
- An unsafe value is dropped rather than refused; the response then lists it in `rejected.keys`. A key that cannot be
  changed is a `422`.
- `show_preferences: true` and `preferences_text` need the preference centre on the plan, otherwise `422`. A change
  that makes the unsubscribe link illegible (contrast) is also a `422`.

---
```javascript
const params = {
  etag: "ETAG",
  brand: {
    style: "preset-retro" // a preset identifier from mailerlite.brandStyles.get()
  },
  button: {
    border_radius: "8"
  }
};

mailerlite.emails.updateSettings("EMAIL_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Validate email settings
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints (CMAC-860) -->

Checks a settings change without writing it; same body as `updateSettings`, without `etag`. Invalid values return
`200` with `valid: false`, so check `valid`. An email that `updateSettings` would refuse still gets a `4xx`.

---
```javascript
const params = {
  brand: {
    background_color: "#f5f5f5"
  }
};

mailerlite.emails.validateSettings("EMAIL_ID", params)
  .then(response => {
    console.log(response.data); // { valid, errors, schema, rejected? }
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Save an email as a template
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints (CMAC-860) -->

No `etag` needed. Works for any campaign email, not only drafts.

---
```javascript
const params = {
  name: "Newsletter template" // max 255 characters
};

mailerlite.emails.saveAsTemplate("EMAIL_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### List email versions
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints (CMAC-860) -->

`links.next` drops `limit`, so build the next request from `page` and `limit` instead of following it.

---
```javascript
const params = {
  limit: 25, // max 100
  page: 1
};

mailerlite.emails.getVersions("EMAIL_ID", params)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Save a version
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints (CMAC-860) -->

Edits made through the API do not create versions; call this to save one. Returns `201` with the new version, or
`200` with the latest one when nothing changed. No `etag` needed.

---
```javascript
mailerlite.emails.createVersion("EMAIL_ID")
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```

### Restore a version
<!-- TODO: add link once developers.mailerlite.com publishes these endpoints (CMAC-860) -->

Saves the current state as a version first, so a restore can be undone. Returns the whole email and the new `etag`;
blocks come back under their original IDs.

---
```javascript
mailerlite.emails.restoreVersion("EMAIL_ID", "VERSION_ID", { etag: "ETAG" })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (error.response) console.log(error.response.data);
  });
```
