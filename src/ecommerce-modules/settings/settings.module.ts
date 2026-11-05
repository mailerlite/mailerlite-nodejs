import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type {
    EcommerceSettingsInterface,
    EcommerceSettingsResponse
} from './settings.types.js';

export default class Setting implements EcommerceSettingsInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Get e-commerce tracking settings
     *
     * @see https://developers.mailerlite.com/ecommerce/settings#get-e-commerce-tracking-settings
     */
    public get(): Promise<AxiosResponse<EcommerceSettingsResponse>> {

        return request(`/api/ecommerce/settings`, {
            method: "GET"
        }, this.config);
    }
};
