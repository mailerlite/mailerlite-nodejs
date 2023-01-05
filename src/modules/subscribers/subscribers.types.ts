import { AxiosResponse } from "axios";

export interface SubscriberInterface {
    get:            (params: GetParams) => Promise<AxiosResponse<ListSubscribersResponse>>;
    createOrUpdate: (params: CreateOrUpdateParams) => Promise<AxiosResponse<SingleSubscriberResponse, CreateOrUpdateParams>>;
    find:           (subscriber_id: string) => Promise<AxiosResponse<SingleSubscriberResponse>>;
    getCount:       () => Promise<AxiosResponse<SubscribersCountResponse>>;
    delete:         (subscriber_id: string) => Promise<AxiosResponse<null>>;
}

export interface GetParams {
    filter?: {
        status: "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk"; // because it should be looking like ?filter[status]=xxx
    };
    /**
     * @default 25
     */
    limit?: number;
    /**
     * @default 1
     */
    page?: number;
}

export interface CreateOrUpdateParams {
    email:              string;
    fields?:	        object;
    groups?:	        Array<string>;
    status?:	        "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
    subscribed_at?:	    string;
    ip_address?:	    string;
    opted_in_at?:	    string;
    optin_ip?:	        string;
    unsubscribed_at?:	string;
}

interface Meta {
    current_page:   number;
    from:           number;
    last_page:      number;
    links:          Array<object>;
    path:           string;
    per_page:       number;
    to:             number;
    total:          number;
}

export interface SubscriberObject {
    id:             string;
    email:          string;
    status:         string;
    source:         string;
    sent:           number;
    opens_count:    number;
    clicks_count:   number;
    open_rate:      number;
    click_rate:     number;
    ip_address:     string;
    subscribed_at:  string;
    unsubscribed_at:string;
    created_at:     string;
    updated_at:     string;
    fields: {
        city:       string;
        company:    string;
        country:    string;
        last_name:  string;
        name:       string;
        phone:      string;
        state:      string;
        z_i_p:      string;
    }
    groups:         Array<string>;
    opted_in_at:    string;
    optin_ip:       string;
}

export interface ListSubscribersResponse {
    data: Array<SubscriberObject>;
    links: {
        first:  string;
        last:   string;
        prev:   string;
        next:   string;
    };
    meta: Meta;
}

export interface SingleSubscriberResponse {
    data: SubscriberObject;
}

export interface SubscribersCountResponse {
    total: number;
}
