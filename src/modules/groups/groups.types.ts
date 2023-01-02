import { AxiosResponse } from "axios";

export interface GroupsInterface {
    get:                (params: GetParams)                             => Promise<AxiosResponse<ListAllGroupsResponse>>;
    create:             (params: CreateUpdateParams)                    => Promise<AxiosResponse<SingleGroupResponse, CreateUpdateParams>>;
    update:             (group_id: string, params: CreateUpdateParams)  => Promise<AxiosResponse<SingleGroupResponse, CreateUpdateParams>>;
    delete:             (group_id: string)                              => Promise<AxiosResponse<null>>;
    getSubscribers:     (group_id: string, params: SubscriberParams)    => Promise<AxiosResponse<ListAllSubscribersResponse>>;
    assignSubscriber:   (subscriber_id: string, group_id: string)       => Promise<AxiosResponse<SingleGroupResponse>>;
    unAssignSubscriber: (subscriber_id: string, group_id: string)       => Promise<AxiosResponse<null>>;
}

export interface GetParams {
    limit?: number;
    page?:  number;
    filter?: {
        name?: "sent" | "draft" | "ready";
    };
    sort: "name" | "total" | "open_rate" | "click_rate" | "created_at" | "-name" | "-total" | "-open_rate" | "-click_rate" | "-created_at";
}

export interface ListAllGroupsResponse {
    data: Array<GroupObject>;
    meta: Meta;
}

export interface ListAllSubscribersResponse {
    data:   Array<SubscriberObject>;
    links:  Array<object>;
    meta:   Meta;
}

export interface SingleGroupResponse {
    data: GroupObject;
}

export interface CreateUpdateParams {
    name: string;
}

export interface SubscriberParams {
    filter?: {
        /**
         * @default "active"
         */
        status: "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
    };
    limit:  number;
    page:   number;
}

interface GroupObject {
    id:                 string;
    name:               string;
    active_count:       number;
    sent_count:         number;
    opens_count:        number;
    open_rate: {
        float:          number;
        string:         string;
    };
    clicks_count:       number;
    click_rate: {
        float:          number;
        string:         string;
    };
    unsubscribed_count: number;
    unconfirmed_count:  number;
    bounced_count:      number;
    junk_count:         number;
    created_at:         string;
}

interface SubscriberObject {
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
