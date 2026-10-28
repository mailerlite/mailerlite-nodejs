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
     * TODO: add @see link once developers.mailerlite.com publishes these endpoints (CMAC-860)
     *
     * @params {Object} - List files params (limit, page, filter[name], filter[type], sort)
     */
    public get(params?: GetFilesParams): Promise<AxiosResponse<ListFilesResponse>> {
        return request(`/api/files`, {
            method: "GET",
            params: stripEmpty(params)
        }, this.config);
    }
};

/**
 * Drops `undefined` and `null` values (recursively) so they never reach the query string:
 * the query serializer prints `undefined` literally and throws on `null`.
 */
function stripEmpty(params?: object): object {
    const result: Record<string, unknown> = {};

    if (!params) return result;

    for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) continue;

        if (typeof value === 'object' && !Array.isArray(value)) {
            const nested = stripEmpty(value);
            if (Object.keys(nested).length) result[key] = nested;
            continue;
        }

        result[key] = value;
    }

    return result;
}
