import { Config }  from './modules/types'

import Subscriber from './modules/subscribers/subscribers.module.js';
import { SubscriberInterface } from "./modules/subscribers/subscribers.types";

import Campaign from './modules/campaigns/campaigns.module.js';
import { CampaignsInterface } from "./modules/campaigns/campaigns.types";

import Form from './modules/forms/forms.module.js';
import { FormsInterface } from "./modules/forms/forms.types";

import Segment from './modules/segments/segments.module.js';
import { SegmentsInterface } from "./modules/segments/segments.types";

export default class MailerLite {

    private config: Config;
    public subscribers: SubscriberInterface;
    public campaigns: CampaignsInterface;
    public forms: FormsInterface;
    public segments: SegmentsInterface;

    constructor(params: { api_key: string; }) {
        this.config = {
            api_key: params.api_key,
            basePath: "https://connect.mailerlite.com"
        };

        this.subscribers = new Subscriber(this.config);
        this.campaigns = new Campaign(this.config);
        this.forms = new Form(this.config);
        this.segments = new Segment(this.config);
    }
};
