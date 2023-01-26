import { validateId } from '../helpers.js';
import request from '../../fetch.js'

import type { Config }  from '../types.js'
import { AxiosResponse } from "axios";
import type { FormsInterface, GetFormsParams, ListFormsResponse, SingleFormResponse, UpdateParams, FormTypes } from './forms.types.js';

export default class Form implements FormsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description List all forms
     *
     * @see https://developers.mailerlite.com/docs/forms.html#list-all-forms
     *
     * @type {String} - Form type
     * @params {Object} - List forms params
     */
    public get(type: FormTypes, params: GetFormsParams): Promise<AxiosResponse<ListFormsResponse>> {
        return request(`/api/forms/${type}`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Update a form
     *
     * @see https://developers.mailerlite.com/docs/forms.html#update-a-form
     *
     * @form_id {String} - Form ID
     * @requestBody {Object} - Form data for update
     */
    public update(form_id: string, requestBody: UpdateParams): Promise<AxiosResponse<SingleFormResponse, UpdateParams>> {

        validateId(form_id);

        return request(`/api/forms/${form_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete a form
     *
     * @see https://developers.mailerlite.com/docs/forms.html#delete-a-form
     *
     * @form_id {String} - Form ID
     */
    public delete(form_id: string): Promise<AxiosResponse<null>> {

        validateId(form_id);

        return request(`/api/forms/${form_id}`, {
            method: "DELETE"
        }, this.config);
    }
};
