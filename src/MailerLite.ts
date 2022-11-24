import Subscriber from './modules/subscribers/subscribers.module.js';
import { Config }  from './modules/types'
import { SubscriberInterface } from "./modules/subscribers/subscribers.types";

export default class MailerLite {

    private config: Config;
    public subscribers: SubscriberInterface;

    constructor(params: { api_key: string; }) {
        this.config = {
            api_key: params.api_key,
            basePath: "https://connect.mailerlite.com"
        };

        this.subscribers = new Subscriber(this.config);
    }
};
