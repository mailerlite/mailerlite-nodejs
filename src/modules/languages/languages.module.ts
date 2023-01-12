import request from '../../fetch.js'

import type { Config }  from '../types'
import { AxiosResponse } from "axios";
import { ListAllResponse, LanguagesInterface } from "./languages.types.js";

export default class Language implements LanguagesInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Campaign languages
     *
     * @see https://developers.mailerlite.com/docs/campaign-languages.html
     *
     */
    public get(): Promise<AxiosResponse<ListAllResponse>> {
        return request(`/api/campaigns/languages`, {
            method: "GET"
        }, this.config);
    }
};
