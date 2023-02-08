import { Config }  from './modules/types.js'

import Subscriber from './modules/subscribers/subscribers.module.js';
import { SubscriberInterface } from "./modules/subscribers/subscribers.types.js";

import Campaign from './modules/campaigns/campaigns.module.js';
import { CampaignsInterface } from "./modules/campaigns/campaigns.types.js";

import Form from './modules/forms/forms.module.js';
import { FormsInterface } from "./modules/forms/forms.types.js";

import Group from './modules/groups/groups.module.js';
import { GroupsInterface } from "./modules/groups/groups.types.js";

import Segment from './modules/segments/segments.module.js';
import { SegmentsInterface } from "./modules/segments/segments.types.js";

import Field from './modules/fields/fields.module.js';
import { FieldsInterface } from "./modules/fields/fields.types.js";

import Automation from './modules/automations/automations.module.js';
import { AutomationsInterface } from "./modules/automations/automations.types.js";

import Timezone from './modules/timezones/timezones.module.js';
import { TimezonesInterface } from "./modules/timezones/timezones.types.js";

import Language from './modules/languages/languages.module.js';
import { LanguagesInterface } from "./modules/languages/languages.types.js";

import Batch from './modules/batches/batches.module.js';
import { BatchesInterface } from "./modules/batches/batches.types.js";

import Webhook from './modules/webhooks/webhooks.module.js';
import { WebhooksInterface } from "./modules/webhooks/webhooks.types.js";

import Statistics from './modules/stats/stats.module.js';
import { StatsInterface } from "./modules/stats/stats.types.js";

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
    public stats: StatsInterface;

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
        this.stats = new Statistics(this.config);
    }
};
