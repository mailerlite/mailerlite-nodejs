import { AxiosResponse } from "axios";

export interface WebhooksInterface {
    get:            ()                              => Promise<AxiosResponse<ListAllResponse>>;
    find:           (webhook_id: string)            => Promise<AxiosResponse<SingleWebhookResponse>>;
    create:         (params: CreateParams)          => Promise<AxiosResponse<SingleWebhookResponse, CreateParams>>;
    update:         (webhook_id: string,
                     params: UpdateParams)          => Promise<AxiosResponse<SingleWebhookResponse, UpdateParams>>;
    delete:         (webhook_id: string)            => Promise<AxiosResponse<null>>;
}

export interface ListAllResponse {
    data: Array<WebhookObject>;
    links: {
        first:  string;
        last:   string;
        prev:   string;
        next:   string;
    };
    meta: Meta;
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
