import axios, { AxiosResponse } from "axios";
import { Config }  from './types.js'

interface Options {
    headers?: object;
    method: string;
    body?: null | object;
    params?: object;
}

export default function request(endpoint: string = "", options: Options, config: Config): Promise<AxiosResponse> {

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
        // Must be `undefined`, not `null`, when there is no body: workerd
        // (Cloudflare Workers) rejects a GET/HEAD Request that carries any
        // body property, even a null one. Node's http adapter tolerates it.
        data: body ? JSON.stringify(body) : undefined,
        // Let axios pick the first adapter supported by the current runtime.
        // Node keeps using `http` and browsers keep using `xhr` (no behaviour
        // change), while edge/serverless runtimes (Vercel Edge, Cloudflare
        // Workers, Deno, Next.js edge) that ship neither fall back to `fetch`.
        adapter: ["http", "xhr", "fetch"]
    })
}

function serializeQuery(params: object, prefix?: string): string {

    const queryParamsArray: string[] = Object.keys(params).flatMap((key) => {
        const value = params[key as keyof typeof params] as unknown;

        // Unset params are omitted instead of sent as `key=undefined`; `null`
        // would otherwise reach the recursive call below and throw.
        if (value === undefined || value === null)
            return '';

        if (params.constructor === Array)
            key = `${prefix}[]`;
        else if (params.constructor === Object)
            key = (prefix ? `${prefix}[${key}]` : key);

        if (value instanceof Date)
            return `${key}=${formatDate(value)}`;
        else if (typeof value === 'boolean')
            return `${key}=${value ? 1 : 0}`;
        else if (typeof value === 'object')
            return serializeQuery(value, key);
        else
            return `${key}=${encodeURIComponent(String(value))}`;
    });

    // Drop empty entries from skipped keys and empty nested objects so they
    // don't leave stray `&` separators.
    return queryParamsArray.flat(10).filter(Boolean).join('&');
}

function formatDate(date: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');

    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}
