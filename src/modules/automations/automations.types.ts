import { AxiosResponse } from "axios";
import { Email } from "../campaigns/campaigns.types.js";
import {Links, Meta, Stats, SubscriberReference} from "../../utils/types.js";

export interface AutomationsInterface {
    get:                        (params: GetAutomationsParams)                          => Promise<AxiosResponse<ListAutomationsResponse>>;
    find:                       (automation_id: string)                                 => Promise<AxiosResponse<SingleAutomationResponse>>;
    getAutomationSubscribers:   (automation_id: string, params: AutomationSubsParams)   => Promise<AxiosResponse<AutomationSubsResponse>>;
    create:                     (params: CreateAutomationParams)                        => Promise<AxiosResponse<SingleAutomationResponse, CreateAutomationParams>>;
    update:                     (automation_id: string, params: UpdateAutomationParams) => Promise<AxiosResponse<SingleAutomationResponse, UpdateAutomationParams>>;
    delete:                     (automation_id: string)                                 => Promise<AxiosResponse<null>>;
    copy:                       (automation_id: string)                                 => Promise<AxiosResponse<SingleAutomationResponse>>;
    enable:                     (automation_id: string)                                 => Promise<AxiosResponse<SingleAutomationResponse>>;
    disable:                    (automation_id: string)                                 => Promise<AxiosResponse<SingleAutomationResponse>>;
    test:                       (automation_id: string, params: TestAutomationParams)   => Promise<AxiosResponse<null, TestAutomationParams>>;
    addSubscribers:             (automation_id: string, params: AddSubscribersToAutomationParams)   => Promise<AxiosResponse<null, AddSubscribersToAutomationParams>>;
    readd:                      (automation_id: string, params: ReaddAutomationSubscribersParams)   => Promise<AxiosResponse<null, ReaddAutomationSubscribersParams>>;
    addActivityToGroup:         (automation_id: string, params: AddAutomationActivityToGroupParams) => Promise<AxiosResponse<null, AddAutomationActivityToGroupParams>>;
    cancelActivity:             (automation_id: string, params: AutomationActiveRunsParams)         => Promise<AxiosResponse<null, AutomationActiveRunsParams>>;
    skipActivityDelay:          (automation_id: string, params: AutomationActiveRunsParams)         => Promise<AxiosResponse<null, AutomationActiveRunsParams>>;
}

export interface GetAutomationsParams {
    filter?: {
        /**
         * Booleans are sent as 1/0; the strings are sent as given.
         */
        enabled?:   boolean | "true" | "false";
        name?:      string;
        group?:     string;
        folder?:    string;
        status?:    boolean;
        automation_state?:  "drafts" | "workflows";
        drafts_state?:      "broken_workflow" | "complete_workflow";
    };
    /**
     * @default 10
     */
    limit?: number;
    /**
     * @default 1
     */
    page?:  number;
    sort?:  string;
    /**
     * @default true
     */
    with_steps?: boolean;
}

export interface AutomationSubsParams {
    filter: {
        status:             "completed" | "active" | "canceled" | "failed";
        date_from?:         Date | string;
        date_to?:           Date | string;
        scheduled_from?:    Date | string;
        scheduled_to?:      Date | string;
        keyword?:           string; // deprecated
        search?:            string;
    };
    sort?:              string;
    with_subscribers?:  boolean;
    /**
     * @default 10
     */
    limit?: number;
    /**
     * @default 1
     */
    page?:  number;
}

export interface ListAutomationsResponse {
    data:   Array<AutomationObject>;
    links:  Links;
    meta:   ListAutomationsResponseMeta;
}

export interface AutomationSubsResponse {
    data:   Array<AutomationSubObject>;
    links:  Links;
    meta:   Meta;
}

export interface SingleAutomationResponse {
    data: AutomationObject;
}

