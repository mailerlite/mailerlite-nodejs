import { AxiosResponse } from "axios";
import { Links, Meta } from "../../utils/types.js";
import { SingleAutomationResponse } from "../automations/automations.types.js";

export interface AutomationTemplatesInterface {
    get:    (params?: GetAutomationTemplatesParams) => Promise<AxiosResponse<ListAutomationTemplatesResponse>>;
    select: (template_id: string)                   => Promise<AxiosResponse<SingleAutomationResponse>>;
}

export interface GetAutomationTemplatesParams {
    filter?: {
        type?:      string;
        category?:  string;
    };
    limit?: number;
    page?:  number;
}

export interface AutomationTemplateObject {
    id:                         string;
    name:                       string;
    type:                       string;
    workflow:                   string;
    description:                string;
    excerpt:                    string;
    workflow_steps_description: string;
    url:                        string;
}

export interface ListAutomationTemplatesResponse {
    data:   Array<AutomationTemplateObject>;
    links:  Links;
    meta:   Meta;
}
