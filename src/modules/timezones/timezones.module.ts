import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import { ListAllTimezonesResponse, TimezonesInterface } from "./timezones.types.js";

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
    public get(): Promise<AxiosResponse<ListAllTimezonesResponse>> {
        return request(`/api/timezones`, {
            method: "GET"
        }, this.config);
    }
};