export interface AutomationSubObject {
    id:                 string;
    status:             string;
    date:               string;
    reason:             string;
    reason_description: string;
    subscriber:         SubscriberReference;
    stepRuns: Array<{
        id:             string;
        step_id:        string;
        description:    string;
        scheduled_for:  string;
    }>;
    currentStep: {
        id:             string;
        type:           string;
        parent_id:      string;
        name:           string;
        subject:        string;
        from:           string;
        from_name:      string;
        email_id:       string;
        email:          Email;
    };
    language_id:        number;
    complete:           boolean;
    created_at:         string;
    updated_at:         string;
    track_opens:        boolean;
    google_analytics:   string;
    tracking_was_disabled: boolean;
    description:        string;
}

export interface AutomationObject {
    id:         string;
    name:       string;
    enabled:    boolean;
    trigger_data: {
        track_ecommerce: boolean;
        repeatable:      boolean;
        valid:           boolean;
    };
    steps:                      Array<AutomationStep | AutomationEmailStep>;
    triggers:                   Array<AutomationTriggers>;
    complete:                   boolean;
    broken:                     boolean;
    warnings:                   Array<string>;
    emails_count?:              number;
    first_email_screenshot_url?: string;
    stats:                      AutomationStats;
    created_at:                 string;
    has_banned_content:         boolean;
    qualified_subscribers_count: number;
    automation_template_id:     number | null;
    automation_template_name:   string | null;
    building_in_progress:       boolean;
}

export interface AutomationStats extends Stats {
    completed_subscribers_count:    number;
    subscribers_in_queue_count:     number;
    bounce_rate: {
        float:  number;
        string: string;
    };
    click_to_open_rate: {
        float:  number;
        string: string;
    };
}

export interface AutomationStep {
    id:             string;
    type:           string;
    parent_id:      string;
    unit:           string;
    complete:       boolean;
    created_at:     string;
    updated_at:     string;
    value:          string;
    description:    string;
}

export interface AutomationEmailStep {
    id:                     string;
    type:                   string;
    parent_id:              string;
    name:                   string;
    subject:                string;
    from:                   string;
    from_name:              string;
    email_id:               string;
    email:                  Email;
    language_id:            number;
    complete:               boolean;
    created_at:             string;
    updated_at:             string;
    track_opens:            boolean;
    google_analytics:       string;
    tracking_was_disabled:  boolean;
    description:            string;
}

export interface AutomationTriggers {
    id:         string;
    type:       string;
    group_ids:  Array<string>;
    groups:     Array<{
                    id: string;
                    name: string;
                    url: string;
                }>;
    exclude_group_ids:  Array<string>;
    excluded_groups:    Array<string>;
    broken:             boolean;
}

export interface ListAutomationsResponseMeta extends Meta {
    total_unfiltered:   number
}

export interface CreateAutomationParams {
    name: string;
}

export interface UpdateAutomationParams {
    name:           string;
    trigger_data?:  Record<string, unknown>;
    triggers?:      Array<Record<string, unknown>>;
}

export interface TestAutomationParams {
    email: string;
}

export interface AddSubscribersToAutomationParams {
    emails?:    Array<string>;
    groups?:    Array<string>;
    step_id?:   string;
}

export interface ReaddAutomationSubscribersParams {
    readd_subscribers_to:   "last_completed_step" | "selected_step" | "last_failed_step";
    selected_step_id?:      string;
    filter: Pick<AutomationActivityActionFilter, "id" | "search" | "date_from" | "date_to"> & {
        status: "completed" | "canceled" | "failed";
        step?:  string;
    };
}

export interface AutomationActivityActionFilter {
    id?:                Array<string>;
    search?:            string;
    date_from?:         string;
    date_to?:           string;
    scheduled_from?:    string;
    scheduled_to?:      string;
    next_step?:         string;
}

export interface AddAutomationActivityToGroupParams {
    destination_groups: Array<string>;
    filter: AutomationActivityActionFilter & {
        status:         "active" | "completed" | "canceled";
        reason?:        string;
        current_step?:  string;
    };
}

export interface AutomationActiveRunsParams {
    filter: AutomationActivityActionFilter & {
        status: "active";
    };
}
