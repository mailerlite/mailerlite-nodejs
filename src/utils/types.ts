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

interface MetaLinks {
    url:    string;
    label:  string;
    active: boolean;
}

export interface SubscriberObject {
    id:               string;
    email:            string;
    status:           string;
    source:           string;
    sent:             number;
    opens_count:      number;
    clicks_count:     number;
    open_rate:        number;
    click_rate:       number;
    ip_address:       string;
    subscribed_at:    string;
    unsubscribed_at:  string;
    created_at:       string;
    updated_at:       string;
    fields: {
        city:         string;
        company:      string;
        country:      string;
        last_name:    string;
        name:         string;
        phone:        string;
        state:        string;
        z_i_p:        string;
    };
    groups:           Array<string>;
    opted_in_at:      string;
    optin_ip:         string;
}

