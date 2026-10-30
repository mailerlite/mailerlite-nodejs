import { AxiosResponse } from "axios";
import { SingleAutomationResponse } from "../automations/automations.types.js";
import { SingleAutomationAbStepStatsResponse } from "../automation-reports/automation-reports.types.js";

export interface AutomationStepsInterface {
    get:                (automation_id: string)                                                     => Promise<AxiosResponse<ListAutomationStepsResponse>>;
    find:               (automation_id: string, step_id: string)                                    => Promise<AxiosResponse<SingleAutomationStepResponse>>;
    create:             (automation_id: string, params: CreateAutomationStepParams)                 => Promise<AxiosResponse<SingleAutomationStepResponse, CreateAutomationStepParams>>;
    update:             (automation_id: string, step_id: string, params: UpdateAutomationStepParams) => Promise<AxiosResponse<SingleAutomationStepResponse, UpdateAutomationStepParams>>;
    delete:             (automation_id: string, step_id: string, params?: DeleteAutomationStepParams) => Promise<AxiosResponse<null>>;
    copy:               (automation_id: string, step_id: string, params?: CopyAutomationStepParams)  => Promise<AxiosResponse<SingleAutomationResponse, CopyAutomationStepParams>>;
    reorder:            (automation_id: string, params: ReorderAutomationStepsParams)               => Promise<AxiosResponse<SingleAutomationResponse, ReorderAutomationStepsParams>>;
    selectAbTestWinner: (automation_id: string, step_id: string, params: SelectAbTestWinnerParams)   => Promise<AxiosResponse<SingleAutomationAbStepStatsResponse, SelectAbTestWinnerParams>>;
}

export type AutomationStepType = "email" | "condition" | "delay" | "action" | "abtest" | "webhook";

export type AutomationConditionBranch = "yes" | "no";

export type AutomationAbPath = "a_path" | "b_path" | "c_path";

export type AutomationStepBranch = AutomationConditionBranch | AutomationAbPath;

export type AutomationStepActionType =
    | "update_custom_field"
    | "mark_as_unsubscribed"
    | "remove_from_group"
    | "go_to_step"
    | "copy_to_group"
    | "move_to_group"
    | "send_internal_email_notification";

export interface AutomationStepObject {
    id:             string;
    type:           AutomationStepType | (string & {});
    parent_id:      string | null;
    complete:       boolean;
    created_at:     string;
    updated_at:     string;
    description?:   string;
    [key: string]:  unknown;
}

export interface CreateAutomationStepParams {
    type:               AutomationStepType;
    parent_id?:         string | null;
    branch?:            AutomationStepBranch | null;
    move_to_branch?:    AutomationConditionBranch | null;
    data?:              Record<string, unknown> & {
        action_type?:   AutomationStepActionType;
    };
}

export interface UpdateAutomationStepParams {
    parent_id?:                         string | null;
    data?:                              Record<string, unknown>;
    reschedule_waiting_subscribers?:    boolean;
}

export interface DeleteAutomationStepParams {
    branch_to_delete?: "all" | AutomationStepBranch;
}

export type CopyAutomationStepParams = Pick<CreateAutomationStepParams, "parent_id" | "branch" | "move_to_branch">;

export interface ReorderAutomationStepsParams {
    dragged_step_id:        string;
    new_parent_step_id?:    string | null;
    branch?:                AutomationStepBranch | null;
    branch_for_child?:      AutomationConditionBranch | null;
}

export interface SelectAbTestWinnerParams {
    ab_test_winner: AutomationAbPath;
}

export interface ListAutomationStepsResponse {
    data: Array<AutomationStepObject>;
}

export interface SingleAutomationStepResponse {
    data: AutomationStepObject;
}
