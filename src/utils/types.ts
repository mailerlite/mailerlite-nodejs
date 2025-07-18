import {GroupObject} from "../modules/groups/groups.types";

export interface Config {
    basePath: string;
    api_key: string;
}

export interface Stats {
    sent:               number;
    opens_count:        number;
    unique_opens_count: number;
    open_rate: {
        float:          number;
        string:         string;
    };
    clicks_count:       number;
    unique_clicks_count:number;
    click_rate: {
        float:          number;
        string:         string;
    };
    unsubscribes_count: number;
    unsubscribe_rate: {
        float:          number;
        string:         string;
    };
    spam_count:         number;
    spam_rate: {
        float:          number;
        string:         string;
    };
    hard_bounces_count: number;
    hard_bounce_rate: {
        float:          number;
        string:         string;
    };
    soft_bounces_count: number;
    soft_bounce_rate: {
        float:          number;
        string:         string;
    };
}

export interface Links {
    first:  string;
    last:   string;
    prev:   string;
    next:   string;
}

export interface Meta {
    current_page:   number;
    from:           number;
    last_page:      number;
    links:          Array<MetaLinks>;
    path:           string;
    per_page:       number;
    to:             number;
    total:          number;
}

export interface MetaLinks {
    url:    string;
    label:  string;
    active: boolean;
}

export interface SubscriberObject {
    id:               string;
    email:            string;
    status:           'active' | 'unsubscribed' | 'unconfirmed' | 'bounced' | 'junk' | (string & {});
    source:           'import' | 'api' | (string & {});
    sent:             number;
    opens_count:      number;
    clicks_count:     number;
    open_rate:        number;
    click_rate:       number;
    ip_address:       null | string;
    subscribed_at:    string;        // "YYYY-MM-DD HH:mm:ss"
    unsubscribed_at:  null | string; // "YYYY-MM-DD HH:mm:ss"
    created_at:       string;        // "YYYY-MM-DD HH:mm:ss"
    updated_at:       string;        // "YYYY-MM-DD HH:mm:ss"
    fields: {
        name:         null | string;
        last_name:    null | string;
        city:         null | string;
        company:      null | string;
        country:      null | string;
        phone:        null | string;
        state:        null | string;
        z_i_p:        null | string;
    };
    groups?:          Array<GroupObject>; // In some endpoints groups are excluded by default. They get added when `include` param is used in request
    opted_in_at:      null | string;
    optin_ip:         null | string;
}

