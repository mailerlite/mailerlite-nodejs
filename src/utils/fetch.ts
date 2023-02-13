import axios from "axios";
import { Config }  from './types.js'

interface Options {
    headers?: object;
    method: string;
    body?: null | object;
    params?: object;
}

export default function request(endpoint: string = "", options: Options, config: Config) {

    const {headers = {}, method, body = null, params = {}} = options

    let queryString = serializeQuery(params)
    queryString = queryString ? `?${queryString}` : ''

    return axios({
        method: method,
        url: config.basePath + endpoint + queryString,
        headers: {
            ...headers,
            "Authorization": `Bearer ${config.api_key}`,
            "X-Requested-With": "XMLHttpRequest",
            "Content-type": "application/json",
            "accept-encoding": "null" // needed for axios
        },
        data: body && JSON.stringify(body)
    })
}

function serializeQuery(params: object, prefix?: string): string {

    const query: string[] = Object.keys(params).map((key) => {
        const value = params[key as keyof typeof params];

        if (params.constructor === Array)
            key = `${prefix}[]`;
        else if (params.constructor === Object)
            key = (prefix ? `${prefix}[${key}]` : key);

        if (typeof value === 'object')
            return serializeQuery(value, key);
        else
            return `${key}=${encodeURIComponent(value)}`;
    });

    // @ts-ignore
    return [].concat.apply([], query).join('&')
}
