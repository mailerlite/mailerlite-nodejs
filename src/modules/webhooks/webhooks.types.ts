import { AxiosResponse } from "axios";
import {Links, Meta} from "../../utils/types.js";

export interface WebhooksInterface {
    get:            ()                              => Promise<AxiosResponse<ListAllWebhooksResponse>>;
    find:           (webhook_id: string)            => Promise<AxiosResponse<SingleWebhookResponse>>;
    create:         (params: CreateWebhookParams)   => Promise<AxiosResponse<SingleWebhookResponse, CreateWebhookParams>>;
    update:         (webhook_id: string,
                     params: UpdateWebhookParams)   => Promise<AxiosResponse<SingleWebhookResponse, UpdateWebhookParams>>;
    delete:         (webhook_id: string)            => Promise<AxiosResponse<null>>;
}

export interface ListAllWebhooksResponse {
    data:   Array<WebhookObject>;
    links:  Links;
    meta:   Meta;
}

export interface SingleWebhookResponse {
    data: WebhookObject;
}

export interface CreateWebhookParams {
    name?:  string;
    events: Array<string>;
    url:    string;
}

export interface UpdateWebhookParams {
    name?:      string;
    events?:    Array<string>;
    url?:       string;
    enabled?:   boolean;
}

export interface WebhookObject {
    id:         string;
    name:       string;
    url:        string;
    events:     Array<string>;
    enabled:    true;
    secret:     string;
    created_at: string;
    updated_at: string;
}
