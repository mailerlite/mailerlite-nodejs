import { AxiosResponse } from "axios";
import {SubscriberObject, Links, SubscriberReference} from "../../utils/types.js";

export interface SubscriberInterface {
    get:            (params: GetSubscribersParams)              => Promise<AxiosResponse<ListSubscribersResponse>>;
    createOrUpdate: (params: CreateOrUpdateSubscriberParams)    => Promise<AxiosResponse<SingleSubscriberResponse, CreateOrUpdateSubscriberParams>>;
    update:         (subscriber_id: string, params: UpdateSubscriberParams) => Promise<AxiosResponse<SingleSubscriberResponse, UpdateSubscriberParams>>;
    find:           (subscriber_id: string)                     => Promise<AxiosResponse<SingleSubscriberResponse>>;
    getCount:       ()                                          => Promise<AxiosResponse<CountSubscribersResponse>>;
    delete:         (subscriber_id: string)                     => Promise<AxiosResponse<null>>;
    forget:         (subscriber_id: string)                     => Promise<AxiosResponse<ForgetSubscriberResponse>>;
    getActivityLog: (subscriber_id: string, params?: GetSubscriberActivityLogParams) => Promise<AxiosResponse<ListSubscriberActivityLogResponse>>;
    getImport:      (import_id: string)                         => Promise<AxiosResponse<SingleSubscriberImportResponse>>;
}

export interface GetSubscribersParams {
    filter?: {
        status?:        "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk"; // because it should be looking like ?filter[status]=xxx
        group?:         string;
        automation?:    string;
        form?:          string;
        site?:          string;
        page?:          string;
        import?:        string;
        post?:          string;
    };
    /**
     * @default 25
     */
    limit?: number;
    /**
     * @default 1
     */
    page?:      number; // deprecated
    cursor?:    string;
    include?:   "groups";
    sort?:      string;
    start_date?: string;
    end_date?:  string;
    with_fields?: boolean;
    with_groups?: boolean;
}

export interface UpdateSubscriberParams {
    email?:             string;
    fields?:	        object;
    groups?:	        Array<string>;
    status?:	        "active" | "unsubscribed" | "unconfirmed" | "bounced" | "junk";
    subscribed_at?:	    string;
    ip_address?:	    string;
    opted_in_at?:	    string;
    optin_ip?:	        string;
    unsubscribed_at?:	string;
}

export interface CreateOrUpdateSubscriberParams extends UpdateSubscriberParams{
    email:              string;
    resubscribe?:       boolean;
    notes?:             Array<string>;
}

export interface ListSubscribersResponse {
    data:   Array<SubscriberObject>;
    links:  Links;
    meta: {
        path: string;
        per_page: number;
        next_cursor: string;
        prev_cursor: string;
    };
}

export interface SingleSubscriberResponse {
    data: SubscriberObject;
}

export interface CountSubscribersResponse {
    total: number;
}

export interface ForgetSubscriberResponse {
    message: string;
    data: SubscriberObject;
}

export interface GetSubscriberActivityLogParams {
    filter?: {
        log_name?: string;
    };
    limit?: number;
    page?:  number;
}

export interface SubscriberActivityLogObject {
    id:             string;
    log_name:       string | null;
    subject_id:     string;
    subject_type:   string | null;
    properties:     Record<string, unknown>;
    created_at:     string;
    updated_at:     string;
}

export interface ListSubscriberActivityLogResponse {
    data: Array<SubscriberActivityLogObject>;
}

export type SubscriberImportSample = SubscriberReference;

export interface SubscriberImportObject {
    id:                         string;
    account_id:                 string;
    total:                      number;
    processed:                  number;
    imported:                   number;
    updated:                    number;
    errored:                    number;
    percent:                    number;
    done:                       boolean;
    file_path?:                 string | null;
    invalid:                    Array<SubscriberImportSample>;
    invalid_count:              number;
    mistyped:                   Array<SubscriberImportSample>;
    mistyped_count:             number;
    changed:                    Array<SubscriberImportSample>;
    changed_count:              number;
    unchanged:                  Array<SubscriberImportSample>;
    unchanged_count:            number;
    unsubscribed:               Array<SubscriberImportSample>;
    unsubscribed_count:         number;
    role_based:                 Array<SubscriberImportSample>;
    role_based_count:           number;
    suspicious_format:          Array<SubscriberImportSample>;
    suspicious_format_count:    number;
    duplicate:                  Array<SubscriberImportSample>;
    duplicate_count:            number;
    subscriber_limit:           Array<SubscriberImportSample>;
    subscriber_limit_count:     number;
    banned_import_emails_count: number;
    updated_at:                 string | null;
    undone_at:                  string | null;
    is_stopped_due_to_free_account_limit_exceeded: boolean;
    stopped_at:                 string | null;
    undo_started_at:            string | null;
    finished_at:                string | null;
}

export interface SingleSubscriberImportResponse {
    data: SubscriberImportObject;
}
