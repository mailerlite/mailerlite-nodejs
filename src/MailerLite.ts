import { Config }  from './modules/types'

import Subscriber from './modules/subscribers/subscribers.module.js';
import { SubscriberInterface } from "./modules/subscribers/subscribers.types";

import Campaign from './modules/campaigns/campaigns.module.js';
import { CampaignsInterface } from "./modules/campaigns/campaigns.types";

import Form from './modules/forms/forms.module.js';
import { FormsInterface } from "./modules/forms/forms.types";

import Group from './modules/groups/groups.module.js';
import { GroupsInterface } from "./modules/groups/groups.types";

import Segment from './modules/segments/segments.module.js';
import { SegmentsInterface } from "./modules/segments/segments.types";

import Field from './modules/fields/fields.module.js';
import { FieldsInterface } from "./modules/fields/fields.types";

import Automation from './modules/automations/automations.module.js';
import { AutomationsInterface } from "./modules/automations/automations.types";

import Timezone from './modules/timezones/timezones.module.js';
import { TimezonesInterface } from "./modules/timezones/timezones.types";

import Language from './modules/languages/languages.module.js';
import { LanguagesInterface } from "./modules/languages/languages.types";

import Batch from './modules/batches/batches.module.js';
import { BatchesInterface } from "./modules/batches/batches.types";

import Webhook from './modules/webhooks/webhooks.module.js';
import { WebhooksInterface } from "./modules/webhooks/webhooks.types";

export default class MailerLite {

    private config: Config;
    public subscribers: SubscriberInterface;
    public campaigns: CampaignsInterface;
    public forms: FormsInterface;
    public groups: GroupsInterface;
    public segments: SegmentsInterface;
    public fields: FieldsInterface;
    public automations: AutomationsInterface;
    public timezones: TimezonesInterface;
    public languages: LanguagesInterface;
    public batches: BatchesInterface;
    public webhooks: WebhooksInterface;

    constructor(params: { api_key: string; }) {
        this.config = {
            api_key: params.api_key,
            basePath: "https://connect.mailerlite.com"
        };

        this.subscribers = new Subscriber(this.config);
        this.campaigns = new Campaign(this.config);
        this.forms = new Form(this.config);
        this.groups = new Group(this.config);
        this.segments = new Segment(this.config);
        this.fields = new Field(this.config);
        this.automations = new Automation(this.config);
        this.timezones = new Timezone(this.config);
        this.languages = new Language(this.config);
        this.batches = new Batch(this.config);
        this.webhooks = new Webhook(this.config);
    }
};
