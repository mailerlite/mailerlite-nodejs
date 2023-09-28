import { AxiosResponse } from "axios";
import {Links, Meta} from "../../utils/types.js";

export interface GroupsInterface {
    get:                (params: GetGroupsParams)                           => Promise<AxiosResponse<ListAllGroupsResponse>>;
    create:             (params: CreateUpdateGroupParams)                   => Promise<AxiosResponse<SingleGroupResponse, CreateUpdateGroupParams>>;
    update:             (group_id: string, params: CreateUpdateGroupParams) => Promise<AxiosResponse<SingleGroupResponse, CreateUpdateGroupParams>>;
    delete:             (group_id: string)                                  => Promise<AxiosResponse<null>>;
    getSubscribers:     (group_id: string, params: SubscriberParams)        => Promise<AxiosResponse<ListAllSubscribersResponse>>;
    assignSubscriber:   (subscriber_id: string, group_id: string)           => Promise<AxiosResponse<SingleGroupResponse>>;
    unAssignSubscriber: (subscriber_id: string, group_id: string)           => Promise<AxiosResponse<null>>;
}

export interface GetGroupsParams {
    limit?: number;
    page?:  number;
    filter?: {
        name?: "sent" | "draft" | "ready";
    };
    sort: "name" | "total" | "open_rate" | "click_rate" | "created_at" | "-name" | "-total" | "-open_rate" | "-click_rate" | "-created_at";
}

export interface ListAllGroupsResponse {
    data:   Array<GroupObject>;
    links:  Links;
    meta:   Meta;
}

export interface ListAllSubscribersResponse {
    data:   Array<SubscriberObject>;
    links:  Links;
    meta:   Meta;
}

export interface SingleGroupResponse {
    data: GroupObject;
}

export interface CreateUpdateGroupParams {
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
