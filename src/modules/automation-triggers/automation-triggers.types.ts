import { AxiosResponse } from "axios";

export interface AutomationTriggersInterface {
    get:    (automation_id: string)                                                     => Promise<AxiosResponse<ListAutomationTriggersResponse>>;
    find:   (automation_id: string, trigger_id: string)                                 => Promise<AxiosResponse<SingleAutomationTriggerResponse>>;
    create: (automation_id: string, params: CreateAutomationTriggerParams)              => Promise<AxiosResponse<SingleAutomationTriggerResponse, CreateAutomationTriggerParams>>;
    update: (automation_id: string, trigger_id: string, params: UpdateAutomationTriggerParams) => Promise<AxiosResponse<UpdateAutomationTriggerResponse, UpdateAutomationTriggerParams>>;
    delete: (automation_id: string, trigger_id: string)                                 => Promise<AxiosResponse<null>>;
}

export type AutomationTriggerType =
    | "subscriber_joins_group"
    | "subscriber_joins_segment"
    | "clicks_link"
    | "field_updated"
    | "anniversary"
    | "exact_date"
    | "form_completed"
    | "manual"
    | "purchased_any_product"
    | "purchased_specific_product"
    | "purchased_from_category"
    | "abandoned_cart"
    | "abandoned_checkout"
    | "purchase_frequency";

export interface AutomationTriggerObject {
    id:         string;
    type:       AutomationTriggerType | (string & {});
    complete:   boolean;
    broken:     boolean;
    [key: string]: unknown;
}

export interface CreateAutomationTriggerParams {
    type:   AutomationTriggerType;
    data?:  Record<string, unknown>;
}

export interface UpdateAutomationTriggerParams {
    data:   Record<string, unknown>;
}

export interface ListAutomationTriggersResponse {
    data: Array<AutomationTriggerObject>;
}

export interface SingleAutomationTriggerResponse {
    data: AutomationTriggerObject;
}

export interface UpdateAutomationTriggerResponse {
    data: {
        trigger:                        AutomationTriggerObject;
        trigger_data:                   Record<string, unknown> | null;
        qualified_subscribers_count:    number;
    };
}
