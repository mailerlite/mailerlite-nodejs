import { pathSegment } from '../../utils/helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    AutomationTemplatesInterface,
    GetAutomationTemplatesParams,
    ListAutomationTemplatesResponse
} from './automation-templates.types.js';
import type { SingleAutomationResponse } from '../automations/automations.types.js';

export default class AutomationTemplate implements AutomationTemplatesInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description List automation templates
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @params {Object} - List automation templates params
     */
    public get(params?: GetAutomationTemplatesParams): Promise<AxiosResponse<ListAutomationTemplatesResponse>> {
        return request(`/api/automation-templates`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Create an automation from a template
     *
     * @see https://developers.mailerlite.com/docs/automations.html
     *
     * @template_id {String} - Automation template ID
     */
    public select(template_id: string): Promise<AxiosResponse<SingleAutomationResponse>> {
        return request(`/api/automations/select-template/${pathSegment(template_id)}`, {
            method: "POST"
        }, this.config);
    }
};
