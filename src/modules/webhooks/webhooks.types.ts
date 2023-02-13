import { AxiosResponse } from "axios";
import {Links, Meta} from "../../utils/types.js";

export interface WebhooksInterface {
    get:            ()                              => Promise<AxiosResponse<ListAllResponse>>;
    find:           (webhook_id: string)            => Promise<AxiosResponse<SingleWebhookResponse>>;
    create:         (params: CreateParams)          => Promise<AxiosResponse<SingleWebhookResponse, CreateParams>>;
    update:         (webhook_id: string,
                     params: UpdateParams)          => Promise<AxiosResponse<SingleWebhookResponse, UpdateParams>>;
    delete:         (webhook_id: string)            => Promise<AxiosResponse<null>>;
}

export interface ListAllResponse {
    data:   Array<WebhookObject>;
    links:  Links;
    meta:   Meta;
}

export interface SingleWebhookResponse {
    data: WebhookObject;
}

export interface CreateParams {
    name?:  string;
    events: Array<string>;
    url:    string;
}

export interface UpdateParams {
    name?:      string;
    events?:    Array<string>;
    url?:       string;
    enabled?:   boolean;
}

interface WebhookObject {
    id:         string;
    name:       string;
    url:        string;
    events:     Array<string>;
    enabled:    true;
    secret:     string;
    created_at: string;
    updated_at: string;
}
