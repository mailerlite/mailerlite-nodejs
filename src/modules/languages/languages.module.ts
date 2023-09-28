import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import { ListAllLanguagesResponse, LanguagesInterface } from "./languages.types.js";

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
    public get(): Promise<AxiosResponse<ListAllLanguagesResponse>> {
        return request(`/api/campaigns/languages`, {
            method: "GET"
        }, this.config);
    }
};
