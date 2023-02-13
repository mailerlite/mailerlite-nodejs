import { validateId } from '../helpers.js';
import request from '../../utils/fetch.js'

import type { Config }  from '../types.js'
import { AxiosResponse } from "axios";
import type { FieldsInterface, GetParams, ListAllResponse, SingleFieldResponse, CreateParams, UpdateParams } from './fields.types.js';

export default class Field implements FieldsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description List all fields
     *
     * @see https://developers.mailerlite.com/docs/fields.html#list-all-fields
     *
     * @params {Object} - List fields params
     */
    public get(params: GetParams): Promise<AxiosResponse<ListAllResponse>> {
        return request(`/api/fields`, {
            method: "GET",
            params: params
        }, this.config);
    }

    /**
     * @description Create a field
     *
     * @see https://developers.mailerlite.com/docs/fields.html#create-a-field
     *
     * @requestBody {Object} - Field data for create
     */
    public create(requestBody: CreateParams): Promise<AxiosResponse<SingleFieldResponse, CreateParams>> {
        return request(`/api/fields`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Update a field
     *
     * @see https://developers.mailerlite.com/docs/fields.html#update-a-field
     *
     * @field_id {String} - Field ID
     * @requestBody {Object} - Field data for update
     */
    public update(field_id: string, requestBody: UpdateParams): Promise<AxiosResponse<SingleFieldResponse, UpdateParams>> {

        validateId(field_id);

        return request(`/api/fields/${field_id}`, {
            method: "PUT",
            body: requestBody
        }, this.config);
    }

    /**
     * @description Delete a field
     *
     * @see https://developers.mailerlite.com/docs/fields.html#delete-a-field
     *
     * @field_id {String} - Field ID
     */
    public delete(field_id: string): Promise<AxiosResponse<null>> {

        validateId(field_id);

        return request(`/api/fields/${field_id}`, {
            method: "DELETE"
        }, this.config);
    }
};
