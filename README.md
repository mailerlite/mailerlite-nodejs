<div align="center">
  <h1>
    <br/>
    <a href="https://www.mailerlite.com"><img src="/src/assets/mailerlite_logo.png" alt="MailerLite logo" width="200px"/></a>
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

### Edge & serverless runtimes

The SDK works in edge/serverless runtimes that don't ship Node's `http`
module — such as Vercel Edge Functions, Cloudflare Workers, Next.js edge
routes and Deno. Requests automatically fall back to the `fetch` adapter
in those environments, while Node and browsers keep using their existing
adapters unchanged.

### Query parameters

Boolean query parameters are sent as `1` and `0`, and `Date` values as `YYYY-MM-DD` in the caller's local time.

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
    * [Fetch subscriber activity](src/modules/subscribers/README.md#fetch-subscriber-activity)
    * [Get single import](src/modules/subscribers/README.md#get-single-import)
- [Groups](src/modules/groups/README.md)
    * [List all groups](src/modules/groups/README.md#list-all-groups)
    * [Create a group](src/modules/groups/README.md#create-a-group)
    * [Update a group](src/modules/groups/README.md#update-a-group)
    * [Delete group](src/modules/groups/README.md#delete-group)
    * [Get subscribers belonging to a group](src/modules/groups/README.md#get-subscribers-belonging-to-a-group)
    * [Assign subscriber to a group](src/modules/groups/README.md#assign-subscriber-to-a-group)
    * [Unassign subscriber from a group](src/modules/groups/README.md#unassign-subscriber-from-a-group)
    * [Import bulk subscribers to group](src/modules/groups/README.md#import-bulk-subscribers-to-group)
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
    * [Create draft automation](src/modules/automations/README.md#create-draft-automation)
    * [Update an automation](src/modules/automations/README.md#update-an-automation)
    * [Delete automation](src/modules/automations/README.md#delete-automation)
    * [Copy an automation](src/modules/automations/README.md#copy-an-automation)
    * [Enable an automation](src/modules/automations/README.md#enable-an-automation)
    * [Disable an automation](src/modules/automations/README.md#disable-an-automation)
    * [Send an automation test email](src/modules/automations/README.md#send-an-automation-test-email)
    * [Add subscribers to an automation](src/modules/automations/README.md#add-subscribers-to-an-automation)
    * [Re-add subscribers to an automation](src/modules/automations/README.md#re-add-subscribers-to-an-automation)
    * [Copy automation subscribers to groups](src/modules/automations/README.md#copy-automation-subscribers-to-groups)
    * [Cancel automation runs](src/modules/automations/README.md#cancel-automation-runs)
    * [Skip an automation delay](src/modules/automations/README.md#skip-an-automation-delay)
- [Automation triggers](src/modules/automation-triggers/README.md)
    * [List automation triggers](src/modules/automation-triggers/README.md#list-automation-triggers)
    * [Get an automation trigger](src/modules/automation-triggers/README.md#get-an-automation-trigger)
    * [Create an automation trigger](src/modules/automation-triggers/README.md#create-an-automation-trigger)
    * [Update an automation trigger](src/modules/automation-triggers/README.md#update-an-automation-trigger)
    * [Delete an automation trigger](src/modules/automation-triggers/README.md#delete-an-automation-trigger)
- [Automation steps](src/modules/automation-steps/README.md)
    * [List automation steps](src/modules/automation-steps/README.md#list-automation-steps)
    * [Get an automation step](src/modules/automation-steps/README.md#get-an-automation-step)
    * [Create an automation step](src/modules/automation-steps/README.md#create-an-automation-step)
    * [Update an automation step](src/modules/automation-steps/README.md#update-an-automation-step)
    * [Delete an automation step](src/modules/automation-steps/README.md#delete-an-automation-step)
    * [Duplicate an automation step](src/modules/automation-steps/README.md#duplicate-an-automation-step)
    * [Move an automation step](src/modules/automation-steps/README.md#move-an-automation-step)
    * [Select the winner of an A/B test step](src/modules/automation-steps/README.md#select-the-winner-of-an-ab-test-step)
- [Automation emails](src/modules/automation-emails/README.md)
    * [Get automation email content](src/modules/automation-emails/README.md#get-automation-email-content)
    * [Set automation email content](src/modules/automation-emails/README.md#set-automation-email-content)
    * [Get automation email stats](src/modules/automation-emails/README.md#get-automation-email-stats)
    * [Get automation email e-commerce stats](src/modules/automation-emails/README.md#get-automation-email-e-commerce-stats)
    * [List automation email unsubscribe reasons](src/modules/automation-emails/README.md#list-automation-email-unsubscribe-reasons)
- [Automation templates](src/modules/automation-templates/README.md)
    * [List automation templates](src/modules/automation-templates/README.md#list-automation-templates)
    * [Create an automation from a template](src/modules/automation-templates/README.md#create-an-automation-from-a-template)
- [Automation reports](src/modules/automation-reports/README.md)
    * [Get automation step run counts](src/modules/automation-reports/README.md#get-automation-step-run-counts)
    * [Get run counts for an automation step](src/modules/automation-reports/README.md#get-run-counts-for-an-automation-step)
    * [Get automation trigger run counts](src/modules/automation-reports/README.md#get-automation-trigger-run-counts)
    * [Get run counts for an automation trigger](src/modules/automation-reports/README.md#get-run-counts-for-an-automation-trigger)
    * [List automation A/B test stats](src/modules/automation-reports/README.md#list-automation-ab-test-stats)
    * [Get automation A/B test stats](src/modules/automation-reports/README.md#get-automation-ab-test-stats)
    * [List subscribers on an automation step](src/modules/automation-reports/README.md#list-subscribers-on-an-automation-step)
    * [List subscribers on an automation trigger](src/modules/automation-reports/README.md#list-subscribers-on-an-automation-trigger)
    * [List automation orders](src/modules/automation-reports/README.md#list-automation-orders)
    * [Get automation email totals](src/modules/automation-reports/README.md#get-automation-email-totals)
    * [Get automation e-commerce totals](src/modules/automation-reports/README.md#get-automation-e-commerce-totals)
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
- [Brand styles](src/modules/brand-styles/README.md)
    * [Get brand styles](src/modules/brand-styles/README.md#get-brand-styles)
- [Files](src/modules/files/README.md)
    * [List all files](src/modules/files/README.md#list-all-files)
