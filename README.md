<div align="center">
  <h1>
    <br/>
    <a href="https://www.mailerlite.com"><img src="https://www.mailerlite.com/assets/SEO/mailerlite.png" alt="MailerLite logo" width="200px"/></a>
    <br />
  </h1>
  <sup>
    <br />
    MailerLite Node.js SDK
    <br />
    <br />

[![MIT licensed](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE.md)
![NPM Version](https://img.shields.io/npm/v/@mailerlite/mailerlite-nodejs)

  </sup>
  <br />
</div>


# Installation

```bash
npm install @mailerlite/mailerlite-nodejs
```

# Usage

```javascript
// For ECMAScript (ESM)
import MailerLite from '@mailerlite/mailerlite-nodejs';

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});
```

```javascript
// For CommonJS (CJS)
const MailerLite = require('@mailerlite/mailerlite-nodejs').default;

const mailerlite = new MailerLite({
  api_key: "API_KEY"
});
```

- [Subscribers](src/modules/subscribers/README.md)
    * [List all subscribers](src/modules/subscribers/README.md#list-all-subscribers)
    * [Create/update subscriber](src/modules/subscribers/README.md#createupdate-subscriber)
    * [Update a subscriber](src/modules/subscribers/README.md#update-a-subscriber)
    * [Fetch a subscriber](src/modules/subscribers/README.md#fetch-a-subscriber)
    * [Fetch total subscribers count](src/modules/subscribers/README.md#fetch-total-subscribers-count)
    * [Delete a subscriber](src/modules/subscribers/README.md#delete-a-subscriber)
    * [Forget a subscriber](src/modules/subscribers/README.md#forget-a-subscriber)
- [Groups](src/modules/groups/README.md)
    * [List all groups](src/modules/groups/README.md#list-all-groups)
    * [Create a group](src/modules/groups/README.md#create-a-group)
    * [Update a group](src/modules/groups/README.md#update-a-group)
    * [Delete group](src/modules/groups/README.md#delete-group)
    * [Get subscribers belonging to a group](src/modules/groups/README.md#get-subscribers-belonging-to-a-group)
    * [Assign subscriber to a group](src/modules/groups/README.md#assign-subscriber-to-a-group)
    * [Unassign subscriber from a group](src/modules/groups/README.md#unassign-subscriber-from-a-group)
- [Segments](src/modules/segments/README.md)
    * [List all segments](src/modules/segments/README.md#list-all-segments)
    * [Get subscribers belonging to a segment](src/modules/segments/README.md#get-subscribers-belonging-to-a-segment)
    * [Update segment](src/modules/segments/README.md#update-segment)
    * [Delete segment](src/modules/segments/README.md#delete-segment)
- [Fields](src/modules/fields/README.md)
    * [List all fields](src/modules/fields/README.md#list-all-fields)
    * [Create a field](src/modules/fields/README.md#create-a-field)
    * [Update a field](src/modules/fields/README.md#update-a-field)
    * [Delete a field](src/modules/fields/README.md#delete-a-field)
- [Automations](src/modules/automations/README.md)
    * [List all automations](src/modules/automations/README.md#list-all-automations)
    * [Get an automation](src/modules/automations/README.md#get-an-automation)
    * [Get the subscriber activity for an automation](src/modules/automations/README.md#get-the-subscriber-activity-for-an-automation)
- [Campaigns](src/modules/campaigns/README.md)
    * [Campaign list](src/modules/campaigns/README.md#campaign-list)
    * [Get a campaign](src/modules/campaigns/README.md#get-a-campaign)
    * [Create a campaign](src/modules/campaigns/README.md#create-a-campaign)
    * [Update campaign](src/modules/campaigns/README.md#update-campaign)
    * [Schedule a campaign](src/modules/campaigns/README.md#schedule-a-campaign)
    * [Cancel a ready campaign](src/modules/campaigns/README.md#cancel-a-ready-campaign)
    * [Delete a campaign](src/modules/campaigns/README.md#delete-a-campaign)
- [Forms](src/modules/forms/README.md)
    * [List all forms](src/modules/forms/README.md#list-all-forms)
    * [Update a form](src/modules/forms/README.md#update-a-form)
    * [Delete a form](src/modules/forms/README.md#delete-a-form)
- [Batching](src/modules/batches/README.md)
    * [Send batch request](src/modules/batches/README.md#send-batch-request)
- [Webhooks](src/modules/webhooks/README.md)
    * [List all webhooks](src/modules/webhooks/README.md#list-all-webhooks)
    * [Get a webhook](src/modules/webhooks/README.md#get-a-webhook)
    * [Create a webhook](src/modules/webhooks/README.md#create-a-webhook)
    * [Update a webhook](src/modules/webhooks/README.md#update-a-webhook)
    * [Delete a webhook](src/modules/webhooks/README.md#delete-a-webhook)
- [Timezones](src/modules/timezones/README.md)
    * [List all timezones](src/modules/timezones/README.md#list-all-timezones)
- [Campaign languages](src/modules/languages/README.md)
    * [List all languages](src/modules/languages/README.md#list-all-languages)
- [Stats](src/modules/stats/README.md)
    * [Get a list of sent campaigns](src/modules/stats/README.md#get-a-list-of-sent-campaigns)
    * [Get stats for a sent campaign](src/modules/stats/README.md#get-stats-for-a-sent-campaign)
    * [Get a subscribers of sent campaign](src/modules/stats/README.md#get-a-subscribers-of-sent-campaign)
    * [Get a list of forms by type](src/modules/stats/README.md#get-a-list-of-forms-by-type)
    * [Get forms count by type](src/modules/stats/README.md#get-forms-count-by-type)
    * [Get subscribers of a form](src/modules/stats/README.md#get-subscribers-of-a-form)
    * [List all automations](src/modules/stats/README.md#list-all-automations)
    * [Get stats for a specific automation](src/modules/stats/README.md#get-stats-for-a-specific-automation)
    * [Get the subscriber activity for an automation](src/modules/stats/README.md#get-the-subscriber-activity-for-an-automation)
