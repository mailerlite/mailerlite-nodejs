import request from '../../fetch.js'

import type { Config }  from '../types'
import { AxiosResponse } from "axios";
import { ListAllResponse, TimezonesInterface } from "./timezones.types.js";

export default class Timezone implements TimezonesInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description List all timezones
     *
     * @see https://developers.mailerlite.com/docs/timezones.html#response
     *
     */
    public get(): Promise<AxiosResponse<ListAllResponse>> {
        return request(`/api/timezones`, {
            method: "GET"
        }, this.config);
    }
};
