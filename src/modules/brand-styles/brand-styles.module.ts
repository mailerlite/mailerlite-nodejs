import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type { BrandStylesInterface, BrandStylesResponse } from "./brand-styles.types.js";

export default class BrandStyle implements BrandStylesInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Get the account's brand style, the default style and the built-in presets
     *
     * TODO: add @see link once developers.mailerlite.com publishes these endpoints
     *
     */
    public get(): Promise<AxiosResponse<BrandStylesResponse>> {
        return request(`/api/brand-styles`, {
            method: "GET"
        }, this.config);
    }
};
