import { Config }  from './modules/types'

export default class MailerLite {

    private config: Config;

    constructor(params: { api_key: string; }) {
        this.config = {
            api_key: params.api_key,
            basePath: "https://connect.mailerlite.com"
        };
    }
};
