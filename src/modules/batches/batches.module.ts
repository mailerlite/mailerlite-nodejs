import request from '../../utils/fetch.js'

import type { Config }  from '../types.js'
import { AxiosResponse } from "axios";
import { BatchResponses, BatchesInterface, BatchParams } from "./batches.types.js";

export default class Batch implements BatchesInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description Make multiple request to api in a single call
     *
     * @see https://developers.mailerlite.com/docs/batching.html
     *
     */
    public send(requestBody: BatchParams): Promise<AxiosResponse<BatchResponses>> {
        return request(`/api/batch`, {
            method: "POST",
            body: requestBody
        }, this.config);
    }
};
