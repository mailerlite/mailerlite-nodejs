import { Config }  from './modules/types'

import Subscriber from './modules/subscribers/subscribers.module.js';
import { SubscriberInterface } from "./modules/subscribers/subscribers.types";

import Campaign from './modules/campaigns/campaigns.module.js';
import { CampaignsInterface } from "./modules/campaigns/campaigns.types";

export default class MailerLite {

    private config: Config;
    public subscribers: SubscriberInterface;
    public campaigns: CampaignsInterface;

    constructor(params: { api_key: string; }) {
        this.config = {
            api_key: params.api_key,
            basePath: "https://connect.mailerlite.com"
        };

        this.subscribers = new Subscriber(this.config);
        this.campaigns = new Campaign(this.config);
    }
};
