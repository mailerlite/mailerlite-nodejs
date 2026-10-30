import request from '../../utils/fetch.js'

import type { Config }  from '../../utils/types.js'
import { AxiosResponse } from "axios";
import type { FilesInterface, GetFilesParams, ListFilesResponse } from "./files.types.js";

export default class Files implements FilesInterface {
    private config: Config;

    constructor(config: Config) {
        this.config = config;
    }

    /**
     * @description List files in the account's media library
     *
     * TODO: add @see link once developers.mailerlite.com publishes these endpoints
     *
     * @params {Object} - List files params (limit, page, filter[name], filter[type], sort)
     */
    public get(params?: GetFilesParams): Promise<AxiosResponse<ListFilesResponse>> {
        return request(`/api/files`, {
            method: "GET",
            params: params
        }, this.config);
    }
};

