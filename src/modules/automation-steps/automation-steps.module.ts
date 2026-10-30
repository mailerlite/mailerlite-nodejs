import { pathSegment } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    AutomationStepsInterface,
    ListAutomationStepsResponse,
    SingleAutomationStepResponse,
    CreateAutomationStepParams,
    UpdateAutomationStepParams,
    DeleteAutomationStepParams,
    CopyAutomationStepParams,
    ReorderAutomationStepsParams,
    SelectAbTestWinnerParams
} from './automation-steps.types.js';
import type { SingleAutomationResponse } from '../automations/automations.types.js';
import type { SingleAutomationAbStepStatsResponse } from '../automation-reports/automation-reports.types.js';

export default class AutomationStep implements AutomationStepsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description List automation steps
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     */
    public get(automation_id: string): Promise<AxiosResponse<ListAutomationStepsResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/steps/index`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Get an automation step
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @step_id {String} - Step ID
     */
    public find(automation_id: string, step_id: string): Promise<AxiosResponse<SingleAutomationStepResponse>> {
        return request(`/api/automations/${pathSegment(automation_id)}/steps/${pathSegment(step_id)}`, {
            method: "GET"
        }, this.config);
    }

    /**
     * @description Create an automation step
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @requestBody {Object} - Step type, position and data
     */
    public create(automation_id: string, requestBody: CreateAutomationStepParams): Promise<AxiosResponse<SingleAutomationStepResponse, CreateAutomationStepParams>> {
        return request(`/api/automations/${pathSegment(automation_id)}/steps`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update an automation step
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @step_id {String} - Step ID
     * @requestBody {Object} - Complete step data
     */
    public update(automation_id: string, step_id: string, requestBody: UpdateAutomationStepParams): Promise<AxiosResponse<SingleAutomationStepResponse, UpdateAutomationStepParams>> {
        return request(`/api/automations/${pathSegment(automation_id)}/steps/${pathSegment(step_id)}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete an automation step
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @step_id {String} - Step ID
     * @params {Object} - Branch to delete: all, yes or no for condition steps, all or a path for A/B test steps
     */
    public delete(automation_id: string, step_id: string, params?: DeleteAutomationStepParams): Promise<AxiosResponse<null>> {
        return request(`/api/automations/${pathSegment(automation_id)}/steps/${pathSegment(step_id)}`, {
            method: "DELETE",
            params: params
        }, this.config);
    }

    /**
     * @description Duplicate an automation step
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @step_id {String} - Step ID
     * @requestBody {Object} - Position of the copy
     */
    public copy(automation_id: string, step_id: string, requestBody?: CopyAutomationStepParams): Promise<AxiosResponse<SingleAutomationResponse, CopyAutomationStepParams>> {
        return request(`/api/automations/${pathSegment(automation_id)}/steps/${pathSegment(step_id)}/copy`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Move an automation step
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @requestBody {Object} - Step to move and its new position
     */
    public reorder(automation_id: string, requestBody: ReorderAutomationStepsParams): Promise<AxiosResponse<SingleAutomationResponse, ReorderAutomationStepsParams>> {
        return request(`/api/automations/${pathSegment(automation_id)}/steps/reorder`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Select the winner of an A/B test step
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @automation_id {String} - Automation ID
     * @step_id {String} - Step ID
     * @requestBody {Object} - Winning path
     */
    public selectAbTestWinner(automation_id: string, step_id: string, requestBody: SelectAbTestWinnerParams): Promise<AxiosResponse<SingleAutomationAbStepStatsResponse, SelectAbTestWinnerParams>> {
        return request(`/api/automations/${pathSegment(automation_id)}/steps/${pathSegment(step_id)}/select-ab-test-winner`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }
};
